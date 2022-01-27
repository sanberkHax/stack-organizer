import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
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
      const { id, title, isActive } = action.payload;
      const existingProject = state.entities[id];
      const values = Object.values(current(state.entities));
      const actives = values.filter((p) => p.isActive);
      if (actives.length > 0) {
        const index = actives[0].id;
        state.entities[index].isActive = false;
      }
      if (existingProject) {
        existingProject.isActive = isActive;
      }
      if (title) {
        existingProject.title = title;
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
