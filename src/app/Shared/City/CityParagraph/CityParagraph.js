import React, { useContext } from "react";
import "./CityParagraph.css";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityParagraph = ({ title, customStyles }) => {
  const { skeleton } = useContext(AppStateContext);
  return (
    <>
      {skeleton ? (
        <p className="animate-pulse bg-gray-100 rounded h-7 w-3/4 md:w-1/2 mb-2"></p>
      ) : (
        <p
          className="font-roboto font-normal text-[16px] leading-[26px] text-[#333] md:text-[18px] md:leading-[24px]"
          style={customStyles}
        >
          {title}
        </p>
      )}
    </>
  );
};

export default CityParagraph;
