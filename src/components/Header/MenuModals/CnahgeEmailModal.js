import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../../hooks/use-input";
import { modalActions } from "../../../store/modals";
import { callNotification } from "../../../store/notification-actions";
import MainButton from "../../Reusable/MainButton";
import Modal from "../../Reusable/Modal";
import EmailInput from "../../Reusable/PasswordInput";

import classes from "./ChangePasswordModal.module.css";

const ChangeEmailModal = (props) => {
  const dispatch = useDispatch();

  let {
    value: enteredEmail,
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) =>
      value.includes("@") && value.includes(".") && value.trim().length >= 6
  );

  let {
    value: enteredEmailRepeat,
    hasError: emailInputHasErrorRepeat,
    isValid: enteredEmailIsValidRepeat,
    valueChangeHandler: emailChangedHandlerRepeat,
    inputBlurHandler: emailBlurHandlerRepeat,
    reset: resetEmailInputRepeat,
  } = useInput(
    (value) =>
      value.includes("@") && value.includes(".") && value.trim().length >= 6
  );

  const resetForm = () => {
    resetEmailInput();
    resetEmailInputRepeat();
  };

  let validationError;
  if (emailInputHasError || emailInputHasErrorRepeat) {
    validationError = true;
  }

  let formIsValid = false;
  if (enteredEmailIsValid && enteredEmail === enteredEmailRepeat) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const sendRequest = async () => {
      const response = await fetch("api/v1/edit_profile", {
        method: "PUT",
        body: JSON.stringify({
          email: enteredEmail,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      document.activeElement.blur();
      resetEmailInput();
      resetEmailInputRepeat();

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      dispatch(modalActions.closeModal());
      dispatch(
        callNotification("success", "Your email has been changed successfully!")
      );
    };

    try {
      sendRequest();
    } catch (err) {
      dispatch(callNotification("error", err.message));
    }
  };

  return (
    <Modal modalType="changeEmail" reset={resetForm} show={props.show}>
      <div className={classes.container}>
        <span className={classes.title}>Change email</span>
        <form onSubmit={submitHandler}>
          <div className="inputsContainer">
            <EmailInput
              inputType="email"
              enteredEmail={enteredEmail}
              emailInputHasError={emailInputHasError}
              enteredEmailIsValid={enteredEmailIsValid}
              emailChangedHandler={emailChangedHandler}
              emailBlurHandler={emailBlurHandler}
              resetEmailInput={resetEmailInput}
              placeholder="New email"
            />
            <EmailInput
              inputType="email"
              enteredEmail={enteredEmailRepeat}
              emailInputHasError={emailInputHasErrorRepeat}
              enteredEmailIsValid={enteredEmailIsValidRepeat}
              emailChangedHandler={emailChangedHandlerRepeat}
              emailBlurHandler={emailBlurHandlerRepeat}
              resetEmailInput={resetEmailInputRepeat}
              placeholder="Repeat email"
            />
          </div>
          {validationError && (
            <span className={classes.errorText}>
              Enter correct email please.
            </span>
          )}
          <MainButton title="Confirm" type="submit" disabled={!formIsValid} />
        </form>
      </div>
    </Modal>
  );
};

export default ChangeEmailModal;
