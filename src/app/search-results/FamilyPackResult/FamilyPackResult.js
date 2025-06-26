import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../Shared/MainSubHeading/MainSubHeading";
import "../../home/FamilyPack/FamilyPack.css";
import axios from "axios";
import FamilyCard from "../../Shared/FamilyCard/FamilyCard";
import "./FamilyPackResult.css";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import Image from "next/image";
import CardLoder from "@/app/CardLoder/CardLoder";
//Pagination data per page
const ITEMS_PER_PAGE = 20;
const FamilyPack = ({ familyPackParamDigit }) => {
  const [apiData, setApiData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  //Load data per page function
  const loadMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //Api data structure
  useEffect(() => {
    setApiData({});
    axios
      .get(
        `${apiUrl}/web/familypack?fp_total=${familyPackParamDigit}&paginate=${ITEMS_PER_PAGE}&page=${currentPage}`
      )
      .then((response) => {
        setApiData((prevData) => ({
          ...prevData,
          ...response.data,
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [familyPackParamDigit, currentPage]);

  // Convert apiData to an array of items
  const apiDataArray = Object.values(apiData);

  // Check if there are more items to load
  const hasMoreData = apiDataArray.length > currentPage * ITEMS_PER_PAGE;

  return (
    <section className="FamilyPack-section-os">
      <div className="container-os">
        {/* Family Pack test */}
        <div className="FamilyPack-heading-os">
          <MainHeading
            MainHeading="Family & Business Pack"
            rightImage={`${panelImg}/assets/img/vip-images/familypack_jl7urv.webp`}
          />
          <MainSubHeading MainSubHeadingText="VIP Numbers are available for Two to Nine family or Business members" />
        </div>
        <div className="FamilyPack-select-variants-row-os">
          {isLoading ? (
             <CardLoder columns={5} gridItems={5} />
          ) : (
            <>
              <div className="FamilyPack-plan-row-os">
                {apiDataArray
                  .slice(0, currentPage * ITEMS_PER_PAGE)
                  .map((groupItems, index) => (
                    <FamilyCard
                      key={index}
                      count={familyPackParamDigit}
                      apiData={groupItems} // Pass the group's data as a prop
                    />
                  ))}
              </div>
              {hasMoreData && (
                <div className="default-viewMore-btn-os">
                  <ViewMoreButton title={"Load more"} onClick={loadMoreData} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FamilyPack;
