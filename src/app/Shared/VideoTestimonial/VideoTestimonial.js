import React, { useEffect, useState } from "react";
import "./VideoTestimonial.css";
import VideoCard from "../../Shared/VideoCard/VideoCard";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import VideoSlider from "react-slick";
import usePageLoadDelay from "@/app/usePageLoadDelay";

const VideoTestimonial = () => {
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // VideoCard Array
  const videoCard = [
    {
      id: 1,
      videoThumbnail:
        `${panelImg}/assets/img/vip-images/Shilpa-youtube_gj2h0r.webp`,
      videoLink: "https://www.youtube.com/embed/X8K3EU9fYNw",
    },
    {
      id: 2,
      videoThumbnail:
        `${panelImg}/assets/img/vip-images/VideoTestimonial-thumbanil-4_z8wdwz.webp`,
      videoLink: "https://www.youtube.com/embed/9PWUxq0AVyI",
    },
    {
      id: 3,
      videoThumbnail:
        `${panelImg}/assets/img/vip-images/VideoTestimonial-thumbanil-1_adwxzg.webp`,
      videoLink: "https://www.youtube.com/embed/YGq9KNE4O6E",
    },
    {
      id: 4,
      videoThumbnail:
        `${panelImg}/assets/img/vip-images/VideoTestimonial-thumbanil-2_rsqqr0.webp`,
      videoLink: "https://www.youtube.com/embed/v8ZsRgMtzwc",
    },
    {
      id: 5,
      videoThumbnail:
        `${panelImg}/assets/img/vip-images/VideoTestimonial-thumbanil-3_zdbxax.webp`,
      videoLink: "https://www.youtube.com/embed/s4UH5i6zbX8",
    },
  ];

  // slider
  const videoSliderSettings = {
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 7000,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="VideoTestimonial-section-os">
      <div>
        <div className="VideoTestimonial-heading-os container-os">
          <MainHeading
            MainHeading="Award and Celebrities"
            justifyContent="center"
          />
        </div>
        <div className="VideoTestimonial-slider-row-os">
            <VideoSlider {...videoSliderSettings}>
              {videoCard.map((items) => {
                return (
                  <VideoCard
                    key={items.id}
                    videoThumbnail={items.videoThumbnail}
                    videoLink={items.videoLink}
                    isPlaying={currentlyPlayingVideo === items.id}
                    onPlay={() => setCurrentlyPlayingVideo(items.id)}
                  />
                );
              })}
            </VideoSlider>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonial;
