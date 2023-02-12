import { createSlice } from "@reduxjs/toolkit";

const tweetsInitialState = {
  items: [],
  isLoading: false,
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: tweetsInitialState,
  reducers: {
    replaceTweets(state, action) {
      return {
        ...state,
        items: action.payload.items,
      };
    },
    showLoading(state) {
      return {
        state,
        isLoading: true,
      };
    },
    hideLoading(state) {
      return {
        state,
        isLoading: false,
      };
    },
  },
});

export const tweetsActions = tweetsSlice.actions;

export default tweetsSlice.reducer;
