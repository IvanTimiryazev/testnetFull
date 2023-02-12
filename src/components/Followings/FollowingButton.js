import React from "react";

import classes from "./FollowingButton.module.css";
import { deleteAccount } from "../../store/accounts-actions";
import { useDispatch } from "react-redux";

const FollowingButton = (props) => {
  const dispatch = useDispatch();

  const buttonClickHandler = () => {
    const id = props.id;
    dispatch(deleteAccount(id));
  };

  return (
    <button
      onClick={buttonClickHandler}
      className={classes.btn__unfollow}
    ></button>
  );
};

export default FollowingButton;
