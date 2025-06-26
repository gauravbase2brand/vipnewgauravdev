import React from "react";
import { Modal, Button } from "antd";
import "./DeleteModal.css";

const DeleteModal = ({
  showConfirmationModalss,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <section className="LogoutModal-section-os">
      <Modal
        className="LogoutModal-data-os"
        open={showConfirmationModalss}
        onCancel={handleCancelDelete} // Function to handle the modal close (by clicking the close icon or mask).
        footer={[
          <Button
            className={`yes-logout ${handleCancelDelete ? "" : "active"}`}
            key="cancel"
            onClick={handleCancelDelete}
            aria-label="Cancel"
          >
            Cancel
          </Button>,
          <Button
            className={`yes-logout ${handleCancelDelete ? "" : "active"}`}
            key="confirm"
            type="primary"
            onClick={handleConfirmDelete}
            aria-label="Confirm"
          >
            Confirm
          </Button>,
        ]}
      >
        <div className="LogoutModal-top-icon-os">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                d="M39.3914 33.3305H35.869C35.6285 33.3305 35.403 33.4357 35.2527 33.6211C34.902 34.047 34.5262 34.4579 34.1304 34.8487C32.5114 36.4692 30.5938 37.7607 28.4835 38.6517C26.2973 39.5751 23.9474 40.0488 21.5741 40.0446C19.1741 40.0446 16.8492 39.5736 14.6646 38.6517C12.5543 37.7607 10.6367 36.4692 9.01779 34.8487C7.39597 33.2336 6.10277 31.3194 5.20982 29.2119C4.28288 27.0273 3.8169 24.7075 3.8169 22.3074C3.8169 19.9074 4.28789 17.5876 5.20982 15.403C6.10169 13.2936 7.38437 11.3946 9.01779 9.76618C10.6512 8.13777 12.5502 6.85509 14.6646 5.96322C16.8492 5.04129 19.1741 4.5703 21.5741 4.5703C23.9741 4.5703 26.299 5.03628 28.4835 5.96322C30.598 6.85509 32.497 8.13777 34.1304 9.76618C34.5262 10.162 34.897 10.5729 35.2527 10.9938C35.403 11.1791 35.6335 11.2844 35.869 11.2844H39.3914C39.7071 11.2844 39.9025 10.9336 39.7271 10.6681C35.884 4.69556 29.16 0.742287 21.519 0.762329C9.51383 0.792392 -0.111325 10.5378 0.00892711 22.5279C0.129179 34.3276 9.7393 43.8526 21.5741 43.8526C29.195 43.8526 35.8891 39.9043 39.7271 33.9468C39.8974 33.6813 39.7071 33.3305 39.3914 33.3305ZM43.8457 21.9918L36.7358 16.38C36.4703 16.1696 36.0845 16.36 36.0845 16.6957V20.5037H20.3515C20.1311 20.5037 19.9507 20.684 19.9507 20.9045V23.7104C19.9507 23.9308 20.1311 24.1112 20.3515 24.1112H36.0845V27.9192C36.0845 28.2549 36.4753 28.4453 36.7358 28.2349L43.8457 22.6231C43.8936 22.5856 43.9324 22.5377 43.959 22.483C43.9857 22.4283 43.9995 22.3683 43.9995 22.3074C43.9995 22.2466 43.9857 22.1866 43.959 22.1319C43.9324 22.0772 43.8936 22.0293 43.8457 21.9918Z"
                fill="white"
              />
            </svg>
          </span>
          <div className="LogoutModal-top-line-os"></div>
        </div>
        <div className="LogoutModal-content-os">
          <h3>Delete Your Account?</h3>
          <p> Are you sure you want to delete your profile?</p>
        </div>
        <div className="LogoutModal-btns-os"></div>
      </Modal>
    </section>
  );
};

export default DeleteModal;
