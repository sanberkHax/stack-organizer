import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
const foldersAdapter = createEntityAdapter();

const initialState = foldersAdapter.getInitialState({
  previousFolders: [],
  currentFolders: [],
  parentFolder: {},
  loading: true,
  error: null,
});

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    folderRemoved(state, action) {
      const foldersArray = Object.values(state.entities);
      const removedFolderId = action.payload;
      const removedFolder = state.entities[removedFolderId];

      // Find and remove all children of folder
      const removeAllChildren = (folder) => {
        if (folder.hasOwnProperty('children')) {
          folder.children.forEach((f) => {
            const removedChild = foldersArray.find((s) => s.id === f);

            if (removedChild) {
              foldersAdapter.removeOne(state, removedChild.id);
              removeAllChildren(removedChild);
            }
          });
        }
      };

      removeAllChildren(removedFolder);

      // Remove folder itself
      foldersAdapter.removeOne(state, removedFolderId);
    },
    foldersRemoved(state, action) {
      const removedFolders = action.payload;

      // When there is a folder array given, remove only those folders
      if (removedFolders.length > 0) {
        removedFolders.forEach((f) => {
          foldersAdapter.removeOne(state, f.id);
        });
      } else {
        foldersAdapter.removeAll();
      }
    },
    foldersFetched: foldersAdapter.setAll,
    foldersReset(state, action) {
      const foldersArray = Object.values(state.entities);
      const activeFolders = foldersArray.filter((p) => p.isActive);

      if (activeFolders.length > 0) {
        const index = activeFolders[0].id;

        state.entities[index].isActive = false;

        if (state.currentFolders?.length > 0) {
          const currentIndex = state.currentFolders.findIndex(
            (f) => f.id === index
          );
          const currentActive = state.currentFolders[currentIndex];
          if (currentActive) {
            currentActive.isActive = false;
          }
        }
      }

      state.previousFolders = [];

      // Remove the new folder without a name
      const lastFolder = foldersArray[foldersArray.length - 1];

      if (lastFolder && !lastFolder.name) {
        foldersAdapter.removeOne(state, lastFolder.id);
      }
    },

    folderAdded(state, action) {
      const newFolder = action.payload;
      state.ids.push(newFolder.id);
      state.entities = { ...state.entities, [newFolder.id]: newFolder };
      state.currentFolders.push(newFolder);
    },

    folderUpdated(state, action) {
      state.error = null;
      const { id, name, isActive, children } = action.payload;
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
        const currentIndex = state.currentFolders.findIndex(
          (f) => f.id === index
        );
        const currentActive = state.currentFolders[currentIndex];
        if (currentActive) {
          currentActive.isActive = false;
        }
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
        if (name) {
          // Update folder's name
          existingFolder.name = name;
        }
        if (name === null) {
          existingFolder.name = null;
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

    currentFolderRemoved(state, action) {
      const removedFolderId = action.payload;
      const filteredCurrentFolders = state.currentFolders.filter(
        (f) => f.id !== removedFolderId
      );
      state.currentFolders = filteredCurrentFolders;
    },
    currentFoldersUpdated(state, action) {
      const folders = action.payload;

      state.currentFolders = folders;
    },
    currentFolderUpdated(state, action) {
      const { id, name } = action.payload;

      const existingFolder = state.currentFolders.find((f) => f.id === id);
      if (name) {
        existingFolder.name = name;
      }
      if (name === null) {
        existingFolder.name = null;
      }
    },

    previousFoldersAdded(state, action) {
      const folders = action.payload;

      state.previousFolders.push(folders);
    },

    previousFoldersRemoved(state, action) {
      state.previousFolders.pop();
    },

    previousFoldersUpdated(state, action) {
      const { id, children, isActive } = action.payload;

      const lastParent =
        state.previousFolders[state.previousFolders.length - 1];

      const updatedFolder = lastParent.findIndex((f) => f.id === id);

      const existingFolder = lastParent[updatedFolder];

      if (existingFolder) {
        existingFolder.isActive = isActive;

        if (children) {
          if (!existingFolder.children) {
            existingFolder.children = [];
          }
          existingFolder.children.push(children);
        }
      }
    },

    previousFoldersReset(state, action) {
      state.previousFolders = [];
    },

    parentFolderSet(state, action) {
      const parentFolder = action.payload;
      state.parentFolder = parentFolder;
    },
    foldersLoadingUpdated(state, action) {
      state.loading = action.payload;
    },
    foldersErrorUpdated(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  folderAdded,
  folderUpdated,
  foldersFetched,
  folderRemoved,
  foldersRemoved,
  foldersReset,
  currentFoldersUpdated,
  currentFolderUpdated,
  currentFolderRemoved,
  previousFoldersUpdated,
  previousFoldersRemoved,
  previousFoldersAdded,
  previousFoldersReset,
  parentFolderSet,
  foldersLoadingUpdated,
  foldersErrorUpdated,
} = foldersSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllFolders,
  selectById: selectFolderById,
  selectIds: selectFolderIds,
  // Pass in a selector that returns the folders slice of state
} = foldersAdapter.getSelectors((state) => state.folders);

export default foldersSlice.reducer;
