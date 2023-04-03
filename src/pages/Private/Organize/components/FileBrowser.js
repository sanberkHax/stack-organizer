import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

import {
  selectAllFolders,
  parentFolderSet,
} from "../../../../slices/foldersSlice";
import {
  writeFoldersData,
  writeQuestionsData,
} from "../../../../services/firebase";
import { Folder } from "./Folder";
import { QuestionFile } from "./QuestionFile";
import {
  questionsRemoved,
  selectAllQuestions,
} from "../../../../slices/questionsSlice";
import { selectAllProjects } from "../../../../slices/projectsSlice";
import { selectAllAnswers } from "../../../../slices/answersSlice";
import { AnswerFile } from "./AnswerFile";

export const FileBrowser = ({
  setSelectedAnswer,
  setSelectedQuestion,
  setSelectedFolder,
  selectedProject,
  selectedFolder,
  setCurrentFileArray,
  setTitleIcon,
}) => {
  const folders = useSelector(selectAllFolders);
  const projects = useSelector(selectAllProjects);

  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.currentUser);
  const currentFolders = useSelector((state) => state.folders.currentFolders);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const loading = useSelector((state) => state.folders.loading);
  const foldersError = useSelector((state) => state.folders.error);
  const questionsError = useSelector((state) => state.questions.error);
  const answersError = useSelector((state) => state.answers.error);
  const answers = useSelector(selectAllAnswers);
  const questions = useSelector(selectAllQuestions);

  const folderQuestions = questions.filter(
    (q) => q.folder === selectedFolder?.id
  );
  const projectQuestions = questions.filter(
    (q) => q.project === selectedProject?.id
  );
  const folderAnswers = answers.filter((q) => q.folder === selectedFolder?.id);
  const projectAnswers = answers.filter(
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
          {foldersError && (
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="organize__error"
            >
              {foldersError}
            </motion.p>
          )}
          {questionsError && (
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="organize__error"
            >
              {questionsError}
            </motion.p>
          )}
          {answersError && (
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="organize__error"
            >
              {answersError}
            </motion.p>
          )}
          {currentFolders?.map((f) => (
            <Folder
              id={f.id}
              setTitleIcon={setTitleIcon}
              key={f.id}
              setSelectedFolder={setSelectedFolder}
              selectedProject={selectedProject}
              selectedFolder={selectedFolder}
              name={f.name}
              className={f.isActive ? "folder--active" : "folder"}
              setCurrentFileArray={setCurrentFileArray}
            />
          ))}
          {selectedFolder
            ? folderQuestions?.map((q) => (
                <QuestionFile
                  id={q.id}
                  setTitleIcon={setTitleIcon}
                  key={q.id}
                  name={q.name}
                  setSelectedQuestion={setSelectedQuestion}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))
            : projectQuestions?.map((q) => (
                <QuestionFile
                  id={q.id}
                  setTitleIcon={setTitleIcon}
                  key={q.id}
                  name={q.name}
                  setSelectedQuestion={setSelectedQuestion}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))}
          {selectedFolder
            ? folderAnswers?.map((a) => (
                <AnswerFile
                  id={a.id}
                  setTitleIcon={setTitleIcon}
                  key={a.id}
                  name={a.name}
                  setSelectedAnswer={setSelectedAnswer}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))
            : projectAnswers?.map((a) => (
                <AnswerFile
                  id={a.id}
                  setTitleIcon={setTitleIcon}
                  key={a.id}
                  name={a.name}
                  setSelectedAnswer={setSelectedAnswer}
                  setCurrentFileArray={setCurrentFileArray}
                />
              ))}
        </>
      )}
    </div>
  );
};
