import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
const CatSkull = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for resize
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const FamilyPackSettings = {
    type: "slide",
    perPage: isMobile ? 2 : 5,
    perMove: 1,
    autoplay: false,
    gap: "1rem",
    pagination: false,
    arrows: true,
    drag: true,
  };
  return (
    <Splide options={{ ...FamilyPackSettings, arrows: !isMobile }}>
      <SplideSlide key="all-tab">
        <div className="bg-white p-1">
          <div className="animate-pulse">
            <div className="flex space-x-2">
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]
                    "
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
              <div
                className="h-[32px] text-[14px] leading-[41px] rounded-[30px] cursor-pointer
                    bg-[#e4e4e4]  w-[100px]"
                aria-label="Loading placeholder"
              ></div>
            </div>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  );
};

export default CatSkull;
