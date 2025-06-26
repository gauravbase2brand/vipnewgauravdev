import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import debounce from "lodash/debounce";
import "../home/FeaturedNumber/FeaturedNumber.css";
import "../Shared/TabNumbers/TabNumberData/TabNumberData.css";
import ClientVideo from "../ClientVideo/ClientVideo";
import VipSlider from "react-slick";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";

const OrderPlacementQuestions = () => {
  const [slideitem, setSlideItem] = useState(3);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 767); // Detect if sc
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Attach event listener
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
      handleResize.cancel(); // Cancel pending debounce calls
    };
  }, []);
  // Unique slides data (ensure it's not repeated)
  const slides = [
    { id: 0, title: "Delivery Process?", back: "deliveryClick" },
    { id: 1, title: "Trust Issue?", back: "trustclick" },
    { id: 2, title: "I am Hestiate to Buy", back: "hesitateclick" },
    { id: 3, title: "Prepaid/Postpaid", back: "prepaidclick" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setSlideItem(2);
      } else if (window.innerWidth < 1220) {
        setSlideItem(2);
      }else if (window.innerWidth < 1730) {
        setSlideItem(3);
      }else {
        setSlideItem(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleClick = (index) => {
    if (index === 0) {
      window.activeVideoId = 1;
      window.dispatchEvent(new Event("openVideo"));
    }

    if (index === 1) {
      window.activeVideoId = 2;
      window.dispatchEvent(new Event("trustInfoVideo"));
    }
    if (index === 2) {
      window.activeVideoId = 3;
      window.dispatchEvent(new Event("openInfoVideo"));
    }
    if (index === 3) {
      setShowPopup(true); // Show popup when Prepaid/Postpaid is clicked
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <div className="">
        <div className="cart-videoPopup">
          <ClientVideo />
        </div>
        {/* <MainHeading MainHeading="Questions?" /> */}
        <h2 className="lg:text-[20px] text-primary text-lg lg:p-1   font-semibold cursor-pointer text-left ">
          Questions
        </h2>
        {isMobile ? (
          // <div className="featured-number-row-os">
          //   <div className="scroll__slider">
          //     {slides?.map((item, index) => (
          //       <div className="slide__flex__data" key={index}>
          //         <div
          //           className="border-2  bg-lightsecondary rounded-lg p-[5px] text-center shadow-sm hover:shadow-md transition-all w-full  flex justify-center items-center flex-col  cursor-pointer border-primary"
          //           onClick={() => handleClick(index)}
          //         >
          //           <h3 className="font-medium md:text-lg text-sm">
          //             {item.title}
          //           </h3>
          //           <button
          //             type="button"
          //             className="text-[#0A0A0A] lg:text-[16px] text-[14px] font-normal  capitalize"
          //           >
          //             Click Here
          //           </button>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </div>
          <div className="container-os" id="delivery-video">
            <div className="clientVideo-rs">
              <VipSlider {...sliderSettings}>
                {slides?.map((item, index) => (
                  <div
                    key={item.id}
                    className="VideoCard-os client-mainVideo-rs "
                  >
                    <div className="flex mt-1 relative">
                      <div className="videoThumbnail-os">
                        <Image
                          src={`${panelImg}/assets/img/vip-images/${item.back}.webp`}
                          alt="Thumbnail Image"
                          width={700}
                          height={400}
                          priority="true"
                          onClick={() => handleClick(index)}
                          className="cursor-pointer"
                        />
                      </div>
                      <IoIosPlayCircle color="red" fontSize={25} className="icon-handle-v" onClick={() => handleClick(index)}/>
                    </div>
                  </div>
                ))}
              </VipSlider>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            //   pagination={{ type: "bullets" }}
            loop
            slidesPerView={slideitem}
          >
            {slides.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center w-full">
                <div
                  className="border-2 rounded-lg p-[8px] text-center shadow-sm hover:shadow-md transition-all w-full flex justify-center items-center flex-col  cursor-pointer border-primary"
                  style={{
                    backgroundImage: `url(${panelImg}/assets/img/vip-images/${item.back}.webp)`,
                    backgroundRepeat: "no-repeat", // Prevent repeating the background image
                    backgroundPosition: "center",
                    backgroundSize: "cover", // Ensure the background image covers the whole div
                    minHeight: "85px", // Set a minimum height for each card to maintain a uniform appearance
                    minWidth: "230px",
                  }}
                  onClick={() => handleClick(index)}
                >
                  {/* <h3 className="font-semibold text-lg">{item.title}</h3>
                  <button
                    type="button"
                    className="text-darktext font-medium mt-2 focus:outline-none"
                  >
                    Click Here
                  </button> */}
                  <IoIosPlayCircle color="red" fontSize={25} onClick={() => handleClick(index)}/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-4 md:p-6 rounded-lg max-w-lg  shadow-lg m-[10px]">
              <p className="text-gray-600 text-sm md:text-[16px]">
                Our any number is Portable (can be activated) to any state, any
                operator and any nature (Prepaid/Postpaid) as customer choice
                through MNP process.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary hover:text-darktext float-right"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPlacementQuestions;
