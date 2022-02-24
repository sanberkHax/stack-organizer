import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';

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
import {
  questionsRemoved,
  selectAllQuestions,
} from '../../../../slices/questionsSlice';
import { useEffect } from 'react';

export const Folder = ({
  className,
  name,
  newFolderId,
  selectedFolder,
  setSelectedFolder,
  currentFileArray,
  setCurrentFileArray,
}) => {
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const parentFolder = useSelector((state) => state.folders.parentFolder);
  const projects = useSelector(selectAllProjects);
  const folders = useSelector(selectAllFolders);
  const currentFolders = useSelector((state) => state.folders.currentFolders);

  const [editableFolder, setEditableFolder] = useState();

  const dispatch = useDispatch();
  const folderRef = useRef();

  // Open folder on click
  const clickHandler = (e) => {
    const clickedFolder = currentFolders.find(
      (p) => p.name === e.target.textContent
    );
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
    const clickedFolder = currentFolders.find(
      (p) => p.name === folderRef.current.textContent
    );

    // Remove folder's name
    if (clickedFolder) {
      setEditableFolder(clickedFolder);
      dispatch(folderUpdated({ id: clickedFolder.id, name: null }));
      dispatch(currentFolderUpdated({ id: clickedFolder.id, name: null }));
    }
  };

  const deleteHandler = (e) => {
    e.stopPropagation();

    const clickedFolder = currentFolders.find(
      (p) => p.name === folderRef.current.textContent
    );

    if (clickedFolder) {
      dispatch(folderRemoved(clickedFolder.id));
      dispatch(currentFolderRemoved(clickedFolder.id));
      dispatch(foldersErrorUpdated(null));
      dispatch(questionsRemoved(folders));
    }
  };
  // Add a name to empty folder
  const addNameHandler = (f) => {
    const folderName = f.name;

    const activeProject = projects.find((p) => p.isActive);
    const existingFolder = currentFolders.find((f) => f.name === folderName);

    if (existingFolder) {
      dispatch(
        foldersErrorUpdated('FOLDER NAME EXISTS, SELECT DIFFERENT NAME')
      );
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
      return;
    } else if (folderName === null) {
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
      return;
    } else if (folderName === '') {
      dispatch(foldersErrorUpdated(`CAN'T ADD FOLDER WITHOUT A NAME`));

      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
    } else if (folderName.length > 50) {
      dispatch(foldersErrorUpdated(`MAX CHARACTER LIMIT IS 50`));
      dispatch(folderRemoved(newFolderId));
      dispatch(currentFolderRemoved(newFolderId));
    } else {
      // Rename folder
      if (editableFolder) {
        dispatch(folderUpdated({ id: editableFolder.id, name: folderName }));
        dispatch(
          currentFolderUpdated({ id: editableFolder.id, name: folderName })
        );
      } else {
        if (activeProject) {
          // Update empty folder's name
          dispatch(
            folderUpdated({
              id: newFolderId,
              name: folderName,
            })
          );

          // Update empty folder inside currentFolders
          dispatch(currentFolderUpdated({ id: newFolderId, name: folderName }));

          // Add the folder inside active project
          dispatch(
            projectUpdated({
              id: activeProject.id,
              isActive: true,
              folders: newFolderId,
            })
          );

          // If the folder is inside another folder, update its direct parent
          if (Object.keys(parentFolder).length !== 0) {
            dispatch(
              folderUpdated({
                id: parentFolder.id,
                isActive: false,
                children: newFolderId,
              })
            );
            // If there are multiple previous folders, update them
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
    }
  };
  return (
    <>
      <div className={className}>
        <div ref={folderRef} onClick={clickHandler} className="folder__details">
          <FolderIcon />
          {!name ? (
            <Formik initialValues={{ name: '' }} onSubmit={addNameHandler}>
              {({ values }) => {
                return (
                  <Form className="folder__form">
                    <Field
                      data-testid="folder-btn-input"
                      id="name"
                      name="name"
                      autoFocus={true}
                      className="folder__input"
                      onBlur={() => {
                        addNameHandler(values);
                      }}
                      onClick={editHandler}
                    />
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <p>{name}</p>
          )}
          <div className="folder__btn-container">
            <EditButton onClick={editHandler} className="folder__edit-btn" />
            <DeleteButton
              onClick={deleteHandler}
              className="folder__delete-btn"
            />
          </div>
        </div>
      </div>
    </>
  );
};
