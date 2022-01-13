import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchResults: null,
  loading: false,
  error: null,
};

// Thunk Creators
export const getSearchResults = createAsyncThunk(
  'posts/getSearchResults',
  async ({ searchBar }, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${searchBar}&site=stackoverflow&filter=!))2QeIa(yBgFYvi4eAzUTUKLNyodgdxL_(X)NUwjc**muejK2b1ci&key=${process.env.REACT_APP_STACK_EXCHANGE_API_KEY}`
      );
      const results = response.data.items;
      console.log(results);
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
    },
    [getSearchResults.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSearchResults.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = searchSlice.actions;

export default searchSlice.reducer;
