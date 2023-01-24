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
import { FolderButton } from '../../../../components/Buttons/FolderButton';
import { BackButton } from '../../../../components/Buttons/BackButton';
import { AddButton } from '../../../../components/Buttons/AddButton';

export const FoldersContainer = ({
  setSelectedFolder,
  selectedProject,
  selectedFolder,
  className,
  buttonClassName,
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
        project: activeProject?.id,
        children: [],
      })
    );

    setNewFolderId(newFolderId);
  };

  return (
    <div className={className}>
      {selectedProject && (
        <>
          {previousFolders?.length > 0 && (
            <BackButton ariaLabel="back-button" onClick={backHandler} />
          )}
          <AddButton ariaLabel="add-folder" onClick={addHandler} />
          {currentFolders?.map((f) => (
            <FolderButton
              key={f.id}
              setSelectedFolder={setSelectedFolder}
              selectedProject={selectedProject}
              selectedFolder={selectedFolder}
              name={f.name}
              className={
                f.isActive ? `${buttonClassName}--active` : `${buttonClassName}`
              }
              newFolderId={newFolderId}
            />
          ))}
        </>
      )}
    </div>
  );
};
