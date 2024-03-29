import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectAllProjects,
  projectAdded,
  projectsErrorUpdated,
} from "../../../../slices/projectsSlice";
import { updateProjectsData } from "../../../../services/firebase";
import { currentFoldersUpdated } from "../../../../slices/foldersSlice";
import { useProjectFolders } from "../../../../hooks/useProjectFolders";
import { ProjectButton } from "../../../../components/Buttons/ProjectButton";
import { AddButton } from "../../../../components/Buttons/AddButton";

export const ProjectsContainer = ({
  className,
  buttonClassName,
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

    const newProject = {
      id: newProjectId,
      isActive: false,
      folders: [],
    };

    dispatch(projectsErrorUpdated(null));
    dispatch(projectAdded(newProject));
  };

  return (
    <div className={className}>
      <AddButton ariaLabel="add-project" onClick={addHandler} />

      {projects?.map((p) => (
        <ProjectButton
          id={p.id}
          key={p.id}
          setSelectedFolder={setSelectedFolder}
          setSelectedProject={setSelectedProject}
          selectedFolder={selectedFolder}
          className={
            p.isActive ? `${buttonClassName}--active` : `${buttonClassName}`
          }
          name={p.name}
        />
      ))}
    </div>
  );
};
