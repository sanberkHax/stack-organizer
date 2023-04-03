import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import {
  previousFoldersAdded,
  currentFoldersUpdated,
} from "../../../../slices/foldersSlice";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import { Backdrop } from "../../../../components/Backdrop";
import { Icon } from "../../../../components/Icon";
import { EditButton } from "../../../../components/Buttons/EditButton";
import { DeleteButton } from "../../../../components/Buttons/DeleteButton";
import {
  selectAllAnswers,
  answerRemoved,
  answerUpdated,
} from "../../../../slices/answersSlice";
import { toast } from "react-toastify";

export const AnswerFile = ({
  name,
  id,
  setSelectedAnswer,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const answers = useSelector(selectAllAnswers);
  const currentFolders = useSelector((state) => state.folders.currentFolders);

  const [editableAnswer, setEditableAnswer] = useState();
  const [confirmationModal, setConfirmationModal] = useState();

  const dispatch = useDispatch();
  const answerRef = useRef();

  const clickHandler = (e) => {
    setTitleIcon(<Icon name="answer" />);
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
    const clickedAnswer = answers.find((a) => a.id === id);

    // Remove question's name
    if (clickedAnswer) {
      setEditableAnswer(clickedAnswer);
      dispatch(answerUpdated({ id: clickedAnswer.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    e.stopPropagation();

    const clickedAnswer = answers.find((a) => a.id === id);
    if (clickedAnswer) {
      dispatch(answerRemoved(clickedAnswer.id));
    }
    setSelectedAnswer(null);
  };
  const modalToggleHandler = (e) => {
    e.stopPropagation();
    setConfirmationModal((prev) => !prev);
  };
  const addNameHandler = (f) => {
    const answerName = f.name;

    const existingAnswer = answers.find((q) => q.name === answerName);

    if (existingAnswer) {
      dispatch(
        answerUpdated({ id: editableAnswer.id, name: editableAnswer.name })
      );
      toast.error(`Name already exists`);
    } else if (answerName === null) {
      dispatch(
        answerUpdated({ id: editableAnswer.id, name: editableAnswer.name })
      );
    } else if (answerName === "") {
      dispatch(
        answerUpdated({ id: editableAnswer.id, name: editableAnswer.name })
      );
      toast.error(`Name is invalid`);
    } else if (answerName.length > 50) {
      dispatch(
        answerUpdated({ id: editableAnswer.id, name: editableAnswer.name })
      );
      toast.error(`Name must be lower than 50 characters`);
    } else {
      // Rename answer
      if (editableAnswer) {
        dispatch(answerUpdated({ id: editableAnswer.id, name: answerName }));
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
            <h1 className="heading-primary">DELETE ANSWER?</h1>
            <h2 className="heading-secondary">
              Please confirm to delete selected answer
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
          ref={answerRef}
          onClick={clickHandler}
          className="question-file__details"
        >
          <Icon name="answer" />
          {!name ? (
            <Formik initialValues={{ name: "" }} onSubmit={addNameHandler}>
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
