import { SignUpForm } from './SignUpForm';
export const SignUp = ({ authSwitch }) => {
  const logInHandler = () => {
    authSwitch();
  };
  return (
    <section>
      <h2>Sign Up</h2>
      <SignUpForm />
      <p>
        Already have an account?
        <span onClick={logInHandler}>Log In</span>
      </p>
      <h2>OR</h2>
      <button>
        Continue as <span>Guest</span>
      </button>
    </section>
  );
};
