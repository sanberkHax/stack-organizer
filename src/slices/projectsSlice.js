import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState({
  loading: true,
  error: null,
});

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectsFetched: projectsAdapter.setAll,
    projectRemoved: projectsAdapter.removeOne,
    projectsRemoved: projectsAdapter.removeAll,
    projectAdded: projectsAdapter.addOne,
    projectReset(state, action) {
      const activeProjects = Object.values(state.entities).filter(
        (p) => p.isActive
      );
      if (activeProjects.length > 0) {
        const index = activeProjects[0].id;
        state.entities[index].isActive = false;
      }
    },
    projectUpdated(state, action) {
      state.error = null;
      const { id, name, isActive, folders } = action.payload;
      // Get the project with matching id
      const existingProject = state.entities[id];

      // Get active projects
      const activeProjects = Object.values(state.entities).filter(
        (p) => p.isActive
      );

      // Set any active projects' isActive property to false
      if (activeProjects.length > 0) {
        const index = activeProjects[0].id;
        state.entities[index].isActive = false;
      }

      if (existingProject) {
        if (isActive) {
          // Update project's isActive property
          existingProject.isActive = isActive;
        }
        if (name) {
          // Update project's name
          existingProject.name = name;
        }
        if (name === null) {
          existingProject.name = null;
        }
        if (folders) {
          // If project doesn't have a folders property, initialize it
          if (!existingProject.folders) {
            existingProject.folders = [];
          }
          // Update folders property
          existingProject.folders.push(folders);
        }
      }
    },
    projectsLoadingUpdated(state, action) {
      state.loading = action.payload;
    },
    projectsErrorUpdated(state, action) {
      state.error = action.payload;
    },
  },

  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  projectAdded,
  projectUpdated,
  projectsFetched,
  projectRemoved,
  projectsRemoved,
  projectReset,
  projectsLoadingUpdated,
  projectsErrorUpdated,
} = projectsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  // Pass in a selector that returns the projects slice of state
} = projectsAdapter.getSelectors((state) => state.projects);

export default projectsSlice.reducer;
