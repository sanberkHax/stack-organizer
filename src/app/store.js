import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import searchReducer from "../slices/searchSlice";
import projectsReducer from "../slices/projectsSlice";
import foldersReducer from "../slices/foldersSlice";
import questionsReducer from "../slices/questionsSlice";
import answersReducer from "../slices/answersSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    projects: projectsReducer,
    folders: foldersReducer,
    questions: questionsReducer,
    answers: answersReducer,
  },
});
