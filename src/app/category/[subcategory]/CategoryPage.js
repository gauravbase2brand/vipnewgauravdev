"use client";
import React, { useState, useEffect, useContext } from "react";
import SuggestionBanner from "../../suggestion-for-you/SuggestionBanner/SuggestionBanner";
import Search from "../../Shared/Search/Search";
import FAQs from "../../Shared/FAQs/FAQs";
import OurCustomers from "../../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../../Shared/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../../home/RegisterVipNumber/RegisterVipNumber";
import CategoryWithSubCategories from "../CategoryWithSubCategories/CategoryWithSubCategories";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import CategoriesContent from "../../Shared/CategoriesContent/CategoriesContent";
import "../../home/Home.css";
import FamilyPack from "@/app/home/FamilyPack/FamilyPack";
import NumurologySub from "@/app/subcategory/NumurologySub";
import CategoryContent from "./CategoryContent";
import NumberBlogListCard from "@/app/blogs/NumberBlogListCard";
// import { ResponsiveFooter } from "@/app/ResponsiveModule";
import { useGetQueryParams } from "@/app/utils";
import { MyRegisterSignInContext } from "@/app/contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import CardLoder from "@/app/CardLoder/CardLoder";

export const SearchContext = React.createContext(null);
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const CategoryPage = () => {
  const { params } = useGetQueryParams();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const {
    categoriesData,
    apiData,
    subCatDetail,
    setSubCatDetail,
    activeCategoryLink,
    category,
    setCategoryId,
    catLoader,
    setNumerologyPop,
    user,
  } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const [searchResults] = useState([]);
  const [seracPrice] = useState([]);
  const [besSeach] = useState([]);
  const [digit] = useState([]);

  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds timeout

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  // useEffect(() => {
  //   if (params?.subcategory && categoriesData?.length) {
  //     for (let index = 0; index < categoriesData.length; index++) {
  //       const element = categoriesData[index];
  //       console.log("element",element?.detail?.slug);
  //       console.log("wond");

  //       if (element?.detail?.slug === params.subcategory) {
  //         setCategoryId(element);
  //         setSubCatDetail({});
  //         break;
  //       }
  //     }
  //   }
  // }, [params, categoriesData]);

  useEffect(() => {
    if (categoriesData?.length) {
      for (let index = 0; index < categoriesData.length; index++) {
        const element = categoriesData[index];
        if (
          (activeCategoryLink && element?.id === activeCategoryLink) ||
          (!activeCategoryLink && element?.detail?.slug === params.subcategory)
        ) {
          setCategoryId(element);
          setSubCatDetail({});
          break;
        }
      }
    }
  }, [activeCategoryLink, params, categoriesData]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://leafymango.com/blogs.php");
        const data = await response.json();
        const shuffledBlogs = shuffleArray(data.blogs); // Shuffle the blogs
        setBlogsData(shuffledBlogs.slice(0, 3)); // Take first 3 from the shuffled array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (!loading && !catLoader && apiData.length === 0) {
    return <p className="text-center text-red-700">No data found ...</p>;
  }
  // commented by gaurav CategoryPage

  return (
    <div className="Category-page-os">
      {category && window.location.pathname.split("/")[1] === "category" ? (
        <SuggestionBanner
          headingText={category?.detail?.h1_tag}
          subHeading={category?.detail?.sub_heading}
        />
      ) : (
        <SuggestionBanner
          headingText={subCatDetail?.h1_tag}
          subHeading={subCatDetail?.sub_heading}
        />
      )}
      <SearchContext.Provider
        className="ddd"
        value={{ searchResults, seracPrice, besSeach, digit }}
      >
        <div className="defaultPage-search-section-os">
          <Search />
        </div>
        {/* <div className="container-os ramnish-vip">
          <div className="default-page-filterTabs-os">
            {apiData && apiData.length > 0 ? "" : <FilterTabsCat />}
          </div>
        </div> */}
      </SearchContext.Provider>
      {!apiData.length > 0 ? (
        <CardLoder columns={5} gridItems={20} />
      ) : (
        <>
          <div className="min-h-[600px]">
            {category &&
              window.location.pathname.split("/")[1] === "category" && (
                <CategoryContent contentImage={subCatDetail} />
              )}

            {apiData &&
            apiData.length > 0 &&
            window.location.pathname.split("/")[1] === "category" ? (
              <CategoryWithSubCategories
                apiData={apiData}
                category={apiData[0]?.category}
              />
            ) : (
              <CategoryWithSubCategories
                apiData={apiData}
                category={
                  subCatDetail?.title === null
                    ? apiData[0]?.sub_category
                    : subCatDetail?.title
                }
              />
            )}
            {category &&
            window.location.pathname.split("/")[1] === "category" ? (
              <CategoryContent contentImage={category?.detail} />
            ) : (
              <CategoryContent contentImage={subCatDetail} />
            )}
            <FamilyPack counter={2} />
            {category?.detail?.detail?.length > 0 &&
            window.location.pathname.split("/")[1] === "category" ? (
              <CategoriesContent
                id={category?.id}
                HTMLContent={category?.detail?.detail}
                categoryH2={category?.detail}
              />
            ) : (
              <CategoriesContent
                id={subCatDetail?.id}
                HTMLContent={subCatDetail?.detail}
                categoryH2={subCatDetail}
              />
            )}
          </div>
        </>
      )}

      <FamilyPack counter={3} />
      <NumurologySub
        user={user}
        setActiveSignInWithOtp={setActiveSignInWithOtp}
        setNumerologyPop={setNumerologyPop}
      />
      <FamilyPack counter={4} />
      <FAQs />
      <div className="cat-in-blogs">
        {blogsData?.map((item) => (
          <NumberBlogListCard
            key={item?.id}
            id={item?.id}
            image={item?.mainImage}
            img_url={item?.img_url}
            width={1000}
            height={300}
            date={formatDate(item?.Date)}
            alt_tag={item?.img_url}
            heading={item?.mainHeading}
            subHeading={item?.mainShortDescription}
          />
        ))}
      </div>
      <OurCustomers />
      <VideoTestimonial />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/assurance-register-img_b3fsuq.webp`}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText="Login"
        buttonText1="Login"
        buttonUrl="/register"
        buttonUrl1="/register"
        onClick={() => setActiveSignInWithOtp(true)}
      />
      <QRVipApp />
    </div>
  );
};

export default CategoryPage;
