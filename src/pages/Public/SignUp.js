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
      <p className="auth-section__text">
        Already have an account?
        <span onClick={authSwitchHandler} className="auth-section__text--btn">
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
