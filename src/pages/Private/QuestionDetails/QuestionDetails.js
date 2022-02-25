import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Comment } from '../Search/components/Comment';
import { Answer } from './components/Answer';
import { SaveModal } from './components/SaveModal';
import { Backdrop } from './components/Backdrop';
import { SaveAsButton } from '../../../components/SaveAsButton';
import { StackOverflowButton } from '../../../components/StackOverflowButton';
import { CommentsButton } from '../../../components/CommentsButton';
import { BackButton } from '../../../components/BackButton';
import { toLocaleDate } from '../../../utils/toLocaleDate';
import { DualRing } from 'react-awesome-spinners';
import { useEffect } from 'react';
import { getQuestion } from '../../../slices/searchSlice';

export const QuestionDetails = () => {
  const navigate = useNavigate();

  const { questionId } = useParams();

  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState();

  const loading = useSelector((state) => state.search.loading);
  const question = useSelector((state) => state.search.question);

  // Fetch question
  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, [dispatch, questionId]);

  // Convert unix date format to Month/Day/Year
  const creationDate = toLocaleDate(question?.creation_date);
  const editedDate = toLocaleDate(question?.last_edit_date);

  // Toggle question's comments
  const commentDisplayHandler = () => {
    setShowComments((prev) => !prev);
  };
  // Open save modal
  const saveModalHandler = (data) => {
    setAnswer(data);
    setModal(true);
  };

  // Close save modal
  const backdropHandler = () => {
    setModal(false);
  };

  const commentsContent = question?.comment_count > 0 && (
    <>
      <CommentsButton
        showComments={showComments}
        onClick={commentDisplayHandler}
      />
      {showComments && (
        <ul>
          {question.comments.map((comment) => (
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

  const answersContent = question?.answers?.map((answer) => (
    <Answer
      answer={answer}
      comments={answer.comments}
      key={answer.answer_id}
      owner={answer.owner.display_name}
      voteCount={answer.score}
      body={answer.body}
      date={toLocaleDate(answer.creation_date)}
      saveModalHandler={saveModalHandler}
    />
  ));

  return (
    <main className="question-details">
      {loading ? (
        <DualRing
          className="question-details__spinner"
          size="60"
          color="#1C5274"
        />
      ) : (
        <>
          {modal && (
            <>
              <SaveModal
                question={question}
                answer={answer}
                setModal={setModal}
              />
              <Backdrop onClick={backdropHandler} />
            </>
          )}
          <div className="question-details__nav">
            <BackButton
              className="back-btn question-details__back-btn"
              onClick={() => navigate(-1)}
            />
            <h1 className="heading-primary question-details__heading">
              Question
            </h1>
            <StackOverflowButton
              className="stack-overflow-btn"
              link={question?.link}
            />
          </div>
          <div className="question">
            <h2
              className="heading-primary question__title"
              dangerouslySetInnerHTML={{ __html: question?.title }}
            ></h2>
            <p
              className="question-details__body"
              dangerouslySetInnerHTML={{ __html: `${question?.body}` }}
            ></p>
            <div className="question-details__stats">
              <p className="question-details__edit-date">edited {editedDate}</p>
              <p className="question-details__creation-date">
                asked {creationDate}
              </p>
              <p className="question-details__owner">
                {question?.owner?.display_name}
              </p>
            </div>

            {commentsContent}
            <SaveAsButton onClick={saveModalHandler} />
          </div>
          <h2 className="heading-primary">Answers</h2>
          <ul className="question-details__answers">{answersContent}</ul>
        </>
      )}
    </main>
  );
};
