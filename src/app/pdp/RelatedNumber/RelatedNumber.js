import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./RelatedNumber.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import Card from "../../Shared/Card/Card";
import { useGetQueryParams } from "../../utils";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import CardLoder from "@/app/CardLoder/CardLoder";
const RelatedNumber = () => {
  const [nexturl, setNexturl] = useState();
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [productNumber, setProductNumber] = useState(null);
  const { queryParams } = useGetQueryParams();
  const [currentPage, setCurrentPage] = useState(1);
  const isFetching = useRef(false);
  const perPage = 60;
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [loading, setLoading] = useState(true); // State to handle loading
  const [delayedCheck, setDelayedCheck] = useState(false); // Delay state

  useEffect(() => {
    const fetchRelatedNumbers = async () => {
      const productId = queryParams?.productid;
      const number = queryParams?.number;
      if ((productId || number) && !isFetching.current) {
        isFetching.current = true;

        try {
          const url = productId
            ? `${apiUrl}/web/related/numbers?ids=${queryParams?.productid}&page=${currentPage}&paginate=${perPage}`
            : `${apiUrl}/web/related/numbers?numbers=${number}&page=${currentPage}&paginate=${perPage}`;

          const response = await fetch(url); // Fetch the data using the correct syntax
          const data = await response.json(); // Extract JSON data

          const newProductNumber = data?.data?.number; // Use 'data' instead of 'response.data'

          setRelatedNumbers(data.data);
          setProductNumber(newProductNumber);
          setNexturl(data.nextURL);
        } catch (error) {
          console.error(error);
        } finally {
          isFetching.current = false;
        }
      }
    };
    fetchRelatedNumbers();
  }, [queryParams, currentPage]);

  useEffect(() => {
    // Set a 2-second delay before performing the empty check
    const timer = setTimeout(() => {
      setDelayedCheck(true);
      setLoading(false); // Stop the loading spinner after the delay
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
  }, []);

  const handleLoadMore = async () => {
    if (!nexturl) return;
    try {
      const response = await axios.get(nexturl);
      const data = response.data;
      setNexturl(data.nextURL);
      setRelatedNumbers((prevNumbers) => [...prevNumbers, ...data.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreButton = nexturl && (
    <div className="default-loadMore-button-os">
      <ViewMoreButton title="Load more" onClick={handleLoadMore} />
    </div>
  );
  // Return null only after the 2-second delay
  if (delayedCheck && relatedNumbers.length === 0) {
    return null;
  }
  return (
    <>
      {loading ? (
        <CardLoder columns={5} gridItems={5} />
      ) : (
        <section className="RelatedNumber-section-os">
          <div className="container-os">
            <div className="RelatedNumber-heading-os">
              <MainHeading
                MainHeading="Related Number"
                rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
              />
            </div>
            <div className="featured-number-row-os grid__category">
              {relatedNumbers &&
                relatedNumbers?.map((items, index) => {
                  const formattedPrice = parseFloat(
                    items.unit_price
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  });
                  return (
                    <Card
                      key={index}
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
                      comming_soon={
                        items.coming_soon === "Coming Soon"
                          ? "Coming Soon"
                          : "Other Name"
                      }
                      seller_type={items.seller_type}
                      rtp_date={items.rtp_date}
                      card_btn_text={items?.card_btn_text}
                      buttonTitle="Buy Now"
                      comingsoon={items?.comingsoon}
                      comingsoon_date={items?.comingsoon_date}
                      speciality={items?.speciality}
                      star_status={items.star_status}
                    />
                  );
                })}
            </div>
            <div className="default-loadMore-button-os">{loadMoreButton}</div>
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedNumber;
