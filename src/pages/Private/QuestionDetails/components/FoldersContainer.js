import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectAllFolders,
  folderAdded,
  folderUpdated,
  currentFoldersUpdated,
} from '../../../../slices/foldersSlice';
import { projectUpdated } from '../../../../slices/projectsSlice';
import { writeFoldersData } from '../../../../services/firebase';
import { useEffect } from 'react';
import { FolderButton } from '../../../../components/FolderButton';

export const FoldersContainer = ({
  setSelectedFolder,
  selectedProject,
  selectedFolder,
}) => {
  const folders = useSelector(selectAllFolders);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);

  useEffect(() => {
    writeFoldersData(uid, folders);
  }, [folders, uid]);

  console.log('folders');
  console.log(folders);

  console.log('selectedProject');
  console.log(selectedProject);

  console.log('currentFolders');
  console.log(currentFolders);

  // Add folder on click
  const addHandler = () => {
    console.log('selectedFolder');
    console.log(selectedFolder);

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
          children: [],
        })
      );
      dispatch(
        projectUpdated({
          id: selectedProject.id,
          isActive: true,
          folders: newFolderId,
        })
      );
      console.log('selectedFolder');
      console.log(selectedFolder);
      if (selectedFolder) {
        dispatch(
          folderUpdated({
            id: selectedFolder.id,
            isActive: false,
            children: newFolderId,
          })
        );
      }
    }
    setSelectedFolder(null);
  };

  // Single click on folder
  const singleClickHandler = (e) => {
    const clickedFolder = folders.find((p) => p.title === e.target.textContent);

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
    const clickedFolder = folders.find((p) => p.title === e.target.textContent);

    const clickedFolderChildren = folders.filter((f) =>
      clickedFolder.children?.includes(f.id)
    );
    dispatch(currentFoldersUpdated(clickedFolderChildren));
    setSelectedFolder(clickedFolder);
  };

  return (
    <div className="file-container">
      {selectedProject && (
        <>
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
