import { DetailsButton } from '../../../../components/Buttons/DetailsButton';
import { useNavigate } from 'react-router-dom';

export const QuestionInfo = ({ selectedQuestion }) => {
  const { id, title, body } = selectedQuestion.data;
  const { note } = selectedQuestion;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`/questions/${id}`);
  };
  return (
    <>
      <div className="question-info">
        <h1 className="heading-primary">Question</h1>
        <DetailsButton
          onClick={navigateHandler}
          text="Go to Question Details"
          className="question-info__btn"
        />
        <div className="question-info__container">
          <h1
            className="heading-primary question-info__title"
            dangerouslySetInnerHTML={{ __html: `${title}` }}
          ></h1>
          <p
            className="question-info__body"
            dangerouslySetInnerHTML={{ __html: `${body}` }}
          ></p>
        </div>
        {note && (
          <>
            <h1 className="heading-primary">Note</h1>
            <div className="question-info__container">
              <p>{note}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
