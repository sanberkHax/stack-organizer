import { DetailsButton } from '../../../../components/DetailsButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Comment } from '../../Search/components/Comment';
import { CommentsButton } from '../../../../components/CommentsButton';
export const AnswerInfo = ({ selectedAnswer }) => {
  const [showComments, setShowComments] = useState(false);
  const { questionTitle, questionBody, body, id, comments } =
    selectedAnswer.data;
  const { note } = selectedAnswer;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/questions/${id}`);
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
    <div className="answer-info">
      <DetailsButton
        onClick={navigateHandler}
        text="Go to Question Details"
        className="question-info__btn"
      />
      <h1 className="heading-primary">Question</h1>
      <div className="answer-info__container">
        <h1
          className="heading-primary answer-info__title"
          dangerouslySetInnerHTML={{ __html: `${questionTitle}` }}
        ></h1>
        <p
          className="answer-info__body"
          dangerouslySetInnerHTML={{ __html: `${questionBody}` }}
        ></p>
      </div>
      <h1 className="heading-primary">Saved Answer</h1>
      <div className="answer-info__container">
        <p
          className="answer-info__body"
          dangerouslySetInnerHTML={{ __html: `${body}` }}
        />
        {commentsContent}
      </div>
      {note && (
        <>
          <h1 className="heading-primary">Note</h1>
          <div className="answer-info__container">
            <p>{note}</p>
          </div>
        </>
      )}
    </div>
  );
};
