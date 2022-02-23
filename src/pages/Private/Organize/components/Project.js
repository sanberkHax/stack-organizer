import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useRef, useEffect, useState } from 'react';

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
} from '../../../../slices/foldersSlice';
import { ProjectIcon } from '../../../../components/ProjectIcon';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

export const Project = ({
  newProjectId,
  name,
  setSelectedProject,
  setSelectedFolder,
  selectedFolder,
  className,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const projectRef = useRef();

  const [editableProject, setEditableProject] = useState();
  const [mouseOver, setMouseOver] = useState(false);

  const mouseEnterHandler = () => {
    setMouseOver(true);
  };
  const mouseLeaveHandler = () => {
    setMouseOver(false);
  };
  // Reset active project
  useEffect(() => {
    dispatch(projectReset());
    return () => {
      dispatch(projectReset());
    };
  }, [dispatch]);

  //  Toggle project's active status on click
  const clickHandler = (e) => {
    const clickedProject = projects.find(
      (p) => p.name === e.target.textContent
    );
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
  };
  const editHandler = () => {
    const clickedProject = projects.find(
      (p) => p.name === projectRef.current.textContent
    );
    if (clickedProject) {
      setEditableProject(clickedProject);
      dispatch(projectUpdated({ id: clickedProject.id, name: null }));
    }
  };

  const deleteHandler = () => {
    const clickedProject = projects.find(
      (p) => p.name === projectRef.current.textContent
    );
    const projectFolders = folders.filter(
      (f) => f.project === clickedProject.id
    );
    if (clickedProject) {
      if (projectFolders.length > 0) {
        dispatch(foldersRemoved(projectFolders));
      }
      dispatch(projectRemoved(clickedProject.id));
      dispatch(currentFoldersUpdated([]));
      setSelectedProject(null);
    }
  };

  // Add a name to empty project
  const addNameHandler = (p) => {
    const projectName = p.name;

    const existingProject = projects.find((f) => f.name === projectName);

    if (existingProject) {
      dispatch(
        projectsErrorUpdated('PROJECT NAME EXISTS, SELECT DIFFERENT NAME')
      );
      if (!editableProject) {
        dispatch(projectRemoved(newProjectId));
      }
      return;
    } else if (projectName === null) {
      dispatch(projectRemoved(newProjectId));
      return;
    } else if (projectName === '') {
      dispatch(projectsErrorUpdated(`CAN'T ADD PROJECT WITHOUT A NAME`));
      if (!editableProject) {
        dispatch(projectRemoved(newProjectId));
      }
    } else {
      if (editableProject) {
        dispatch(projectUpdated({ id: editableProject.id, name: projectName }));
        setSelectedProject(null);
      } else {
        dispatch(projectUpdated({ id: newProjectId, name: projectName }));
      }
    }
  };
  return (
    <>
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className={className}
      >
        <div
          onClick={clickHandler}
          ref={projectRef}
          className="project__details"
        >
          <ProjectIcon />
          {!name ? (
            <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
              {({ values }) => {
                return (
                  <Form className="project__form">
                    <Field
                      data-testid="project-btn-input"
                      id="name"
                      name="name"
                      autoFocus={true}
                      className="project__input"
                      onBlur={() => {
                        addNameHandler(values);
                      }}
                    />
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>{name}</p>
          )}
        </div>

        {mouseOver && (
          <div className="project__btn-container">
            <EditButton onClick={editHandler} className="project__edit-btn" />
            <DeleteButton
              onClick={deleteHandler}
              className="project__delete-btn"
            />
          </div>
        )}
      </div>
    </>
  );
};
