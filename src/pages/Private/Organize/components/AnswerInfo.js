export const AnswerInfo = ({ selectedAnswer }) => {
  const { questionTitle, questionBody, body } = selectedAnswer.data;

  return (
    <div className="answer-info">
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
      <div className="answer-info__container">
        <h1 className="heading-primary answer-info__title">Saved Answer</h1>
        <p
          className="answer-info__body"
          dangerouslySetInnerHTML={{ __html: `${body}` }}
        />
      </div>
    </div>
  );
};
