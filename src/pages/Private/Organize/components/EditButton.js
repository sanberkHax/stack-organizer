import { EditIcon } from '../../../../components/EditIcon';

export const EditButton = ({ onClick, className }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button onClick={onClickHandler} className={className}>
      <EditIcon />
    </button>
  );
};
