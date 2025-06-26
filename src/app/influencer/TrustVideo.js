import React, { useState } from "react";
import Popup from "../videoPopup/Popup";
import trust from "../../../public/assets/VIP-Thumbnail.webp";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
const TrustVideo = () => {
  const [activeVideo, setActiveVideo] = useState(null); // Track which video is active
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoCard = [
    {
      id: 0,
      videoThumbnail: trust,
      videoLink: "https://www.youtube.com/embed/u6LFBreB3lc",
    },
  ];
  const openModal = (id) => {
    setActiveVideo(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
          {videoCard.slice(0, 2).map((item) => (
            <div key={item.id} className="VideoCard-os client-mainVideo-rs ">
              <div className="">
                <div className="flex items-center justify-center relative h-auto border-2 border-primary rounded-[20px] overflow-hidden">
                  <Image
                    src={item.videoThumbnail}
                    alt="Thumbnail Image"
                    width={700}
                    height={400}
                    priority="true"
                    onClick={() => openModal(item.id)}
                    className="cursor-pointer"
                  />
                  <div
                    className="playIcon-os"
                    onClick={() => openModal(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={faYoutube}
                      style={{ color: "#ea0606", fontSize: "3rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Popup
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        activeVideo={activeVideo}
        videoCard={videoCard}
      />
    </div>
  );
};

export default TrustVideo;
