import { Welcome } from './Welcome';
import { LogIn } from './LogIn';
import { useState } from 'react';
export const Public = () => {
  const [authSwitch, setAuthSwitch] = useState('login');
  const authHandler = () => {
    setAuthSwitch('signup');
  };
  return (
    <div>
      <Welcome />
      {authSwitch === 'login' ? (
        <LogIn authSwitch={authHandler} />
      ) : (
        <div>Sign Up</div>
      )}
    </div>
  );
};
