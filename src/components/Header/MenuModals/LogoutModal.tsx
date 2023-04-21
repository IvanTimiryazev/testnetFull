import React from "react";
import classes from "./LogoutModal.module.scss";
import Modal from "../../Reusable/Modal";
import MainButton from "../../Reusable/MainButton";
import { modalActions } from "../../../store/Modals/modalsSlice";
import { useAppDispatch } from "../../../hooks/ts-hooks";
import { authActions } from "../../../store/Authetication/authSlice";

interface ILogoutModalProps {
  show: boolean;
}

const LogoutModal = ({ show }: ILogoutModalProps) => {
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(modalActions.closeModal());
    dispatch(authActions.logOut());
  };

  return (
    <Modal modalType="logout" show={show}>
      <div className={classes.container}>
        <div className={classes.title}>Do you want to log out?</div>
        <MainButton title="Log Out" onClick={logoutHandler} />
      </div>
    </Modal>
  );
};

export default LogoutModal;
