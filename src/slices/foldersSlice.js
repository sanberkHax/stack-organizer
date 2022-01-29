import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
const foldersAdapter = createEntityAdapter();

const initialState = foldersAdapter.getInitialState();

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    foldersRemoved: foldersAdapter.removeAll,
    foldersFetched: foldersAdapter.setAll,
    folderAdded: foldersAdapter.addOne,
    folderUpdated(state, action) {
      const { id, title, isActive, folders } = action.payload;
      const existingFolder = state.entities[id];
      const values = Object.values(current(state.entities));
      const actives = values.filter((p) => p.isActive);
      if (actives.length > 0) {
        const index = actives[0].id;
        state.entities[index].isActive = false;
      }
      if (existingFolder) {
        existingFolder.isActive = isActive;
      }
      if (title) {
        existingFolder.title = title;
      }
      if (folders) {
        existingFolder.folders = folders;
      }
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const { folderAdded, folderUpdated, foldersFetched, foldersRemoved } =
  foldersSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllFolders,
  selectById: selectFolderById,
  selectIds: selectFolderIds,
  // Pass in a selector that returns the folders slice of state
} = foldersAdapter.getSelectors((state) => state.folders);

export default foldersSlice.reducer;
