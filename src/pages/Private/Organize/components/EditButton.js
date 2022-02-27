import { EditIcon } from '../../../../components/EditIcon';

export const EditButton = ({ ariaLabel, onClick, className }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClickHandler}
      className={className}
    >
      <EditIcon />
    </button>
  );
};
