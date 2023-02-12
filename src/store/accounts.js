import { createSlice } from "@reduxjs/toolkit";

const accountsInitialState = {
  items: [],
};

const accountsSlice = createSlice({
  name: "accountsList",
  initialState: accountsInitialState,
  reducers: {
    replaceAccounts(state, action) {
      return {
        ...state,
        items: action.payload.items,
      };
    },
  },
});

export const accountsActions = accountsSlice.actions;

export default accountsSlice.reducer;
