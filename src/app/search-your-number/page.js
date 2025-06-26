"use client"
import React from "react";
import "./GoogleReference.css";
import GoogleHeader from "./GoogleHeader/GoogleHeader";
import GoogleBanner from "./GoogleBanner/GoogleBanner";
import Search from "../Shared/Search/Search";
import BuyNowButton from "../Shared/BuyNowButton/BuyNowButton";
import GoogleIcons from "./GoogleIcons/GoogleIcons";

const GoogleReference = () => {
  return (
    <div className="GoogleRefference-page">
      <GoogleHeader />
      <GoogleBanner />
      <div className="defaultPage-search-section-os">
        <Search />
      </div>
      <div className="GoogleRefference-visitStore-btn-os">
        <BuyNowButton
          buttonUrl="/"
          onclickHandle=""
          buttonTitle="Visit Store"
        />
      </div>
      <GoogleIcons />
    </div>
  );
};

export default GoogleReference;
