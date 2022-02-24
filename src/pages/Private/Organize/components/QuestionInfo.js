export const QuestionInfo = ({ selectedQuestion }) => {
  const { title, body, answers } = selectedQuestion.data;

  return (
    <div className="question-info">
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
      <h1 className="heading-primary">Answers</h1>
      {answers.map((a) => (
        <div className="question-info__container">
          <p
            className="question-info__body"
            dangerouslySetInnerHTML={{ __html: `${a.body}` }}
          />
        </div>
      ))}
    </div>
  );
};
