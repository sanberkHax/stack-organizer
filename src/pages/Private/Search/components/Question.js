import { useNavigate } from 'react-router-dom';
import { toLocaleDate } from '../../../../utils/toLocaleDate';
import { DetailsButton } from '../../../../components/DetailsButton';
export const Question = ({ voteCount, answerCount, tags, title, date, id }) => {
  const navigate = useNavigate();

  // Convert unix date format to Month/Day/Year
  const creationDate = toLocaleDate(date);

  const navigateHandler = () => {
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
      <DetailsButton
        onClick={navigateHandler}
        text="Details"
        className="question__btn"
      />
    </li>
  );
};
