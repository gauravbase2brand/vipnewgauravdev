"use client";
import React, { useState } from "react";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import WishlistBanner from "./WishlistBanner/WishlistBanner";
import WishListNumber from "./WishListNumber/WishListNumber";
// import { ResponsiveFooter } from "../ResponsiveModule";

const WishList = () => {
  const [activeButton] = useState("toggle-2-os");

  return (
    <>
      <WishlistBanner
        title="Wishlist"
        subHeading="Your Saved Products. Add to Cart to Make a Purchase"
        buttonTitle="Buy Now"
        buttonTitle1="Wishlist"
        buttonLink="/details"
        buttonLink1="/wishlist"
        contactLink="/register"
        contactTitle="Contact Us"
        setActiveButton={activeButton}
      />
      <WishListNumber />
      <QRVipApp />
      
    </>
  );
};

export default WishList;
