import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState();

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    projectsFetched: projectsAdapter.setAll,
    projectsRemoved: projectsAdapter.removeAll,
    projectAdded: projectsAdapter.addOne,
    projectUpdated(state, action) {
      const { id, title, isActive, folders } = action.payload;

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
        if (title) {
          // Update project's title
          existingProject.title = title;
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
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  projectAdded,
  projectUpdated,
  projectsFetched,
  projectsRemoved,
} = projectsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  // Pass in a selector that returns the projects slice of state
} = projectsAdapter.getSelectors((state) => state.projects);

export default projectsSlice.reducer;
