import { NewFolderIcon } from '../../../../components/NewFolderIcon';

export const NewFolderButton = ({ ariaLabel, onClick }) => {
  const clickHandler = () => {
    onClick();
  };
  return (
    <button
      aria-label={ariaLabel}
      className="new-folder-btn"
      onClick={clickHandler}
    >
      <NewFolderIcon />
      <h2 className="heading-secondary">New Folder</h2>
    </button>
  );
};
