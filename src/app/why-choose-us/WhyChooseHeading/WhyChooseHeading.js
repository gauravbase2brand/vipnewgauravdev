import React from "react";
import "./WhyChooseHeading.css";

const WhyChooseHeading = (props) => {
  return (
    <div className="">
      <h2 className="font-bold text-2xl md:text-3xl text-gray-800 capitalize text-center">{props.heading}</h2>
      <p className="font-normal text-lg leading-7 text-center text-black ">{props.subHeading}</p>
    </div>
  );
};

export default WhyChooseHeading;