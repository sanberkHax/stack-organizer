import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import {
  projectReset,
  projectsErrorUpdated,
} from '../../../../slices/projectsSlice';
import {
  foldersErrorUpdated,
  foldersReset,
} from '../../../../slices/foldersSlice';
import { useEffect } from 'react';

export const SaveModal = ({ setModal, question }) => {
  const uid = useSelector((state) => state.auth.currentUser);
  const projectsError = useSelector((state) => state.projects.error);
  const foldersError = useSelector((state) => state.folders.error);

  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState();
  const [selectedFolder, setSelectedFolder] = useState();

  // Reset folders,projects and error mesages on unmount
  useEffect(() => {
    return () => {
      dispatch(foldersReset());
      dispatch(projectReset());
      dispatch(foldersErrorUpdated(null));
      dispatch(projectsErrorUpdated(null));
    };
  }, [uid, dispatch]);

  const saveHandler = (f) => {
    const savedData = {
      name: f.name,
      note: f.note,
      project: selectedProject,
      folder: selectedFolder,
      question: question,
    };
    console.log(savedData);
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
      <Formik initialValues={{ name: '', note: '' }} onSubmit={saveHandler}>
        <Form className="save-modal__form">
          <label htmlFor="name" className="heading-secondary">
            Name:
          </label>
          <Field
            id="name"
            className="save-modal__input"
            type="text"
            name="name"
          />
          <label htmlFor="note" className="heading-secondary">
            Note:
          </label>
          <Field
            id="note"
            className="save-modal__textarea"
            type="text"
            name="note"
            as="textarea"
          />
          <button type="submit" className="btn">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
};
