import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const questionsAdapter = createEntityAdapter();

const initialState = questionsAdapter.getInitialState({
  loading: true,
  error: null,
});

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    questionRemoved: questionsAdapter.removeOne,
    questionsRemoved: questionsAdapter.removeAll,
    questionsFetched: questionsAdapter.setAll,
    questionAdded: questionsAdapter.addOne,
    questionsLoadingUpdated(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  questionsFetched,
  questionAdded,
  questionsLoadingUpdated,
  questionsRemoved,
  questionRemoved,
} = questionsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
  // Pass in a selector that returns the questions slice of state
} = questionsAdapter.getSelectors((state) => state.questions);

export default questionsSlice.reducer;
