import { DeleteIcon } from '../../../../components/DeleteIcon';

export const DeleteButton = ({ onClick, className }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button onClick={onClickHandler} className={className}>
      <DeleteIcon />
    </button>
  );
};
