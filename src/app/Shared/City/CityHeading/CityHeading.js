import React, { useContext } from "react";
import "./CityHeading.css";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityHeading = ({ title }) => {
  const { skeleton } = useContext(AppStateContext);
  return (
    <>
      {skeleton ? (
        <h2 className="animate-pulse bg-gray-200 rounded h-7 w-3/4 md:w-1/2 mb-2"></h2>
      ) : (
        <h2 className="font-roboto font-semibold text-primary text-[21px] leading-[30px] m-0 md:text-[28px] md:leading-[35px] sm:text-[22px] sm:leading-[28px]">{title}</h2>
      )}
    </>
  );
};

export default CityHeading;
