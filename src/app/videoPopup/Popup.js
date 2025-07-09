import React from "react";
import "../Shared/VideoCard/VideoCard.css";
const Popup = ({ isModalOpen, closeModal, activeVideo, videoCard }) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content vip__video__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={`${
                videoCard.find((video) => video.id === activeVideo)?.videoLink
              }?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1`}
              allow="autoplay"
              allowFullScreen
              autoPlay
            ></iframe>
            {/* <button className="close-modal cls__icon" onClick={closeModal} aria-label="cross">
              x
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
