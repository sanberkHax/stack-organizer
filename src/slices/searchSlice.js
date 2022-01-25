import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

// Thunk Creators
export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async ({ searchBar }, thunkAPI) => {
    try {
      const response = await axios(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${searchBar}&site=stackoverflow&filter=!sR(bXF4sEaztLIZ4lk62zXM(U-sPSKFvelsQbp7tDKBPizPQa.Abp403_M3zdXZLHyj5iq9Rchz8i&key=${process.env.REACT_APP_STACK_EXCHANGE_API_KEY}`
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
