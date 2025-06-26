"use client"
import React from "react";
import OrderDeclinedBanner from "./OrderDeclinedBanner/OrderDeclinedBanner";
import OrderDeclinedData from "./OrderDeclinedData/OrderDeclinedData";

const OrderDeclined = () => {
  return (
    <div className="OrderDecline-page-os">
      <OrderDeclinedBanner />
      <OrderDeclinedData />
    </div>
  );
};

export default OrderDeclined;
