import React, { useContext } from "react";
import "./CityButton.css";
import Link from "next/link";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityButton = ({ link, title }) => {
  const { skeleton } = useContext(AppStateContext);
  return (
    <>
      {skeleton ? (
        <div className="animate-pulse border-2 border-gray-100 rounded-lg px-4 py-2 flex bg-gray-200  mt-3 h-10 w-32">
          {/* <div class=" bg-gray-100 rounded"></div> */}
        </div>
      ) : (
        <Link
          className=" font-medium text-lg leading-6 text-primary border-2 border-primary  rounded-lg px-4 py-2 flex bg-transparent transition duration-300 w-max hover:opacity-80 mt-3"
          href={link ? link : ""}
        >
          {title}
        </Link>
      )}
    </>
  );
};

export default CityButton;
