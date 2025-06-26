"use client";
import React, { useContext } from "react";
import Card from "../../Shared/Card/Card";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import SortedFilter from "../../Shared/FilterTabs/SortedFilter";
import ClientVideo from "@/app/ClientVideo/ClientVideo";
import PriceNumber from "@/app/SpotifyDesign/PriceNumber";
import Image from "next/image";
import CardLoder from "@/app/CardLoder/CardLoder";
const CategoryWithSubCategories = ({ apiData, category }) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { setCategoryCurrentPage, catLoader, catData, loadmore, setLoadMore } =
    useContext(AppStateContext);

  const LoadMoreContent = () => {
    setLoadMore(true);
    setCategoryCurrentPage((prevPage) => prevPage + 1);
  };

  if (catLoader && !apiData) {
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
    <div>
      {apiData && apiData.length > 0 && (
        <section className="SuggestionFeaturedNumber-section-os default-section-os">
          <div className="container-os">
            <div className="featured-number-heading-os sorted-filter-title">
              {apiData && apiData.length > 0 && (
                <>
                  {category === undefined ? (
                    <MainHeading MainHeading={"Vip Mobile Number"} />
                  ) : (
                    <MainHeading
                      MainHeading={`${category} - Vip Mobile Number`}
                    />
                  )}
                </>
              )}
              <SortedFilter />
            </div>
            {apiData && apiData.length > 0 && (
              <div>
                <div className="featured-number-row-os grid__category">
                  {apiData?.map((items, index) => {
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
                      items.unit_price
                    );
                    const showComingSoon = items.rtp_date === null;
                    return (
                      <React.Fragment key={items.productid}>
                        <Card
                          product_id={items.productid}
                          discountValue={items.discount}
                          unit_price={formattedPrice}
                          capareAtprice={items.capareAtprice}
                          productname={items.productname}
                          number={items.number}
                          total={items.total}
                          sum={items.sum}
                          rating={items.rating}
                          cod={items.cod ? "Yes" : "N/A"}
                          coming_soon={showComingSoon ? null : "Coming Soon"}
                          seller_type={items.seller_type}
                          rtp_date={items.rtp_date}
                          card_btn_text={items?.card_btn_text}
                          buttonTitle="Buy Now"
                          compare_at_price={items?.compare_at_price}
                          comingsoon={items?.comingsoon}
                          comingsoon_date={items?.comingsoon_date}
                          speciality={items?.speciality}
                          star_status={items?.star_status}
                        />
                        {index === 19 && (
                          <div className="catSub-Data-rows client-video-cat">
                            <ClientVideo />
                          </div>
                        )}
                        {index === 39 && (
                          <div className="catSub-Data-rows">
                            <PriceNumber />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                {loadmore && (
                   <CardLoder columns={5} gridItems={20} />
                )}
                {window.location.pathname.split("/")[1] === "category" && (
                  <>
                    {catData.length >= 50 && (
                      <div
                        style={{
                          width: "100%",
                          marginTop: "20px",
                          alignSelf: "center",
                        }}
                      >
                        <ViewMoreButton
                          title={"Load more"}
                          onClick={LoadMoreContent}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryWithSubCategories;
