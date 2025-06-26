import React, { useState } from "react";
import "../../VideoTestimonial/VideoTestimonial.css";
import VideoCard from "../../../Shared/VideoCard/VideoCard";
import VideoSlider from "react-slick";
import MainHeading from "../../../Shared/MainHeading/MainHeading";

const CityTestimonials = ({ heading, CityPunjabTestimonials }) => {
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // slider
  const videoSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: false,
    autoplaySpeed: 7000,
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
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="VideoTestimonial-section-os CityTestimonials-section-os">
      <div className="container-os">
        <div className="VideoTestimonial-heading-os">
          <MainHeading
            MainHeading={heading}
            rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
          />
        </div>
        <div className="VideoTestimonial-slider-row-os">
          <VideoSlider {...videoSliderSettings}>
            {CityPunjabTestimonials.map((items) => {
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

export default CityTestimonials;
