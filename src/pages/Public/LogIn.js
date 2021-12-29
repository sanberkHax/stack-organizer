import { LogInForm } from './LogInForm';
import { DualRing } from 'react-awesome-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { resetError } from '../../slices/authSlice';
export const LogIn = ({ authSwitch }) => {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const signUpHandler = () => {
    authSwitch();
    dispatch(resetError());
  };
  return (
    <section className="auth-section">
      {loading ? (
        <DualRing size="70" color="#1C5274" />
      ) : (
        <h1 className="heading-primary">Log In</h1>
      )}
      {error && <p className="error">{error}</p>}
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
