import { SignUpForm } from './SignUpForm';
import { DualRing } from 'react-awesome-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { resetError } from '../../slices/authSlice';

export const SignUp = ({ authSwitch }) => {
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const authSwitchHandler = () => {
    authSwitch();
    dispatch(resetError());
  };

  return (
    <section className="auth-section">
      {loading ? (
        <DualRing size="70" color="#1C5274" />
      ) : (
        <h1 className="heading-primary">Sign Up</h1>
      )}
      {error && <p className="error">{error}</p>}
      <SignUpForm />
      <div className="auth-switch">
        <p className="auth-switch__text">Already have an account?</p>
        <button onClick={authSwitchHandler} className="auth-switch__btn">
          Log In
        </button>
      </div>
      <h1 className="heading-primary">OR</h1>
      <button className="btn">
        Continue as <span className="btn__span">Guest</span>
      </button>
    </section>
  );
};
