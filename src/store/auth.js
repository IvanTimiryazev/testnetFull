import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    error: null,
    rememberMe: true,
  },
  reducers: {
    logIn(state, action) {
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    },

    logOut(state) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        rememberMe: true,
      };
    },

    rememberMeHandler(state) {
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };
    },

    showError(state, action) {
      const message = action.payload;
      return {
        ...state,
        error: { errorMessage: message },
      };
    },

    removeError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
