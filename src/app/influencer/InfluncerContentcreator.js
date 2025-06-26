"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

// Import user image


// Slider data with 5-star ratings
const sliderdata = [
  {
    id: 1,
    userImg: `/assets/img/vip-images/girlinfluncer.jpg`,
    name: "Preet Kaur",
    rating: 5,
    review: "By promoting exclusive VIP numbers to his social media audience, Preet Kaur helped drive direct sales and referrals.",
    revenue: "₹23000+",
  },

  {
    id: 2,
    userImg: `/assets/img/vip-images/tipsy.heic`,
    name: "Tipsy",
    rating: 5,
    review: "By promoting exclusive VIP numbers to his social media audience, Tipsy helped drive direct sales and referrals.",
    revenue: "₹18000+",
  },
  {
    id: 3,
    userImg: `/assets/img/vip-images/boy1.jpg`,
    name: "Deepanshu ",
    rating: 5,
    review: "With creative WhatsApp promotions and influencer collaborations, Deepanshu helped close bulk VIP number deals.",
    revenue: "₹28000+",
  },
  {
    id: 4,
    userImg: `/assets/img/vip-images/girlinfluncer221.jpg`,
    name: "Sanjana",
    rating: 5,
    review: "Sanjana created engaging Instagram reels showcasing trending VIP numbers, driving traffic and purchases through her referral link.",
    revenue: "₹35000+",
  },
  {
    id: 5,
    userImg: `/assets/img/vip-images/Image-874.jpg`,
    name: "kiranaggarwal",
    rating: 5,
    review: "kiranaggarwal story campaigns highlighting numerology benefits of VIP numbers led to increased enquiries and sales.",
    revenue: "₹14000+",
  },
  
  {
    id: 6,
    userImg: `/assets/img/vip-images/boy2.jpg`,
    name: "Mihir Lohiya",
    rating: 5,
    review: "Through unboxing videos and influencer shoutouts, Mihir Lohiya attracted high-value customers looking for premium mobile numbers.",
    revenue: "₹25000+",
  },

];

export default function InfluencerContentCreator() {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES; // Change if needed
  const [slideItem, setSlideItem] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setSlideItem(1);
      } else if (window.innerWidth < 1025) {
        setSlideItem(2);
      } else {
        setSlideItem(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" container-os "> {/* Centering wrapper */}
      <div className="">
        <h2 className="text-2xl font-bold mb-6 md:text-3xl text-black text-center uppercase">Content creator earns in lacs</h2>
      <Swiper
    loop={true}
    autoplay={{
        delay: 1000,
        disableOnInteraction: false,
    }}
    pagination={{
        clickable: true,
    }}
    speed={1000}
    modules={[Autoplay, Pagination, Navigation]}
    slidesPerView={slideItem}
    spaceBetween={20}
    centeredSlides={false} // <-- Turned off centeredSlides
    centerInsufficientSlides={true} // <-- Optional, helps if fewer slides
    className="mx-auto"
>
          {sliderdata.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col p-5 bg-primary text-white border border-[#C0A2F2] rounded-xl shadow-lg md:h-[500px] h-full">
                {/* Image */}
                <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                  <Image
                    src={`${apiUrl}${item.userImg}`}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="pt-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <div className="flex items-center">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <FaStar key={i} className="text-secondary mr-1" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-white mt-2 text-sm lg:text-base font-light whitespace-pre-line">
                    {item.review}
                  </p>

                  {/* Revenue Metric */}
                  <div className="mt-4 text-sm font-semibold flex justify-between">
                    <span className="font-normal">Revenue Generated:</span>
                    <span className="block text-lg text-secondary">{item.revenue}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

}
