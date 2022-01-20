import { useNavigate } from 'react-router-dom';
import { toLocaleDate } from '../../../../utils/toLocaleDate';

export const Question = ({ voteCount, answerCount, tags, title, date, id }) => {
  const navigate = useNavigate();

  // Convert unix date format to Month/Day/Year
  const creationDate = toLocaleDate(date);

  const detailsHandler = () => {
    navigate(`/questions/${id}`);
  };

  const tagsContent = tags.map((tag, index) => (
    <p key={index} className="question__tag">
      {tag}
    </p>
  ));

  const voteContent =
    voteCount > 1 ? `${voteCount} votes` : `${voteCount} vote`;

  return (
    <li className="question">
      <div className="interaction-ctn">
        <p className="question__vote-count">{voteContent}</p>
        <p className="question__answer-count">{answerCount} Answers</p>
      </div>
      <h2
        className="heading-primary question__title"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      <div className="question__details">
        <div className="question__tags">{tagsContent}</div>
        <p>{creationDate}</p>
      </div>
      <button onClick={detailsHandler} className="question__btn">
        <p>Details</p>
        <svg
          className="question__btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M14 12l-14 9v-18l14 9zm-4-9v4l8.022 5-8.022 5v4l14-9-14-9z" />
        </svg>
      </button>
    </li>
  );
};
