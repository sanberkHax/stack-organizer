import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProjects,
  projectAdded,
  projectUpdated,
} from '../../../../slices/projectsSlice';
import { folderUpdated } from '../../../../slices/foldersSlice';
export const ProjectsContainer = ({
  setActiveProject,
  setActiveFolder,
  activeFolder,
}) => {
  const projects = useSelector(selectAllProjects);
  const dispatch = useDispatch();
  // Add new project on click
  const addHandler = () => {
    // Prompt user for project name
    const projectName = prompt('Project Name:');

    // Abort if no name is given
    if (!projectName) {
      return;
    }
    dispatch(
      projectAdded({
        id: uuidv4(),
        title: projectName,
        isActive: false,
      })
    );
  };

  //  Toggle project on click
  const clickHandler = (e) => {
    const selectedProject = projects.find(
      (p) => p.title === e.target.textContent
    );
    dispatch(
      projectUpdated({
        id: selectedProject.id,
        isActive: !selectedProject.isActive,
      })
    );
    if (selectedProject.isActive) {
      setActiveProject(null);
    } else {
      dispatch(folderUpdated({ id: activeFolder?.id, isActive: false }));
      setActiveFolder(null);
      setActiveProject(selectedProject);
    }
  };
  return (
    <div className="file-container">
      <button className="file-container__btn" onClick={addHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </button>
      {projects?.map((p) => (
        <button
          key={p.id}
          onClick={clickHandler}
          className={
            p.isActive ? 'file-container__btn--active' : 'file-container__btn'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
          </svg>
          <p>{p.title}</p>
        </button>
      ))}
    </div>
  );
};
