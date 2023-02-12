import React from "react";

import classes from "./SmallSpinner.module.css";

const SmallSpinner = () => {
  return (
    <div className={classes.spin}>
      <div className={classes.spinner} />
    </div>
  );
};

export default SmallSpinner;
