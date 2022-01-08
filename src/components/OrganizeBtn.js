import { ReactComponent as OrganizeIcon } from '../assets/organize-button.svg';
export const OrganizeBtn = () => {
  return (
    <button data-testid="organize-btn" className="organize-btn">
      <OrganizeIcon className="organize-btn__icon" />
      <p className="organize-btn__text">Organize</p>
    </button>
  );
};
