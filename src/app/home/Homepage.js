"use client";
import React, { useState, createContext, useEffect } from "react";
import "./Home.css";
import VIPNumberSlider from "./VIPNumberSlider/VIPNumberSlider";
import FeaturedNumber from "./FeaturedNumber/FeaturedNumber";
// import DeliveryProcess from "../Shared/DeliveryProcess/DeliveryProcess/DeliveryProcess";
// const RegisterVipNumber = dynamic(() => import("./RegisterVipNumber/RegisterVipNumber"), {
//   ssr: false,
// });
import TabNumbers from "../Shared/TabNumbers/TabNumbers";
import debounce from "lodash/debounce";
import Banner from "./Banner/Banner";
// import { ResponsiveFooter } from "../ResponsiveModule";
import VipNumberShopSliderImages1 from "./VipNumberShopSliderImages1/VipNumberShopSliderImages1";
import Search from "../Shared/Search/Search";
import MobileContent from "../vipContent/MobileContent";
import FAQs from "../Shared/FAQs/FAQs";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import PressRelesed from "../SwiperSlider/PressRelesed";
import DeliveryAvailable from "./Banner/DeliveryAvailable";
import HomeDeliveryPop from "./Banner/HomeDeliveryPop";
import FamilyPack from "./FamilyPack/FamilyPack";
export const SearchContext = createContext(null);

const Homepage = () => {
  // register popup context
  const [isMobile, setIsMobile] = useState(false);
  const [delivery, setDelivery] = useState();

  useEffect(() => {
    const trackingData = {
      event: "page_view", // Custom event name for GTM
      page_location: window.location.href,
      page_referrer: "https://www.vipnumbershop.com/",
      page_title: document.title,
    };
    // Push the structured data to the dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(trackingData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const debounceResize = debounce(handleResize, 200); // Debounce with 200ms delay
    // Set initial value
    handleResize();
    // Add resize listener
    window.addEventListener("resize", debounceResize);
    return () => window.removeEventListener("resize", debounceResize);
  }, []);

  return (
    <div className="relative">
      <Banner />
      <DeliveryAvailable setDelivery={setDelivery} />
      {delivery?.cf_2913 && <HomeDeliveryPop />}
      {/* <SearchContext.Provider
        value={{ searchResults, seracPrice, besSeach, digit, most, getAdvance }}
      > */}
      {!isMobile && (
        <div className="defaultPage-search-section-os">
          <Search />
        </div>
      )}
      {/* <Suggestion /> */}
      {/* {isMobile && (
          <div className="mobile-content-os pt-4">
            <DeliveryProcess sectionStyle={"customPropClass"} />
          </div>
        )} */}
      <VipNumberShopSliderImages1 />
      <FamilyPack counter={3} />
      <TabNumbers />
      <VIPNumberSlider />
      <PressRelesed />
      <FeaturedNumber />
      {/* <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Suggestion for VIP Number"
          subHeading="For better VIP Number suggestions. Register with us."
          buttonText={user?.token ? "Suggestions" : "Login"}
          buttonText1={user?.token ? "Suggestions" : "Login"}
          onClick={() => {
            !user?.token && setRedirectTo("/suggestion-for-you");
            !user?.token && setActiveSignInWithOtp(true);
            user?.token && navigate.push("/suggestion-for-you");
          }}
        /> */}
      <MobileContent />
      <FAQs />
      <OurCustomers />
      {/* </SearchContext.Provider> */}
    </div>
  );
};

export default Homepage;
