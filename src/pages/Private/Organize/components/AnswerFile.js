import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  previousFoldersAdded,
  currentFoldersUpdated,
} from '../../../../slices/foldersSlice';
import { AnswerIcon } from '../../../../components/AnswerIcon';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';
import {
  selectAllAnswers,
  answersErrorUpdated,
  answerRemoved,
  answerUpdated,
} from '../../../../slices/answersSlice';

export const AnswerFile = ({
  name,
  newAnswerId,
  setSelectedAnswer,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const answers = useSelector(selectAllAnswers);

  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const [editableAnswer, setEditableAnswer] = useState();

  const dispatch = useDispatch();
  const answerRef = useRef();

  const clickHandler = (e) => {
    setTitleIcon(<AnswerIcon />);
    const clickedAnswer = answers.find(
      (p) => p.name === answerRef.current.textContent
    );
    dispatch(previousFoldersAdded(currentFolders));
    dispatch(currentFoldersUpdated([]));

    if (clickedAnswer) {
      setSelectedAnswer(clickedAnswer);
      setCurrentFileArray((prev) => [...prev, clickedAnswer]);
    }
  };

  const editHandler = (e) => {
    e.stopPropagation();
    const clickedAnswer = answers.find(
      (p) => p.name === answerRef.current.textContent
    );

    // Remove question's name
    if (clickedAnswer) {
      setEditableAnswer(clickedAnswer);
      dispatch(answerUpdated({ id: clickedAnswer.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    e.stopPropagation();

    const clickedAnswer = answers.find(
      (p) => p.name === answerRef.current.textContent
    );
    if (clickedAnswer) {
      dispatch(answerRemoved(clickedAnswer.id));
      dispatch(answersErrorUpdated(null));
    }
    setSelectedAnswer(null);
  };

  const addNameHandler = (f) => {
    const questionName = f.name;

    const existingQuestion = answers.find((q) => q.name === questionName);

    if (existingQuestion) {
      dispatch(
        answersErrorUpdated('FOLDER NAME EXISTS, SELECT DIFFERENT NAME')
      );
      dispatch(answerRemoved(newAnswerId));
      return;
    } else if (questionName === null) {
      dispatch(answerRemoved(newAnswerId));
      return;
    } else if (questionName === '') {
      dispatch(answersErrorUpdated(`CAN'T ADD FOLDER WITHOUT A NAME`));

      dispatch(answerRemoved(newAnswerId));
    } else if (questionName.length > 50) {
      dispatch(answersErrorUpdated(`MAX CHARACTER LIMIT IS 50`));
      dispatch(answerRemoved(newAnswerId));
    } else {
      // Rename question
      if (editableAnswer) {
        dispatch(answerUpdated({ id: editableAnswer.id, name: questionName }));
      }
    }
  };
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="question-file"
      >
        <div
          ref={answerRef}
          onClick={clickHandler}
          className="question-file__details"
        >
          <AnswerIcon />
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
      </motion.div>
    </>
  );
};
