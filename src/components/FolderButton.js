export const FolderButton = ({
  onSingleClick,
  onDoubleClick,
  className,
  title,
}) => {
  let clickCount = 0;
  const onClickHandler = (e) => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 1) {
        onSingleClick(e);
      } else if (clickCount === 2) {
        onDoubleClick(e);
      }
      clickCount = 0;
    }, 150);
  };

  return (
    <button onClick={onClickHandler} className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z" />
      </svg>
      <p>{title}</p>
    </button>
  );
};
