import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAuth: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
    isAuthPage: (state, action) => {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { loginError, loginSuccess, loginStart, logOut, isAuthPage } =
  userSlice.actions;

export const selectIsFetching = (state) => state.user.isFetching;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectError = (state) => state.user.error;
export const selectIsAuth = (state) => state.user.isAuth;

export default userSlice.reducer;
