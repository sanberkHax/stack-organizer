import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectAllFolders,
  folderAdded,
  folderUpdated,
} from '../../../../slices/foldersSlice';
import { projectUpdated } from '../../../../slices/projectsSlice';
import { writeFoldersData } from '../../../../services/firebase';
import { useEffect } from 'react';
import { useState } from 'react';

export const FoldersContainer = ({
  setSelectedFolder,
  selectedProject,
  selectedFolder,
}) => {
  const folders = useSelector(selectAllFolders);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.currentUser);
  const [nestedFolders, setNestedFolders] = useState();

  useEffect(() => {
    writeFoldersData(uid, folders);
  }, [folders, uid]);

  const projectFolders = folders.filter(
    (f) =>
      f.project === selectedProject?.id &&
      selectedProject?.folders.includes(f.id)
  );

  const nestedFolderIds = [];
  projectFolders.forEach((f) => {
    if (f.folders) {
      nestedFolderIds.push(...f.folders);
    }
  });

  const regularFolders = projectFolders.filter(
    (f) => !nestedFolderIds.includes(f.id)
  );
  // Add folder on click
  const addHandler = () => {
    // Prompt for folder name
    const folderName = prompt('Folder Name:');

    // Abort if no name is given
    if (!folderName) {
      return;
    }
    // When there is an active project, add a folder inside it
    if (selectedProject) {
      const newFolderId = uuidv4();
      dispatch(
        folderAdded({
          id: newFolderId,
          title: folderName,
          isActive: false,
          project: selectedProject.id,
          folders: [],
        })
      );
      dispatch(
        projectUpdated({
          id: selectedProject.id,
          isActive: true,
          folders: newFolderId,
        })
      );
      if (selectedFolder) {
        dispatch(
          folderUpdated({
            id: selectedFolder.id,
            isActive: false,
            folders: [newFolderId],
          })
        );
      }
    }
  };

  // Select folder on click
  const selectHandler = (e) => {
    // Get clicked folder
    const clickedFolder = folders.find((p) => p.title === e.target.textContent);
    if (e.detail === 2) {
      const test = folders.filter((f) => clickedFolder.folders?.includes(f.id));
      if (test) {
        setNestedFolders(test);
      }
    } else {
      dispatch(
        folderUpdated({
          id: clickedFolder.id,
          isActive: !clickedFolder.isActive,
        })
      );
    }
    setSelectedFolder(clickedFolder);
  };
  console.log('Regular Folders');
  console.log(regularFolders);
  const foldersContent = nestedFolders
    ? nestedFolders?.map((f) => (
        <button
          key={f.id}
          onClick={selectHandler}
          className={
            f.isActive ? 'file-container__btn--active' : 'file-container__btn'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z" />
          </svg>
          <p>{f.title}</p>
        </button>
      ))
    : regularFolders?.map((f) => (
        <button
          key={f.id}
          onClick={selectHandler}
          className={
            f.isActive ? 'file-container__btn--active' : 'file-container__btn'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z" />
          </svg>
          <p>{f.title}</p>
        </button>
      ));
  return (
    <div className="file-container">
      {selectedProject && (
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
      {foldersContent}
    </div>
  );
};
