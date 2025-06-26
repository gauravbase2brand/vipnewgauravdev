import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityBanner = ({ heading, link, text }) => {
  const { skeleton } = useContext(AppStateContext); // Access skeleton state

  return (
    <div className="container-os">
      {skeleton ? (
        <div className="bg-white p-4">
          <div className="bg-gray-100 rounded-2xl flex items-center justify-center py-6 animate-pulse">
            <div className="container mx-auto text-center flex flex-col items-center">
              <div className="bg-gray-100 rounded h-10 md:h-16 lg:h-20 w-3/4 mb-6"></div>
              <button className="bg-gray-100 rounded-md h-10 w-32"></button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" bg-primary bg-cover bg-center rounded-2xl flex items-center justify-center py-6"
          style={{
            backgroundImage:
              'url("https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/aboutbg_s9gfut.webp")',
          }}
        >
          <div className="container mx-auto text-center text-white flex flex-col items-center">
            <h1 className="font-roboto font-extrabold text-2xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight mb-6">
              {heading}
            </h1>
            <Link
              href={link}
              className="font-roboto font-medium text-lg px-8 py-2.5 border-2 border-white rounded-md hover:opacity-80"
            >
              {text}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityBanner;
