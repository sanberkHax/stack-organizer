export const QuestionInfo = ({ selectedQuestion }) => {
  const { title, body } = selectedQuestion.data;
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
      <div className="question-info__container">
        <h1 className="heading-primary question-info__title">Answer Title</h1>
        <p className="question-info__body">Answer Body</p>
      </div>
    </div>
  );
};
