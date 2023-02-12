import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    show: false,
  },
  reducers: {
    showSpinner(state) {
      return {
        ...state,
        show: true,
      };
    },
    hideSpinner(state) {
      return {
        ...state,
        show: false,
      };
    },
  },
});

export const spinnerActions = spinnerSlice.actions;

export default spinnerSlice.reducer;
