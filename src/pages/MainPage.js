import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainHeader from "../components/Header/MainHeader";
import FollowingsSection from "../components/Followings/FollowingsSection";
import TweetsSection from "../components/Tweets/TweetsSection";
import KeySection from "../components/Keys/KeySection";
import Notification from "../components/Notification/Notification";
import { fetchKeysData } from "../store/keys-actions";
import { fetchAccountsData } from "../store/accounts-actions";
import { fetchLastResult } from "../store/tweets-actions";
import SmallSpinner from "../components/Reusable/SmallSpinner";

const MainPage = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);
  const showSpinner = useSelector((state) => state.spinner.show);
  const showNotification = useSelector(
    (state) => state.notification.showNotification
  );

  // *** KEYS ***
  useEffect(() => {
    dispatch(fetchKeysData());
  }, [dispatch]);

  // *** ACCOUNTS ***
  useEffect(() => {
    dispatch(fetchAccountsData());
  }, [dispatch]);

  // *** LAST TWEETS ***
  useEffect(() => {
    dispatch(fetchLastResult());
  }, [dispatch]);

  return (
    <>
      <Notification
        show={showNotification}
        status={notification.status}
        message={notification.message}
      />
      {showSpinner ? <SmallSpinner /> : ""}
      <MainHeader />
      <main>
        <FollowingsSection />
        <TweetsSection />
        <KeySection />
      </main>
    </>
  );
};

export default MainPage;
