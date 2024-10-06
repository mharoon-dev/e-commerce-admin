import { createSlice } from "@reduxjs/toolkit";

export const WinDrawSlcie = createSlice({
  name: "windraw",
  initialState: {
    winDraws: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getWinDrawStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getWinDrawSuccess: (state, action) => {
      state.isFetching = false;
      state.winDraws = action.payload;
    },
    getWinDrawFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateWinDrawStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateWinDrawSuccess: (state, action) => {
      state.isFetching = false;
      state.winDraws[
        state.winDraws.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.winDraw;
    },
    updateWinDrawFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getWinDrawStart,
  getWinDrawSuccess,
  getWinDrawFailure,
  updateWinDrawStart,
  updateWinDrawSuccess,
  updateWinDrawFailure,
} = WinDrawSlcie.actions;

export default WinDrawSlcie.reducer;
