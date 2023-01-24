import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  selectAllProjects,
  projectUpdated,
  projectRemoved,
  projectsErrorUpdated,
  projectReset,
} from '../../../../slices/projectsSlice';
import {
  folderUpdated,
  foldersReset,
  currentFoldersUpdated,
  selectAllFolders,
  foldersRemoved,
  foldersErrorUpdated,
} from '../../../../slices/foldersSlice';
import { ConfirmationModal } from '../../../../components/ConfirmationModal';
import { Backdrop } from '../../../../components/Backdrop';
import { DeleteButton } from '../../../../components/Buttons/DeleteButton';
import { EditButton } from '../../../../components/Buttons/EditButton';
import { questionsErrorUpdated } from '../../../../slices/questionsSlice';
import { answersErrorUpdated } from '../../../../slices/answersSlice';
import { Icon } from '../../../../components/Icon';

export const Project = ({
  name,
  id,
  setSelectedProject,
  setSelectedFolder,
  selectedFolder,
  className,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);

  const [editableProject, setEditableProject] = useState();
  const [confirmationModal, setConfirmationModal] = useState();

  // Reset active project
  useEffect(() => {
    dispatch(projectReset());
    return () => {
      dispatch(projectReset());
    };
  }, [dispatch]);

  //  Toggle project's active status on click
  const clickHandler = (e) => {
    const clickedProject = projects.find((p) => p.id === id);
    if (clickedProject.name) {
      dispatch(
        projectUpdated({
          id: clickedProject?.id,
          isActive: !clickedProject?.isActive,
        })
      );
      if (clickedProject?.isActive) {
        setSelectedProject(null);
      } else {
        dispatch(folderUpdated({ id: selectedFolder?.id, isActive: false }));
        setSelectedFolder(null);
        setSelectedProject(clickedProject);
      }

      dispatch(foldersReset());
    }
  };
  const editHandler = (e) => {
    dispatch(questionsErrorUpdated(null));
    dispatch(answersErrorUpdated(null));
    dispatch(foldersErrorUpdated(null));
    e.stopPropagation();
    const clickedProject = projects.find((p) => p.id === id);

    if (clickedProject) {
      setEditableProject(clickedProject);
      dispatch(projectUpdated({ id: clickedProject.id, name: null }));
    }
  };

  const modalToggleHandler = (e) => {
    e.stopPropagation();
    setConfirmationModal((prev) => !prev);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    const clickedProject = projects.find((p) => p.id === id);
    const projectFolders = folders.filter(
      (f) => f.project === clickedProject.id
    );

    // Ask to confirm deletion process
    if (clickedProject) {
      if (projectFolders.length > 0) {
        dispatch(foldersRemoved(projectFolders));
      }
      dispatch(projectRemoved(clickedProject.id));
      dispatch(currentFoldersUpdated([]));
      setSelectedProject(null);
    }
  };

  const addNameHandler = (p) => {
    const projectName = p.name;
    const clickedProject = projects.find((p) => p.id === id);
    const projectId = clickedProject.id;

    // Check if a project with the same name exists
    const existingProject = projects.find((f) => f.name === projectName);

    if (existingProject) {
      if (editableProject) {
        dispatch(projectUpdated({ id: projectId, name: editableProject.name }));
      } else {
        dispatch(projectRemoved(projectId));
      }
      dispatch(
        projectsErrorUpdated('PROJECT NAME EXISTS, SELECT DIFFERENT NAME')
      );
    } else if (projectName === null) {
      if (editableProject) {
        dispatch(projectUpdated({ id: projectId, name: editableProject.name }));
      } else {
        dispatch(projectRemoved(projectId));
      }
      dispatch(projectsErrorUpdated(`CAN'T ADD PROJECT WITHOUT A NAME`));
    } else if (projectName === '') {
      if (editableProject) {
        dispatch(projectUpdated({ id: projectId, name: editableProject.name }));
        dispatch(
          projectsErrorUpdated(
            'PLEASE ENTER A VALID NAME TO RENAME THE PROJECT'
          )
        );
      } else {
        dispatch(projectsErrorUpdated(`CAN'T ADD PROJECT WITHOUT A NAME`));
        dispatch(projectRemoved(projectId));
      }
    } else {
      if (editableProject) {
        dispatch(projectUpdated({ id: projectId, name: projectName }));
        setSelectedProject(null);
      } else {
        dispatch(projectUpdated({ id: projectId, name: projectName }));
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
            <h1 className="heading-primary">DELETE PROJECT?</h1>
            <h2 className="heading-secondary">
              Please confirm to delete selected project
            </h2>
          </ConfirmationModal>
          <Backdrop onClick={modalToggleHandler} />
        </>
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={className}
      >
        <div onClick={clickHandler} className="project__details">
          <Icon name="project" />
          {!name ? (
            <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
              {({ values }) => {
                return (
                  <Form className="project__form">
                    <Field
                      aria-label="Project Name Input"
                      id="name"
                      name="name"
                      autoFocus={true}
                      className="project__input"
                      onBlur={() => {
                        addNameHandler(values);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>{name}</p>
          )}
          <div className="project__btn-container">
            <EditButton
              ariaLabel="Rename Project"
              onClick={editHandler}
              className="project__edit-btn"
            />
            <DeleteButton
              ariaLabel="Delete Project"
              onClick={modalToggleHandler}
              className="project__delete-btn"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
