import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProjectsData,
  writeFoldersData,
} from '../../../../services/firebase';
import {
  projectUpdated,
  selectAllProjects,
} from '../../../../slices/projectsSlice';
import {
  selectAllFolders,
  folderUpdated,
} from '../../../../slices/foldersSlice';
import { useEffect } from 'react';
export const SaveModal = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    // Reset active project and folder on unmount
    return () => {
      dispatch(projectUpdated({ id: activeProject?.id, isActive: false }));
      updateProjectsData(uid, projects);
      dispatch(folderUpdated({ id: activeFolder?.id, isActive: false }));
      writeFoldersData(uid, folders);
    };
  }, []);
  const saveHandler = async () => {
    // Update database
    updateProjectsData(uid, projects);
    writeFoldersData(uid, folders);
  };
  return (
    <div className="save-modal">
      <h1 className="heading-primary">Save As</h1>
      <h2 className="heading-secondary">Project:</h2>
      <ProjectsContainer
        setActiveProject={setActiveProject}
        setActiveFolder={setActiveFolder}
      />
      <h2 className="heading-secondary">Folder:</h2>
      <FoldersContainer
        setActiveFolder={setActiveFolder}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <label htmlFor="title" className="heading-secondary">
        Title
      </label>
      <input className="save-modal__input" type="text" name="title" />
      <label htmlFor="note" className="heading-secondary">
        Note
      </label>
      <textarea className="save-modal__textarea" type="text" name="note" />
      <button className="btn" onClick={saveHandler}>
        Save
      </button>
    </div>
  );
};
