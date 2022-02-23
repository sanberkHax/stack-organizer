import { NewProjectIcon } from '../../../../components/NewProjectIcon';

export const NewProjectButton = ({ ariaLabel, onClick }) => {
  const clickHandler = () => {
    onClick();
  };
  return (
    <button
      aria-label={ariaLabel}
      className="projects-sidebar__add-btn"
      onClick={clickHandler}
    >
      <h2 className="heading-secondary projects-sidebar__heading">
        New Project
      </h2>
      <NewProjectIcon />
    </button>
  );
};
