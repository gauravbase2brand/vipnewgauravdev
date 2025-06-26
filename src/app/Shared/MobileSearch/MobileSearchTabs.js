import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const MobileSearchTabs = ({
  setSearchPopup,
  handleMobileTab,
  handleMobileFilter,
  setPriceFamily,
  filters,
  router,
  pathname,
}) => {
  return (
    <>
      <span className="absolute top-[33px]  left-[12px] bg-white rounded-full">
        <IoChevronBackCircleSharp
          fontSize={30}
          onClick={() => {
            // setSearchPopup(false);
            router.back();
          }}
        />
      </span>

      {location?.pathname !== "/search-your-number" ? (
        <div
          className={`${
            pathname === "/numerology" || pathname === "/family-pack"
              ? "hidden"
              : "MobileSearch-filter-search-by-digits-filters-row-os bg-secondary rounded-b-[100px]"
          }`}
        >
          <button
            onClick={() => {
              handleMobileTab("digit");
              handleMobileFilter({ type: "global" });
              setPriceFamily(false);
              setTimeout(() => {
                document.getElementById("global-input")?.focus();
              }, 0);
            }}
            className={
              filters?.type === "global"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Global Search"
          >
            Global Search
          </button>
          <button
            onClick={() => {
              handleMobileTab("digit");
              handleMobileFilter({ type: "basic" });
              setPriceFamily(false);
              setTimeout(() => {
                document.getElementById("premium_id")?.focus();
              }, 0);
            }}
            className={
              filters?.type === "basic"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Premium Search"
          >
            Premium Search
          </button>
          <div className="numurology-div">
            <button
              onClick={() => {
                handleMobileTab("digit");
                handleMobileFilter({ type: "advanced" });
                setPriceFamily(false);
                setTimeout(() => {
                  document.getElementById("advanced-id")?.focus();
                }, 0);
              }}
              className={
                filters?.type === "advanced"
                  ? "MobileSearch-filter-button-1-os active"
                  : "MobileSearch-filter-button-1-os"
              }
              aria-label="Advance Search"
            >
              Numerology Search
            </button>
          </div>
          <button
            onClick={() => {
              handleMobileTab("digit");
              handleMobileFilter({ type: "mostContained" });
              setPriceFamily(false);
              setTimeout(() => {
                document.getElementById("mostContain-input")?.focus();
              }, 0);
            }}
            className={
              filters?.type === "mostContained"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Most Contains"
          >
            Most Contains
          </button>
          <button
            onClick={() => {
              handleMobileTab("digit");
              handleMobileFilter({ type: "exactPlacement" });
              setPriceFamily(false);
              setTimeout(() => {
                document.getElementById("otc-2")?.focus();
              }, 0);
            }}
            className={
              filters?.type === "exactPlacement"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Exact Digit Placement"
          >
            Exact Digit Placement
          </button>
          <button
            onClick={() => {
              handleMobileTab("price");
              handleMobileFilter({ type: "price" });
              setPriceFamily(true);
              setTimeout(() => {
                document.getElementById("min-price_id")?.focus();
              }, 0);
            }}
            className={
              filters?.type === "price"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Search by Price"
          >
            Search by Price
          </button>
          <button
            onClick={() => {
              handleMobileTab("family_pack");
              handleMobileFilter({ type: "family_pack" });
              setPriceFamily(true);
            }}
            className={
              filters?.type === "family_pack"
                ? "MobileSearch-filter-button-1-os active"
                : "MobileSearch-filter-button-1-os"
            }
            aria-label="Family Pack"
          >
            Family Pack
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MobileSearchTabs;
