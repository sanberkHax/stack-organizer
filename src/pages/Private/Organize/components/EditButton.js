import { EditIcon } from '../../../../components/EditIcon';

export const EditButton = ({ onClick, className }) => {
  const onClickHandler = () => {
    onClick();
  };
  return (
    <button onClick={onClickHandler} className={className}>
      <EditIcon />
    </button>
  );
};
