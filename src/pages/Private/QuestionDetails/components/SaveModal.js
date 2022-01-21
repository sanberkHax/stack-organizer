import { ProjectsContainer } from './ProjectsContainer';
import { FoldersContainer } from './FoldersContainer';
import { useState } from 'react';
export const SaveModal = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  return (
    <div className="save-modal">
      <h1 className="heading-primary">Save As</h1>
      <h2 className="heading-secondary">Project:</h2>
      <ProjectsContainer
        setActiveProject={setActiveProject}
        setActiveFolder={setActiveFolder}
      />
      <h2 className="heading-secondary">Folder:</h2>
      <FoldersContainer
        setActiveFolder={setActiveFolder}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <label htmlFor="title" className="heading-secondary">
        Title
      </label>
      <input className="save-modal__input" type="text" name="title" />
      <label htmlFor="note" className="heading-secondary">
        Note
      </label>
      <textarea className="save-modal__textarea" type="text" name="note" />
      <button className="btn">Save</button>
    </div>
  );
};
