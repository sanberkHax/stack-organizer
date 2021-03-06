import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../slices/authSlice';
import searchReducer from '../slices/searchSlice';
import projectsReducer from '../slices/projectsSlice';
import foldersReducer from '../slices/foldersSlice';
import questionsReducer from '../slices/questionsSlice';
import answersReducer from '../slices/answersSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        search: searchReducer,
        projects: projectsReducer,
        folders: foldersReducer,
        questions: questionsReducer,
        answers: answersReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
