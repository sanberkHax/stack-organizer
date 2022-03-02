import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  selectAllProjects,
  projectUpdated,
} from '../../../../slices/projectsSlice';
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
  foldersErrorUpdated,
} from '../../../../slices/foldersSlice';
import { FolderIcon } from '../../../../components/FolderIcon';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';
import { questionsRemoved } from '../../../../slices/questionsSlice';

export const Folder = ({
  id,
  className,
  name,
  selectedFolder,
  setSelectedFolder,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const parentFolder = useSelector((state) => state.folders.parentFolder);
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const currentFolders = useSelector((state) => state.folders.currentFolders);

  const [editableFolder, setEditableFolder] = useState();

  const dispatch = useDispatch();

  // Open folder on click
  const clickHandler = (e) => {
    setTitleIcon(<FolderIcon />);
    const clickedFolder = currentFolders.find((f) => f.id === id);
    if (clickedFolder) {
      const clickedFolderChildren = folders.filter((f) =>
        clickedFolder.children?.includes(f.id)
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
      setCurrentFileArray((prev) => [...prev, clickedFolder]);
    }
  };

  const editHandler = (e) => {
    e.stopPropagation();
    const clickedFolder = currentFolders.find((f) => f.id === id);

    // Remove folder's name
    if (clickedFolder) {
      setEditableFolder(clickedFolder);
      dispatch(folderUpdated({ id: clickedFolder.id, name: null }));
      dispatch(currentFolderUpdated({ id: clickedFolder.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    const clickedFolder = currentFolders.find((f) => f.id === id);
    if (window.confirm('PRESS "OK" TO DELETE SELECTED FOLDER')) {
      if (clickedFolder) {
        dispatch(folderRemoved(clickedFolder.id));
        dispatch(currentFolderRemoved(clickedFolder.id));
        dispatch(foldersErrorUpdated(null));
        dispatch(questionsRemoved(folders));
      }
    }
  };
  // Add a name to empty folder
  const addNameHandler = (f) => {
    const folderName = f.name;
    const activeProject = projects.find((p) => p.isActive);
    const existingFolder = currentFolders.find((f) => f.name === folderName);
    const clickedFolder = currentFolders.find((f) => f.id === id);

    const folderId = clickedFolder.id;

    if (existingFolder) {
      if (editableFolder) {
        dispatch(folderUpdated({ id: folderId, name: editableFolder.name }));
        dispatch(
          currentFolderUpdated({ id: folderId, name: editableFolder.name })
        );
      } else {
        dispatch(folderRemoved(folderId));
        dispatch(currentFolderRemoved(folderId));
      }
      dispatch(
        foldersErrorUpdated('FOLDER NAME EXISTS, SELECT DIFFERENT NAME')
      );
    } else if (folderName === null) {
      if (editableFolder) {
        dispatch(folderUpdated({ id: folderId, name: editableFolder.name }));
        dispatch(
          currentFolderUpdated({ id: folderId, name: editableFolder.name })
        );
      } else {
        dispatch(folderRemoved(folderId));
        dispatch(currentFolderRemoved(folderId));
      }
    } else if (folderName === '') {
      if (editableFolder) {
        dispatch(folderUpdated({ id: folderId, name: editableFolder.name }));
        dispatch(
          currentFolderUpdated({ id: folderId, name: editableFolder.name })
        );
      } else {
        dispatch(folderRemoved(folderId));
        dispatch(currentFolderRemoved(folderId));
      }
      dispatch(foldersErrorUpdated(`CAN'T ADD FOLDER WITHOUT A NAME`));
    } else if (folderName.length > 50) {
      if (editableFolder) {
        dispatch(folderUpdated({ id: folderId, name: editableFolder.name }));
        dispatch(
          currentFolderUpdated({ id: folderId, name: editableFolder.name })
        );
      } else {
        dispatch(folderRemoved(folderId));
        dispatch(currentFolderRemoved(folderId));
      }
      dispatch(foldersErrorUpdated(`MAX CHARACTER LIMIT IS 50`));
    } else {
      // Rename folder
      if (editableFolder) {
        dispatch(folderUpdated({ id: folderId, name: folderName }));
        dispatch(currentFolderUpdated({ id: folderId, name: folderName }));
      } else {
        if (activeProject) {
          // Update empty folder's name
          dispatch(
            folderUpdated({
              id: folderId,
              name: folderName,
            })
          );

          // Update empty folder inside currentFolders
          dispatch(currentFolderUpdated({ id: folderId, name: folderName }));

          // Add the folder inside active project
          dispatch(
            projectUpdated({
              id: activeProject.id,
              isActive: true,
              folders: folderId,
            })
          );

          // If the folder is inside another folder, update its direct parent
          if (Object.keys(parentFolder).length !== 0) {
            dispatch(
              folderUpdated({
                id: parentFolder.id,
                isActive: false,
                children: folderId,
              })
            );
            // If there are multiple previous folders, update them
            if (previousFolders.length > 0) {
              dispatch(
                previousFoldersUpdated({
                  id: parentFolder.id,
                  children: folderId,
                })
              );
            }
          }
        }
      }
    }
  };
  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={className}
      >
        <div
          data-testid="folder"
          onClick={clickHandler}
          className="folder__details"
        >
          <FolderIcon />
          {!name ? (
            <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
              {({ values }) => {
                return (
                  <Form className="folder__form">
                    <Field
                      aria-label="Folder Name Input"
                      id="name"
                      name="name"
                      autoFocus={true}
                      className="folder__input"
                      onBlur={() => {
                        addNameHandler(values);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>{name}</p>
          )}
          <div className="folder__btn-container">
            <EditButton
              ariaLabel="Rename Folder"
              onClick={editHandler}
              className="folder__edit-btn"
            />
            <DeleteButton
              ariaLabel="Delete Folder"
              onClick={deleteHandler}
              className="folder__delete-btn"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
