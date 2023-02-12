import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import accountsReducer from "./accounts";
import keysReducer from "./keys";
import tweetsReducer from "./tweets";
import modalsReducer from "./modals";
import notificationReducer from "./notification";
import spinnerReducer from "./spinner";

const store = configureStore({
  reducer: {
    auth: authReducer,
    accountsList: accountsReducer,
    keyList: keysReducer,
    tweetsList: tweetsReducer,
    modals: modalsReducer,
    notification: notificationReducer,
    spinner: spinnerReducer,
  },
});

export default store;
