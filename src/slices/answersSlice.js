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
    answersRemoved: answersAdapter.removeAll,
    answersFetched: answersAdapter.setAll,
    answerAdded: answersAdapter.addOne,
    answersLoadingUpdated(state, action) {
      state.loading = action.payload;
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
} = answersSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllAnswers,
  selectById: selectAnswerById,
  selectIds: selectAnswerIds,
  // Pass in a selector that returns the answers slice of state
} = answersAdapter.getSelectors((state) => state.answers);

export default answersSlice.reducer;
