import React from "react";

import classes from "./KeysList.module.css";
import Key from "./Key";

const KeysList = (props) => {
  const keys = props.keys;

  return (
    <ul className={classes.keys__list}>
      {keys.map((key) => (
        <Key key={key.id} id={key.id} title={key.key} />
      ))}
    </ul>
  );
};

export default KeysList;
