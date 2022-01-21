export const Backdrop = ({ onClick }) => {
  const onClickHandler = () => {
    onClick();
  };
  return <div onClick={onClickHandler} className="backdrop"></div>;
};
