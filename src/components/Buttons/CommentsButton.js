import { Button } from "../Button";

export const CommentsButton = ({ showComments, ...props }) => {
  return (
    <Button className="comments-btn" {...props}>
      <h2 className="comments-btn__text">Show Comments</h2>
      <div className="comments-btn__icon-ctn">
        {showComments ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="comments-btn__icon"
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="comments-btn__icon"
          >
            <path d="M12 21l-12-18h24z" />
          </svg>
        )}
      </div>
    </Button>
  );
};
