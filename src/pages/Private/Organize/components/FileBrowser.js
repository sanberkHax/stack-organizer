import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  selectAllFolders,
  parentFolderSet,
} from '../../../../slices/foldersSlice';
import { writeFoldersData } from '../../../../services/firebase';
import { Folder } from './Folder';

export const FileBrowser = ({
  setSelectedFolder,
  selectedProject,
  selectedFolder,
  setCurrentFileArray,
  newFolderId,
}) => {
  const folders = useSelector(selectAllFolders);

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const loading = useSelector((state) => state.folders.loading);
  const error = useSelector((state) => state.folders.error);

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

  return (
    <div className="file__browser">
      {selectedProject && (
        <>
          {error && <p className="organize__error">{error}</p>}
          {currentFolders?.map((f) => (
            <Folder
              key={f.id}
              setSelectedFolder={setSelectedFolder}
              selectedProject={selectedProject}
              selectedFolder={selectedFolder}
              name={f.name}
              className={f.isActive ? 'folder--active' : 'folder'}
              newFolderId={newFolderId}
              setCurrentFileArray={setCurrentFileArray}
            />
          ))}
        </>
      )}
    </div>
  );
};
