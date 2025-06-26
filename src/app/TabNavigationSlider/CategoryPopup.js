import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

const CategoryPopup = ({
  setCatModalOpen,
  arrayOfArrays,
  handleCategoryLink,
  similarLoader,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white p-5 rounded-lg h-full">
          <div className="flex items-center">
            <button
              className="absolute right-3 text-gray-700 hover:text-gray-900"
              onClick={() => setCatModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                style={{ color: "red", height: "25px" }}
              />{" "}
              {/* Close Icon */}
            </button>
            <h2 className="text-lg font-semibold">All categories...</h2>
          </div>
          <div className="sub-caty-rs">
            <div className="flex justify-center items-center flex-wrap">
              {arrayOfArrays.map((subArray) =>
                subArray.map((element, elementIndex) => {
                  const currentPath = window.location.pathname;
                  const categoryUrl = currentPath.split("/")[2];
                  const isSelected = categoryUrl == element?.detail?.slug;
                  return (
                    <a
                      key={elementIndex}
                      onClick={() => handleCategoryLink(element)}
                      className={`h-[33px] text-[14px] leading-[41px] p-2 m-[4px] rounded-[30px] flex items-center 
                        ${isSelected ? "bg-black text-white" : ""} 
                        bg-[#e4e4e4] text-black`}
                    >
                      {element.name}
                      {similarLoader && isSelected && (
                        <span className="dot-loader ml-2 flex">
                          <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                          <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                          <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                        </span>
                      )}
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPopup;
