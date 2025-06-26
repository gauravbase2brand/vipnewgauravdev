import React, { useContext, useState } from "react";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import "./CityExclusiveCollection.css";
import CityButton from "../CityButton/CityButton";
import Image from "next/image";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityExclusiveCollection = ({
  heading,
  text1,
  text2,
  buttonTitle,
  link,
  image,
  imageAlt,
}) => {
  const { skeleton } = useContext(AppStateContext);

  return (
    <section className="">
      {skeleton ? (
        <section className="bg-white">
          <div className="container-os mx-auto">
            <div className="grid md:grid-cols-[4fr_2fr] grid-cols-1 items-center gap-3">
              <div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-5/6"></div>
                <button className="h-10 bg-gray-200 rounded animate-pulse w-1/3"></button>
              </div>
              <div>
                <div className="h-[500px] bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container-os mx-auto">
          <div className="grid md:grid-cols-[4fr_2fr] grid-cols-1 items-center">
            <div className="">
              {heading && <CityHeading title={heading} />}
              {text1 && <CityParagraph title={text1} />}
              {text2 && <CityParagraph title={text2} />}
              {buttonTitle && <CityButton link={link} title={buttonTitle} />}
            </div>
            {image && (
              <div className="">
                <Image
                  className="h-[500px] object-contain"
                  src={image}
                  alt={imageAlt}
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CityExclusiveCollection;
