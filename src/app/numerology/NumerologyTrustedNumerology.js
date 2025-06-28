"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function NumerologyTrustedNumerology({ title, sliderData }) {
  const apiData = process.env.NEXT_PUBLIC_IMAGES;
  const [slideitem, setSlideItem] = useState(3);
  const pathname = usePathname();
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:py-9 pt-5">
      <div className="relative container-os">
        <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px] 2xl:text-[38px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6">
          {title}
        </h2>

        <Swiper
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          {
          ...(pathname === "/family-pack"
            ? {}
            : {
              pagination: {
                clickable: true,
                type: "bullets",
              },
              navigation: true,
            })
          }
          speed={1000}

          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={slideitem}
          centeredSlides={true}
        >
          {sliderData?.map((item, index) => (
            <SwiperSlide
              key={item.id || index}
              className="flex justify-center items-center"
            >
              {({ isActive }) => (
                <div
                  className={`relative w-full flex flex-col justify-center transition-all duration-500 ${isActive

                    ? "scale-100 z-10 rounded-2xl"
                    : "scale-90 opacity-90"
                    }`}
                >
                  <Link href = "/suggestion-for-you">
                  <Image
                    src={pathname === "/family-pack" ? item.leftimg  : `${apiData}${item.leftimg}`}
                    alt={`Slide ${index + 1}`}
                    width={1000}
                    height={300}
                    className={`transition-all duration-500  object-cover ${pathname === "/family-pack" ? 'h-[300px] lg:h-[500px]': "h-[500px]"} `}
                  />
                  </Link>
                  {
                    pathname === "/family-pack" ?
                      <div className="bg-secondary rounded-br-[15px] rounded-bl-[15px]">
                        <p className="py-[10px] md:py-[15px] font-normal text-[16px] leading-[24px] text-center px-5  md:text-[19px] md:leading-[30px] text-darktext">
                          {item.fpdes}
                        </p>
                      </div> :
                      ""
                  }
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* your styles here */}
    </div>
  );
}
