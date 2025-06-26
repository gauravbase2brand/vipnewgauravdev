import React, { useEffect, useState } from "react";
import VipSlider from "react-slick";
import "../Shared/VideoCard/VideoCard.css";
import Popup from "../videoPopup/Popup";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import delivery from "../../../public/assets/VIP-Thumbnail_2.webp";
import trust from "../../../public/assets/VIP-Thumbnail.webp";
const ClientVideo = () => {
  const [activeVideo, setActiveVideo] = useState(null); // Track which video is active
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  // const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const videoCard = [
    {
      id: 1,
      // videoThumbnail: `${panelImg}/assets/img/vip-images/DeliveryProcess_wec3kk.webp`,
      videoThumbnail: delivery,
      videoLink: "https://www.youtube.com/embed/C85ubol67QM",
    },
    {
      id: 2,
      // videoThumbnail: `${panelImg}/assets/img/vip-images/DeliveryTrust_tbgcfg.webp`,
      videoThumbnail: trust,
      videoLink: "https://www.youtube.com/embed/u6LFBreB3lc",
    },
    {
      id: 3,
      videoThumbnail: "",
      videoLink: "https://www.youtube.com/embed/HbQ1eeq71Jg",
    },
  ];

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true, // Added to loop the slider indefinitely
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000, // Optionally, set speed for autoplay
    lazyLoad: "ondemand",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: true, // Keep center mode for mobile
          centerPadding: "50px",
        },
      },
    ],
  };

  const openModal = (id) => {
    setActiveVideo(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
  };

  useEffect(() => {
    const handleOpenVideo = () => {
      const videoId = window.activeVideoId || null;
      if (videoId) {
        openModal(videoId);
      }
    };

    window.addEventListener("openVideo", handleOpenVideo);
    return () => {
      window.removeEventListener("openVideo", handleOpenVideo);
    };
  }, []);

  useEffect(() => {
    const handleInfoVideo = () => {
      const videoId = window.activeVideoId || null;
      if (videoId) {
        openModal(videoId);
      }
    };

    window.addEventListener("trustInfoVideo", handleInfoVideo);
    return () => {
      window.removeEventListener("trustInfoVideo", handleInfoVideo);
    };
  }, []);

  useEffect(() => {
    const handleInfoVideo = () => {
      const videoId = window.activeVideoId || null;
      if (videoId) {
        openModal(videoId);
      }
    };

    window.addEventListener("openInfoVideo", handleInfoVideo);
    return () => {
      window.removeEventListener("openInfoVideo", handleInfoVideo);
    };
  }, []);

  return (
    <div className="container-os" id="delivery-video">
      <div className="clientVideo-rs">
        <VipSlider {...sliderSettings}>
          {videoCard.slice(0, 2).map((item) => (
            <div key={item.id} className="VideoCard-os client-mainVideo-rs ">
              <div className="flex mt-1">
                <div className="videoThumbnail-os">
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
        </VipSlider>
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

export default ClientVideo;
