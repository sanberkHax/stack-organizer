import { Comment } from '../../Search/components/Comment';
import { SaveAsButton } from '../../../../components/SaveAsButton';
import { useState } from 'react';
import { CommentsButton } from '../../../../components/CommentsButton';
export const Answer = ({ voteCount, comments, date, body, owner }) => {
  const [showComments, setShowComments] = useState(false);

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
      <p
        className="answer__body"
        dangerouslySetInnerHTML={{ __html: `${body}` }}
      ></p>
      <div className="question-details__stats">
        <p className="question-details__creation-date">answered {date}</p>
        <p className="question-details__owner">{owner}</p>
      </div>
      {commentsContent}
      <SaveAsButton />
    </li>
  );
};
