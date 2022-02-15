import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

import {
  selectAllFolders,
  folderAdded,
  folderUpdated,
  currentFoldersUpdated,
  previousFoldersRemoved,
  parentFolderSet,
  foldersErrorUpdated,
} from '../../../../slices/foldersSlice';
import { selectAllProjects } from '../../../../slices/projectsSlice';
import { writeFoldersData } from '../../../../services/firebase';
import { FolderButton } from '../../../../components/FolderButton';
import { BackButton } from '../../../../components/BackButton';

export const FoldersContainer = ({
  setSelectedFolder,
  selectedProject,
  selectedFolder,
}) => {
  const folders = useSelector(selectAllFolders);
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const loading = useSelector((state) => state.folders.loading);

  const [newFolderId, setNewFolderId] = useState();

  // Update folders database
  useEffect(() => {
    if (!loading) {
      writeFoldersData(uid, folders);
    }
  }, [loading, folders, uid]);

  // Reset parent folder when folders container is on the base level
  useEffect(() => {
    if (previousFolders.length === 0) {
      dispatch(parentFolderSet({}));
    }
  }, [dispatch, previousFolders]);

  // Go one level back inside the nested folder
  const backHandler = () => {
    const lastItem = previousFolders[previousFolders.length - 1];

    dispatch(currentFoldersUpdated(lastItem));
    dispatch(previousFoldersRemoved());
    dispatch(folderUpdated({ id: selectedFolder?.id, isActive: false }));

    setSelectedFolder(null);
  };

  // Add empty folder to active project
  const addHandler = () => {
    const activeProject = projects.find((p) => p.isActive);
    const newFolderId = uuidv4();

    dispatch(foldersErrorUpdated(null));
    dispatch(
      folderAdded({
        id: newFolderId,
        isActive: false,
        project: activeProject.id,
        children: [],
      })
    );

    setNewFolderId(newFolderId);
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
              setSelectedFolder={setSelectedFolder}
              selectedProject={selectedProject}
              selectedFolder={selectedFolder}
              name={f.name}
              className={
                f.isActive
                  ? 'file-container__btn--active'
                  : 'file-container__btn'
              }
              newFolderId={newFolderId}
            />
          ))}
        </>
      )}
    </div>
  );
};
