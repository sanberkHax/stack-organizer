import { LogInForm } from './LogInForm';
export const LogIn = ({ authSwitch }) => {
  const signUpHandler = () => {
    authSwitch();
  };
  return (
    <section className="auth-section">
      <h1 className="heading-primary">Log In</h1>
      <LogInForm />
      <p className="auth-section__text">
        Don't have an account?
        <span onClick={signUpHandler} className="auth-section__text--btn">
          Create an account
        </span>
      </p>
      <h1 className="heading-primary">OR</h1>
      <button className="btn">
        Continue as <span className="btn__span">Guest</span>
      </button>
    </section>
  );
};
