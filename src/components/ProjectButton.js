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
  title,
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
      (p) => p.title === e.target.textContent
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

  // Add a title to empty project
  const addTitleHandler = (t) => {
    const projectName = t.title;

    const existingProject = projects.find((f) => f.title === projectName);
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
      dispatch(projectUpdated({ id: newProjectId, title: projectName }));
    }
  };
  return (
    <button onClick={clickHandler} className={className}>
      <ProjectIcon />
      {!title ? (
        <Formik initialValues={{ title: '' }} onSubmit={addTitleHandler}>
          {({ values }) => {
            return (
              <Form className="file-container__btn__form">
                <Field
                  data-testid="project-btn-input"
                  id="title"
                  name="title"
                  autoFocus={true}
                  className="file-container__btn__input"
                  onBlur={() => {
                    addTitleHandler(values);
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      ) : (
        <p>{title}</p>
      )}
    </button>
  );
};
