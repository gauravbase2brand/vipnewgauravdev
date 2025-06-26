import React, { useContext } from "react";
import Image from "next/image";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext"; // Make sure to import the context

const CategoryContent = ({ contentImage }) => {
  const { apiData } = useContext(AppStateContext);

  const decodeHTML = (htmlContent) => {
    if (!htmlContent) return "";
    const textArea = document.createElement("textarea");
    textArea.innerHTML = htmlContent;
    return textArea.value;
  };

  return (
    <div className="container mx-auto px-4">
      {contentImage?.bannerLogo &&
        contentImage?.bannerLogo !== "" &&
        contentImage?.bannerLogo !== null && (
          !apiData.length > 0 ? (
            <>
              <div className="bg-white p-4">
                <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-1 items-center gap-4">
                  <div>
                    <div className="animate-pulse bg-gray-200 w-full md:h-[400px] h-[192px] rounded"></div>
                  </div>
                  <div className="animate-pulse hidden md:block">
                    <div className="animate-pulse bg-gray-200 h-8 w-3/4 md:w-1/2 rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full md:w-3/4  mb-2 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-6 w-full md:w-3/4 rounded"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-1 items-center">
              <div>
                <Image
                  src={contentImage?.bannerLogo}
                  alt={contentImage?.image_alt_tag || "Banner image of category"}
                  width={1000}
                  height={400}
                  className="object-contain w-full md:h-[400px]"
                  priority="true"
                />
              </div>
              <div className="hidden md:block">
                <h3 className="text-[34px] text-primary leading-[40px] md:text-[22px] md:leading-[29px] font-bold md:text-center lg:text-left">
                  {contentImage?.image_alt_title}
                </h3>
                <p
                  className="text-[18px] lg:py-[10px] font-normal text-black leading-[28px] md:text-center lg:text-left"
                  dangerouslySetInnerHTML={{
                    __html: decodeHTML(contentImage?.subheadingcontent),
                  }}
                ></p>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default CategoryContent;
