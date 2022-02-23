import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { FolderIcon } from '../../../components/FolderIcon';
import { ProjectIcon } from '../../../components/ProjectIcon';

import {
  folderAdded,
  currentFoldersUpdated,
  previousFoldersRemoved,
  foldersErrorUpdated,
} from '../../../slices/foldersSlice';
import {
  selectAllProjects,
  projectsErrorUpdated,
  projectAdded,
} from '../../../slices/projectsSlice';
import { FileBrowser } from './components/FileBrowser';
import { BackButton } from '../../../components/BackButton';
import { NewFolderButton } from './components/NewFolderButton';
import { ProjectsSidebar } from './components/ProjectsSidebar';
import { NewProjectButton } from './components/NewProjectButton';

export const Organize = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [selectedFolder, setSelectedFolder] = useState();
  const [newFolderId, setNewFolderId] = useState();
  const [newProjectId, setNewProjectId] = useState();
  const [currentFileArray, setCurrentFileArray] = useState([]);

  const projects = useSelector(selectAllProjects);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const parentFolder = useSelector((state) => state.folders.parentFolder);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.projects.error);

  // When file browser at the base level, set selected folder to null
  useEffect(() => {
    if (Object.keys(parentFolder).length === 0) {
      setSelectedFolder(null);
    }
  }, [parentFolder]);

  useEffect(() => {
    if (selectedProject) {
      setCurrentFileArray([selectedProject]);
    }
  }, [selectedProject]);

  // Go one level back inside the nested folder
  const backHandler = () => {
    const lastItem = previousFolders[previousFolders.length - 1];

    dispatch(currentFoldersUpdated(lastItem));
    dispatch(previousFoldersRemoved());
    setCurrentFileArray((prev) => [...prev.slice(0, -1)]);
  };

  // Add empty folder to active project
  const addFolderHandler = () => {
    const activeProject = projects.find((p) => p.isActive);
    const newFolderId = uuidv4();
    dispatch(foldersErrorUpdated(null));
    dispatch(
      folderAdded({
        id: newFolderId,
        isActive: false,
        project: activeProject.id,
        children: [],
        ...(selectedFolder && { parent: selectedFolder.id }),
      })
    );
    setNewFolderId(newFolderId);
  };

  // Add empty project
  const addProjectHandler = () => {
    setSelectedProject(null);
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

  const browserPlaceholder =
    projects.length > 0 ? (
      <h1 className="heading-primary organize__heading">
        Select a Project to organize
      </h1>
    ) : (
      <h1 className="heading-primary organize__heading">
        Create a New Project and start organizing!
      </h1>
    );
  return (
    <main className="organize">
      <aside className="organize__projects">
        <h1 className="heading-primary">Projects</h1>
        <NewProjectButton ariaLabel="add-project" onClick={addProjectHandler} />
        {error && <p className="organize__error">{error}</p>}
        <ProjectsSidebar
          setSelectedProject={setSelectedProject}
          setSelectedFolder={setSelectedFolder}
          selectedFolder={selectedFolder}
          newProjectId={newProjectId}
          selectedProject={selectedProject}
        />
      </aside>
      {selectedProject ? (
        <div className="organize__file">
          <div className="file__details">
            {previousFolders?.length > 0 && (
              <BackButton
                ariaLabel="back-button"
                className="file__back-btn"
                onClick={backHandler}
              />
            )}
            <div className="file__title">
              <h1 className="heading-primary">
                {currentFileArray[currentFileArray.length - 1]?.name}
              </h1>
              {!selectedFolder ? <ProjectIcon /> : <FolderIcon />}
            </div>
          </div>
          <div className="file__path">
            {currentFileArray.map((f) => (
              <>
                <p>{f.name}</p>
                <p>/</p>
              </>
            ))}
          </div>
          <NewFolderButton ariaLabel="add-folder" onClick={addFolderHandler} />
          <FileBrowser
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            selectedProject={selectedProject}
            newFolderId={newFolderId}
            setCurrentFileArray={setCurrentFileArray}
          />
        </div>
      ) : (
        browserPlaceholder
      )}
    </main>
  );
};
