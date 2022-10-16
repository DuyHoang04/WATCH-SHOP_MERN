import { createSlice } from "@reduxjs/toolkit";

const loadDataSlice = createSlice({
  name: "load",
  initialState: {
    loadData: false,
    isAuth: false,
  },
  reducers: {
    reLoadData: (state) => {
      state.loadData = !state.loadData;
    },
    isAuthPage: (state, action) => {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { reLoadData, isAuthPage } = loadDataSlice.actions;

export const selectLoadData = (state) => state.load.loadData;
export const selectIsAuth = (state) => state.load.isAuth;

export default loadDataSlice.reducer;
