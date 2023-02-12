import { callNotification } from "./notification-actions";
import { tweetsActions } from "./tweets";

export const fetchTweetsData = () => {
  return async (dispatch) => {
    dispatch(tweetsActions.showLoading());
    const sendRequest = async () => {
      const response = await fetch("/api/v1/parsing", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(tweetsActions.hideLoading());

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Parcing failed... Please try again.");
      }

      // console.log(data);
      return data;
    };

    try {
      const tweets = await sendRequest();
      dispatch(
        tweetsActions.replaceTweets({
          items: tweets || [],
        })
      );
    } catch (err) {
      // dispatch(callNotification("error", err.message));
      console.log(err.message);
    }
  };
};

export const fetchLastResult = () => {
  return async (dispatch) => {
    dispatch(tweetsActions.showLoading());
    const sendRequest = async () => {
      const response = await fetch("/api/v1/last_results", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(tweetsActions.hideLoading());

      if (!response.ok) {
        throw new Error("Something went wrong ...");
      }

      const data = await response.json();
      dispatch(
        callNotification("loaded", "Previous successful result loaded.")
      );

      return data;
    };

    try {
      const tweets = await sendRequest();
      dispatch(
        tweetsActions.replaceTweets({
          items: tweets || [],
        })
      );
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};
