import React from "react";

import classes from "./Tweet.module.css";

const Tweet = (props) => {
  let tweetDate;
  if (props.item.date) {
    tweetDate = props.item.date.split(", ").pop().split(" 2023")[0];
  }

  return (
    <li className={classes.tweet_post}>
      <div>
        <img
          src={props.item.profile_image_url}
          alt="Profile image"
          className={classes.user__avatar}
        />
      </div>
      <div className={classes.tweet__text_content}>
        <div className={classes.tweet__post_info}>
          <span className={classes.twitter__name}>
            {props.item.display_name}
          </span>
          <span className={classes.twitter__handle}>
            @{props.item.username}
          </span>
          <span className={classes.twitter__handle}>&bull; </span>
          <span className={classes.twitter__handle}>{tweetDate}</span>
          <a
            href={props.item.url}
            target="_blank"
            rel="noreferrer"
            className={classes.visitOriginal}
          >
            {" "}
          </a>
        </div>
        <div className={classes.tweet__post_content}>{props.item.content}</div>
      </div>
    </li>
  );
};

export default Tweet;
