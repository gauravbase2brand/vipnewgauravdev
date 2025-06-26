"use client";
import React, { useState, useContext } from "react";
import SuggestionBanner from "./SuggestionBanner/SuggestionBanner";
import Search from "../Shared/Search/Search";
import SuggestionFeaturedNumber from "./SuggestionFeaturedNumber/SuggestionFeaturedNumber";
import FamilyPack from "../home/FamilyPack/FamilyPack";
import CarHomeBikeLucky from "./CarHomeBikeLucky/CarHomeBikeLucky";
import FAQs from "../Shared/FAQs/FAQs";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import FilterTabs from "../Shared/FilterTabs/FilterTabs";
import SuggestionUserHostory from "./SuggestionUserHostory/SuggestionUserHostory";
import SuggestionRelated from "./SuggestionRelated/SuggestionRelated";

import { ResponsiveFooter } from "../ResponsiveModule";

export const SearchContext = React.createContext(null);
const Suggestion = ({ Seo }) => {
  const { user } = useContext(AppStateContext);
  const [searchResults] = useState([]);
  const [seracPrice] = useState([]);
  const [besSeach] = useState([]);
  const [digit] = useState([]);
  const [suggestion, setSuggestion] = useState();
  const [data, setData] = useState([]);

  return (
    <div className="suggestion-page-os">
      <SuggestionBanner
        headingText="Suggestion Page"
        subHeading="Get Instant Support from our team for VIP Number"
      />
      <SearchContext.Provider
        className="ddd"
        value={{ searchResults, seracPrice, besSeach, digit }}
      >
        <div className="defaultPage-search-section-os">
          <Search />
        </div>
        <div className="container-os ramnish-vip">
          <div className="default-page-filterTabs-os">
            <FilterTabs />
          </div>
        </div>
      </SearchContext.Provider>
      <CarHomeBikeLucky
        {...{ suggestion, setSuggestion, setData, data, user }}
      />
      <SuggestionUserHostory />
      <SuggestionRelated />
      <SuggestionFeaturedNumber />
      {/* <FamilyPack /> */}
      <FAQs />
      <VideoTestimonial />
      <OurCustomers />
      <QRVipApp />
      
    </div>
  );
};

export default Suggestion;
