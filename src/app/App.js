import { Public } from '../pages/Public/Public';
import { Private } from '../pages/Private/Private';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database, writeUsersData } from '../services/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInCurrentUser } from '../slices/authSlice';
import {
  projectsFetched,
  projectsRemoved,
  projectsLoadingUpdated,
} from '../slices/projectsSlice';
import {
  foldersFetched,
  foldersRemoved,
  foldersLoadingUpdated,
} from '../slices/foldersSlice';
import { ref, onValue, get, child } from 'firebase/database';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(logInCurrentUser(userId));
        // Read and fetch projects from firebase
        get(child(ref(database), `projects/${userId}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              dispatch(projectsLoadingUpdated(false));
              const projectsMetadata = data.map((p) => p.id);
              dispatch(projectsFetched(data));
              writeUsersData(userId, {
                uid: userId,
                projects: projectsMetadata,
              });
            } else {
              writeUsersData(userId, { uid: userId });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        get(child(ref(database), `folders/${userId}`))
          .then((snapshot) => {
            // dispatch(loadingUpdated(true));
            if (snapshot.exists()) {
              const data = snapshot.val();
              dispatch(foldersFetched(data));
              dispatch(foldersLoadingUpdated(false));
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });

        const projectsRef = ref(database, 'projects/' + userId);
        // onValue(
        //   projectsRef,
        //   (snapshot) => {
        //     const data = snapshot.val();
        //     // Store fetched projects in redux
        //     if (data) {
        //       const projectsMetadata = data.map((p) => p.id);
        //       dispatch(projectsFetched(data));
        //       writeUsersData(userId, {
        //         uid: userId,
        //         projects: projectsMetadata,
        //       });
        //     } else {
        //       writeUsersData(userId, { uid: userId });
        //     }
        //   },
        //   {
        //     onlyOnce: true,
        //   }
        // );

        // Read and fetch folders from firebase
        const foldersRef = ref(database, 'folders/' + userId);
        // onValue(
        //   foldersRef,
        //   (snapshot) => {
        //     const data = snapshot.val();
        //     // Store fetched folders in redux
        //     if (data) {
        //       dispatch(foldersFetched(data));
        //     }
        //   },
        //   {
        //     onlyOnce: true,
        //   }
        // );
      } else {
        dispatch(projectsRemoved());
        dispatch(foldersRemoved());
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
