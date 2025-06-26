import React, { useState } from "react";
import TrustVideo from "../influencer/TrustVideo";

const NumberNumerology = () => {
  const videoLink =
    "https://www.youtube.com/embed/u6LFBreB3lc?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="bg-[#E7DEFA] lg:py-10 py-6">
      <div className="container-os mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-1">
          {/* Left Section: Title and Description */}
          <div className="text-left">
            <h2 className="font-semibold text-[26px] lg:leading-[40px] leading-[35px] text-HeadingText md:text-[32px] lg:text-[35px] tracking-wide lg:mb-6 mb-2 2xl:text-[38px]">
              Why<span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-[#5c469c] font-bold px-2">Trust</span>VIP Number Shop?
            </h2>
            <p className="font-normal text-[16px] leading-[24px]  sm:leading-[28px] md:text-[18px] md:leading-[30px] text-darktext  text-left ">With over 10 lakh happy customers served, VIP Number Shop is India's most trusted provider of premium mobile numbers. We deliver 2,500+ exclusive VIP numbers daily, ensuring you get the perfect number backed by quality and reliability.</p>
          </div>

          {/* Center Section: Video Thumbnail & YouTube Video */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-full rounded-lg overflow-hidden shadow-xl">
              <TrustVideo />
            </div>
          </div>

          {/* Right Section: List of Features */}
          <div className="text-left flex flex-col align-baseline justify-end">
            <ul className="list-none md:mt-6 mt-2 space-y-2 md:text-[18px] text-sm text-primary 2xl:text-[20px] lg:w-[60%] w-full">
              <li className="font-medium border-b-[1px] w-full border-primary pb-2">
                Verified Numerology Report
              </li>
              <li className="font-medium border-b-[1px] w-full border-primary pb-2">
                Premium Selection of Numbers
              </li>
              <li className="font-medium border-b-[1px] w-full border-primary pb-2">
                Satisfied Customers
              </li>
              <li className="font-medium border-b-[1px] w-full border-primary pb-2">
                Fast & Secure Activation
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NumberNumerology;
