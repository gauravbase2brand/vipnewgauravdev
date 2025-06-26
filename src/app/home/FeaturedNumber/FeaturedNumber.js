"use client";
import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import "./FeaturedNumber.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Card from "@/app/Shared/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import MainHeading from "@/app/Shared/MainHeading/MainHeading";
import ViewMoreButton from "@/app/Shared/ViewMoreButton/ViewMoreButton";
import Image from "next/image";
import CardLoder from "@/app/CardLoder/CardLoder";
const ITEMS_PER_PAGE = 10;

const FeaturedNumber = () => {
  const [platinumData, setPlatinumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const Router = useRouter();
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

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/web/featured/numbers?paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        setPlatinumData((prevData) => [...prevData, ...response.data.data]);
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage]);

  const handleViewMoreClick = () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    Router.push(
      "/search-results?searchBy=price&min_price=1500&max_price=1500000"
    );
  };

  return (
    <>
      {platinumData.length > 0 && !isLoading ? (
        <section className="p-1">
          <div className="container-os">
            <div className="flex items-center justify-between lg:p-[8px] p-[5px] my-2 rounded-xl bg-[#e6e6e6c2]">
              <MainHeading MainHeading="Featured Number" />
              <>
                {platinumData &&
                  platinumData.length >= currentPage * ITEMS_PER_PAGE && (
                    <div className="default-viewMore-btn-os">
                      <ViewMoreButton
                        title={"Load more"}
                        onClick={handleViewMoreClick}
                      />
                    </div>
                  )}
              </>
            </div>
            {platinumData && platinumData.length > 0 ? (
              <div className="featured-number-row-os">
                {isMobile ? (
                  <div className="scroll__slider">
                    {platinumData.map((product, index) => {
                      const vipNumbers = product.productname
                        .split("-")
                        .join("");
                      const total = vipNumbers
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString();
                      const sum =
                        total
                          .split("")
                          .reduce((acc, num) => acc + parseInt(num), 0)
                          .toString().length > 0
                          ? total
                              .split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                              .split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                          : total;
                      const showCod = product.cod === "yes";
                      const showComingSoon = product.rtp_date === null;
                      const formatPriceWithCommas = (price) => {
                        const options = {
                          style: "decimal",
                          useGrouping: true,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        };
                        return parseFloat(price).toLocaleString(
                          "en-IN",
                          options
                        );
                      };
                      const formattedPrice = formatPriceWithCommas(
                        product.unit_price
                      );

                      return (
                        <div className="slide__flex__data" key={index}>
                          <Card
                            product_id={product.productid}
                            productname={product.productname}
                            number={product.number}
                            rating={Math.floor(product.rating)}
                            cod={showCod ? product.cod : "cod"}
                            coming_soon={showComingSoon ? null : "Coming Soon"}
                            unit_price={formattedPrice}
                            total={product.total}
                            sum={product.sum}
                            card_btn_text={product.card_btn_text}
                            seller_type={product.seller_type}
                            rtp_date={product.rtp_date}
                            buttonTitle="Buy Now"
                            compare_at_price={product.compare_at_price}
                            comingsoon={product.comingsoon}
                            comingsoon_date={product.comingsoon_date}
                            speciality={product.speciality}
                            star_status={product.star_status}
                          />
                        </div>
                      );
                    })}
                    {platinumData &&
                      platinumData.length >= currentPage * ITEMS_PER_PAGE && (
                        <div
                          className="slide__flex__data box__slide "
                          onClick={handleViewMoreClick}
                        >
                          <a className="view-more-slider-button">
                            View More
                            <span style={{ marginLeft: "5px" }}>
                              <FontAwesomeIcon
                                icon={faGreaterThan}
                                style={{ color: "var(--secondary)", fontSize: "15px" }}
                              />
                              <FontAwesomeIcon
                                icon={faGreaterThan}
                                style={{ color: "var(--secondary)", fontSize: "15px" }}
                              />
                            </span>
                          </a>
                        </div>
                      )}
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
                    }}
                  >
                    {platinumData.map((product, index) => {
                      const vipNumbers = product.productname
                        .split("-")
                        .join("");
                      const total = vipNumbers
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString();
                      const sum =
                        total
                          .split("")
                          .reduce((acc, num) => acc + parseInt(num), 0)
                          .toString().length > 0
                          ? total
                              .split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                              .split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                          : total;
                      const showCod = product.cod === "yes";
                      const showComingSoon = product.rtp_date === null;
                      const formatPriceWithCommas = (price) => {
                        const options = {
                          style: "decimal",
                          useGrouping: true,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        };
                        return parseFloat(price).toLocaleString(
                          "en-IN",
                          options
                        );
                      };
                      const formattedPrice = formatPriceWithCommas(
                        product.unit_price
                      );

                      return (
                        <SplideSlide key={index}>
                          <Card
                            product_id={product.productid}
                            productname={product.productname}
                            number={product.number}
                            rating={Math.floor(product.rating)}
                            cod={showCod ? product.cod : "cod"}
                            coming_soon={showComingSoon ? null : "Coming Soon"}
                            unit_price={formattedPrice}
                            total={product.total}
                            sum={product.sum}
                            card_btn_text={product.card_btn_text}
                            seller_type={product.seller_type}
                            rtp_date={product.rtp_date}
                            buttonTitle="Buy Now"
                            compare_at_price={product.compare_at_price}
                            comingsoon={product.comingsoon}
                            comingsoon_date={product.comingsoon_date}
                            speciality={product.speciality}
                            star_status={product.star_status}
                          />
                        </SplideSlide>
                      );
                    })}
                    {platinumData &&
                      platinumData.length >= currentPage * ITEMS_PER_PAGE && (
                        <SplideSlide>
                          <div
                            className="slide__flex__data box__slide "
                            onClick={handleViewMoreClick}
                          >
                            <a className="view-more-slider-button">
                              View More
                              <span style={{ marginLeft: "5px" }}>
                                <FontAwesomeIcon
                                  icon={faGreaterThan}
                                  style={{ color: "var(--secondary)", fontSize: "15px" }}
                                />
                                <FontAwesomeIcon
                                  icon={faGreaterThan}
                                  style={{ color: "var(--secondary)", fontSize: "15px" }}
                                />
                              </span>
                            </a>
                          </div>
                        </SplideSlide>
                      )}
                  </Splide>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      ) : (
        <CardLoder columns={5} gridItems={20} />
      )}
    </>
  );
};

export default FeaturedNumber;
