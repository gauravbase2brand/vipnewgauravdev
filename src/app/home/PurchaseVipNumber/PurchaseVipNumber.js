import React from "react";
import "./PurchaseVipNumber.css";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import PurchaseNumberCard from "../../Shared/PurchaseNumberCard/PurchaseNumberCard";
import VipSlider from "react-slick";

const PurchaseVipNumber = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const sliderSettings1 = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 577,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <section className="PurchaseVipNumber-section-os">
      <div className="container-os">
        <div className="PurchaseVipNumber-heading-os">
          <MainHeading
            MainHeading="Delivery Process for VIP Number"
            rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
          />
        </div>
        <div className="PurchaseVipNumber-row-os">
          <PurchaseNumberCard
            // Image={Purchase1}
            headingText="Pay"
            subText="to place an Order"
          />

          <PurchaseNumberCard
            // Image={Purchase2}
            headingText="Get UPC"
            subText="UPC will be delivered through SMS, Whatsapp and Email."
          />

          <PurchaseNumberCard
            // Image={Purchase3}
            headingText="Do MNP"
            subText="Start MNP Process from any of your nearest retail shops and get the SIM."
          />

          <PurchaseNumberCard
            // Image={Purchase4}
            headingText="Activation"
            subText="Get your number activated within 4-5 days. "
            spanText="(18-25 days for Assam and J&K)"
          />

          <PurchaseNumberCard
            // Image={Purchase5}
            headingText="Money Back Assurity"
            subText="100% Money back if any problem persists with the UPC code."
            star="*"
          />
        </div>
      </div>

      <div className="PurchaseVipNumber-mobile-slider-os">
        <VipSlider {...sliderSettings1}>
          <PurchaseNumberCard
            // Image={Purchase1}
            headingText="Pay"
            subText="to place an Order"
          />

          <PurchaseNumberCard
            // Image={Purchase2}
            headingText="Get UPC"
            subText="UPC will be delivered through SMS, Whatsapp and Email."
          />

          <PurchaseNumberCard
            // Image={Purchase3}
            headingText="Do MNP"
            subText="Start MNP Process from any of your nearest retail shops and get the SIM."
          />

          <PurchaseNumberCard
            // Image={Purchase4}
            headingText="Activation"
            subText="Get your number activated within 4-5 days. (18-25 days for Assam and J&K)"
          />

          <PurchaseNumberCard
            // Image={Purchase5}
            headingText="Money Back Assurity"
            subText="100% Money back if any problem persists with the UPC code."
          />
        </VipSlider>
      </div>
    </section>
  );
};

export default PurchaseVipNumber;
