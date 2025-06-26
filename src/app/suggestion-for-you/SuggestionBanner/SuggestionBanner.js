import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import React, { useContext } from "react";

const SuggestionBanner = (props) => {
  const { skeleton } = useContext(AppStateContext);
  // Function to decode HTML entities
  const decodeHTML = (htmlContent) => {
    if (!htmlContent) return "";
    const textArea = document.createElement("textarea");
    textArea.innerHTML = htmlContent;
    return textArea.value;
  };

  return (
    <section className="pb-4">
      <div className="container-os">
        {skeleton ? (
          <>
            <div className=" bg-white">
              <div className="bg-gray-200 animate-pulse rounded-[34px] flex flex-col items-center p-5 lg:mb-4">
                <h2 className="bg-gray-100 animate-pulse rounded md:h-12 h-9 w-3/4 lg:w-1/2 "></h2>
              </div>
            </div>
          </>
        ) : (
          <>
            {props.headingText && (
              <div
                className="bg-cover  bg-primary bg-no-repeat bg-center rounded-[34px] flex flex-col items-center p-4 lg:mb-4"
                style={{
                  backgroundImage:
                    "url('https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/aboutbg_s9gfut.webp')",
                }}
              >
                {props.headingText === "Tetra Numbers - XXXX" && (
                  <h1 className="hidden">
                    Choice Mobile Number Sale at VIP Number Shop
                  </h1>
                )}
                {props.headingText === "Tetra Numbers - XXXX" ? (
                  <h2 className="text-white font-extrabold text-4xl leading-[63px] text-center">
                    {props.headingText}
                  </h2>
                ) : (
                  <h1 className="text-white font-extrabold lg:text-4xl md:text-2xl text-[26px] leading-[36px] lg:leading-[45px] text-center">
                    {props.headingText === "null" ||
                    props.headingText === "undefined"
                      ? "VIP Mobile Number"
                      : props.headingText}
                  </h1>
                )}
                <p
                  className="text-white font-normal text-base leading-8 text-center px-2"
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(props.subHeading),
                  }}
                ></p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SuggestionBanner;
