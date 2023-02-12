import { notificationActions } from "./notification";

export const callNotification = (status, message) => {
  return (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: status,
        message: message,
      })
    );
    setTimeout(() => {
      dispatch(notificationActions.hideNotification());
    }, 2500);
    setTimeout(() => {
      dispatch(notificationActions.resetNotification());
    }, 4000);
  };
};
