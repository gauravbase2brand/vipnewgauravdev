import React from "react";
import "../OrderDeclined.css";

const OrderDeclinedBanner = () => {
  return (
    <section className="OrderDeclined-heading-section-os relative">
      <div className="absolute order-decline-status">
        <h2 className="text-center text-xl font-extrabold">Payment Declined</h2>
        <p className="text-[14px] text-center leading-normal md:text-xl text-red-600">
          Your payment has failed. Please try again or contact support for
          assistance
        </p>
      </div>
    </section>
  );
};

export default OrderDeclinedBanner;
