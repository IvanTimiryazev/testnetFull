import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { modalActions } from "../../../store/modals";
import { callNotification } from "../../../store/notification-actions";
import MainButton from "../../Reusable/MainButton";
import Modal from "../../Reusable/Modal";
import PasswordInput from "../../Reusable/PasswordInput";

import classes from "./ChangePasswordModal.module.css";

const ChangePasswordModal = (props) => {
  const dispatch = useDispatch();

  let {
    value: enteredPasswordOld,
    hasError: passwordInputHasErrorOld,
    isValid: enteredPasswordIsValidOld,
    valueChangeHandler: passwordChangedHandlerOld,
    inputBlurHandler: passwordBlurHandlerOld,
    reset: resetPasswordInputOld,
  } = useInput((value) => value.trim().length >= 6);

  let {
    value: enteredPassword,
    hasError: passwordInputHasError,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 6);

  let {
    value: enteredPasswordRepeat,
    hasError: passwordInputHasErrorRepeat,
    isValid: enteredPasswordIsValidRepeat,
    valueChangeHandler: passwordChangedHandlerRepeat,
    inputBlurHandler: passwordBlurHandlerRepeat,
    reset: resetPasswordInputRepeat,
  } = useInput((value) => value.trim().length >= 6);

  const resetForm = () => {
    resetPasswordInputOld();
    resetPasswordInput();
    resetPasswordInputRepeat();
  };

  let validationError;
  if (
    passwordInputHasErrorOld ||
    passwordInputHasError ||
    passwordInputHasErrorRepeat
  ) {
    validationError = true;
  }

  let formIsValid = false;
  if (enteredPasswordIsValid && enteredPassword === enteredPasswordRepeat) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const sendRequest = async () => {
      const response = await fetch("api/v1/edit_password", {
        method: "PUT",
        body: JSON.stringify({
          current_password: enteredPasswordOld,
          password: enteredPassword,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      document.activeElement.blur();
      resetPasswordInputOld();
      resetPasswordInput();
      resetPasswordInputRepeat();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Wrong current password.");
        } else {
          throw new Error("Something went wrong. Please try again.");
        }
      }

      dispatch(modalActions.closeModal());
      dispatch(
        callNotification(
          "success",
          "Your password has been changed successfully!"
        )
      );
    };

    try {
      sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };

  return (
    <Modal modalType="changePassword" reset={resetForm} show={props.show}>
      <div className={classes.container}>
        <span className={classes.title}>Change password</span>
        <form onSubmit={submitHandler}>
          <div className="inputsContainer">
            <PasswordInput
              inputType="password"
              enteredPassword={enteredPasswordOld}
              passwordInputHasError={passwordInputHasErrorOld}
              enteredPasswordIsValid={enteredPasswordIsValidOld}
              passwordChangedHandler={passwordChangedHandlerOld}
              passwordBlurHandler={passwordBlurHandlerOld}
              resetPasswordInput={resetPasswordInputOld}
              placeholder="Current password"
            />
            <PasswordInput
              inputType="password"
              enteredPassword={enteredPassword}
              passwordInputHasError={passwordInputHasError}
              enteredPasswordIsValid={enteredPasswordIsValid}
              passwordChangedHandler={passwordChangedHandler}
              passwordBlurHandler={passwordBlurHandler}
              resetPasswordInput={resetPasswordInput}
              placeholder="New password"
            />
            <PasswordInput
              inputType="password"
              enteredPassword={enteredPasswordRepeat}
              passwordInputHasError={passwordInputHasErrorRepeat}
              enteredPasswordIsValid={enteredPasswordIsValidRepeat}
              passwordChangedHandler={passwordChangedHandlerRepeat}
              passwordBlurHandler={passwordBlurHandlerRepeat}
              resetPasswordInput={resetPasswordInputRepeat}
              placeholder="New password"
            />
          </div>
          {validationError && (
            <span className={classes.errorText}>
              Password can't be less then 6 symbols.
            </span>
          )}
          <MainButton title="Confirm" type="submit" disabled={!formIsValid} />
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
