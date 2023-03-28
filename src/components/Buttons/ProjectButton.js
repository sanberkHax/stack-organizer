import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import {
  selectAllProjects,
  projectUpdated,
  projectRemoved,
} from '../../slices/projectsSlice';
import { folderUpdated, foldersReset } from '../../slices/foldersSlice';
import { Icon } from '../Icon';
import { toast } from 'react-toastify';

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
      toast.error('Name already exists');
      dispatch(projectRemoved(projectId));
      return;
    } else if (projectName === null) {
      dispatch(projectRemoved(projectId));
      return;
    } else if (projectName === '') {
      toast.error('Name is required');
      dispatch(projectRemoved(projectId));
    } else {
      dispatch(projectUpdated({ id: projectId, name: projectName }));
    }
  };
  return (
    <button onClick={clickHandler} className={className}>
      <Icon name="project" />
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
