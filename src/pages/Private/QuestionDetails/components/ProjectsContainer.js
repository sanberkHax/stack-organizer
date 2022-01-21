import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
export const ProjectsContainer = ({ setActiveProject }) => {
  // Dummy projects
  const [projects, setProjects] = useState([
    {
      id: uuidv4(),
      name: 'project1',
      isActive: false,
      className: 'file-container__btn',
      folders: [],
    },
    {
      id: uuidv4(),
      name: 'project2',
      isActive: false,
      className: 'file-container__btn',
      folders: [
        { id: uuidv4(), name: 'project2-folder1', folders: [] },
        { id: uuidv4(), name: 'project2-folder2', folders: [] },
      ],
    },
    {
      id: uuidv4(),
      name: 'project3',
      isActive: false,
      className: 'file-container__btn',
      folders: [
        {
          id: uuidv4(),
          name: 'project3-folder1',
          folders: [
            { id: uuidv4(), name: 'project3-folder1-folder-1', folders: [] },
            { id: uuidv4(), name: 'project3-folder1-folder-2', folders: [] },
          ],
        },
        { id: uuidv4(), name: 'project3-folder2', folders: [] },
      ],
    },
  ]);

  // Add new project on click
  const addHandler = () => {
    // Prompt user for project name
    const projectName = prompt('Project Name:');

    // Copy projects to another array to avoid mutating the original array
    const projectsCopy = projects.slice();

    // Add a new project object to new array
    projectsCopy.push({
      id: uuidv4(),
      name: projectName,
      isActive: false,
      className: 'file-container__btn',
      folders: [],
    });

    // Set new array as projects
    setProjects(projectsCopy);
  };

  // Toggle project on click
  const clickHandler = (e) => {
    // Get clicked project
    const current = projects.find((p) => p.name === e.target.textContent);

    // When clicked project is not selected, select the project
    if (!current.isActive) {
      // Check if there is another project that is already selected
      const selectedProject = projects.find((p) => p.isActive);

      // If there is already a selected project, unselect it
      if (selectedProject) {
        // Copy projects to another array to avoid mutating the original array
        const projectsCopy = projects.slice();

        // Change selected project's properties to inactive
        projectsCopy.forEach((p) => {
          if (p.isActive) {
            p.isActive = false;
            p.className = 'file-container__btn';
          }
        });
        setProjects(projectsCopy);
      }

      // Set selected project as active project to use it in <FoldersContainer/>
      setActiveProject({
        id: current.id,
        name: current.name,
        isActive: true,
        className: 'file-container__btn--active',
        folders: current.folders,
      });

      // Update selected project's properties to active
      setProjects(
        projects.map((project) => {
          return project.id === current.id
            ? {
                ...project,
                isActive: true,
                className: 'file-container__btn--active',
              }
            : project;
        })
      );
    }
    // When clicked project is selected, unselect it
    else {
      // Update selected project's properties to inactive
      setProjects(
        projects.map((project) => {
          return project.id === current.id
            ? {
                ...project,
                isActive: false,
                className: 'file-container__btn',
              }
            : project;
        })
      );

      setActiveProject(null);
    }
  };
  return (
    <div className="file-container">
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
      {projects.map((p) => (
        <button key={p.id} onClick={clickHandler} className={p.className}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z" />
          </svg>
          <p>{p.name}</p>
        </button>
      ))}
    </div>
  );
};
