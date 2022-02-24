import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  selectAllFolders,
  parentFolderSet,
} from '../../../../slices/foldersSlice';
import {
  writeFoldersData,
  writeQuestionsData,
} from '../../../../services/firebase';
import { Folder } from './Folder';
import { QuestionFile } from './QuestionFile';
import {
  questionsRemoved,
  selectAllQuestions,
} from '../../../../slices/questionsSlice';
import { selectAllProjects } from '../../../../slices/projectsSlice';

export const FileBrowser = ({
  setSelectedQuestion,
  setSelectedFolder,
  selectedProject,
  selectedFolder,
  setCurrentFileArray,
  newFolderId,
}) => {
  const folders = useSelector(selectAllFolders);
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const loading = useSelector((state) => state.folders.loading);
  const error = useSelector((state) => state.folders.error);

  const questions = useSelector(selectAllQuestions);
  const folderQuestions = questions.filter(
    (q) => q.folder === selectedFolder?.id
  );
  const projectQuestions = questions.filter(
    (q) => q.project === selectedProject?.id
  );

  useEffect(() => {
    const deletedQuestions = [];

    // Find questions inside deleted folder or project
    questions.forEach((q) => {
      if (q.folder) {
        const match = folders.some((f) => q.folder === f.id);
        if (!match) {
          deletedQuestions.push(q);
        }
      } else {
        const match = projects.some((p) => q.project === p.id);
        if (!match) {
          deletedQuestions.push(q);
        }
      }
    });

    // Remove questions
    if (deletedQuestions.length > 0) {
      dispatch(questionsRemoved(deletedQuestions));
    }
  }, [folders, questions, dispatch, projects]);

  // Update folders database
  useEffect(() => {
    if (!loading) {
      writeFoldersData(uid, folders);
    }
  }, [loading, folders, uid]);

  // Update questions database
  useEffect(() => {
    if (!loading) {
      writeQuestionsData(uid, questions);
    }
  }, [loading, questions, uid]);

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
          {selectedFolder
            ? folderQuestions?.map((q) => (
                <QuestionFile
                  key={q.id}
                  name={q.name}
                  setSelectedQuestion={setSelectedQuestion}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))
            : projectQuestions?.map((q) => (
                <QuestionFile
                  key={q.id}
                  name={q.name}
                  setSelectedQuestion={setSelectedQuestion}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))}
        </>
      )}
    </div>
  );
};
