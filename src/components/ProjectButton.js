import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import {
  selectAllProjects,
  projectUpdated,
  projectRemoved,
  projectsErrorUpdated,
} from '../slices/projectsSlice';
import { folderUpdated, foldersReset } from '../slices/foldersSlice';
import { ReactComponent as ProjectIcon } from '../assets/project-button.svg';

export const ProjectButton = ({
  newProjectId,
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
    const clickedProject = projects.find(
      (p) => p.name === e.target.textContent
    );
    dispatch(
      projectUpdated({
        id: clickedProject.id,
        isActive: !clickedProject.isActive,
      })
    );
    if (clickedProject.isActive) {
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

    const existingProject = projects.find((f) => f.name === projectName);
    if (existingProject) {
      dispatch(
        projectsErrorUpdated('PROJECT NAME EXISTS, SELECT DIFFERENT NAME')
      );
      dispatch(projectRemoved(newProjectId));
      return;
    } else if (projectName === null) {
      dispatch(projectRemoved(newProjectId));
      return;
    } else if (projectName === '') {
      dispatch(projectsErrorUpdated(`CAN'T ADD PROJECT WITHOUT A NAME`));
      dispatch(projectRemoved(newProjectId));
    } else {
      dispatch(projectUpdated({ id: newProjectId, name: projectName }));
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
                  data-testid="project-btn-input"
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
