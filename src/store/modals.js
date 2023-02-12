import { createSlice } from "@reduxjs/toolkit";

const modalsInitialState = {
  showMenu: false,
  showLogoutModal: false,
  showChangeEmailModal: false,
  showChangePasswordModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState: modalsInitialState,
  reducers: {
    openMenu(state) {
      return {
        ...state,
        showMenu: true,
      };
    },
    closeMenu(state) {
      return {
        ...state,
        showMenu: false,
      };
    },
    openLogoutModal(state) {
      return {
        ...state,
        showMenu: false,
        showLogoutModal: true,
      };
    },
    openChangeEmailModal(state) {
      return {
        ...state,
        showMenu: false,
        showChangeEmailModal: true,
      };
    },
    openChangePasswordModal(state) {
      return {
        ...state,
        showMenu: false,
        showChangePasswordModal: true,
      };
    },

    closeModal(state) {
      return {
        ...state,
        showLogoutModal: false,
        showChangeEmailModal: false,
        showChangePasswordModal: false,
      };
    },
  },
});

export const modalActions = modalsSlice.actions;

export default modalsSlice.reducer;
