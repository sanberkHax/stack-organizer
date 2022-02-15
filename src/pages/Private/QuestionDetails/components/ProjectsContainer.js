import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  selectAllProjects,
  projectAdded,
  projectsErrorUpdated,
} from '../../../../slices/projectsSlice';
import { updateProjectsData } from '../../../../services/firebase';
import { currentFoldersUpdated } from '../../../../slices/foldersSlice';
import { useProjectFolders } from '../../../../hooks/useProjectFolders';
import { ProjectButton } from '../../../../components/ProjectButton';

export const ProjectsContainer = ({
  setSelectedProject,
  setSelectedFolder,
  selectedFolder,
  selectedProject,
}) => {
  const projects = useSelector(selectAllProjects);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.projects.loading);

  // Get project's folders
  const [projectFolders, setProject] = useProjectFolders();

  const [newProjectId, setNewProjectId] = useState();

  // Update current folders when selected project changes
  useEffect(() => {
    setProject(selectedProject);
    dispatch(currentFoldersUpdated(projectFolders));
  }, [selectedProject, setProject, dispatch, projectFolders]);

  // Update projects database
  useEffect(() => {
    if (!loading) {
      updateProjectsData(uid, projects);
    }
  }, [loading, projects, uid]);

  // Add empty project
  const addHandler = () => {
    const newProjectId = uuidv4();

    setNewProjectId(newProjectId);

    const newProject = {
      id: newProjectId,
      isActive: false,
      folders: [],
    };

    dispatch(projectsErrorUpdated(null));
    dispatch(projectAdded(newProject));
  };

  return (
    <div className="file-container">
      <button
        aria-label="add"
        className="file-container__btn"
        onClick={addHandler}
      >
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
        <ProjectButton
          key={p.id}
          newProjectId={newProjectId}
          setSelectedFolder={setSelectedFolder}
          setSelectedProject={setSelectedProject}
          selectedFolder={selectedFolder}
          className={
            p.isActive ? 'file-container__btn--active' : 'file-container__btn'
          }
          name={p.name}
        />
      ))}
    </div>
  );
};
