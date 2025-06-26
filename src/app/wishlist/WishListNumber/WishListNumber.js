import React, { useContext, useState } from "react";
import WishlistNumberData from "../../Shared/WishlistNumberData/WishlistNumberData";
import "./WishListNumber.css";
import Link from "next/link";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { FaAnglesDown } from "react-icons/fa6";

const WishListNumber = () => {
  const { wishListItem } = useContext(AppStateContext);
  const [filterOption, setFilterOption] = useState("");
  const sortedWishlistItems = [...wishListItem].sort((a, b) => {
    if (filterOption === "highToLow") {
      return b.unit_price - a.unit_price;
    } else if (filterOption === "lowToHigh") {
      return a.unit_price - b.unit_price;
    } else {
      return 0;
    }
  });
  return (
    <section className="pb-4">
      <div className="container-os ">
        <div className="p-0 md:p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="font-extrabold text-[34.9332px] leading-[41px]   text-primary  ">
              Wishlist
            </h1>
            <div className="flex items-center gap-2 font-semibold text-[17.9573px] leading-[19px] text-center text-primary border border-primary  rounded-md px-3 py-2">
              Apply Filters
              <div className="relative inline-block">
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  className="appearance-none px-3 py-2 bg-[#f4f4f9] border border-gray-300 rounded-md text-primary focus:outline-none w-48 pr-10"
                >
                  <option value="highToLow">High to Low</option>
                  <option value="lowToHigh">Low to High</option>
                </select>

                <FaAnglesDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>

          {sortedWishlistItems?.map((res, index) => (
            <WishlistNumberData key={index} {...res} index={index} />
          ))}
          <div className="flex flex-wrap lg:justify-between justify-center lg:gap-0 gap-2 items-center pt-4">
            <div>
              <Link
                href="/"
                className="font-bold text-[22.6598px] leading-[27px] text-[#232323] hover:underline"
              >
                Continue shopping
              </Link>
            </div>
            <div className="max-w-[250px] w-full">
              <Link
                href="/details"
                className="flex items-center justify-center gap-2 px-4 py-3 text-white bg-primary  border border-[#f16c19] rounded-md text-[16px] leading-[20px] font-bold hover:opacity-80"
              >
                Go to Cart
                <span>
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishListNumber;
