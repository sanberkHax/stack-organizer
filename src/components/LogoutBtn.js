import { ReactComponent as LogoutIcon } from '../assets/logout-button.svg';

export const LogoutBtn = ({ onClick }) => {
  const onClickHandler = () => {
    onClick();
  };
  return (
    <div onClick={onClickHandler} className="logout-btn">
      <LogoutIcon className="logout-btn__icon" />
      <p className="logout-btn__text">Logout</p>
    </div>
  );
};
