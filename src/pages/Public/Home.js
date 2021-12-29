import { Welcome } from './Welcome';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';
import { useState } from 'react';
export const Home = () => {
  const [authSwitch, setAuthSwitch] = useState('login');
  const authHandler = () => {
    if (authSwitch === 'login') {
      setAuthSwitch('signup');
    } else {
      setAuthSwitch('login');
    }
  };
  return (
    <main className="public-homepage">
      <Welcome />
      {authSwitch === 'login' ? (
        <LogIn authSwitch={authHandler} />
      ) : (
        <SignUp authSwitch={authHandler} />
      )}
    </main>
  );
};
