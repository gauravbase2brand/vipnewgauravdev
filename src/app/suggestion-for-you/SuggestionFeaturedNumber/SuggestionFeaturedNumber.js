import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./SuggestionFeaturedNumber.css";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import Card from "../../Shared/Card/Card";
import axios from "axios";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import CardLoder from "@/app/CardLoder/CardLoder";

const ITEMS_PER_PAGE = 60;
const SuggestionFeaturedNumber = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platinumData, setPlatinumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // Card data array

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/web/featured/numbers?paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        setPlatinumData((prevData) => [...prevData, ...response.data.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handleViewMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <section className="SuggestionFeaturedNumber-section-os default-section-os">
      <div className="container-os">
        <div className="SuggestionFeaturedNumber-heading-os">
          <MainHeading
            MainHeading="Featured Number"
            rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
          />
        </div>
        {platinumData && platinumData.length > 0 ? (
          <div className="featured-number-row-os grid__category">
            {platinumData.map((product) => {
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
              const formattedPrice = formatPriceWithCommas(product.unit_price);
              return (
                <Card
                  key={product.productid}
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
                  comingsoon={product.comingsoon}
                  comingsoon_date={product.comingsoon_date}
                  speciality={product.speciality}
                  star_status={product.star_status}
                />
              );
            })}
          </div>
        ) : (
          <CardLoder columns={5} gridItems={20} />
        )}
      </div>
      {isLoading ? (
        <CardLoder columns={5} gridItems={20} />
      ) : (
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
      )}
    </section>
  );
};

export default SuggestionFeaturedNumber;
