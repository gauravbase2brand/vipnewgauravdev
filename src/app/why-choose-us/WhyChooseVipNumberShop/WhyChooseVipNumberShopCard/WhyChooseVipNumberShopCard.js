import React from "react";

const WhyChooseVipNumberShopCard = ({background,heading,subHeading}) => {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: background || "#ffffff", // Default background if none is provided
      }}
    >
      <h2 className="font-medium text-[22px] leading-[31px] text-primary pb-4">
        {heading}
      </h2>
      <p className="text-gray-700 text-[16px] leading-[28px]">
        {subHeading}
      </p>
    </div>
  );
};

export default WhyChooseVipNumberShopCard;
