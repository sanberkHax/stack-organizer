import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  projectReset,
  projectsErrorUpdated,
} from '../../../../slices/projectsSlice';
import {
  foldersErrorUpdated,
  foldersReset,
} from '../../../../slices/foldersSlice';
import { SaveModalForm } from './SaveModalForm';
import {
  questionAdded,
  selectAllQuestions,
} from '../../../../slices/questionsSlice';
import {
  writeQuestionsData,
  writeAnswersData,
} from '../../../../services/firebase';
import { selectAllAnswers, answerAdded } from '../../../../slices/answersSlice';
import { CloseButton } from '../../../../components/CloseButton';
import { ConfirmationModal } from '../../../../components/ConfirmationModal';

export const SaveModal = ({ setModal, question, answer }) => {
  const uid = useSelector((state) => state.auth.currentUser);
  const projectsError = useSelector((state) => state.projects.error);
  const foldersError = useSelector((state) => state.folders.error);
  const questions = useSelector(selectAllQuestions);
  const answers = useSelector(selectAllAnswers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState();
  const [selectedFolder, setSelectedFolder] = useState();
  const [confirmation, setConfirmation] = useState();

  // Reset folders,projects and error mesages on unmount
  useEffect(() => {
    dispatch(foldersReset());
    dispatch(projectReset());
    return () => {
      setSelectedFolder(null);
      setSelectedProject(null);
      dispatch(foldersReset());
      dispatch(projectReset());
      dispatch(foldersErrorUpdated(null));
      dispatch(projectsErrorUpdated(null));
    };
  }, [uid, dispatch]);

  useEffect(() => {
    writeQuestionsData(uid, questions);
  }, [questions, uid]);

  useEffect(() => {
    writeAnswersData(uid, answers);
  }, [answers, uid]);

  const redirectHandler = () => {
    navigate('/organize');
  };

  const modalHandler = () => {
    setModal(false);
  };

  const saveHandler = (formData) => {
    if (!selectedProject) {
      dispatch(projectsErrorUpdated('PLEASE SELECT A PROJECT'));
      return;
    }
    const { name, note } = formData;

    const questionData = {
      id: question?.question_id,
      title: question?.title,
      body: question?.body,
      link: question?.link,
      ...(question?.answers && { answers: question.answers }),
    };

    const answerData = {
      id: question?.question_id,
      body: answer?.body,
      link: question?.link,
      questionTitle: question?.title,
      questionBody: question?.body,
      ...(answer?.comments && { comments: answer?.comments }),
    };
    if (question && !answer) {
      const questionId = uuidv4();
      dispatch(
        questionAdded({
          id: questionId,
          name: name,
          note: note,
          data: questionData,
          ...(selectedFolder
            ? { folder: selectedFolder.id }
            : { project: selectedProject.id }),
        })
      );
    } else if (question && answer) {
      const answerId = uuidv4();
      dispatch(
        answerAdded({
          id: answerId,
          name: name,
          note: note,
          data: answerData,
          ...(selectedFolder
            ? { folder: selectedFolder.id }
            : { project: selectedProject.id }),
        })
      );
    }
    setConfirmation(true);
  };

  return (
    <>
      {confirmation ? (
        <ConfirmationModal onConfirm={redirectHandler} onCancel={modalHandler}>
          <h1 className="heading-primary">FILE SAVED</h1>
          <h2 className="heading-secondary">Navigate to Organize page now?</h2>
        </ConfirmationModal>
      ) : (
        <div className="save-modal">
          <CloseButton
            className="save-modal__close-btn"
            onClick={modalHandler}
          />
          <h1 className="heading-primary">Save As</h1>
          <h2 className="heading-secondary">Select Project:</h2>
          {projectsError && <p className="error">{projectsError}</p>}
          <ProjectsContainer
            className="file-container"
            buttonClassName="file-container__btn"
            setSelectedProject={setSelectedProject}
            setSelectedFolder={setSelectedFolder}
            selectedProject={selectedProject}
            selectedFolder={selectedFolder}
          />
          <h2 className="heading-secondary">Select Folder:</h2>
          {foldersError && <p className="error">{foldersError}</p>}
          <div className="save-modal__info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.367-1.208.164-1.661.532-.453 1.32-.442 1.761.022.439.466.367 1.209-.164 1.661z" />
            </svg>
            <p>(You can double click on folders to go inside!)</p>
          </div>
          <FoldersContainer
            className="file-container"
            buttonClassName="file-container__btn"
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            selectedProject={selectedProject}
          />
          <SaveModalForm onSubmit={saveHandler} />
        </div>
      )}
    </>
  );
};
