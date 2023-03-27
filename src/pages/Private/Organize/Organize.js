import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion/dist/framer-motion';

import {
  folderAdded,
  currentFoldersUpdated,
  previousFoldersRemoved,
  foldersErrorUpdated,
  newFolderIdUpdated,
} from '../../../slices/foldersSlice';
import {
  selectAllProjects,
  projectsErrorUpdated,
  projectAdded,
} from '../../../slices/projectsSlice';
import { FileBrowser } from './components/FileBrowser';
import { BackButton } from '../../../components/Buttons/BackButton';
import { StackOverflowButton } from '../../../components/Buttons/StackOverflowButton';
import { NewFolderButton } from '../../../components/Buttons/NewFolderButton';
import { ProjectsSidebar } from './components/ProjectsSidebar';
import { NewProjectButton } from '../../../components/Buttons/NewProjectButton';
import { QuestionInfo } from './components/QuestionInfo';
import { AnswerInfo } from './components/AnswerInfo';
import { Icon } from '../../../components/Icon';

export const Organize = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [selectedFolder, setSelectedFolder] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [currentFileArray, setCurrentFileArray] = useState([]);
  const [titleIcon, setTitleIcon] = useState(<Icon name="project" />);

  const projects = useSelector(selectAllProjects);
  const previousFolders = useSelector((state) => state.folders.previousFolders);
  const projectError = useSelector((state) => state.projects.error);
  const dispatch = useDispatch();

  // When file browser at the base level, set selected folder to null
  useEffect(() => {
    if (currentFileArray.length === 1) {
      setTitleIcon(<Icon name="project" />);
      setSelectedFolder(null);
    }
  }, [currentFileArray]);

  useEffect(() => {
    if (selectedProject) {
      setSelectedQuestion(null);
      setSelectedAnswer(null);
      setCurrentFileArray([selectedProject]);
    }
  }, [selectedProject]);

  // Add empty folder to active project
  const addFolderHandler = () => {
    const activeProject = projects.find((p) => p.isActive);
    const newFolderId = uuidv4();

    dispatch(foldersErrorUpdated(null));
    dispatch(
      folderAdded({
        id: newFolderId,
        isActive: false,
        project: activeProject.id,
        children: [],
        ...(selectedFolder && { parent: selectedFolder.id }),
      })
    );
    dispatch(newFolderIdUpdated(newFolderId));
  };

  // Go one level back inside the nested folder
  const backHandler = () => {
    if (selectedFolder) {
      setTitleIcon(<Icon name="folder" />);
    }
    // Get the last set of previous folders
    const lastFolders = previousFolders[previousFolders.length - 1];

    // Get the parent folder
    const lastFolder = currentFileArray[currentFileArray.length - 2];

    // Remove last set of folders
    dispatch(previousFoldersRemoved());

    // Set last set of folders as current folders
    dispatch(currentFoldersUpdated(lastFolders));

    // Remove latest file from currentFileArray
    setCurrentFileArray((prev) => [...prev.slice(0, -1)]);

    setSelectedFolder(lastFolder);

    if (selectedQuestion) {
      setSelectedQuestion(null);
    }
    if (selectedAnswer) {
      setSelectedAnswer(null);
    }
  };

  // Add empty project
  const addProjectHandler = () => {
    setSelectedProject(null);
    const newProjectId = uuidv4();

    const newProject = {
      id: newProjectId,
      isActive: false,
      folders: [],
    };

    dispatch(projectsErrorUpdated(null));
    dispatch(projectAdded(newProject));
  };

  const browserPlaceholder =
    projects.length > 0 ? (
      <h1 className="heading-primary organize__heading">
        Select a Project to organize
      </h1>
    ) : (
      <h1 className="heading-primary organize__heading">
        Create a New Project and start organizing!
      </h1>
    );

  return (
    <main className="organize">
      <motion.aside
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        className="organize__projects"
      >
        <h1 className="heading-primary">Projects</h1>
        <NewProjectButton onClick={addProjectHandler} />
        {projectError && <p className="organize__error">{projectError}</p>}
        <ProjectsSidebar
          setSelectedProject={setSelectedProject}
          setSelectedFolder={setSelectedFolder}
          selectedFolder={selectedFolder}
          selectedProject={selectedProject}
        />
      </motion.aside>
      {selectedProject ? (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          className="organize__file"
        >
          <div className="file__details">
            {currentFileArray?.length > 1 && (
              <BackButton
                ariaLabel="Back Button"
                className="file__back-btn"
                onClick={backHandler}
              />
            )}
            <div className="file__title">
              <h1 className="heading-primary">
                {currentFileArray[currentFileArray.length - 1]?.name}
              </h1>
              {titleIcon}
            </div>
            {selectedAnswer && (
              <StackOverflowButton link={selectedAnswer.data.link} />
            )}
            {selectedQuestion && (
              <StackOverflowButton link={selectedQuestion.data.link} />
            )}
          </div>
          <div className="file__path">
            {currentFileArray.map((f, i) => (
              <div key={i} className="file__path-item">
                <p>{f.name}</p>
                <p>/</p>
              </div>
            ))}
          </div>

          {selectedQuestion ? (
            <QuestionInfo selectedQuestion={selectedQuestion} />
          ) : selectedAnswer ? (
            <AnswerInfo selectedAnswer={selectedAnswer} />
          ) : (
            <>
              <NewFolderButton onClick={addFolderHandler} />
              <FileBrowser
                setTitleIcon={setTitleIcon}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                setSelectedQuestion={setSelectedQuestion}
                setSelectedAnswer={setSelectedAnswer}
                selectedProject={selectedProject}
                setCurrentFileArray={setCurrentFileArray}
              />
            </>
          )}
        </motion.div>
      ) : (
        browserPlaceholder
      )}
    </main>
  );
};
