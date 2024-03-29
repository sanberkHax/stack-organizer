import { Comment } from "../../Search/components/Comment";
import { SaveAsButton } from "../../../../components/Buttons/SaveAsButton";
import { useState } from "react";
import { CommentsButton } from "../../../../components/Buttons/CommentsButton";
import parse from "html-react-parser";

export const Answer = ({
  voteCount,
  comments,
  date,
  body,
  owner,
  saveModalHandler,
  answer,
}) => {
  const [showComments, setShowComments] = useState(false);

  const saveModalDataHandler = () => {
    saveModalHandler(answer);
  };
  const commentDisplayHandler = () => {
    setShowComments((prev) => !prev);
  };

  const commentsContent = comments && (
    <>
      <CommentsButton
        showComments={showComments}
        onClick={commentDisplayHandler}
      />
      {showComments && (
        <ul>
          {comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              body={comment.body}
              owner={comment.owner.display_name}
              date={comment.creation_date}
              votes={comment.score}
            />
          ))}
        </ul>
      )}
    </>
  );

  return (
    <li className="answer">
      <div className="interaction-ctn">
        <p className="answer__vote-count">
          {voteCount > 1 ? `${voteCount} votes` : `${voteCount} vote`}
        </p>
      </div>
      <p className="answer__body">{parse(body)}</p>
      <div className="question-details__stats">
        <p className="question-details__creation-date">answered {date}</p>
        <p className="question-details__owner">{owner}</p>
      </div>
      {commentsContent}
      <SaveAsButton onClick={saveModalDataHandler} />
    </li>
  );
};
