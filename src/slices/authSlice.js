import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase";
const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: null,
};

// Thunk Creators
export const signUp = createAsyncThunk(
  "users/signUp",
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
  "users/logIn",
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
export const guestLogIn = createAsyncThunk(
  "users/guestLogIn",
  async (_, thunkAPI) => {
    try {
      const response = await signInAnonymously(auth);
      const user = response.user.toJSON();
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const logOut = createAsyncThunk("users/logOut", async (_, thunkAPI) => {
  try {
    const response = await signOut(auth);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
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
    [signUp.rejected]: (state, { payload }) => {
      const error = payload;
      state.loading = false;
      state.error = error;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      const userId = payload.uid;
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = userId;
    },
    [logIn.pending]: (state, action) => {
      state.loading = true;
    },
    [logIn.rejected]: (state, { payload }) => {
      const error = payload;
      state.loading = false;
      state.error = error;
    },
    [logIn.fulfilled]: (state, { payload }) => {
      const userId = payload.uid;
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = userId;
    },
    [logOut.pending]: (state, action) => {
      state.loading = true;
    },
    [logOut.rejected]: (state, { payload }) => {
      const error = payload;
      state.loading = false;
      state.error = error;
    },
    [logOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    [guestLogIn.pending]: (state, action) => {
      state.loading = true;
    },
    [guestLogIn.rejected]: (state, { payload }) => {
      const error = payload;
      state.loading = false;
      state.error = error;
    },
    [guestLogIn.fulfilled]: (state, { payload }) => {
      const userId = payload.uid;
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetError, logInCurrentUser } = authSlice.actions;

export default authSlice.reducer;
