import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import {
  selectAllProjects,
  projectUpdated,
  projectRemoved,
  projectsErrorUpdated,
} from '../slices/projectsSlice';
import { folderUpdated, foldersReset } from '../slices/foldersSlice';
import { ProjectIcon } from './ProjectIcon';

export const ProjectButton = ({
  id,
  name,
  setSelectedProject,
  setSelectedFolder,
  selectedFolder,
  className,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);

  //  Toggle project's active status on click
  const clickHandler = (e) => {
    const clickedProject = projects.find((p) => p.id === id);

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

  // Add a name to empty project
  const addNameHandler = (p) => {
    const projectName = p.name;
    const clickedProject = projects.find((p) => p.id === id);
    const projectId = clickedProject.id;
    const existingProject = projects.find((f) => f.name === projectName);

    if (existingProject) {
      dispatch(
        projectsErrorUpdated('PROJECT NAME EXISTS, SELECT DIFFERENT NAME')
      );
      dispatch(projectRemoved(projectId));
      return;
    } else if (projectName === null) {
      dispatch(projectRemoved(projectId));
      return;
    } else if (projectName === '') {
      dispatch(projectsErrorUpdated(`CAN'T ADD PROJECT WITHOUT A NAME`));
      dispatch(projectRemoved(projectId));
    } else {
      dispatch(projectUpdated({ id: projectId, name: projectName }));
    }
  };
  return (
    <button onClick={clickHandler} className={className}>
      <ProjectIcon />
      {!name ? (
        <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
          {({ values }) => {
            return (
              <Form className="file-container__btn__form">
                <Field
                  aria-label="project-name-input"
                  id="name"
                  name="name"
                  autoFocus={true}
                  className="file-container__btn__input"
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
    </button>
  );
};
