"use client"
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import InfluncerLink from './InfluncerLink';
const InfluncerBanner = () => {
  const { setPopupModal } = useContext(AppStateContext);
  const handleApplyNowClick = () => {
    setPopupModal(true);  // Open modal when button is clicked
  };

  const apiUrl = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <>
      <div className="md:p-3 p-[7px] pt-0 relative">
        <div className="relative w-full h-[80vh] top-0">
          {/* Black Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#2f2e2ea6] opacity-50 z-[-1] rounded-[10px]"></div>

          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[-2] object-top rounded-[10px] border"
            autoPlay
            muted
            loop
          >
            <source
              src={`${apiUrl}/assets/img/vip-images/1165352_Woman_Home_1280x720.mp4`}
              type="video/mp4"
            />
          </video>

          {/* Content on top of the video */}
          <div className="relative z-10 flex items-center justify-center w-full h-full text-center text-white md:px-4 px-[5px]">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-5xl font-bold leading-tight md:mb-6 mb-3">
                <span className='text-secondary'>JOIN </span>
                INFLUENCER PROGRAM <br /><span className='text-secondary'>START </span> EARNING TODAY!
              </h1>
              <p className="md:mb-8 mb-3 text-lg md:text-xl">
                Are you passionate about sharing your favorite products with your audience? Join our exclusive Influencer Program and unlock endless earning potential while promoting the brands you love!
              </p>

              {/* <button onClick={() => handleApplyNowClick()} className=" ">
                APPLY NOW
              </button> */}
              <InfluncerLink title="APPLY NOW" buttonColor="bg-transparent border-2 border-white text-white hover:text-darktext hover:border-darktext py-2 md:px-6 px-4 rounded-full text-xl hover:bg-secondary" />

            </div>
          </div>

          {/* Social Media Icons at the bottom */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 text-lg z-20">
            <Link
              href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q" target='_blank'
              className="flex items-center justify-center gap-2 text-white bg-[#5d5d5da6] hover:bg-secondary hover:text-darktext rounded-full md:p-3 p-[5px] md:text-lg text-sm"
            >
              <FaYoutube /> YouTube
            </Link>
            <Link
              href="https://www.instagram.com/vip_number_shop_official/" target='_blank'
              className="flex items-center justify-center gap-2 text-white bg-[#5d5d5da6] hover:bg-secondary hover:text-darktext rounded-full md:p-3 p-[5px] md:text-lg text-sm"
            >
              <FaInstagram /> Instagram
            </Link>
            <Link
              href="https://www.facebook.com/vipnumbershop" target='_blank'
              className="flex items-center justify-center gap-2 text-white bg-[#5d5d5da6] hover:bg-secondary hover:text-darktext rounded-full md:p-3 p-[5px] md:text-lg text-sm"
            >
              <FiFacebook /> Facebook
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluncerBanner;
