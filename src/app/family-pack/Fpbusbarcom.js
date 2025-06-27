"use client";
import Image from "next/image";
import React from "react";
import Fpbarcard from "./Fpbarcard";

export default function Fpbusbarcom() {
  const familypack_sliderdata = [
    {
      id: 1,
      barcard_img: "/assets/fpbarcardimg1.webp",
      barcard_des: "Stay connected effortlessly with easy-to-remember numbers.",
      barcard_title: "Stronger Bonds"
    },
    {
      id: 2,
      barcard_img: "/assets/fpbarcardimg2.webp",
      barcard_des: "Create lasting memories with unique numbers for each family member.",
      barcard_title: "Memorable Moments"
    },
    {
      id: 3,
      barcard_img: "/assets/fpbarcardimg3.webp",
      barcard_des: "Simplify family communication with personalized numbers.",
      barcard_title: "Easy Contact"
    },
    // copy for working slider
    {
      id: 4,
      barcard_img: "/assets/fpbarcardimg1.webp",
      barcard_des: "Stay connected effortlessly with easy-to-remember numbers.",
      barcard_title: "Stronger Bonds"
    },
    {
      id: 5,
      barcard_img: "/assets/fpbarcardimg2.webp",
      barcard_des: "Create lasting memories with unique numbers for each family member.",
      barcard_title: "Memorable Moments"
    },
    {
      id: 6,
      barcard_img: "/assets/fpbarcardimg3.webp",
      barcard_des: "Simplify family communication with personalized numbers.",
      barcard_title: "Easy Contact"
    }
  ]
  const businesspack_sliderdata = [
    {
      id: 1,
      barcard_img: "/assets/fpbarcardimg4.webp",
      barcard_des: "Elevate your brand with memorable, professional numbers.",
      barcard_title: "Credibility Boost"
    },
    {
      id: 2,
      barcard_img: "/assets/fpbarcardimg5.webp",
      barcard_des: "Enhance team coordination with easy-to-dial numbers.",
      barcard_title: "Effortless Communication"
    },
    {
      id: 3,
      barcard_img: "/assets/fpbarcardimg6.webp",
      barcard_des: "Stand out with exclusive business numbers.",
      barcard_title: "Professional Edge"
    },
    // copy for working slider
    {
      id: 4,
      barcard_img: "/assets/fpbarcardimg4.webp",
      barcard_des: "Elevate your brand with memorable, professional numbers.",
      barcard_title: "Credibility Boost"
    },
    {
      id: 5,
      barcard_img: "/assets/fpbarcardimg5.webp",
      barcard_des: "Enhance team coordination with easy-to-dial numbers.",
      barcard_title: "Effortless Communication"
    },
    {
      id: 6,
      barcard_img: "/assets/fpbarcardimg6.webp",
      barcard_des: "Stand out with exclusive business numbers.",
      barcard_title: "Professional Edge"
    },
  ]
  return (
    <div className="container-os">
      <div className="text-center pt-12 pb-8">
        <h2 className="font-semibold text-[26px] md:text-[32px] 2xl:text-[38px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto leading-[1.3] lg:leading-[1.2] mb-4 lg:mb-6">
          Memorable Numbers for
          <span className=" bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Family  & Business{" "}<br />
          </span> Stay Connected &
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            {" "}Stand Out!
          </span>
        </h2>
      </div>
      <div className="lg:container-os">
        <div className="flex flex-col lg:flex-row pb-5 xl:pb-3 xl:gap-0 gap-3 justify-center">
          <div className="me-0 xl:me-4 md:w-[100%] xl:w-[22%] my-auto w-full">
            <Image
              src="/assets/fpbarbanner.webp"
              alt="Family pack banner"
              width={1000}
              height={500}
              className="h-auto xl:h-[275px] w-full object-contain"
            />
          </div>
          <div className="bg-primary rounded-3xl p-3 py-5 ps-5 md:w-[100%] xl:w-[75%] w-full ">
            <Fpbarcard
              slider_data={familypack_sliderdata}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row pb-5 md:pb-12 xl:gap-0 gap-3 justify-center">
          <div className="w-full bg-primary rounded-3xl  p-3 py-5 ps-5 xl:w-[75%]">
            <Fpbarcard
              slider_data={businesspack_sliderdata}
              dirprops={false}
            />
          </div>
          <div className="ms-0 xl:ms-4 md:w-[100%] xl:w-[22%] my-auto w-full">
            <Image
              src="/assets/busbarbanner.webp"
              alt="Family pack banner"
              width={1000}
              height={500}
              className="h-auto lg:h-[275px] w-full object-contain"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media screen and (max-width: 768px) {
          br {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
