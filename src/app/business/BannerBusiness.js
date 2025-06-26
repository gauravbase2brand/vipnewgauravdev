"use client";
import React, { useContext } from "react";
import "./business.css";
import BusinessVideo from "./BusinessVideo";
import Image from "next/image";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";

const BannerBusiness = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
    const { user} = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const points = [
    "Buy A Business Kit",
    "Pay Once & Earn Lifetime Profit",
    "Real Opportunity of Earning Online",
    "Offer Valid for Everyone",
    "Specially for Mobile Phone Sellers",
  ];

  return (
    <>
      <div className="banner-slider-os">
        <div className="container-os">
          <section className="bg-primary rounded-lg">
            <div className="flex flex-wrap justify-between items-center p-6 md:p-8 lg:p-10 lg:flex-row flex-col-reverse">
              <div className="text-section">
                <h1
                  className="text-transparent bg-clip-text text-7xl font-extrabold lg:text-6xl md:text-5xl sm:text-2xl sm:font-semibold sm:mt-4"
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "#ef6b19",
                  }}
                >
                  Business With Us
                </h1>

                <h4 className="text-white lg:text-3xl font-extrabold text-xl sm:leading-5">
                  Become a VIP Partner
                </h4>
                <h4 className="text-white lg:text-3xl font-extrabold text-xl sm:leading-5">
                  Start Earning a Lifetime Income
                </h4>
                {points.map((point, index) => (
                  <div
                    className="flex items-center gap-4 animate-fade-in-left"
                    key={index}
                    style={{ animationDelay: `${index * 0.5}s` }} // Adjust the delay timing as needed
                  >
                    <Image
                      className="w-8 h-8"
                      src={`${panelImg}/assets/img/vip-images/pointicon_b1ztaz.webp`}
                      alt="Business arrow"
                      width={300}
                      height={100}
                      priority="true"
                    />
                    <p className="text-white text-base sm:text-lg font-medium leading-6 sm:leading-7">
                      {point}
                    </p>
                  </div>
                ))}
                {!user?.token &&
                <div className="oooo p-top-3">
                  <button
                    className="button-gk"
                    type="button"
                    // onClick={() => {
                    //   const target = document.getElementById("bussiness-form");
                    //   const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed
                    //   const offset = isMobile ? 12 * 2 : 12 * 40;

                    //   if (target) {
                    //     const targetPosition =
                    //       target.getBoundingClientRect().top +
                    //       window.pageYOffset;
                    //     const scrollToPosition = targetPosition - offset;

                    //     window.scrollTo({
                    //       top: scrollToPosition,
                    //       behavior: "smooth",
                    //     });
                    //   }
                    // }}
                    onClick={()=>setActiveSignInWithOtp(true)}
                    aria-label="bussiness"
                  >
                    Become VIP Partner: ₹149 Only
                  </button>
                </div>}
              </div>
              <div className="video-section">
                <BusinessVideo />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BannerBusiness;
