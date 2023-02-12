import { createSlice } from "@reduxjs/toolkit";

const keysInitialState = {
  items: [],
};

const keysSlice = createSlice({
  name: "keyList",
  initialState: keysInitialState,
  reducers: {
    replaceKeys(state, action) {
      return {
        ...state,
        items: action.payload.items,
      };
    },
  },
});

export const keysAction = keysSlice.actions;

export default keysSlice.reducer;
