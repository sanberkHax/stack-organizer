import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Comment } from '../Search/components/Comment';
import { Answer } from './components/Answer';
import { SaveModal } from './components/SaveModal';
import { Backdrop } from './components/Backdrop';
import { SaveAsButton } from '../../../components/SaveAsButton';
import { CommentsButton } from '../../../components/CommentsButton';
import { BackButton } from '../../../components/BackButton';
import { toLocaleDate } from '../../../utils/toLocaleDate';
import { DualRing } from 'react-awesome-spinners';
import { useEffect } from 'react';

export const QuestionDetails = () => {
  const navigate = useNavigate();

  const [showComments, setShowComments] = useState(false);
  const [modal, setModal] = useState(false);

  const questions = useSelector((state) => state.search.searchResults);
  const loading = useSelector((state) => state.search.loading);

  const [results, setResults] = useState(questions);

  useEffect(() => {
    const searchResults = JSON.parse(localStorage.getItem('searchResults'));
    setResults(searchResults);
  }, []);

  // Get the current question id from URL
  const { questionId } = useParams();

  // Find the current question from search results
  const question = results.find((q) => q.question_id == questionId);

  // Convert unix date format to Month/Day/Year
  const creationDate = toLocaleDate(question?.creation_date);
  const editedDate = toLocaleDate(question?.last_edit_date);

  // Toggle question's comments
  const commentDisplayHandler = () => {
    setShowComments((prev) => !prev);
  };

  // Open save modal
  const saveModalHandler = () => {
    setModal(true);
  };

  // Close save modal
  const backdropHandler = () => {
    setModal(false);
  };

  const commentsContent = question?.comment_count > 0 && (
    <>
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
      modalHandler={saveModalHandler}
    />
  ));

  return (
    <main className="question-details">
      {loading ? (
        <DualRing size="60" color="#1C5274" />
      ) : (
        <>
          {modal && (
            <>
              <SaveModal question={question} setModal={setModal} />
              <Backdrop onClick={backdropHandler} />
            </>
          )}
          <div className="question-details__nav">
            <BackButton
              className="back-btn question-details__back-btn"
              onClick={() => navigate(-1)}
            />
            <h1 className="heading-primary question-details__heading">
              DETAILS
            </h1>
            <button className="stack-overflow-btn">
              <a href={question?.link} rel="noreferrer" target="_blank">
                <svg
                  className="stack-overflow-btn__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z" />
                </svg>
                <p className="stack-overflow-btn__link">
                  See on Stack Overflow
                </p>
              </a>
            </button>
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
                {question?.owner.display_name}
              </p>
            </div>
            <CommentsButton
              showComments={showComments}
              onClick={commentDisplayHandler}
            />
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
