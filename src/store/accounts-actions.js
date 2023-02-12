import { accountsActions } from "./accounts";
import { callNotification } from "./notification-actions";
import { spinnerActions } from "./spinner";

export const fetchAccountsData = () => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const fetchData = async () => {
      const response = await fetch("/api/v1/accounts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Fetching accounts failed ...");
      }

      const data = await response.json();
      return data;
    };

    try {
      const accountsList = await fetchData();
      dispatch(
        accountsActions.replaceAccounts({
          items: accountsList || [],
        })
      );
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};

export const addAccount = (accountName) => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const sendRequest = async function () {
      const response = await fetch("/api/v1/accounts", {
        method: "POST",
        body: JSON.stringify({
          account: accountName,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Adding account failed ...");
      }

      dispatch(fetchAccountsData());
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const sendRequest = async function () {
      const response = await fetch("/api/v1/accounts", {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Deleting account failed ...");
      }

      dispatch(fetchAccountsData());
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};
