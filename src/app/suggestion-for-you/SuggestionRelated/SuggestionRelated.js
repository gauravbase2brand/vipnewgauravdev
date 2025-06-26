import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../SuggestionFeaturedNumber/SuggestionFeaturedNumber.css";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import Card from "../../Shared/Card/Card";
import axios from "axios";
import BuyNowButton from "../../Shared/BuyNowButton/BuyNowButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import Image from "next/image";
import ViewMoreButton from "@/app/Shared/ViewMoreButton/ViewMoreButton";

const SuggestionRelatedNumber = () => {
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showViewMore, setShowViewMore] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);
  const mobileNumber = localStorage.getItem("mobileNumber");
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const fetchRelatedNumbers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/web/related/numbers?numbers=${mobileNumber}&page=${page}&paginate=60`
      );

      if (response.status === 200) {
        const data = response.data.data;
        setRelatedNumbers((prevNumbers) => [...prevNumbers, ...data]);
        setLoading(false);
        setShowViewMore(data.length === 15);
        setDataNotFound(data.length === 0);
      }
    } catch (error) {
      console.error("Failed to fetch related numbers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedNumbers();
  }, [page]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) {
    return (
      <div className="loader-os">
        <Image
          src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
          alt="Loading..."
          width={300}
          height={100}
          priority="true"
        />
      </div>
    );
  }

  return (
    <>
      {relatedNumbers.length !== 0 && (
        <section className="SuggestionFeaturedNumber-section-os default-section-os">
          <div className="container-os">
            <div className="SuggestionRelatedNumber-heading-os">
              <MainHeading
                MainHeading="Related Number"
                rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
              />
            </div>
            {dataNotFound ? (
              <p style={{ textAlign: "center" }}>Oops! data not found.</p>
            ) : (
              <>
                <div className="featured-number-row-os grid__category">
                  {relatedNumbers.map((product) => {
                    // Extracted code for simplicity
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
                      <Card
                        key={product.productid}
                        product_id={product.productid}
                        productname={product.productname}
                        number={product.number}
                        rating={Math.floor(product.rating)}
                        cod={product.cod === "yes" ? product.cod : "cod"}
                        coming_soon={
                          product.rtp_date === null ? null : "Coming Soon"
                        }
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
                {showViewMore && (
                  <ViewMoreButton
                    title={"Load more"}
                    onClick={handleViewMore}
                  />
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SuggestionRelatedNumber;
