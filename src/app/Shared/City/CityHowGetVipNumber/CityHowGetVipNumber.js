"use client";
import React, { useContext, useEffect, useRef } from "react";
import "./CityHowGetVipNumber.css";
// import CityHowGetVipNumberCard from "./CityHowGetVipNumberCard/CityHowGetVipNumberCard";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import Image from "next/image";

const CityHowGetVipNumber = ({ headingPart1, headingPart2, headingPart3 }) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const datatable = [
    {
      image: `${panelImg}/assets/img/vip-images/pay.webp`,
      title: "Pay",
      description: "to place an Order.",
    },
    {
      image: `${panelImg}/assets/img/vip-images/Get UPC.webp`,
      title: "Get UPC",
      description: "UPC will be delivered through SMS, Whatsapp & Email.",
    },
    {
      image: `${panelImg}/assets/img/vip-images/DoMNP.webp`,
      title: "Do MNP",
      description:
        "Start the MNP process at the nearest retail shop to get the SIM.",
    },
    {
      image: `${panelImg}/assets/img/vip-images/Activation.webp`,
      title: "Activation",
      description:
        "Get your SIM activated in 4-5 days (18-25 days for Assam and J&K).",
    },
    {
      image: `${panelImg}/assets/img/vip-images/MoneyBackAssurity.webp`,
      title: "Money Back Assurity",
      description: "100% Money Back if you face any problem with the UPC.",
    },
  ];

  const { skeleton } = useContext(AppStateContext);
  const cardRefs = useRef([]);

  return (
    <>
      {skeleton ? (
        <>
          <section className="bg-gray-200 py-4 rounded-2xl my-4">
            <div className="container-os">
              <div className="mb-8 text-center">
                <h3 className="flex justify-center items-center text-center gap-3">
                  <span className="animate-pulse bg-gray-100   rounded h-6 w-1/4 md:w-1/3"></span>
                </h3>
              </div>

              <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
                <div className="animate-pulse  rounded-lg p-6 text-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto"></div>
                  <div className="mt-4 h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>

                <div className="animate-pulse  rounded-lg p-6 text-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto"></div>
                  <div className="mt-4 h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>

                <div className="animate-pulse  rounded-lg p-6 text-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto"></div>
                  <div className="mt-4 h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>

                <div className="animate-pulse  rounded-lg p-6 text-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto"></div>
                  <div className="mt-4 h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>

                <div className="animate-pulse  rounded-lg p-6 text-center">
                  <div className="h-32 w-32 bg-gray-100 rounded-full mx-auto"></div>
                  <div className="mt-4 h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
                  <div className="mt-2 h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className=" bg-primary py-4 rounded-2xl my-4">
            <div className="container-os">
              <div>
                {headingPart1 && (
                  <h3 className=" flex justify-center items-center text-center gap-[10px]">
                    {headingPart1 && (
                      <span className="text-[14px] leading-[30px] font-semibold text-center md:text-[26px] md:leading-[49px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left text-white">
                        {headingPart1}
                      </span>
                    )}
                    <span className="text-[14px] leading-[30px] font-semibold text-center md:text-[26px] md:leading-[49px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left text-white">
                      {" "}
                      {headingPart2}{" "}
                    </span>
                    {headingPart3 && (
                      <span className="text-[20px] leading-[30px] font-semibold text-center md:text-[56px] md:leading-[49px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left text-red-600 ">
                        {headingPart3}
                      </span>
                    )}
                  </h3>
                )}
              </div>
              <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-3 grid-cols-1 ">
                {datatable.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center text-center flex-wrap gap-4`}
                  >
                    <div className="md:w-full sm:max-w-[100px] w-[100px] mx-auto">
                      <Image
                        src={item.image}
                        alt="Process Image"
                        width={300}
                        height={100}
                        priority={true}
                      />
                    </div>
                    <div>
                      <h3 className="font-roboto font-semibold text-[24px] leading-[28px] text-white mb-2 md:text-[18px] md:leading-[24px]">
                        {item.title}
                      </h3>
                      <p className="font-roboto font-normal text-[16px] leading-[20px] text-white">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CityHowGetVipNumber;
