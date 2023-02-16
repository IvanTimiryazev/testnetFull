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
        timeout: 100,
      });
      dispatch(tweetsActions.hideLoading());

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Parcing failed... Please try again.");
      }

      return data;
    };

    try {
      const tweets = await sendRequest();
      if (tweets.length === 0) {
        dispatch(callNotification("error", "No tweets found by your order."));
      }
      dispatch(
        tweetsActions.replaceTweets({
          items: tweets || [],
        })
      );
    } catch (err) {
      dispatch(callNotification("error", err.message));
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
      return data;
    };

    try {
      const tweets = await sendRequest();
      dispatch(
        tweetsActions.replaceTweets({
          items: tweets || [],
        })
      );
      if (tweets.length > 0) {
        dispatch(
          callNotification("loaded", "Previous successful result loaded.")
        );
      }
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };
};
