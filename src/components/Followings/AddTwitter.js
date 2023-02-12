import React, { useRef } from "react";

import classes from "./AddTwitter.module.css";
import SectionBottom from "../Layout/SectionBottom";
import { addAccount } from "../../store/accounts-actions";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../store/notification";
import { callNotification } from "../../store/notification-actions";

const AddTwitter = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const accounts = useSelector((state) => state.accountsList.items);

  const reset = () => {
    inputEl.current.value = "";
    inputEl.current.blur();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const inputValue = inputEl.current.value;
    const inputHandle = inputValue.trim().split(" ").join("");

    if (accounts.some((el) => el.account === inputHandle)) {
      dispatch(callNotification("error", "You already have this account."));
      reset();
      return;
    }
    if (accounts.length >= 50) {
      dispatch(callNotification("error", "You can add up to 50 accounts."));
      reset();
      return;
    } else if (inputHandle.trim().length < 3 || !inputHandle.includes("@")) {
      dispatch(
        callNotification(
          "error",
          `Handle should start with "@" and can't be less then 3 symbols`
        )
      );
    } else {
      dispatch(addAccount(inputHandle));
    }

    reset();
  };

  return (
    <SectionBottom>
      <form onSubmit={formSubmitHandler} className={classes.add__followings}>
        <input type="text" placeholder="@twitterhandle" ref={inputEl} />
        <button className={classes.btn__add}>Add</button>
      </form>
    </SectionBottom>
  );
};

export default AddTwitter;
