import React, { forwardRef } from "react";
import Image from "next/image";

const CityHowGetVipNumberCard = forwardRef(
  ({ image, heading, text, boldText, smallText, animationClass, alt }, ref) => {
    return (
      <div
        className={`flex flex-col items-center text-center flex-wrap gap-4 ${animationClass}`}
        ref={ref}
      >
        <div className="  md:w-full sm:max-w-[100px] w-[100px]  mx-auto">
          <Image
            src={image}
            alt={alt || "Delivery Process"}
            width={300}
            height={100}
            priority="true"
          />
        </div>
        <div>
          <h3 className="font-roboto font-semibold text-[24px] leading-[28px] text-white mb-2 md:text-[18px] md:leading-[24px]">
            {heading}
          </h3>
          <p className="font-roboto font-normal text-[16px] leading-[20px] text-white">
            {boldText && <span className="font-bold">{boldText}</span>} {text}
            {smallText && (
              <span className="text-[13px] leading-[16px]">{smallText}</span>
            )}
          </p>
        </div>
      </div>
    );
  }
);

CityHowGetVipNumberCard.displayName = "CityHowGetVipNumberCard";

export default CityHowGetVipNumberCard;
