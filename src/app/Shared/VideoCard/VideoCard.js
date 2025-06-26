import React, { useContext, useEffect, useState } from "react";
import "./VideoCard.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const VideoCard = ({ videoLink, videoThumbnail, isPlaying, onPlay }) => {

  const { skeleton } = useContext(AppStateContext);
  const [videoVisible, setVideoVisible] = useState(false);
  // const modifiedVideoLink = `${videoLink}?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1&loop=1&playlist=${videoLink.split('/').pop()}`;
  useEffect(() => {
    if (!isPlaying) {
      setVideoVisible(false);
    }
  }, [isPlaying]);

  const handleVideoClick = () => {
    onPlay();
    setVideoVisible(true);
  };

  return (
    <div className="VideoCard-os">
      <div className="VideoTestimonial-col-os-1 gk">
        {
          skeleton ? (
            <div className="bg-gray-200 p-4 w-full">
              <div className=" relative w-full h-64 bg-gray-200 animate-pulse rounded-lg">
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 animate-pulse "></div>
                </div>
              </div>
            </div>
          ) : (<div
            className="videoThumbnail-os 331"
            style={{ position: "relative", width: "100%", height: "auto" }}
          >
            <Image
              src={videoThumbnail}
              alt="Thumbnail Image"
              width={1280}
              height={1080}
              priority="true"
              onClick={handleVideoClick}
              className="cursor-pointer"
            />
            {videoVisible ? (
              <iframe
                width="100%"
                height="100%"
                src={`${videoLink}?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1`}
                allow="autoplay"
                allowFullScreen
                autoPlay // Add autoPlay attribute
                style={{ position: "absolute", top: 0, left: 0 }}
              ></iframe>
            ) : (
              // <div className="playIcon-os" onClick={handleVideoClick}>
              <FontAwesomeIcon icon={faYoutube} className="playIcon-os" style={{ color: "#ea0606", fontSize: "3rem" }} onClick={handleVideoClick} />
              // </div>
            )}
          </div>)
        }
      </div>
    </div>
  );
};

export default VideoCard;
