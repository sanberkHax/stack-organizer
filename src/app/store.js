import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import searchReducer from '../slices/searchSlice';
import projectsReducer from '../slices/projectsSlice';
import foldersReducer from '../slices/foldersSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    projects: projectsReducer,
    folders: foldersReducer,
  },
});
