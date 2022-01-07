import { LogInForm } from './LogInForm';
import { DualRing } from 'react-awesome-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { resetError } from '../../slices/authSlice';
import { SignUpForm } from './SignUpForm';
import { useState } from 'react';
import { signUp } from '../../slices/authSlice';
import { logIn } from '../../slices/authSlice';

export const Auth = () => {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [currentSection, setCurrentSection] = useState('logIn');

  const switchSection = () => {
    if (currentSection === 'logIn') {
      setCurrentSection('signUp');
    } else {
      setCurrentSection('logIn');
    }
  };

  const sectionHandler = () => {
    switchSection();
    dispatch(resetError());
  };
  const signUpHandler = (credentials) => {
    dispatch(signUp(credentials));
  };
  const logInHandler = (credentials) => {
    dispatch(logIn(credentials));
  };

  const heading = currentSection === 'logIn' ? 'Log In' : 'Sign Up';
  const switchText =
    currentSection === 'logIn'
      ? `Don't have an account?`
      : 'Already have an account?';

  const switchButton = currentSection === 'logIn' ? 'Sign Up' : 'Log In';

  return (
    <section className="auth-section">
      {loading ? (
        <DualRing size="70" color="#1C5274" />
      ) : (
        <h1 className="heading-primary">{heading}</h1>
      )}
      {error && <p className="error">{error}</p>}
      {currentSection === 'logIn' ? (
        <LogInForm onSubmit={logInHandler} />
      ) : (
        <SignUpForm onSubmit={signUpHandler} />
      )}
      <div className="auth-switch">
        <p className="auth-switch__text">{switchText}</p>
        <button onClick={sectionHandler} className="auth-switch__btn">
          {switchButton}
        </button>
      </div>

      <h1 className="heading-primary">OR</h1>
      <button className="btn">
        Continue as <span className="btn__span">Guest</span>
      </button>
    </section>
  );
};
