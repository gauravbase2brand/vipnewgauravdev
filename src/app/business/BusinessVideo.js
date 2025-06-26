import React, { useState } from "react";
import "../Shared/VideoCard/VideoCard.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
const BusinessVideo = () => {
  const [videoVisible, setVideoVisible] = useState(false);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const videoLink =
    "https://www.youtube.com/embed/KtWcbZYXz1c?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1";
  return (
    <div className="VideoCard-os">
      <div className="VideoTestimonial-col-os-1">
        <div
          className="videoThumbnail-os"
          style={{ position: "relative", width: "100%", height: "auto" }}
        >
          <Image
            src={`${panelImg}/assets/img/vip-images/bussiness-qrImg_vmywwg.webp`}
            alt="Become a vip partner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "3px",
            }}
            width={1000}
            height={100}
            priority="true"
          />
          {videoVisible ? (
            <iframe
              width="100%"
              height="100%"
              src={videoLink}
              allow="autoplay"
              allowFullScreen
              autoPlay // Add autoPlay attribute
              style={{ position: "absolute", top: 0, left: 0 }}
            ></iframe>
          ) : (
            <div
              className="playIcon-os test_ankit "
              onClick={() => setVideoVisible(true)}
            >
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ color: "#ea0606", fontSize: "3rem" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessVideo;
