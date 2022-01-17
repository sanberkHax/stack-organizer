import { useNavigate } from 'react-router-dom';
export const Question = ({
  voteCount,
  answerCount,
  tags,
  title,
  creation,
  id,
}) => {
  const navigate = useNavigate();
  const creationDate = new Date(creation * 1000).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
  const detailsHandler = () => {
    navigate(`/questions/${id}`);
  };
  return (
    <li className="question">
      <div className="interaction-ctn">
        <p className="question__vote-count">
          {voteCount > 1 ? `${voteCount} votes` : `${voteCount} vote`}
        </p>
        <p className="question__answer-count">{answerCount} Answers</p>
      </div>
      <h2
        className="heading-primary question__title"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      <div className="question__details">
        <div className="question__tags">
          {tags.map((tag, index) => (
            <p key={index} className="question__tag">
              {tag}
            </p>
          ))}
        </div>
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
