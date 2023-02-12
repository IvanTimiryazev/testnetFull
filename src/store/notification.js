import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: { status: "", message: "" },
    showNotification: false,
  },
  reducers: {
    showNotification(state, action) {
      return {
        ...state,
        showNotification: true,
        notification: {
          status: action.payload.status,
          message: action.payload.message,
        },
      };
    },
    hideNotification(state) {
      return {
        ...state,
        showNotification: false,
      };
    },
    resetNotification(state) {
      return {
        ...state,
        notification: { status: "", message: "" },
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
