import React from "react";
import "./MainSubHeading.css";

const MainSubHeading = (props) => {
  return (
    <div className="md:py-4 md:mb-2 py-2">
      <p
        className="lg:text-[20px] text-[16px] leading-[30px] font-semibold text-center md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold  text-darktext undefined"
        style={props.style}
      >
        {props.MainSubHeadingText}
      </p>
    </div>
  );
};

export default MainSubHeading;
