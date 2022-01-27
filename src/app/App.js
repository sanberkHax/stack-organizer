import { Public } from '../pages/Public/Public';
import { Private } from '../pages/Private/Private';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database, writeUsersData } from '../services/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInCurrentUser } from '../slices/authSlice';
import { projectsFetched, projectsRemoved } from '../slices/projectsSlice';
import { foldersFetched, foldersRemoved } from '../slices/foldersSlice';
import { ref, onValue } from 'firebase/database';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(logInCurrentUser(userId));
        // Write user data to firebase
        writeUsersData(userId, { uid: userId });

        // Read and fetch projects from firebase
        const projectsRef = ref(database, 'projects/' + userId);
        onValue(projectsRef, (snapshot) => {
          const data = snapshot.val();

          // Store fetched projects in redux
          if (data) {
            dispatch(projectsFetched(data));
          }
        });

        // Read and fetch folders from firebase
        const foldersRef = ref(database, 'folders/' + userId);
        onValue(foldersRef, (snapshot) => {
          const data = snapshot.val();

          // Store fetched folders in redux
          if (data) {
            dispatch(foldersFetched(data));
          }
        });
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
