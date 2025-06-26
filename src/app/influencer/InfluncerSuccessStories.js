"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";

export default function InfluncerSuccessStories() {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES;

  const sliderData = [
    { id: 0, src: "/assets/img/vip-images/vipinflunce1.mp4" },
    { id: 1, src: "/assets/img/vip-images/vipinfluncer2.mp4" },
    { id: 2, src: "/assets/img/vip-images/vipinfluncer3.mp4" },
    { id: 3, src: "/assets/img/vip-images/vipinfluncer4.mp4" },
    { id: 4, src: "/assets/img/vip-images/vipinfluncer5.mp4" },
    { id: 5, src: "/assets/img/vip-images/vipinfluncer6.mp4" },
    { id: 6, src: "/assets/img/vip-images/vipinfluncer4.mp4" },
    { id: 7, src: "/assets/img/vip-images/vidvip.mp4" },
  ];

  const [slideitem, setSlideItem] = useState(7);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setSlideItem(2);
      } else if (window.innerWidth < 1025) {
        setSlideItem(2);
      } else {
        setSlideItem(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVideoClick = (e, id) => {
    if (e.target.paused) {
      e.target.play();
      setActiveVideo(id); 
    } else {
      e.target.pause();
      setActiveVideo(null);
    }
  };

  return (
    <div className="lg:py-8 py-5 bg-primary mt-1 cursor-pointer">
      <div className="relative container-os">
        <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6 uppercase">
          <span className="text-whitetext whitespace-nowrap">
            Success Stories
          </span>
        </h2>
        <Swiper
          loop={true}
          autoplay={true}
          pagination={{
         
            type: "bullets",
          }}
          speed={1000}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={slideitem}
          centeredSlides={true}
        >
          {sliderData.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center items-center"
            >
              {({ isActive }) => (
                <div
                  className={`relative w-full flex justify-center transition-all duration-500 ${
                    isActive
                      ? "scale-100 z-10 rounded-2xl"
                      : "scale-90 opacity-90"
                  }`}
                >
                  <video
                    width="100%"
                    height="auto"
                    playsInline
                    controls={false}
                    autoPlay={isActive && activeVideo === item.id}
                    muted={activeVideo !== item.id}
                    loop
                    preload="auto"
                    onClick={(e) => handleVideoClick(e, item.id)}
                    className="rounded-lg transition-all duration-500 lg:h-[500px] w-fit h-auto object-contain border-secondary border-2"
                  >
                    <source src={`${apiUrl}${item.src}`} type="video/mp4" />
                  </video>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>{`
        /* Hide navigation buttons */
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          display: none !important;
        }

        /* Adjust pagination position */
        :global(.swiper-pagination) {
          position: relative !important;
          text-align: center;
          transition: 300ms opacity;
          transform: translate3d(0, 0, 0);
          z-index: 10;
          bottom: -5px !important;
        }

        /* Fix pagination bullet styling */
        :global(.swiper-pagination-bullet) {
          background: #ccc !important;
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease-in-out;
        }

        :global(.swiper-pagination-bullet-active) {
          background: var(--primary) !important;
          width: 20px !important;
          height: 5px !important;
          border-radius: 0 !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 20px !important;
          border-radius: unset !important;
          height: 5px !important;
        }
      `}</style>
    </div>
  );
}
