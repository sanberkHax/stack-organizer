import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: null,
};

// Thunk Creators
export const signUp = createAsyncThunk(
  'users/signUp',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user.toJSON();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const logIn = createAsyncThunk(
  'users/logIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user.toJSON();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const logOut = createAsyncThunk('users/logOut', async (_, thunkAPI) => {
  try {
    const response = await signOut(auth);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    logInCurrentUser(state, action) {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    [logIn.pending]: (state, action) => {
      state.loading = true;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    [logOut.pending]: (state, action) => {
      state.loading = true;
    },
    [logOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.currentUser = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetError, logInCurrentUser } = authSlice.actions;

export default authSlice.reducer;
