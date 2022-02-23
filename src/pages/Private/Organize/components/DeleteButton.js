import { DeleteIcon } from '../../../../components/DeleteIcon';

export const DeleteButton = ({ onClick, className }) => {
  const onClickHandler = () => {
    onClick();
  };
  return (
    <button onClick={onClickHandler} className={className}>
      <DeleteIcon />
    </button>
  );
};
