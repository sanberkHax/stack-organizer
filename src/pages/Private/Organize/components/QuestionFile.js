import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';

import {
  previousFoldersAdded,
  currentFoldersUpdated,
} from '../../../../slices/foldersSlice';
import { QuestionIcon } from '../../../../components/QuestionIcon';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';
import {
  questionRemoved,
  questionsErrorUpdated,
  questionUpdated,
  selectAllQuestions,
} from '../../../../slices/questionsSlice';

export const QuestionFile = ({
  name,
  newQuestionId,
  setSelectedQuestion,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const questions = useSelector(selectAllQuestions);

  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const [editableQuestion, setEditableQuestion] = useState();

  const dispatch = useDispatch();
  const questionRef = useRef();

  const clickHandler = (e) => {
    setTitleIcon(<QuestionIcon />);
    const clickedQuestion = questions.find(
      (p) => p.name === questionRef.current.textContent
    );
    dispatch(previousFoldersAdded(currentFolders));
    dispatch(currentFoldersUpdated([]));

    if (clickedQuestion) {
      setSelectedQuestion(clickedQuestion);
      setCurrentFileArray((prev) => [...prev, clickedQuestion]);
    }
  };

  const editHandler = (e) => {
    e.stopPropagation();
    const clickedQuestion = questions.find(
      (p) => p.name === questionRef.current.textContent
    );

    // Remove question's name
    if (clickedQuestion) {
      setEditableQuestion(clickedQuestion);
      dispatch(questionUpdated({ id: clickedQuestion.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    e.stopPropagation();

    const clickedQuestion = questions.find(
      (p) => p.name === questionRef.current.textContent
    );
    if (clickedQuestion) {
      dispatch(questionRemoved(clickedQuestion.id));
      dispatch(questionsErrorUpdated(null));
    }
    setSelectedQuestion(null);
  };

  const addNameHandler = (f) => {
    const questionName = f.name;

    const existingQuestion = questions.find((q) => q.name === questionName);

    if (existingQuestion) {
      dispatch(
        questionsErrorUpdated('FOLDER NAME EXISTS, SELECT DIFFERENT NAME')
      );
      dispatch(questionRemoved(newQuestionId));
      return;
    } else if (questionName === null) {
      dispatch(questionRemoved(newQuestionId));
      return;
    } else if (questionName === '') {
      dispatch(questionsErrorUpdated(`CAN'T ADD FOLDER WITHOUT A NAME`));

      dispatch(questionRemoved(newQuestionId));
    } else if (questionName.length > 50) {
      dispatch(questionsErrorUpdated(`MAX CHARACTER LIMIT IS 50`));
      dispatch(questionRemoved(newQuestionId));
    } else {
      // Rename question
      if (editableQuestion) {
        dispatch(
          questionUpdated({ id: editableQuestion.id, name: questionName })
        );
      }
    }
  };
  return (
    <>
      <div className="question-file">
        <div
          ref={questionRef}
          onClick={clickHandler}
          className="question-file__details"
        >
          <QuestionIcon />
          {!name ? (
            <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
              {({ values }) => {
                return (
                  <Form className="question-file__form">
                    <Field
                      data-testid="question-file-btn-input"
                      id="name"
                      name="name"
                      autoFocus={true}
                      className="question-file__input"
                      onBlur={() => {
                        addNameHandler(values);
                      }}
                      onClick={editHandler}
                    />
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>{name}</p>
          )}
          <div className="question-file__btn-container">
            <EditButton
              onClick={editHandler}
              className="question-file__edit-btn"
            />
            <DeleteButton
              onClick={deleteHandler}
              className="question-file__delete-btn"
            />
          </div>
        </div>
      </div>
    </>
  );
};
