"use client";
import React, { useContext, useEffect, useState } from "react";
import "./Banner.css";
import BannerSlider from "react-slick";
import Image from "next/image";
// import usePageLoadDelay from "@/app/usePageLoadDelay";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
const Banner = () => {
  const { skeleton,setDataLoading } = useContext(AppStateContext);
  const [isMobile, setIsMobile] = useState(false);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // const [isSliderReady, setIsSliderReady] = useState(false);
  // const isPageLoaded = usePageLoadDelay(7000);
  // useEffect(() => {
  //   // Simulating the data fetching and setting slider ready
  //   if (isPageLoaded) {
  //     setTimeout(() => {
  //       setIsSliderReady(true);
  //     }, 1000); // Adjust delay as needed
  //   }
  // }, [isPageLoaded]);

  const mobileBanner = [
    {
      image: `${panelImg}/assets/img/vip-images/mobilebanner1.png`,
      alt: "International Business Award with Shilpa Shetty - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/mobilebanner2.png`,
      alt: "International Business Award with Malaika Arora - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/mobilebanner3.png`,
      alt: "International Business Award with Sonu Sood - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/mobilebanner4.png`,
      alt: "Choice is yours - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/businesstoday.png`,
       alt: "Business Today - VIP Number & VIP Mobile Numbers",
    },
  ];

  const bannerImageArray = [
    {
      image: `${panelImg}/assets/img/vip-images/banner1.webp`,
      alt: "International Business Award with Shilpa Shetty - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/bannermalika.webp`,
      alt: "International Business Award with Malaika Arora - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/bannersonusood.webp`,
      alt: "International Business Award with Sonu Sood - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/banner4desktop.webp`,
      alt: "Choice is yours - VIP Number & VIP Mobile Numbers",
    },
    {
      image: `${panelImg}/assets/img/vip-images/business.webp`,
       alt: "Business Today - VIP Number & VIP Mobile Numbers",
    },
  ];

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 576);
  //   handleResize(); // Set initial state
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  useEffect(() => {
    let timeoutId = null;
    setDataLoading(false);
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 576);
      }, 200); // 200 ms debounce
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 700,
    fade: true, // Enable fade transition
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const imagesToDisplay = isMobile ? mobileBanner : bannerImageArray;

  return (
    <section className="homepage-banner-section-os">
      <div className="container-os">
        {skeleton ? (
          <>
            <div className="">
              <div className="animate-pulse">
                <div className="h-[442px] lg:h-[300px] xl:h-[500px] 2xl:h-[550px] rounded-[20px] bg-gray-200"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="banner-slider-os">
              {/* {!isSliderReady ? (
                // Show the first image while slider is not ready
                <div className="">
                  <Image
                    src={imagesToDisplay[0]?.image}
                    alt={imagesToDisplay[0]?.alt}
                    width={isMobile ? 854 : 1920}
                    height={isMobile ? 780 : 761}
                    quality={80}
                    priority="true"
                    className="cursor-pointer rounded-tl-[20px] rounded-tr-[20px] rounded-bl-none rounded-br-none  object-[54%_15%]  sm:object-[73%_8%]  md:h-auto xl:h-[500px] lg:h-[300px] 2xl:h-[550px]"
                  />
                </div>
              ) : ( */}
              <BannerSlider className="banner-row-os" {...settings}>
                {imagesToDisplay.map((items, index) => {
                  return (
                    <div className="" key={index}>
                      <Image
                        src={items?.image}
                        alt={items?.alt}
                        width={isMobile ? 854 : 1920}
                        height={isMobile ? 780 : 761}
                        // quality={80}
                        // priority={index === 0 ? true : false}
                        className="cursor-pointer rounded-tl-[20px] rounded-tr-[20px] rounded-bl-none rounded-br-none object-[54%_15%]  sm:object-[73%_8%]  md:h-auto xl:h-[500px] lg:h-[300px] 2xl:h-[550px]"
                      />
                    </div>
                  );
                })}
              </BannerSlider>
              {/* )} */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Banner;
