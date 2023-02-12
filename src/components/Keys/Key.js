import React from "react";

import classes from "./Key.module.css";
import { deleteKey } from "../../store/keys-actions";
import { useDispatch } from "react-redux";

const Key = (props) => {
  const dispatch = useDispatch();

  const removeKeyHandler = () => {
    const id = props.id;
    dispatch(deleteKey(id));
  };

  return (
    <li className={classes.key}>
      <span className={classes.key__text}>{props.title}</span>
      <span onClick={removeKeyHandler} className={classes.key__delete}></span>
    </li>
  );
};

export default Key;
