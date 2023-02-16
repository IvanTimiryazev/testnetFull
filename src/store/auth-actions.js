import { authActions } from "./auth";
import { spinnerActions } from "./spinner";

export const loginFunction = (
  enteredEmail,
  enteredPassword,
  rememberMe,
  logoutHandler
) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(spinnerActions.showSpinner());
      const response = await fetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("Email or password was wrong");
      }

      const data = await response.json();
      return data;
    };

    try {
      const data = await sendRequest();
      dispatch(authActions.logIn(data.access_token));

      if (!rememberMe) {
        setTimeout(logoutHandler, 7200000);
      } else if (rememberMe) {
        setTimeout(logoutHandler, 604800000);
      }
    } catch (err) {
      dispatch(authActions.showError(err.message));
    }
  };
};

export const signupFunction = (
  enteredEmail,
  enteredPassword,
  setRegComplete
) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(spinnerActions.showSpinner());
      const response = await fetch("/api/v1/register", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(spinnerActions.hideSpinner());

      if (!response.ok) {
        throw new Error("This email already exists");
      }

      const data = await response.json();
      return data;
    };

    try {
      const data = await sendRequest();
      setRegComplete(true);
      setTimeout(() => {
        setRegComplete(false);
        dispatch(authActions.logIn(data.access_token));
      }, 2000);
    } catch (err) {
      dispatch(authActions.showError(err.message));
    }
  };
};
