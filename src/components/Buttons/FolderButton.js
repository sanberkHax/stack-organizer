import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllProjects, projectUpdated } from '../../slices/projectsSlice';
import {
  folderUpdated,
  previousFoldersUpdated,
  previousFoldersAdded,
  parentFolderSet,
  currentFolderUpdated,
  currentFoldersUpdated,
  selectAllFolders,
  folderRemoved,
  currentFolderRemoved,
} from '../../slices/foldersSlice';
import { Icon } from '../Icon';
import { toast } from 'react-toastify';

export const FolderButton = ({
  className,
  name,
  newFolderId,
  selectedFolder,
  setSelectedFolder,
}) => {
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const parentFolder = useSelector((state) => state.folders.parentFolder);
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);

  const currentFolders = useSelector((state) => state.folders.currentFolders);

  const dispatch = useDispatch();

  let clickCount = 0;

  // Make the clicked folder active on single click
  const singleClickHandler = (e) => {
    const clickedFolder = currentFolders.find(
      (p) => p.name === e.target.textContent
    );
    if (clickedFolder) {
      dispatch(
        folderUpdated({
          id: clickedFolder.id,
          isActive: !clickedFolder.isActive,
        })
      );
    }
    if (clickedFolder?.isActive) {
      setSelectedFolder(null);
    } else {
      setSelectedFolder(clickedFolder);
    }
  };

  // Open clicked folder on double click
  const doubleClickHandler = (e) => {
    const clickedFolder = currentFolders.find(
      (p) => p.name === e.target.textContent
    );
    const clickedFolderChildren = folders.filter((f) =>
      clickedFolder?.children?.includes(f.id)
    );

    setSelectedFolder(clickedFolder);

    dispatch(currentFoldersUpdated(clickedFolderChildren));
    dispatch(previousFoldersAdded(currentFolders));
    dispatch(parentFolderSet(clickedFolder));
    dispatch(
      previousFoldersUpdated({
        id: selectedFolder?.id,
        isActive: false,
      })
    );
    dispatch(folderUpdated({ id: selectedFolder?.id, isActive: false }));
  };

  // Wait 150ms between clicks to differentiate single click and double click
  const clickHandler = (e) => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 1) {
        singleClickHandler(e);
      } else if (clickCount === 2) {
        doubleClickHandler(e);
      }
      clickCount = 0;
    }, 150);
  };

  // Add a name to empty folder
  const addNameHandler = (f) => {
    const folderName = f.name;

    const activeProject = projects.find((p) => p.isActive);
    const existingFolder = currentFolders.find((f) => f.name === folderName);
    const lastFolder = folders[folders.length - 1];

    if (existingFolder) {
      toast.error('Name already exists');
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
      return;
    } else if (folderName === null) {
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
      return;
    } else if (folderName === '') {
      toast.error('Name is required');
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
    } else {
      if (activeProject) {
        // Update empty folder's name
        dispatch(
          folderUpdated({
            id: lastFolder.id,
            name: folderName,
          })
        );
        // Update empty folder inside currentFolders
        dispatch(currentFolderUpdated({ id: lastFolder.id, name: folderName }));

        // Add the folder inside active project
        dispatch(
          projectUpdated({
            id: activeProject.id,
            isActive: true,
            folders: lastFolder.id,
          })
        );

        // If the folder is inside another folder, update its direct parent
        if (Object.keys(parentFolder).length !== 0) {
          dispatch(
            folderUpdated({
              id: parentFolder.id,
              isActive: false,
              children: lastFolder.id,
            })
          );
          // If there are multiple previous folders, update them
          if (previousFolders.length > 0) {
            dispatch(
              previousFoldersUpdated({
                id: parentFolder.id,
                children: lastFolder.id,
              })
            );
          }
        }
      }
    }
  };
  return (
    <>
      <button onClick={clickHandler} className={className}>
        <Icon name="folder" />
        {!name ? (
          <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
            {({ values }) => {
              return (
                <Form className="file-container__btn__form">
                  <Field
                    data-testid="folder-btn-input"
                    id="name"
                    name="name"
                    autoFocus={true}
                    className="file-container__btn__input"
                    onBlur={() => {
                      addNameHandler(values);
                    }}
                  />
                </Form>
              );
            }}
          </Formik>
        ) : (
          <p>{name}</p>
        )}
      </button>
    </>
  );
};
