import React, { useContext, useEffect, useState } from "react";
import "../home/FeaturedNumber/FeaturedNumber.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import MainHeading from "../Shared/MainHeading/MainHeading";
import ViewMoreButton from "../Shared/ViewMoreButton/ViewMoreButton";
import Card from "../Shared/Card/Card";

const ReatedNumber = () => {
  const [data, setData] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const Router = useRouter();
  const { user } = useContext(AppStateContext);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get(
            `${apiUrl}/web/platinum/search?number=${user?.user?.mobile}&seller=PREMIUM&paginate=60`
          ),
          axios.get(
            `${apiUrl}/web/bronze/search?number=${user?.user?.mobile}&seller=PREMIUM&paginate=60`
          ),
          axios.get(
            `${apiUrl}/web/gold/search?number=${user?.user?.mobile}&seller=PREMIUM&paginate=60`
          ),
        ];
        const responses = await Promise.all(requests);
        const validResponses = responses.filter(
          (response) => response.data.data.length > 4
        );

        if (validResponses.length > 0) {
          setData(validResponses[0].data.data);
        } else {
          const allData = responses.flatMap((response) => response.data.data); // Get all data from responses
          setData(allData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [apiUrl, user]);

  const handleClick = () => {
    Router.push(
      `/search-results?type=global&searchBy=digit&number=${user?.user?.mobile}&callCount=0`
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Detect if screen width is <= 767px
    };
    window.addEventListener("resize", handleResize); // Update on window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
  }, []);

  return (
    <section className="py[5px] gk">
      <div className="container-os">
        <div className="featured-number-heading-os  featured-number-flex ">
          <MainHeading
            MainHeading="Suggestion For You"
            // rightImage={crown}
          />
          <div className="default-viewMore-btn-os">
            <ViewMoreButton title={"View More"} onClick={handleClick} />
          </div>
        </div>

        {data && data.length > 0 ? (
          <div className="featured-number-row-os">
            {isMobile ? (
              <div className="scroll__slider">
                {data.slice(0, ITEMS_PER_PAGE).map((product, index) => {
                  const vipNumbers = product.productname.split("-").join("");
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
                    return parseFloat(price).toLocaleString("en-IN", options);
                  };
                  const formattedPrice = formatPriceWithCommas(
                    product.unit_price
                  );

                  return (
                    <div className="slide__flex__data" key={index}>
                      <Card
                        key={index}
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
                  className="slide__flex__data box__slide "
                  onClick={handleClick}
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
                  const vipNumbers = product.productname.split("-").join("");
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
                    return parseFloat(price).toLocaleString("en-IN", options);
                  };
                  const formattedPrice = formatPriceWithCommas(
                    product.unit_price
                  );

                  return (
                    <SplideSlide key={index}>
                      <Card
                        key={index}
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
                    className="slide__flex__data box__slide "
                    onClick={handleClick}
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
          <div className="loader-os">
            <Image
              src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
              alt=""
              width={300}
              height={100}
              priority="true"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ReatedNumber;
