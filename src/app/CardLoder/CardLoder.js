import React from "react";

const CardLoder = ({ columns = 6, gridItems = 6 }) => {
  return (
    <div>
      <div className="container-os">
        <div className="flex items-center justify-between lg:p-2 p-1 my-2 rounded-xl bg-gray-100">
          <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div
          className={`bg-white grid grid-cols-2 lg:grid-cols-${columns} md:gap-6 gap-2 md:p-[10px] p-0`}
        >
          {[...Array(gridItems)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl flex flex-col p-4 gap-2 md:h-[256px] h-[174px] justify-between animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-2 bg-gray-300 rounded w-14"></div>
                <div className="flex md:gap-2 gap-1">
                  <button
                    type="button"
                    aria-label="crown"
                    className="animate-pulse bg-gray-300 rounded-[7px] w-6 h-6 cursor-not-allowed"
                  ></button>
                  <button
                    type="button"
                    aria-label="book now"
                    className="animate-pulse bg-gray-300 rounded-[7px] w-6 h-6 cursor-not-allowed"
                  ></button>
                  <button
                    type="button"
                    aria-label="wishlist"
                    className="animate-pulse bg-gray-300 rounded-[7px] w-6 h-6 cursor-not-allowed"
                  ></button>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <div className="h-4 bg-gray-300 rounded md:w-32 w-16"></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-gray-300 rounded md:w-20 w-12"></div>
                  <div className="h-4 bg-gray-300 rounded md:w-20 w-12"></div>
                </div>
              </div>
              <div className="h-[53px] bg-gray-300 rounded"></div>
              <div className="h-8 bg-gray-300 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardLoder;
