import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  previousFoldersAdded,
  currentFoldersUpdated,
  foldersErrorUpdated,
} from '../../../../slices/foldersSlice';
import { Icon } from '../../../../components/Icon';
import { ConfirmationModal } from '../../../../components/ConfirmationModal';
import { Backdrop } from '../../../../components/Backdrop';
import { EditButton } from '../../../../components/Buttons/EditButton';
import { DeleteButton } from '../../../../components/Buttons/DeleteButton';
import {
  questionRemoved,
  questionsErrorUpdated,
  questionUpdated,
  selectAllQuestions,
} from '../../../../slices/questionsSlice';
import { answersErrorUpdated } from '../../../../slices/answersSlice';
import { projectsErrorUpdated } from '../../../../slices/projectsSlice';

export const QuestionFile = ({
  name,
  id,
  setSelectedQuestion,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const questions = useSelector(selectAllQuestions);
  const currentFolders = useSelector((state) => state.folders.currentFolders);

  const [editableQuestion, setEditableQuestion] = useState();
  const [confirmationModal, setConfirmationModal] = useState();

  const dispatch = useDispatch();
  const questionRef = useRef();

  const clickHandler = (e) => {
    dispatch(foldersErrorUpdated(null));
    dispatch(answersErrorUpdated(null));
    dispatch(projectsErrorUpdated(null));
    setTitleIcon(<Icon name="question" />);

    const clickedQuestion = questions.find((q) => q.id === id);

    dispatch(previousFoldersAdded(currentFolders));
    dispatch(currentFoldersUpdated([]));

    if (clickedQuestion) {
      setSelectedQuestion(clickedQuestion);
      setCurrentFileArray((prev) => [...prev, clickedQuestion]);
    }
  };

  const modalToggleHandler = (e) => {
    e.stopPropagation();
    setConfirmationModal((prev) => !prev);
  };

  const editHandler = (e) => {
    dispatch(foldersErrorUpdated(null));
    dispatch(answersErrorUpdated(null));
    dispatch(projectsErrorUpdated(null));
    e.stopPropagation();

    const clickedQuestion = questions.find((q) => q.id === id);

    // Remove question's name
    if (clickedQuestion) {
      setEditableQuestion(clickedQuestion);
      dispatch(questionUpdated({ id: clickedQuestion.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    dispatch(foldersErrorUpdated(null));
    dispatch(answersErrorUpdated(null));
    dispatch(projectsErrorUpdated(null));
    e.stopPropagation();

    const clickedQuestion = questions.find((q) => q.id === id);

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
        questionUpdated({
          id: editableQuestion.id,
          name: editableQuestion.name,
        })
      );
      dispatch(
        questionsErrorUpdated('QUESTION NAME EXISTS, SELECT DIFFERENT NAME')
      );
    } else if (questionName === null) {
      dispatch(
        questionUpdated({
          id: editableQuestion.id,
          name: editableQuestion.name,
        })
      );
      questionsErrorUpdated(`PLEASE ENTER A VALID NAME TO RENAME QUESTION`);
    } else if (questionName === '') {
      dispatch(
        questionUpdated({
          id: editableQuestion.id,
          name: editableQuestion.name,
        })
      );
      dispatch(
        questionsErrorUpdated(`PLEASE ENTER A VALID NAME TO RENAME QUESTION`)
      );
    } else if (questionName.length > 50) {
      dispatch(
        questionUpdated({
          id: editableQuestion.id,
          name: editableQuestion.name,
        })
      );
      dispatch(questionsErrorUpdated(`MAX CHARACTER LIMIT IS 50`));
    } else {
      // Rename question
      if (editableQuestion) {
        dispatch(
          questionUpdated({
            id: editableQuestion.id,
            name: questionName,
          })
        );
      }
    }
  };
  return (
    <>
      {confirmationModal && (
        <>
          <ConfirmationModal
            onConfirm={deleteHandler}
            onCancel={modalToggleHandler}
          >
            <h1 className="heading-primary">DELETE QUESTION?</h1>
            <h2 className="heading-secondary">
              Please confirm to delete selected question
            </h2>
          </ConfirmationModal>
          <Backdrop onClick={modalToggleHandler} />
        </>
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="question-file"
      >
        <div
          ref={questionRef}
          onClick={clickHandler}
          className="question-file__details"
        >
          <Icon name="question" />
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
              onClick={modalToggleHandler}
              className="question-file__delete-btn"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
