import { keysAction } from "./keys";
import { callNotification } from "./notification-actions";
import { spinnerActions } from "./spinner";

export const fetchKeysData = () => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const fetchData = async () => {
      const response = await fetch("/api/v1/keys", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Fetching keys failed ...");
      }

      const data = await response.json();
      return data;
    };

    try {
      const keyList = await fetchData();
      dispatch(
        keysAction.replaceKeys({
          items: keyList || [],
        })
      );
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};

export const addKey = (keyItem) => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const sendRequest = async () => {
      const response = await fetch("/api/v1/keys", {
        method: "POST",
        body: JSON.stringify({
          key: keyItem,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Adding key failed ...");
      }

      dispatch(fetchKeysData());
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};

export const deleteKey = (id) => {
  return async (dispatch) => {
    dispatch(spinnerActions.showSpinner());
    const sendRequest = async function () {
      const response = await fetch("/api/v1/keys", {
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
        throw new Error("Deleting key failed ...");
      }

      dispatch(fetchKeysData());
    };

    try {
      await sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};
