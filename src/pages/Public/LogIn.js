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
      <div className="auth-switch">
        <p className="auth-switch__text">Don't have an account?</p>
        <button onClick={signUpHandler} className="auth-switch__btn">
          Create an account
        </button>
      </div>
      <h1 className="heading-primary">OR</h1>
      <button className="btn">
        Continue as <span className="btn__span">Guest</span>
      </button>
    </section>
  );
};
