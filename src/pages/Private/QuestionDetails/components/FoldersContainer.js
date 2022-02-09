import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

import {
  selectAllFolders,
  folderAdded,
  folderUpdated,
  currentFoldersUpdated,
  previousFoldersUpdated,
  previousFoldersAdded,
  previousFoldersRemoved,
  parentFolderSet,
} from '../../../../slices/foldersSlice';
import {
  projectUpdated,
  selectAllProjects,
} from '../../../../slices/projectsSlice';
import { writeFoldersData } from '../../../../services/firebase';
import { FolderButton } from '../../../../components/FolderButton';
import { BackButton } from '../../../../components/BackButton';

export const FoldersContainer = ({ setSelectedFolder, selectedProject }) => {
  const folders = useSelector(selectAllFolders);
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const parentFolder = useSelector((state) => state.folders.parentFolder);

  useEffect(() => {
    writeFoldersData(uid, folders);
  }, [folders, uid]);

  useEffect(() => {
    if (previousFolders.length === 0) {
      dispatch(parentFolderSet({}));
    }
  }, [dispatch, previousFolders]);

  const backHandler = () => {
    const lastItem = previousFolders[previousFolders.length - 1];
    dispatch(currentFoldersUpdated(lastItem));
    dispatch(previousFoldersRemoved());
  };

  // Add folder on click1
  const addHandler = () => {
    const activeProject = projects.find((p) => p.isActive);
    // Prompt for folder name
    const folderName = prompt('Folder Name:');

    const existingFolder = currentFolders.find((f) => f.title === folderName);

    if (existingFolder) {
      alert('FOLDER NAME EXISTS, SELECT DIFFERENT NAME');
      return;
    } else if (folderName === null) {
      return;
    } else if (folderName === '') {
      alert(`CAN'T ADD FOLDER WITHOUT A NAME`);
    } else {
      // When there is an active project, add a folder inside it
      if (activeProject) {
        const newFolderId = uuidv4();
        dispatch(
          folderAdded({
            id: newFolderId,
            title: folderName,
            isActive: false,
            project: activeProject.id,
            children: [],
          })
        );
        dispatch(
          projectUpdated({
            id: activeProject.id,
            isActive: true,
            folders: newFolderId,
          })
        );

        if (Object.keys(parentFolder).length !== 0) {
          dispatch(
            folderUpdated({
              id: parentFolder.id,
              isActive: false,
              children: newFolderId,
            })
          );
          if (previousFolders.length > 0) {
            dispatch(
              previousFoldersUpdated({
                id: parentFolder.id,
                children: newFolderId,
              })
            );
          }
        }
      }
    }
  };

  // Single click on folder
  const singleClickHandler = (e) => {
    const clickedFolder = currentFolders.find(
      (p) => p.title === e.target.textContent
    );
    dispatch(
      folderUpdated({
        id: clickedFolder.id,
        isActive: !clickedFolder.isActive,
      })
    );
    if (clickedFolder.isActive) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(clickedFolder);
    }
  };

  // Double click on folder
  const doubleClickHandler = (e) => {
    const clickedFolder = currentFolders.find(
      (p) => p.title === e.target.textContent
    );

    const clickedFolderChildren = folders.filter((f) =>
      clickedFolder.children?.includes(f.id)
    );
    dispatch(currentFoldersUpdated(clickedFolderChildren));
    dispatch(previousFoldersAdded(currentFolders));
    dispatch(parentFolderSet(clickedFolder));
    setSelectedFolder(clickedFolder);
  };

  return (
    <div className="file-container">
      {selectedProject && (
        <>
          {previousFolders.length > 0 && <BackButton onClick={backHandler} />}
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
          {currentFolders?.map((f) => (
            <FolderButton
              key={f.id}
              onSingleClick={singleClickHandler}
              onDoubleClick={doubleClickHandler}
              title={f.title}
              className={
                f.isActive
                  ? 'file-container__btn--active'
                  : 'file-container__btn'
              }
            />
          ))}
        </>
      )}
    </div>
  );
};
