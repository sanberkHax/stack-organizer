import { LogInForm } from './LogInForm';
export const LogIn = ({ authSwitch }) => {
  const signUpHandler = () => {
    authSwitch();
  };
  return (
    <section>
      <h2>Log In</h2>
      <LogInForm />
      <p>
        Don't have an account?
        <span onClick={signUpHandler}>Create an account</span>
      </p>
      <h2>OR</h2>
      <button>
        Continue as <span>Guest</span>
      </button>
    </section>
  );
};
