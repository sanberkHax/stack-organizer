import { Public } from '../pages/Public/Public';
import { Private } from '../pages/Private/Private';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInCurrentUser } from '../slices/authSlice';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        dispatch(logInCurrentUser(userId));
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
