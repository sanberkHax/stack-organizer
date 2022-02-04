import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
const foldersAdapter = createEntityAdapter();

const initialState = foldersAdapter.getInitialState({
  previousFolders: [],
  currentFolders: [],
});

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    foldersRemoved: foldersAdapter.removeAll,
    foldersFetched: foldersAdapter.setAll,
    folderAdded: foldersAdapter.addOne,
    folderUpdated(state, action) {
      const { id, title, isActive, children } = action.payload;
      // Get the folder with matching id
      const existingFolder = state.entities[id];

      // Get active folders
      const activeFolders = Object.values(state.entities).filter(
        (p) => p.isActive
      );

      // Get the matching folder inside currentFolders
      const currentFoldersMatch = state.currentFolders.find(
        (f) => existingFolder?.id === f.id
      );

      // Set any active folders' isActive property to false
      if (activeFolders.length > 0) {
        const index = activeFolders[0].id;
        state.entities[index].isActive = false;
      }

      if (existingFolder) {
        if (currentFoldersMatch) {
          // Update currentFoldersMatch's isActive property
          currentFoldersMatch.isActive = isActive;
        }

        if (isActive) {
          // Update folder's isActive property
          existingFolder.isActive = isActive;
        }
        if (title) {
          // Update folder's title
          existingFolder.title = title;
        }
        if (children) {
          // If the folder doesn't have a children property, initialize it
          if (!existingFolder.children) {
            existingFolder.children = [];
          }
          // Update children property
          existingFolder.children.push(children);
        }
      }
    },
    currentFoldersUpdated(state, action) {
      const folders = action.payload;
      state.currentFolders = folders;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  folderAdded,
  folderUpdated,
  foldersFetched,
  foldersRemoved,
  currentFoldersUpdated,
} = foldersSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllFolders,
  selectById: selectFolderById,
  selectIds: selectFolderIds,
  // Pass in a selector that returns the folders slice of state
} = foldersAdapter.getSelectors((state) => state.folders);

export default foldersSlice.reducer;
