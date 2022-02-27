import { DeleteIcon } from '../../../../components/DeleteIcon';

export const DeleteButton = ({ ariaLabel, onClick, className }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClickHandler}
      className={className}
    >
      <DeleteIcon />
    </button>
  );
};
