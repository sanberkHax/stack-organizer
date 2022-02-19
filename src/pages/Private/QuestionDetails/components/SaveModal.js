import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  projectReset,
  projectsErrorUpdated,
} from '../../../../slices/projectsSlice';
import {
  foldersErrorUpdated,
  foldersReset,
} from '../../../../slices/foldersSlice';
import { useEffect } from 'react';
import { SaveModalForm } from './SaveModalForm';

export const SaveModal = ({ setModal, question, answer }) => {
  const uid = useSelector((state) => state.auth.currentUser);
  const projectsError = useSelector((state) => state.projects.error);
  const foldersError = useSelector((state) => state.folders.error);

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

  const saveHandler = (f) => {
    if (question) {
      const savedData = {
        name: f.name,
        note: f.note,
        project: selectedProject,
        folder: selectedFolder,
        question: question,
      };
      console.log(savedData);
    } else if (answer) {
      const savedData = {
        name: f.name,
        note: f.note,
        project: selectedProject,
        folder: selectedFolder,
        answer: answer,
      };
      console.log(savedData);
    }
    setModal(false);
  };

  return (
    <div className="save-modal">
      <h1 className="heading-primary">Save As</h1>
      <h2 className="heading-secondary">Select Project:</h2>
      {projectsError && <p className="error">{projectsError}</p>}
      <ProjectsContainer
        setSelectedProject={setSelectedProject}
        setSelectedFolder={setSelectedFolder}
        selectedProject={selectedProject}
        selectedFolder={selectedFolder}
      />
      <h2 className="heading-secondary">Select Folder:</h2>
      {foldersError && <p className="error">{foldersError}</p>}
      <FoldersContainer
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        selectedProject={selectedProject}
      />
      <SaveModalForm onSubmit={saveHandler} />
    </div>
  );
};
