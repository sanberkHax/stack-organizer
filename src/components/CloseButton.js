import { CloseIcon } from './CloseIcon';

export const CloseButton = ({ onClick, className }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button className={className} onClick={onClickHandler}>
      <CloseIcon />
    </button>
  );
};
