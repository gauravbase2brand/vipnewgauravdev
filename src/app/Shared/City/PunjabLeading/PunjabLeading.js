import React, { useState, useEffect, useContext } from "react";
import "./PunjabLeading.css";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import CityButton from "../CityButton/CityButton";
import Image from "next/image";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext"; // Import the context

const PunjabLeading = ({ image, imageAlt, title1, para1, para2 }) => {
  const { skeleton } = useContext(AppStateContext); // Access skeleton state

  return (
    <section className="PunjabLeading-section-os default-section-os">
      <div className="container-os">
        {skeleton ? (
          // Skeleton Loader shown when skeleton is true
          <div className="animate-pulse grid lg:grid-cols-2 items-center py-4 gap-3 grid-cols-1">
            <div>
              <div className="h-[300px] bg-gray-100 rounded mb-4"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-4/5 mb-4"></div>
              <button className="h-10 bg-gray-100 rounded w-1/2"></button>
            </div>
          </div>
        ) : (
          // Actual content shown after skeleton is false
          <div className="grid lg:grid-cols-2 items-center py-4 gap-3 grid-cols-1">
            <div>
              <Image
                className="h-[300px] object-contain"
                src={image}
                alt={imageAlt}
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <div>
              <CityHeading title={title1} />
              <CityParagraph title={para1} />
              <CityParagraph title={para2} />
              <CityButton link="/" title="Search your VIP Number" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PunjabLeading;
