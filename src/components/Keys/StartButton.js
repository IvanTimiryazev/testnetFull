import React from "react";
import classes from "./StartButton.module.css";
import SectionBottom from "../Layout/SectionBottom";
import MainButton from "../Reusable/MainButton";
import { fetchTweetsData } from "../../store/tweets-actions";
import { useDispatch, useSelector } from "react-redux";

const StartButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.tweetsList.isLoading);

  const getTweets = () => {
    dispatch(fetchTweetsData());
  };

  return (
    <SectionBottom>
      <div className={classes.startButton}>
        <MainButton
          title="Start Search"
          onClick={getTweets}
          disabled={isLoading}
        />
      </div>
    </SectionBottom>
  );
};

export default StartButton;
