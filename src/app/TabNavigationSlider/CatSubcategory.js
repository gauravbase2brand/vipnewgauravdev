import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const CatSubcategory = ({
  selectedCategory,
  FamilyPackSettingsSec,
  selectedSubCategories,
  handleClearAll,
  handleSubCategoryChange,
}) => {
  return (
    <>
      <div className="  top-[41px] left-0 w-full bg-[#00000080] flex justify-center items-center z-[1000] popup">
        <div className="bg-white lg:p-[10px_0px_10px] py-1 w-full ">
          <Splide options={FamilyPackSettingsSec}>
            <SplideSlide>
              {selectedSubCategories.length == 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-6 h-[33px] bg-darktext text-white rounded-[30px] border border-solid border-transparent ml-[35px]"
                  aria-label="All"
                >
                  All
                </button>
              )}
            </SplideSlide>
            {selectedCategory?.sub_categories
              ?.sort((a, b) => {
                const normalizedSelectedSubCategories =
                  selectedSubCategories.map(Number);
                if (normalizedSelectedSubCategories.includes(a.id)) return -1;
                if (normalizedSelectedSubCategories.includes(b.id)) return 1;
                return 0; // Keep their original order if neither is selected
              })
              .map((subCat, subCatIndex) => {
                const normalizedSelectedSubCategories =
                  selectedSubCategories.map(Number);
                return (
                  <SplideSlide key={`subCat-${subCat.id}`}>
                    <ul>
                      <li className="m-0">
                        <button
                          className={`${
                            normalizedSelectedSubCategories.includes(subCat.id)
                              ? "bg-secondary  text-darktext flex items-center gap-1 ml-[10px]"
                              : "bg-primary  text-white"
                          } h-8 text-sm font-medium leading-8 px-3 rounded-full`}
                          onClick={() => handleSubCategoryChange(subCat.id)}
                          aria-label="Subcategories"
                        >
                          {subCat.name}
                          {normalizedSelectedSubCategories.includes(
                            subCat.id
                          ) && (
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 53 53"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="26.5"
                                cy="26.5"
                                r="26.5"
                                fill="#fff"
                              />
                              <path
                                d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                                fill="#0f0f0f"
                              />
                            </svg>
                          )}
                        </button>
                      </li>
                    </ul>
                  </SplideSlide>
                );
              })}
          </Splide>
        </div>
      </div>
    </>
  );
};

export default CatSubcategory;
