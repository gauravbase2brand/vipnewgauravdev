import React from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Card from "../../Shared/Card/Card";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import SortedFilter from "../../Shared/FilterTabs/SortedFilter";
import Image from "next/image";
import { AppliedTags } from "@/app/Shared/Search/Search";
import { useGetQueryParams } from "@/app/utils";
const BronzeResult = ({ results, nextPage, viewLoadMore,loadmore }) => {
  const { queryParams } = useGetQueryParams();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <>
      {results.length !== 0 && (
        <section className="defaultResult-section-os BronzeResult-section-os">
          <AppliedTags queryParams={queryParams} />
          <div className="container-os">
            <div className="featured-number-heading-os sorted-filter-title">
              <MainHeading
                MainHeading="Bronze  Number"
                rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
              />
              <SortedFilter />
            </div>

            <div>
              {results && results.length > 0 ? (
                <div>
                  <div className="featured-number-row-os grid__category">
                    {results.map((product) => {
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
                      const show_coming_soon = product.coming_soon === "yes";
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

                      // ...

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
                          compare_at_price={product.compare_at_price}
                          comingsoon={product.comingsoon}
                          comingsoon_date={product.comingsoon_date}
                          speciality={product.speciality}
                          star_status={product.star_status}
                        />
                      );
                    })}
                  </div>
                  {loadmore && (
                    <div className="loader-os">
                      <Image
                        src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
                        alt="loading..."
                        width={300}
                        height={100}
                        priority="true"
                      />
                    </div>
                  )}
                  {viewLoadMore && (
                    <div className="default-loadMore-button-os">
                      <ViewMoreButton
                        title="View More"
                        onClick={() => {
                          nextPage();
                        }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p style={{ textAlign: "center" }}>Oops! No data found.</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BronzeResult;
