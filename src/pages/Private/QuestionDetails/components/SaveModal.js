import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState, useEffect } from 'react';
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

export const SaveModal = ({ setModal, question, answer }) => {
  const uid = useSelector((state) => state.auth.currentUser);
  const projectsError = useSelector((state) => state.projects.error);
  const foldersError = useSelector((state) => state.folders.error);
  const questions = useSelector(selectAllQuestions);
  const answers = useSelector(selectAllAnswers);

  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState();
  const [selectedFolder, setSelectedFolder] = useState();

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

  const modalHandler = () => {
    setModal(false);
  };
  const saveHandler = (formData) => {
    const { name, note } = formData;

    const questionData = {
      id: question?.question_id,
      title: question?.title,
      body: question?.body,
      ...(question?.answers && { answers: question.answers }),
      link: question?.link,
    };

    const answerData = {
      id: question?.question_id,
      body: answer?.body,
      link: question?.link,
      questionTitle: question?.title,
      questionBody: question?.body,
      comments: answer?.comments,
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
    setModal(false);
  };

  return (
    <div className="save-modal">
      <CloseButton className="save-modal__close-btn" onClick={modalHandler} />
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
      <FoldersContainer
        className="file-container"
        buttonClassName="file-container__btn"
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        selectedProject={selectedProject}
      />
      <SaveModalForm onSubmit={saveHandler} />
    </div>
  );
};
