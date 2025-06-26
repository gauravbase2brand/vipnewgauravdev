import React, { useState, useEffect, useContext } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../Shared/MainSubHeading/MainSubHeading";
import "../../home/FamilyPack/FamilyPack.css";
import axios from "axios";
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
import "../FamilyPackResult/FamilyPackResult.css";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../Shared/TabNumbers/TabNumberData/TabNumberData.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import CardLoder from "@/app/CardLoder/CardLoder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const FamilyPack_Search = ({ family_Search }) => {
  const { currentPage, setCurrentPage } = useContext(AppStateContext);
  const [apiData, setApiData] = useState({});
  const [count, setCount] = useState();
  const [hidebtn, setHideBtn] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const ITEMS_PER_PAGE = family_Search?.type === "family_pack" ? 20 : 5;
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const router = useRouter();
  const [familyLoad, setFamilyLoad] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Detect if screen width is <= 767px
    };
    window.addEventListener("resize", handleResize); // Update on window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
  }, []);
  //Load data per page function
  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setFamilyLoad(true);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [family_Search]);
  //Api data structure
  useEffect(() => {
    if (family_Search) {
      if (currentPage === 1) {
        setIsLoading(true);
      }
      axios
        .get(
          `${apiUrl}/web/familypack?start_with=${
            family_Search?.start_with || ""
          }&end_with=${family_Search?.end_with || ""}&any_where=${
            family_Search?.any_where || ""
          }&contains=${family_Search?.contains || ""}&not_contain=${
            family_Search?.not_contain || ""
          }&search_string=${
            family_Search?.number || family_Search?.search_string || ""
          }&fp_total=${family_Search?.fp_total || ""}&page=${currentPage}`
        )
        .then((response) => {
          setHideBtn(response);
          const filteredData = Object.fromEntries(
            Object.entries(response.data).filter(([key, value]) => key !== "")
          );
          // Append the new data to the existing data
          if (currentPage === 1) {
            setApiData(() => ({
              ...filteredData, // merge the new data with the existing
            }));
          } else {
            setApiData((prevData) => ({
              ...prevData,
              ...filteredData,
            }));
          }
          setIsLoading(false);
          setCount(family_Search?.fp_total ? family_Search?.fp_total : 3);
          setFamilyLoad(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [family_Search, currentPage]);

  const apiDataArray = Object.values(apiData);
  const hasValidData = apiDataArray.some((groupItems) => groupItems.length > 1);

  // Check if there are more items to load
  // const hasMoreData = apiDataArray.length > currentPage * ITEMS_PER_PAGE;
  return (
    <>
      {hasValidData && (
        <>
          {isLoading ? (
            <CardLoder columns={5} gridItems={50} />
          ) : (
            <section className="FamilyPack-section-os">
              <div className="container-os">
                <div className="mb-2 flex md:justify-between justify-center bg-[#e6e6e6c2]  p-1 text-white rounded-md mt-2">
                  <MainHeading
                    MainHeading="Family & Business Pack"
                    rightImage={`${panelImg}/assets/img/vip-images/familypack_jl7urv.webp`}
                  />
                  <div className=" md:flex justify-between gap-2 items-center  p-2  hidden">
                    <span className="font-semibold text-darktext">
                      {" "}
                      Family pack of
                    </span>
                    <div className="FamilyPack-variant-selector-os">
                      <select
                        className="appearance-none bg-secondary text-darktext px-4 py-2 rounded-lg pr-10 cursor-pointer outline-none font-semibold"
                        value={count}
                        onChange={(e) => {
                          const selectedValue = Number(e?.target?.value);
                          setCount(selectedValue);
                          setCurrentPage(1);
                          // Update the API call with the new fp_total value when the user selects an option
                          router.push(
                            `/search-results?type=${"family_pack"}&searchBy=${"family_pack"}&fp_total=${selectedValue}&callCount=0`
                          );
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
                </div>
                <MainSubHeading MainSubHeadingText="VIP Numbers are available for Two to Nine family or Business members" />
                {isMobile && (
                  <div className="FamilyPack-select-variants-col-os">
                    Family pack of
                    <div className="FamilyPack-variant-selector-os">
                      <select
                        value={count}
                        onChange={(e) => {
                          const selectedValue = Number(e?.target?.value);
                          setCount(selectedValue);
                          setCurrentPage(1);
                          router.push(
                            `/search-results?type=${"family_pack"}&searchBy=${"family_pack"}&fp_total=${selectedValue}&callCount=0`
                          );
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
                )}
                <div className="FamilyPack-select-variants-row-os">
                  <>
                    {isMobile ? (
                      <>
                        {!familyLoad &&
                        (family_Search?.start_with ||
                          family_Search?.end_with ||
                          family_Search?.any_where ||
                          family_Search?.contains ||
                          family_Search?.not_contain ||
                          family_Search?.number ||
                          family_Search?.search_string) ? (
                          <div className="featured-number-row-os">
                            <div className="scroll__slider">
                              {apiDataArray
                                .filter((groupItems) => groupItems.length > 1)
                                .slice(0, currentPage * ITEMS_PER_PAGE)
                                .map((groupItems, index) => (
                                  <div
                                    className="slide__flex__data"
                                    key={index}
                                  >
                                    <FamilyCard
                                      count={count}
                                      apiData={groupItems}
                                    />
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
                          <div className="FamilyPack-plan-row-os">
                            {apiDataArray
                              .filter((groupItems) => groupItems.length > 1)
                              .slice(0, currentPage * ITEMS_PER_PAGE)
                              .map((groupItems, index) => (
                                <FamilyCard
                                  key={index}
                                  count={count}
                                  apiData={groupItems} // Pass the group's data as a prop
                                />
                              ))}
                            {/* <div className="slide__flex__data box__slide ">
                              <Link
                                href={`/search-results?type=family_pack&searchBy=family_pack&fp_total=${count}&callCount=0`}
                                className="view-more-slider-button"
                              >
                                View Moregf
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
                            </div> */}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {!familyLoad &&
                        (family_Search?.start_with ||
                          family_Search?.end_with ||
                          family_Search?.any_where ||
                          family_Search?.contains ||
                          family_Search?.not_contain ||
                          family_Search?.number ||
                          family_Search?.search_string) ? (
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
                            }}
                          >
                            {apiDataArray
                              .filter((groupItems) => groupItems.length > 1)
                              .slice(0, currentPage * ITEMS_PER_PAGE)
                              .map((groupItems, index) => (
                                <SplideSlide key={index}>
                                  <FamilyCard
                                    key={index}
                                    count={count}
                                    apiData={groupItems} // Pass the group's data as a prop
                                  />
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
                        ) : (
                          <div className="FamilyPack-plan-row-os">
                            {apiDataArray
                              .filter((groupItems) => groupItems.length > 1)
                              .slice(0, currentPage * ITEMS_PER_PAGE)
                              .map((groupItems, index) => (
                                <FamilyCard
                                  key={index}
                                  count={count}
                                  apiData={groupItems} // Pass the group's data as a prop
                                />
                              ))}
                          </div>
                        )}
                      </>
                    )}
                    {/* </div> */}
                    {hidebtn.data.currentpage !== hidebtn.data.lastpage && (
                      <>
                        {family_Search?.type === "family_pack" && (
                          <div className="default-viewMore-btn-os">
                            <ViewMoreButton
                              title={"Load more"}
                              onClick={loadMoreData}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default FamilyPack_Search;
