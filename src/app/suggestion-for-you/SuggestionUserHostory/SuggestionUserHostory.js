import React, { useContext, useEffect, useState } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../SuggestionFeaturedNumber/SuggestionFeaturedNumber.css";
import { getProfile } from "../../Services/Services";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import Image from "next/image";
import Card from "@/app/Shared/Card/Card";
import ViewMoreButton from "@/app/Shared/ViewMoreButton/ViewMoreButton";

const ITEMS_PER_PAGE = 60;

const SuggestionUserHostory = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    setIsLoading(true);
    getProfile(user?.token)
      .then((res) => {
        return fetch(
          `${apiUrl}/web/history/search?id=${res?.contactid}&paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPage, user]);

  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentData = data.slice(firstIndex, lastIndex);

  const handleViewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const formatPriceWithCommas = (price) => {
    const options = {
      style: "decimal",
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    };
    return parseFloat(price).toLocaleString("en-IN", options);
  };

  return (
    <>
      {currentData && currentData.length > 0 && (
        <section className="FamilyPack-section-os SuggestionUserHostory-section-os">
          <div className="container-os">
            {currentData && currentData.length > 0 && (
              <div className="featured-number-heading-os">
                <MainHeading
                  MainHeading="Based on Your History "
                  rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
                />
              </div>
            )}

            {isLoading ? (
              <div className="loader-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
                  alt="loader"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
            ) : (
              <>
                {currentData && currentData.length > 0 && (
                  <div className="featured-number-row-os grid__category">
                    {currentData.map((product) => {
                      const vipNumbers = product.productname
                        ?.split("-")
                        .join("");
                      const total = vipNumbers
                        ?.split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString();
                      const sum =
                        total
                          ?.split("")
                          .reduce((acc, num) => acc + parseInt(num), 0)
                          .toString().length > 0
                          ? total
                              ?.split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                              ?.split("")
                              .reduce((acc, num) => acc + parseInt(num), 0)
                              .toString()
                          : total;
                      const showCod = product.cod === "yes";
                      const show_coming_soon = product.coming_soon === "yes";
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
                          cod={showCod ? product.cod : "cod"}
                          coming_soon={
                            show_coming_soon
                              ? product.coming_soon
                              : "Coming Soon"
                          }
                          unit_price={formattedPrice}
                          total={product.total}
                          sum={product.sum}
                          seller_type={product.seller_type}
                          rtp_date={product.rtp_date}
                          card_btn_text={product.card_btn_text}
                          comingsoon={product.comingsoon}
                          comingsoon_date={product.comingsoon_date}
                          speciality={product.speciality}
                          star_status={product.star_status}
                        />
                      );
                    })}
                  </div>
                )}

                {currentData && currentData.length >= ITEMS_PER_PAGE && (
                  <div className="default-viewMore-btn-os">
                    <ViewMoreButton
                      title={"View More"}
                      onClick={handleViewMore}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SuggestionUserHostory;
