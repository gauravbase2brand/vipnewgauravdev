"use client";
import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import Image from "next/image";
import Link from "next/link";

const RegisterVipNumber = (props) => {
  const { user } = useContext(AppStateContext);
  const { skeleton } = useContext(AppStateContext);
  return (
    <section className="py-8">
      <div className="container-os text-center">
      <span className="text-sm md:text-base leading-6 lg:text-left text-center">Our application uses YouTube API Services. By using this application, you also agree to the <Link href="https://www.youtube.com/t/terms" className="font-semibold underline">YouTube Terms of Service</Link></span>
      </div>
      <div className="container-os">
        {skeleton ? (
        <div className="flex flex-col lg:flex-row items-center bg-gray-200 rounded-lg max-w-6xl mx-auto p-4 md:p-6 gap-4 md:gap-8 justify-between">
        {/* Left Column (Image Skeleton) */}
        <div className="flex flex-col lg:flex-row items-center md:gap-6 lg:w-[70%]">
          <div className="flex items-center justify-center bg-white rounded-lg p-3 w-[5rem] md:w-24">
            <div className="lg:h-24 lg:w-24 w-full h-24 bg-gray-300 rounded animate-pulse"></div>
          </div>
  
          {/* Text Skeleton */}
          <div className="w-full text-gray-700">
            <div className="h-6 bg-gray-300 rounded lg:w-3/4 w-full animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-300 rounded lg:w-1/2 w-full animate-pulse"></div>
          </div>
        </div>
  
        {/* Button Skeleton */}
        <div className="flex justify-end">
          <div className="h-12 w-40 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center bg-primary rounded-lg max-w-6xl mx-auto p-4 md:p-6 gap-4 md:gap-8 justify-between">
            {/* Left Column */}
            <div className="flex flex-col lg:flex-row items-center md:gap-6 lg:w-[70%]">
              {/* Image Section */}
              <div className="flex items-center justify-center bg-white rounded-lg p-3 w-[5rem] md:w-24">
                <Image
                  src={props.image}
                  alt="VIP Number Shop - Logo"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>

              {/* Text Section */}
              <div className="w-full text-white">
                <h3 className="text-lg md:text-2xl font-semibold md:pb-3 lg:text-left text-center">
                  {props.heading}
                </h3>
                <p className="text-sm md:text-base leading-6 lg:text-left text-center">
                  {props.subHeading}
                </p>
              </div>
            </div>

            {/* Button Section */}
            {!user?.token && (
              <div className="flex justify-end">
                <button
                  onClick={props.onClick}
                  aria-label="register"
                  className="text-white border-4 border-white rounded-lg px-8 md:py-3 py-[10px] flex items-center justify-center bg-transparent transition-all duration-300 hover:bg-white hover:text-purple-600"
                >
                  {props.buttonText}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RegisterVipNumber;
