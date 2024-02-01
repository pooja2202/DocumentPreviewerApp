import React, { useState } from "react";
import classes from "./Popup.module.css";
import styles from "../FormSection/FormSection.module.css";

function Popup({ onClose }) {
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(true);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  // Function to handle confirm button click
  const handleConfirmClick = () => {
    setConfirmPopupOpen(false);
    setSuccessPopupOpen(true);
  };

  // Function to handle success popup close
  const handleSuccessPopupClose = () => {
    setSuccessPopupOpen(false);
    onClose();
  };

  return (
    <>
      {confirmPopupOpen && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <div>
              <h2>Confirmation</h2>
              <p>Are you sure you want to confirm the selected fields?</p>
              <div className={classes.footer}>
                <button
                  onClick={handleConfirmClick}
                  className={`${styles.w_50} ${classes.btn_confirm_config}`}
                >
                  Confirm
                </button>
                <button
                  onClick={onClose}
                  className={`${styles.w_50} ${classes.btn_close_config}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {successPopupOpen && (
        <div className={classes.popup_overlay}>
          <div className={classes.popup}>
            <div>
              <h2>Success</h2>
              <p>Fields confirmed and processed successfully!</p>
              <div className={classes.footer}>
                <button
                  onClick={handleSuccessPopupClose}
                  className={`${styles.w_50} ${classes.btn_close_config}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
