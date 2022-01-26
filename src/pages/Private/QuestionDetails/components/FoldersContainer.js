import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  selectAllFolders,
  folderAdded,
  folderUpdated,
} from '../../../../slices/foldersSlice';
export const FoldersContainer = ({ setActiveFolder, activeProject }) => {
  const folders = useSelector(selectAllFolders);
  const dispatch = useDispatch();
  const activeFolders = folders.filter((f) => f.project === activeProject?.id);
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
      dispatch(
        folderAdded({
          id: uuidv4(),
          title: folderName,
          isActive: false,
          project: activeProject.id,
        })
      );
    }
  };

  // Select folder on click
  const selectHandler = (e) => {
    // Get clicked folder
    const selectedFolder = folders.find(
      (p) => p.title === e.target.textContent
    );

    dispatch(
      folderUpdated({
        id: selectedFolder.id,
        isActive: !selectedFolder.isActive,
      })
    );
    setActiveFolder(selectedFolder);
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

      {activeFolders?.map((f) => (
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
      ))}
    </div>
  );
};
