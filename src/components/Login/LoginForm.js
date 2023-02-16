import React, { useCallback, useState } from "react";

import classes from "./AuthForm.module.css";
import logoMain from "../../images/LogoMain.png";
import useInput from "../../hooks/use-input";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import MainButton from "../Reusable/MainButton";
import PasswordInput from "../Reusable/PasswordInput";
import SmallSpinner from "../Reusable/SmallSpinner";
import { loginFunction } from "../../store/auth-actions";

const LoginForm = () => {
  const showSpinner = useSelector((state) => state.spinner.show);
  const dispatch = useDispatch();
  const history = useHistory();
  const rememberMe = useSelector((state) => state.auth.rememberMe);
  const isError = useSelector((state) => state.auth.error);
  const [checkBox, setCheckBox] = useState(true);

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    inputFocusHandler: emailFocusHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().length >= 1);

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 1);

  const checkBoxHandler = () => {
    setCheckBox((prev) => !prev);
    dispatch(authActions.rememberMeHandler());
  };

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logOut());
  }, [dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      loginFunction(enteredEmail, enteredPassword, rememberMe, logoutHandler)
    );

    document.activeElement.blur();
    resetEmailInput();
    resetPasswordInput();
  };

  const signInHandler = () => {
    history.replace("/register");
    dispatch(authActions.removeError());
  };

  const forgotPasswordHandle = () => {
    history.replace("/reset-password");
    dispatch(authActions.removeError());
  };

  const checkBoxClasses = !checkBox
    ? `${classes.checkBox}`
    : `${classes.checkBox} ${classes.checkedBox}`;

  const emailInputClasses =
    emailInputHasError || isError ? `formInput wrongCredentials` : `formInput`;

  return (
    <>
      {showSpinner && <SmallSpinner />}
      <div className={classes.container}>
        <form onSubmit={submitHandler} className={classes.loginForm}>
          <h1>Sign In</h1>
          <div className={classes.newUser}>
            <p>New user?</p>
            <span onClick={signInHandler}>Sign up.</span>
          </div>
          <div className="inputsContainer">
            <input
              type="email"
              placeholder="Email"
              className={emailInputClasses}
              value={enteredEmail}
              onChange={emailChangedHandler}
              onBlur={emailBlurHandler}
              onFocus={emailFocusHandler}
            />
            <PasswordInput
              inputType="password"
              enteredPassword={enteredPassword}
              passwordInputHasError={passwordInputHasError}
              enteredPasswordIsValid={enteredPasswordIsValid}
              passwordChangedHandler={passwordChangedHandler}
              passwordBlurHandler={passwordBlurHandler}
              resetPasswordInput={resetPasswordInput}
              placeholder="Password"
            />
          </div>
          {isError && (
            <p className={classes.errorText}>{isError.errorMessage}</p>
          )}
          {!isError && (
            <div className={classes.stayLoggedIn}>
              <div onClick={checkBoxHandler} className={checkBoxClasses}></div>
              <span>Remember me</span>
            </div>
          )}
          <MainButton title="Sign In" type="submit" disabled={!formIsValid} />
          {/* <span onClick={forgotPasswordHandle} className={classes.forgotPassword}>
          Forgot password?
        </span> */}
        </form>
        <img src={logoMain} alt="keysee" className={classes.mainLogo} />
      </div>
    </>
  );
};

export default LoginForm;
