export const Backdrop = ({ onClick }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return <div onClick={onClickHandler} className="backdrop"></div>;
};
