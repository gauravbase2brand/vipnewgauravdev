"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const sliderdata = [
  { id: 1, leftimg: `/assets/img/vip-images/parshant pandit ji.avif` },
  { id: 2, leftimg: `/assets/img/vip-images/gauravtali.jpg` },
  { id: 3, leftimg: `/assets/img/vip-images/ramnish rajput.avif` },
  { id: 4, leftimg: `/assets/img/vip-images/rishav lala.jpeg` },
];

export default function NumerologyPandits() {
  const apiData = process.env.NEXT_PUBLIC_IMAGES;
  const [slideitem, setSlideItem] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setSlideItem(1.5);
      } else if (window.innerWidth < 1025) {
        setSlideItem(2);
      } else {
        setSlideItem(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="lg:py-9 pt-5">
        <div className="relative container-os  ">
          <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%]  mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6">
            Connect with the Wisdom of
            <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
              Pandits & Gurus
            </span>
            <br />
            Find Your Perfect
            <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
              Numerology
            </span>
            Number
          </h2>

          <Swiper
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              autoplay: false,
            }}
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            speed={1000}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={slideitem}
            centeredSlides={true} // Keep center slide focus
          >
            {sliderdata.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                {({ isActive }) => (
                  <div
                    className={`relative w-full flex justify-center transition-all duration-500 ${isActive
                        ? "scale-100 z-10 rounded-2xl"
                        : "scale-90 opacity-90"
                      }`}
                  >
                    <Image
                      src={`${apiData}${item.leftimg}`}
                      alt="Image"
                      width={1000}
                      height={1000}
                      className="rounded-lg transition-all duration-500 h-[500px]  object-cover "
                    />
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
            background: #ccc !important; /* Default inactive color */
            width: 10px !important;
            height: 10px !important;
            border-radius: 50% !important;
            transition: all 0.3s ease-in-out;
          }

          :global(.swiper-pagination-bullet-active) {
            background: var(--primary) !important; /* Active bullet */
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
    </>
  );
}
