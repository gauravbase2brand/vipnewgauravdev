import React, { useEffect, useState } from "react";
import "./TabNumberData.css";
import "../../../home/FeaturedNumber/FeaturedNumber.css";
// Splide slider imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import debounce from "lodash/debounce";
import Card from "../../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import MainHeading from "../../MainHeading/MainHeading";
import ViewMoreButton from "../../ViewMoreButton/ViewMoreButton";
const TabNumberData = ({ title, data, link, description }) => {
  const ITEMS_PER_PAGE = 10;
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth <= 767);
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatPriceWithCommas = (price) => {
    const options = {
      style: "decimal",
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };
    return parseFloat(price).toLocaleString("en-IN", options);
  };

  const processProductData = (product) => {
    const vipNumbers = product.productname.split("-").join("");
    const total = vipNumbers
      .split("")
      .reduce((acc, num) => acc + parseInt(num, 10), 0)
      .toString();
    const sum =
      total
        .split("")
        .reduce((acc, num) => acc + parseInt(num, 10), 0)
        .toString().length > 1
        ? total
            .split("")
            .reduce((acc, num) => acc + parseInt(num, 10), 0)
            .toString()
            .split("")
            .reduce((acc, num) => acc + parseInt(num, 10), 0)
            .toString()
        : total;

    const showCod = product.cod === "yes";
    const showComingSoon = product.rtp_date === null;
    const formattedPrice = formatPriceWithCommas(product.unit_price);

    return { sum, showCod, showComingSoon, formattedPrice };
  };
  return (
    <section className="py[5px] gk">
      <div className="container-os ">
        <div className="view-more-btn">
          <div className="flex items-center justify-between lg:p-[8px] p-[5px] my-2 rounded-xl bg-[#e6e6e6c2]">
            <MainHeading MainHeading={title} />
            <div>
              <ViewMoreButton
                title={"View More"}
                onClick={() => {
                  // Navigate(`/${link}`);
                  window.open(link, "_blank");
                }}
              />
            </div>
          </div>
        </div>

        {data && data.length > 0 ? (
          <div className="featured-number-row-os">
            {isMobile ? (
              <div className="scroll__slider">
                {data.slice(0, ITEMS_PER_PAGE).map((product, index) => {
                  const { sum, showCod, showComingSoon, formattedPrice } =
                    processProductData(product);

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
                <div
                  className="slide__flex__data box__slide"
                  onClick={() => {
                    window.open(link, "_blank");
                  }}
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
                {data.slice(0, ITEMS_PER_PAGE).map((product, index) => {
                  const { sum, showCod, showComingSoon, formattedPrice } =
                    processProductData(product);

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
                <SplideSlide>
                  <div
                    className="slide__flex__data box__slide"
                    onClick={() => {
                      window.open(link, "_blank");
                    }}
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
              </Splide>
            )}
          </div>
        ) : (
          ""
        )}

        {description && (
          <section className="overflow-hidden  relative">
            <div className="w-full overflow-hidden">
              <div
                className="flex w-max whitespace-nowrap"
                style={{
                  animation: "smoothMarquee 150s linear infinite",
                  display: "flex",
                }}
              >
                {Array(50)
                  .fill(`${description} \u00A0\u00A0\u00A0`)
                  .map((text, index) => (
                    <h4
                      key={index}
                      className="text-sm font-medium text-darktext px-2"
                    >
                      {text}
                    </h4>
                  ))}
              </div>
            </div>
            <style jsx>{`
              @keyframes smoothMarquee {
                from {
                  transform: translateX(0%);
                }
                to {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </section>
        )}
      </div>
    </section>
  );
};

export default TabNumberData;
