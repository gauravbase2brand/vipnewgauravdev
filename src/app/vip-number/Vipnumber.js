"use client";
import React from "react";
import "../vip-mobile-number-in-punjab/CityPunjab.css";
import { useRouter } from "next/navigation";
import CityBanner from "../Shared/City/CityBanner/CityBanner";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import PunjabLeading from "../Shared/City/PunjabLeading/PunjabLeading";
import CityFavouriteNumber from "../Shared/City/CityFavouriteNumber/CityFavouriteNumber";
import CityDifferentFromOthers from "../Shared/City/CityDifferentFromOthers/CityDifferentFromOthers";
import CityExclusiveCollection from "../Shared/City/CityExclusiveCollection/CityExclusiveCollection";
import CityTestimonials from "../Shared/City/CityTestimonials/CityTestimonials";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import CityFaqs from "../Shared/City/CityFaqs/CityFaqs";
import { CityPunjabTestimonials } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { vipnumberfaq } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";

const Vipnumber = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Buy VIP Mobile Numbers Online"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/desktop-footer-logo_x9njf3.webp`}
        imageAlt="Bsnl Logo"
        title1="India's Most Trusted & 100% Genuine VIP Number Seller"
        para1="Buy VIP mobile numbers in premium, memorable combinations. Choose from Prepaid or Postpaid options at the best prices. Order now and enjoy free nationwide delivery!"
        para2=""
      />
      <CityFavouriteNumber
        title1="VIP Mobile Number Listings"
        title2="We offer numbers from top telecom providers including Airtel, Jio, Vi, BSNL, and more."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="How to Buy a "
        headingPart2="VIP Mobile Number Online"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Get Exclusive Rewards with Every VIP Number Purchase"
        subHeading="When you buy a VIP number from us, you're not just securing a unique and memorable mobile number—you're unlocking a host of exclusive rewards. Enjoy special discounts on your next purchase, early access to limited-edition VIP number drops, and premium customer support at every step. We ensure your experience is smooth, rewarding, and truly elite."
        buttonText={"Buy Your VIP Number"}
        buttonText1={"Buy Your VIP Number"}
        onClick={() => {
          Router.push("/search-your-number");
        }}
      />
      <CityTestimonials
        heading="Celebrity Testimonials"
        CityPunjabTestimonials={CityPunjabTestimonials}
      />
      <CityExclusiveCollection
        heading="Buy Your Dream VIP Number Anywhere in India"
        text1="Whether you’re in Delhi, Mumbai, Bangalore, Hyderabad, Chennai, or any other city, we deliver across all regions of India. Get your choice VIP number online with complete convenience and zero hassle. Our service is 100% genuine, secure, and backed by excellent customer support."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img27_hyiis0.webp`}
        imageAlt="Phone Screen with VIP Numbers BSNL"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Ravi Deshmukh"
        text11="Got my dream VIP number ending in 9999! Seamless service, and the delivery was on time. "
        text12="Definitely recommended!"
        heading2="Neha Bhatia"
        text21="The customer support guided me perfectly through the process. Super happy with my fancy mobile number!"
        text22="Will buy again."
        heading3="Sandeep Kaur"
        text31="Great collection and pricing. I got a triple-digit sequence just like I wanted."
        text32=" Activation was done smoothly!"
        heading4="Mohammed Irfan"
        text41="Even with a small delay in the code, the team handled it professionally. I now own a number I genuinely love."
        text42=""
        heading5="Kiran Pate"
        text51="The best platform I found for VIP numbers. Got mine with mirror digits – and the process was so easy."
        text52="Excellent service!"
      />
      <CityFaqs cityPunjabFaqs={vipnumberfaq} />
      <QRVipApp />
    </div>
  );
};

export default Vipnumber;
