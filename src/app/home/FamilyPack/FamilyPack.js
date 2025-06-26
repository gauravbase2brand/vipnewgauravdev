"use client";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState, useEffect, useContext, useMemo } from "react";
import debounce from "lodash/debounce";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import axios from "axios";
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
// Slider
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";
import Link from "next/link";
// Splide slider imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../Shared/Card/Card.css";
import "./FamilyPack.css";
import "../../Shared/TabNumbers/TabNumberData/TabNumberData.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import CardLoder from "@/app/CardLoder/CardLoder";

//Pagination data per page
const ITEMS_PER_PAGE = 20;
const FamilyPack = ({ counter = 4 }) => {
  const [count, setCount] = useState(counter);
  const [apiData, setApiData] = useState({});
  const [currentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { setCartClick } = useContext(AppStateContext);
  const [currentSlide] = useState(0);
  const [totalSlides] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  //Load data per page function
  // const loadMoreData = () => {
  //   //setIsLoading(true);
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );

  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 767); // Detect if screen width is <= 767px
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Attach event listener
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
      handleResize.cancel(); // Cancel pending debounce calls
    };
  }, []);

  const fetchData = () => {
    axios
      .get(
        `${apiUrl}/web/familypack?fp_total=${count}&paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        // Only update if response.data is valid
        if (response.data && Object.keys(response.data).length > 0) {
          setApiData((prevData) => ({
            // ...prevData,
            ...response.data, // Merge new data with existing state
          }));
        }
        setIsLoading(false);
        setCartClick(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch data whenever `count` or `currentPage` changes
  useEffect(() => {
    fetchData();
  }, [count, currentPage]);

  // Convert apiData to an array of items
  // const apiDataArray = Object.values(apiData).filter((item) => item.length > 0);

  const apiDataArray = useMemo(() => {
    return Object.values(apiData).filter((item) => item.length > 0);
  }, [apiData]);

  const hasMoreData = apiDataArray.length > currentPage * ITEMS_PER_PAGE;

  return (
    <>
      {apiDataArray.length > 0 && (
        <>
          {isLoading ? (
            <CardLoder columns={5} gridItems={10} />
          ) : (
            <section className="FamilyPack-section-os">
              <div className="container-os ">
                <div className="flex items-center justify-between lg:p-[8px] p-[5px] my-2 rounded-xl bg-primary  text-white">
                  <MainHeading
                    MainHeading="Family & Business Pack "
                    rightImage={`${panelImg}/assets/img/vip-images/familypack_jl7urv.webp`}
                    textfamily="textight"
                    style={{ color: "var(--whitetext)" }}
                  />
                  <>
                    <div className="FamilyPack-select-variants-col-os familyset">
                      Family pack of
                      <div className="FamilyPack-variant-selector-os">
                        <select
                          className="appearance-none bg-secondary text-darktext px-4 py-2 rounded-lg pr-10 cursor-pointer outline-none font-semibold"
                          value={count}
                          onChange={(e) => {
                            setIsLoading(true);
                            setCount(Number(e?.target?.value));
                          }}
                        >
                          {Array.from({ length: 6 }, (_, i) => (
                            <option key={i + 2} value={i + 2}>
                              {i + 2}
                            </option>
                          ))}
                        </select>
                        <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-darktext pointer-events-none" />
                      </div>
                    </div>
                    <div className="pap">
                      {hasMoreData && (
                        <Link
                          href={`/search-results?type=family_pack&searchBy=family_pack&fp_total=${count}&callCount=0`}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{ color: "#fff", fontSize: "15px" }}
                            />
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{ color: "#fff", fontSize: "15px" }}
                            />
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{ color: "#fff", fontSize: "15px" }}
                            />
                          </span>
                        </Link>
                      )}
                    </div>
                  </>
                </div>
                <div className="FamilyPack-select-variants-row-os family-overflow">
                  <div className="sec-family-ts lg:hidden block">
                    <div className="border-2 border-primary  text-primary font-roboto font-semibold text-[17.9573px] leading-[19px] text-center rounded-[4px] p-1 lg:w-max flex items-center justify-between gap-2 mb-1 w-full">
                      <label htmlFor="family-pack-count">Family pack of</label>
                      <div className="FamilyPack-variant-selector-os ">
                        <select
                          id="family-pack-count"
                          value={count}
                          onChange={(e) => {
                            setIsLoading(true);
                            setCount(Number(e?.target?.value));
                          }}
                        >
                          {Array.from({ length: 6 }, (_, i) => (
                            <option key={i + 2} value={i + 2}>
                              {i + 2}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {isMobile ? (
                  <div className="featured-number-row-os">
                    <div className="scroll__slider">
                      {apiDataArray.map((groupItems, index) => (
                        <div className="slide__flex__data" key={index}>
                          {/* // <span key={index}> */}
                          <FamilyCard count={count} apiData={groupItems} />
                          {/* // </span> */}
                        </div>
                      ))}
                      <div className="slide__flex__data box__slide ">
                        <Link
                          href={`/search-results?type=family_pack&searchBy=family_pack&fp_total=${count}&callCount=0`}
                          className="view-more-slider-button"
                        >
                          View More
                          <span style={{ marginLeft: "5px" }}>
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{
                                color: "var(--secondary)",
                                fontSize: "15px",
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{
                                color: "var(--secondary)",
                                fontSize: "15px",
                              }}
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Splide
                    options={{
                      perPage: 5,
                      perMove: 1,
                      rewind: true,
                      arrows: false,
                      pagination: false,
                      type: "slide",
                      gap: "1em",
                      breakpoints: {
                        800: {
                          perPage: 2,
                          gap: "5px",
                          focus: 0,
                        },
                        600: {
                          perPage: 1,
                        },
                      },
                      lazyLoad: "nearby",
                    }}
                  >
                    {apiDataArray.map((groupItems, index) => (
                      <SplideSlide key={index}>
                        <FamilyCard count={count} apiData={groupItems} />
                      </SplideSlide>
                    ))}
                    <SplideSlide>
                      <div className="slide__flex__data box__slide ">
                        <Link
                          href={`/search-results?type=family_pack&searchBy=family_pack&fp_total=${count}&callCount=0`}
                          className="view-more-slider-button"
                        >
                          View More
                          <span style={{ marginLeft: "5px" }}>
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{
                                color: "var(--secondary)",
                                fontSize: "15px",
                              }}
                            />
                            <FontAwesomeIcon
                              icon={faGreaterThan}
                              style={{
                                color: "var(--secondary)",
                                fontSize: "15px",
                              }}
                            />
                          </span>
                        </Link>
                      </div>
                    </SplideSlide>
                  </Splide>
                )}
                {apiDataArray.length !== 0 ? (
                  <>
                    {currentSlide === 0 && (
                      <button
                        disabled
                        className="Previous-rss"
                        aria-label="Previous"
                      >
                        Previous
                      </button>
                    )}
                    {currentSlide === totalSlides - 1 && (
                      <button
                        disabled
                        className="Previous-rss"
                        aria-label="Next"
                      >
                        Next
                      </button>
                    )}
                  </>
                ) : (
                  <p className="data-not-found-message-os">
                    No family pack found
                  </p>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default FamilyPack;
