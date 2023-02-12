import React from "react";

import classes from "./TweetsList.module.css";
import Content from "../Layout/Content";
import Tweet from "./Tweet";
import LoadingSpinner from "../Reusable/LoadingSpinner";
import { useSelector } from "react-redux";

const TweetsList = () => {
  const tweets = useSelector((state) => state.tweetsList.items);
  const isLoading = useSelector((state) => state.tweetsList.isLoading);

  let listContent;
  if (isLoading) {
    listContent = (
      <div className={classes.loading}>
        <LoadingSpinner />
        <p>Please wait. It could take some time.</p>
      </div>
    );
  }
  if ((!tweets || tweets?.length === 0) && !isLoading) {
    listContent = (
      <p className={classes.noAccounts}>Please add twitter accounts & keys.</p>
    );
  }
  if (tweets?.length > 0 && !isLoading) {
    listContent = (
      <ul className={classes.tweets__list}>
        {tweets.map((item) => (
          <Tweet key={item.url} item={item} />
        ))}
      </ul>
    );
  }

  return <Content>{listContent}</Content>;
};

export default TweetsList;
