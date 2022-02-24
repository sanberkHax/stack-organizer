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
    questionsRemoved(state, action) {
      const removedQuestions = action.payload;

      // Remove given array of questions
      if (removedQuestions) {
        removedQuestions.forEach((q) => {
          questionsAdapter.removeOne(state, q.id);
        });
      }
      // Remove all questions
      else {
        questionsAdapter.removeAll();
      }
    },
    questionsFetched: questionsAdapter.setAll,
    questionAdded: questionsAdapter.addOne,
    questionsLoadingUpdated(state, action) {
      state.loading = action.payload;
    },
    questionsErrorUpdated(state, action) {
      state.error = action.payload;
    },
    questionUpdated(state, action) {
      const { id, name } = action.payload;
      const existingQuestion = state.entities[id];
      if (existingQuestion) {
        if (name) {
          existingQuestion.name = name;
        }
        if (name === null) {
          existingQuestion.name = null;
        }
      }
    },
    questionsUpdated(state, action) {
      state.entities = action.payload;
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
  questionsErrorUpdated,
  questionUpdated,
} = questionsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
  // Pass in a selector that returns the questions slice of state
} = questionsAdapter.getSelectors((state) => state.questions);

export default questionsSlice.reducer;
