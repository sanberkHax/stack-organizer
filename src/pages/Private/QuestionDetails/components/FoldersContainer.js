import { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const FoldersContainer = ({
  setActiveFolder,
  activeProject,
  setActiveProject,
}) => {
  const [folders, setFolders] = useState([]);

  // Update folders whenever the active project changes
  useEffect(() => {
    setFolders(activeProject?.folders);
  }, [activeProject]);

  // Add folder on click
  const addHandler = () => {
    // Prompt for folder name
    const folderName = prompt('Folder Name:');

    // Abort if no name is given
    if (!folderName) {
      return;
    }

    // When there is an active project, add a folder inside it
    if (activeProject) {
      // Copy active projects folders to new array
      const newProjectFolder = activeProject.folders.slice();

      // Add new folder to new array
      newProjectFolder.push({
        id: uuidv4(),
        name: folderName,
        isActive: false,
        className: 'file-container__btn',
        folders: [],
      });

      // Update active projects folders with new array
      setActiveProject({ ...activeProject, folders: newProjectFolder });
    }

    // Create a new copy of folders array
    const newFolders = folders?.slice();

    // Add new folder to new array
    newFolders?.push({
      id: uuidv4(),
      name: folderName,
      isActive: false,
      className: 'file-container__btn',
      folders: [],
    });

    // Update folders with new array
    setFolders(newFolders);
  };

  // Select folder on click
  const selectHandler = (e) => {
    // Get clicked folder
    const current = folders.find((f) => f.name === e.target.textContent);

    // When it's a double click and clicked folder has nested folders
    if (e.detail === 2 && current?.folders.length > 0) {
      // Go inside the clicked folder
      folders.forEach((f) => {
        if (f.id === current.id) {
          setFolders(f.folders);
        }
      });
    }
    // When it's a single click, select the folder if it's not selected
    else {
      if (!current.isActive) {
        // Check if there is another folder that is already selected
        const selectedFolder = folders.find((f) => f.isActive);

        // If there is already a selected project, unselect it
        if (selectedFolder) {
          const copy = folders.slice();
          copy.forEach((f) => {
            if (f.isActive) {
              f.isActive = false;
              f.className = 'file-container__btn';
            }
          });
          setFolders(copy);
        }

        // Update selected folder's properties to active
        setFolders(
          folders.map((folder) => {
            return folder.id === current.id
              ? {
                  ...folder,
                  isActive: true,
                  className: 'file-container__btn--active',
                }
              : folder;
          })
        );

        setActiveFolder({
          id: current.id,
          name: current.name,
          isActive: true,
          className: 'file-container__btn--active',
          folders: current.folders,
        });
      } else {
        // Update selected folder's properties to inactive
        setFolders(
          folders.map((folder) => {
            return folder.id === current.id
              ? { ...folder, isActive: false, className: 'file-container__btn' }
              : folder;
          })
        );
        setActiveFolder(null);
      }
    }
  };

  return (
    <div className="file-container">
      {activeProject && (
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
      )}

      {folders?.map((f) => (
        <button key={f.id} onClick={selectHandler} className={f.className}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z" />
          </svg>
          <p>{f.name}</p>
        </button>
      ))}
    </div>
  );
};
