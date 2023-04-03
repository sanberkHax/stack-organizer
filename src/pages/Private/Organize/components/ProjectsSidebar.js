import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectAllProjects } from "../../../../slices/projectsSlice";
import { updateProjectsData } from "../../../../services/firebase";
import {
  currentFoldersUpdated,
  selectAllFolders,
} from "../../../../slices/foldersSlice";
import { useProjectFolders } from "../../../../hooks/useProjectFolders";
import { Project } from "./Project";
import { writeFoldersData } from "../../../../services/firebase";

export const ProjectsSidebar = ({
  setSelectedProject,
  setSelectedFolder,
  selectedFolder,
  selectedProject,
}) => {
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.currentUser);
  const projectsLoading = useSelector((state) => state.projects.loading);
  const foldersLoading = useSelector((state) => state.folders.loading);

  // Get project's folders
  const [projectFolders, setProject] = useProjectFolders();

  // Update current folders when selected project changes
  useEffect(() => {
    setProject(selectedProject);
    dispatch(currentFoldersUpdated(projectFolders));
  }, [selectedProject, setProject, dispatch, projectFolders]);

  // Update projects database
  useEffect(() => {
    if (!projectsLoading) {
      updateProjectsData(uid, projects);
    }
  }, [projectsLoading, projects, uid]);

  // Update folders database
  useEffect(() => {
    if (!foldersLoading) {
      writeFoldersData(uid, folders);
    }
  }, [foldersLoading, folders, uid]);

  return (
    <div className="projects-sidebar">
      {projects?.map((p) => (
        <Project
          id={p.id}
          key={p.id}
          setSelectedFolder={setSelectedFolder}
          setSelectedProject={setSelectedProject}
          selectedFolder={selectedFolder}
          selectedProject={selectedProject}
          className={p.isActive ? `project--active` : `project`}
          name={p.name}
        />
      ))}
    </div>
  );
};
