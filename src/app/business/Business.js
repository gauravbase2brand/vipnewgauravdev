"use client"
import React from "react";
import "./business.css";
import BannerBusiness from "./BannerBusiness";
import VipMemberPackage from "./VipMemberPackage";
import ScannerComponents from "./ScannerComponents";
import Growth from "./Growth";
import GallaryBusiness from "./GallaryBusiness";
import GallarySlider from "./GallarySlider";
import AccodianBusiness from "./AccodianBusiness";
import CustomerReviews from "./CustomerReviews";
import DeliveryProcess from "../Shared/DeliveryProcess/DeliveryProcess/DeliveryProcess";
import AwardWinner from "../Shared/AwardWinner/AwardWinner/AwardWinner";
import OrderPlacementOurCustomers from "../Shared/OrderPlacementOurCustomers/OrderPlacementOurCustomers";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import { ResponsiveFooter } from "../ResponsiveModule";

const Business = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div>
      <BannerBusiness />
      <VipMemberPackage />
      <ScannerComponents />
      <Growth />
      <GallaryBusiness />
      <GallarySlider />
      <AccodianBusiness />
      <CustomerReviews />
      <div className="desktop-content-os">
        <CityHowGetVipNumber
          headingPart1="Delivery Process for"
          headingPart2="VIP Number"
          headingPart3="?"
          
        />
      </div>
      <div className="mobile-content-os pt-4">
        <DeliveryProcess />
      </div>
      <AwardWinner />
      <OrderPlacementOurCustomers />
     
    </div>
  );
};

export default Business;
