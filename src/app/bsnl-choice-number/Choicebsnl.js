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
import { Choicebsnlfaq } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const Choicebsnl = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Buy BSNL Choice Numbers"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img27_ds5dgt.webp`}
        imageAlt="Bsnl Logo"
        title1="Get Your Preferred BSNL Prepaid Number from VIP Number Shop"
        para1="VIP Number Shop is a trusted platform for purchasing BSNL Choice Numbers across India. "
        para2="Whether you're looking for a lucky number, repeating digits, or a unique sequence, we offer a wide range of BSNL prepaid numbers to match your style and status. Make your mobile number easy to remember and stand out from the crowd."
      />
      <CityFavouriteNumber
        title1="Choose BSNL Choice Number From Attractive Patterns"
        title2="Browse through our updated selection of BSNL Choice Numbers available for purchase. Choose from a variety of attractive patterns including repeating digits, mirror numbers, or combinations that reflect your personality or business branding."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="How to Buy a "
        headingPart2="BSNL Choice Number"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Premium Benefits with Your BSNL Choice Number"
        subHeading="Buying a BSNL Choice Number isn’t just about the digits—it’s about making a statement. Get special discounts on future purchases, early access to exclusive number patterns, and a personalized experience every time you shop with VIP Number Shop."
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
        heading="Order BSNL Choice Numbers Online – Anywhere in India"
        text1="VIP Number Shop lets you buy BSNL Choice Numbers online from the comfort of your home. We ensure fast delivery, genuine UPC codes, and a seamless experience. Make a lasting impression with a mobile number that reflects your identity—only at VIP Number Shop."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img27_hyiis0.webp`}
        imageAlt="Phone Screen with VIP Numbers BSNL"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Rajeev Malhotra, Delhi"
        text11="I was looking for a specific BSNL number for my business, and VIP Number Shop delivered exactly what I wanted."
        text12="Highly reliable and quick process!"
        heading2="Meena Sharma, Jaipur"
        text21="Loved the seamless service! Got my BSNL choice number within days, and the support team guided me perfectly throughout"
        text22=" Totally recommend!"
        heading3="Aniket Joshi, Pune"
        text31="Great selection of fancy numbers at reasonable prices. The UPC was delivered on time, and MNP worked smoothly."
        text32="Will buy again."
        heading4="Swati Reddy, Hyderabad"
        text41="Superb platform for VIP numbers. I got a lucky number for my father’s birthday, and the experience was smooth from start to finish."
        text42=""
        heading5="Karthik Nair, Kochi"
        text51="VIP Number Shop gave me the freedom to choose a number that matches my personality. Easy payment and fast SIM activation."
        text52="Excellent service!"
      />
      <CityFaqs cityPunjabFaqs={Choicebsnlfaq} />
      <QRVipApp />
    </div>
  );
};

export default Choicebsnl;
