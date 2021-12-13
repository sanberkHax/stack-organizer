import { SignUpForm } from './SignUpForm';
export const SignUp = ({ authSwitch }) => {
  const logInHandler = () => {
    authSwitch();
  };
  return (
    <section className="auth-section">
      <h1 className="heading-primary">Sign Up</h1>
      <SignUpForm />
      <p className="auth-section__text">
        Already have an account?
        <span onClick={logInHandler} className="auth-section__text--btn">
          Log In
        </span>
      </p>
      <h1 className="heading-primary">OR</h1>
      <button className="btn">
        Continue as <span className="btn__span">Guest</span>
      </button>
    </section>
  );
};
