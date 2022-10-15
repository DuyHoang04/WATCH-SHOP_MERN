import { createSlice } from "@reduxjs/toolkit";

const loadDataSlice = createSlice({
  name: "load",
  initialState: {
    loadData: false,
  },
  reducers: {
    reLoadData: (state) => {
      state.loadData = !state.loadData;
    },
  },
});

export const { reLoadData } = loadDataSlice.actions;

export const selectLoadData = (state) => state.load.loadData;

export default loadDataSlice.reducer;
