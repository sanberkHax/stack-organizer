import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const answersAdapter = createEntityAdapter();

const initialState = answersAdapter.getInitialState({
  loading: true,
  error: null,
});

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    answerRemoved: answersAdapter.removeOne,
    answersRemoved(state, action) {
      const removedAnswers = action.payload;

      // Remove given array of answers
      if (removedAnswers) {
        removedAnswers.forEach((q) => {
          answersAdapter.removeOne(state, q.id);
        });
      }
      // Remove all answers
      else {
        answersAdapter.removeAll();
      }
    },
    answersFetched: answersAdapter.setAll,
    answerAdded: answersAdapter.addOne,
    answersLoadingUpdated(state, action) {
      state.loading = action.payload;
    },
    answersErrorUpdated(state, action) {
      state.error = action.payload;
    },
    answerUpdated(state, action) {
      const { id, name } = action.payload;
      const existingAnswer = state.entities[id];
      if (existingAnswer) {
        if (name) {
          existingAnswer.name = name;
        }
        if (name === null) {
          existingAnswer.name = null;
        }
      }
    },
    answersUpdated(state, action) {
      state.entities = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  answersFetched,
  answerAdded,
  answersLoadingUpdated,
  answersRemoved,
  answerRemoved,
  answerUpdated,
  answersErrorUpdated,
} = answersSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllAnswers,
  selectById: selectAnswerById,
  selectIds: selectAnswerIds,
  // Pass in a selector that returns the answers slice of state
} = answersAdapter.getSelectors((state) => state.answers);

export default answersSlice.reducer;
