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

export const SaveModal = ({ setModal }) => {
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const uid = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const activeProject = projects.find((p) => p.isActive);
  const activeFolder = folders.find((f) => f.isActive);

  const [selectedProject, setSelectedProject] = useState(activeProject);
  const [selectedFolder, setSelectedFolder] = useState(activeFolder);

  console.log('-----------------------------------------------');
  console.log('activeProject');
  console.log(activeProject);

  useEffect(() => {
    // Reset active project and folder on unmount
    writeFoldersData(uid, folders);
    updateProjectsData(uid, projects);

    return () => {
      if (activeProject) {
        dispatch(projectUpdated({ id: activeProject.id, isActive: false }));
      }
      if (activeFolder) {
        dispatch(folderUpdated({ id: activeFolder.id, isActive: false }));
      }
      writeFoldersData(uid, folders);
      updateProjectsData(uid, projects);
    };
  }, [dispatch, uid]);

  const saveHandler = () => {
    setModal(false);
  };

  return (
    <div className="save-modal">
      <h1 className="heading-primary">Save As</h1>
      <h2 className="heading-secondary">Project:</h2>
      <ProjectsContainer
        setSelectedProject={setSelectedProject}
        setSelectedFolder={setSelectedFolder}
        selectedProject={selectedProject}
      />
      <h2 className="heading-secondary">Folder:</h2>
      <FoldersContainer
        setSelectedFolder={setSelectedFolder}
        selectedProject={selectedProject}
        selectedFolder={selectedFolder}
        setSelectedProject={setSelectedProject}
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
