import React, { useState } from "react";

import classes from "./PasswordInput.module.css";

const PasswordInput = (props) => {
  const [passwordType, setPasswordType] = useState(true);

  let passwordTypeValue;
  if (props.inputType === "email") {
    passwordTypeValue = "text";
  } else if (props.inputType === "password") {
    passwordTypeValue = passwordType ? "password" : "text";
  }

  const seePasswordHandler = () => {
    setPasswordType((prev) => !prev);
  };

  const passwordInputClasses =
    props.passwordInputHasError || props.emailInputHasError || props.isError
      ? `formInput wrongCredentials`
      : `formInput`;

  const seePasswordClasses = passwordType
    ? `${classes.seePassword}`
    : `${classes.seePassword} ${classes.seeText}`;

  let inputOption;
  if (props.inputType === "email") {
    inputOption = (
      <input
        type={passwordTypeValue}
        placeholder={props.placeholder}
        className={passwordInputClasses}
        value={props.enteredEmail}
        onChange={props.emailChangedHandler}
        onBlur={props.emailBlurHandler}
      />
    );
  }
  if (props.inputType === "password") {
    inputOption = (
      <input
        type={passwordTypeValue}
        placeholder={props.placeholder}
        className={passwordInputClasses}
        value={props.enteredPassword}
        onChange={props.passwordChangedHandler}
        onBlur={props.passwordBlurHandler}
      />
    );
  }

  return (
    <div className={classes.passwordInput}>
      {inputOption}
      {props.inputType === "password" ? (
        <div className={seePasswordClasses} onClick={seePasswordHandler}></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PasswordInput;
