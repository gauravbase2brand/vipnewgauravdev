import React from "react";
import Image from "next/image";

const MainHeading = (props) => {
  const { MainHeading, rightImage, textfamily, style } = props;

  return (
    <div className="flex items-center text-center gap-4  flex-wrap justify-center   md:py-3 py-[3px]">
      {MainHeading === "Enjoy Exclusive Offers with VIP Number Shop" ? (
        <h1 className="lg:text-[20px] text-[14px] leading-[26px] font-semibold text-center md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left">
          {MainHeading}
        </h1>
      ) : (
        <h2
          className={`lg:text-[20px] text-[14px] leading-[26px] font-semibold text-center md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left text-darktext ${textfamily}`}
          style={style}
        >
          {MainHeading}
        </h2>
      )}
      {rightImage && (
        <span>
          <Image
            src={rightImage}
            alt="Crown"
            width={46}
            height={46}
            priority="true"
          />
        </span>
      )}
    </div>
  );
};

export default MainHeading;
