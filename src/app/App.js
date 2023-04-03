import { Public } from "../pages/Public/Public";
import { Private } from "../pages/Private/Private";
import { Footer } from "../components/Footer";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, database, writeUsersData } from "../services/firebase";
import { logInCurrentUser } from "../slices/authSlice";
import {
  projectsFetched,
  projectsRemoved,
  projectsLoadingUpdated,
} from "../slices/projectsSlice";
import {
  foldersFetched,
  foldersRemoved,
  foldersLoadingUpdated,
} from "../slices/foldersSlice";
import {
  questionsFetched,
  questionsRemoved,
  questionsLoadingUpdated,
} from "../slices/questionsSlice";
import {
  answersFetched,
  answersRemoved,
  answersLoadingUpdated,
} from "../slices/answersSlice";
import { ref, get, child } from "firebase/database";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        dispatch(logInCurrentUser(userId));

        // Read and set projects from firebase
        get(child(ref(database), `projects/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const projectsMetadata = data.map((p) => p.id);

              dispatch(projectsLoadingUpdated(false));
              dispatch(projectsFetched(data));
              writeUsersData(userId, {
                uid: userId,
                projects: projectsMetadata,
              });
            } else {
              dispatch(projectsLoadingUpdated(false));

              writeUsersData(userId, { uid: userId });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Read and set folders from firebase
        get(child(ref(database), `folders/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();

              dispatch(foldersFetched(data));
              dispatch(foldersLoadingUpdated(false));
            } else {
              dispatch(foldersLoadingUpdated(false));
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Read and set questions from firebase
        get(child(ref(database), `questions/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();

              dispatch(questionsFetched(data));
              dispatch(questionsLoadingUpdated(false));
            } else {
              dispatch(questionsLoadingUpdated(false));
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // Read and set answers from firebase
        get(child(ref(database), `answers/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();

              dispatch(answersFetched(data));
              dispatch(answersLoadingUpdated(false));
            } else {
              dispatch(answersLoadingUpdated(false));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        dispatch(projectsRemoved());
        dispatch(foldersRemoved());
        dispatch(questionsRemoved());
        dispatch(answersRemoved());
      }
      // Remove listener
      return () => unsubscribe();
    });
  }, [dispatch]);

  return (
    <div className="app">
      {isLoggedIn ? <Private /> : <Public />}
      <Footer />
    </div>
  );
}

export default App;
