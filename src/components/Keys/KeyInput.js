import React, { useRef } from "react";

import classes from "./KeyInput.module.css";
import { addKey } from "../../store/keys-actions";
import { useDispatch, useSelector } from "react-redux";
import { callNotification } from "../../store/notification-actions";

const KeyInput = () => {
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const keys = useSelector((state) => state.keyList.items);

  const reset = () => {
    inputEl.current.value = "";
    inputEl.current.blur();
  };

  const addKeyHandler = (event) => {
    event.preventDefault();

    const inputValue = inputEl.current.value;
    const inputKey = inputValue.trim().split(" ").join("");

    if (keys.some((el) => el.key === inputKey)) {
      dispatch(callNotification("error", "You already have this key."));
      reset();
      return;
    }
    if (keys.length >= 10) {
      dispatch(callNotification("error", "You can add up to 10 keys."));
      reset();
      return;
    }
    if (inputKey !== "") {
      dispatch(addKey(inputKey));
      reset();
    }

    reset();
  };

  return (
    <form onSubmit={addKeyHandler} className={classes.add__keys}>
      <input ref={inputEl} type="text" placeholder="Add keys" />
    </form>
  );
};

export default KeyInput;
