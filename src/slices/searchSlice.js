import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchResults: [],
  question: {},
  loading: false,
  error: null,
};

// Thunk Creators
export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async ({ searchBar, page }, thunkAPI) => {
    try {
      // Filter with pagination
      const newFilter =
        '!*LhrxEW3C5GaqiyopWc.IvEqcCnz5718)2L(Q)ZcpkKCNeL7PedOnT_zmW5zU5.tT';

      // Filter without pagination
      const oldFilter =
        '!sR(bXF4sEaztLIZ4lk62zXM(U-sPSKFvelsQbp7tDKBPizPQa.Abp403_M3zdXZLHyj5iq9Rchz8i';

      const response = await axios(
        `https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=10&order=desc&sort=relevance&q=${searchBar}&site=stackoverflow&filter=${newFilter}&key=${process.env.REACT_APP_STACK_EXCHANGE_API_KEY}`
      );

      const results = response.data;
      return { results: results, keyword: searchBar };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getQuestion = createAsyncThunk(
  'questions/getQuestion',
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow&filter=!.D3pdhzXl9U(-myU_kUi)pg(Vr32_NKo3OcmHLD7t(-RG85ULD_y0FikoLwS2UdIUEmNZmGeol*&key=${process.env.REACT_APP_STACK_EXCHANGE_API_KEY}`
      );
      const results = response.data.items;
      return results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [getSearchResults.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getSearchResults.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSearchResults.fulfilled]: (state, action) => {
      const { results, keyword } = action.payload;

      if (results.items.length === 0) {
        state.error = `No question found for "${keyword}"`;
      }
      state.loading = false;
      state.searchResults = results;
    },
    [getQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = `Question not found`;
    },
    [getQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.length === 0) {
        state.error = `Question not found`;
      } else {
        const question = action.payload[0];
        state.loading = false;
        state.question = question;
      }
    },
  },
});

export default searchSlice.reducer;
