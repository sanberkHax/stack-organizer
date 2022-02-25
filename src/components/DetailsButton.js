export const DetailsButton = ({ text, className, onClick }) => {
  const onClickHandler = (e) => {
    onClick(e);
  };
  return (
    <button onClick={onClickHandler} className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M14 12l-14 9v-18l14 9zm-4-9v4l8.022 5-8.022 5v4l14-9-14-9z" />
      </svg>
      <p>{text}</p>
    </button>
  );
};
