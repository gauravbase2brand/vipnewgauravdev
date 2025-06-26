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
import { NetworkJioFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const NetworkJio = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Buy Jio VIP Number"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img26_axridh.webp`}
        imageAlt="Jio Logo"
        title1="India's Most Reputable Platform for Authentic Jio Fancy Numbers"
        para1="Discover Jio VIP Numbers available in unique, memorable combinations for both Prepaid and Postpaid plans, all at the most competitive prices."
        para2="Place your order now and enjoy complimentary delivery."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying a"
        headingPart2="Jio Choice Number"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Experience Exclusive Benefits with Your Jio VIP Mobile Number Purchase"
        subHeading="With Jio fancy numbers, you can enjoy discounts on future purchases as well as exclusive access to limited edition numbers."
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
        heading="Buy Your Desired Jio VIP Number Online Anywhere in India"
        text1="Get your ideal Jio choice number with unbeatable discounts exclusively from VIP Number Shop, a trusted provider of 100% genuine VIP mobile numbers across India."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img26_gageb6.webp`}
        imageAlt="Phone Screen with VIP Numbers Jio"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Alok Gupta"
        text11="VIP Number Shop is fantastic! I bought a unique Jio VIP number, and their service was top-notch. Smooth process, and I got exclusive deals."
        text12="Highly recommend it!"
        heading2="Nisha Mehra"
        text21="VIP Number Shop exceeded my expectations. I got a fantastic Jio VIP number at a great price."
        text22="Quick delivery and helpful customer service. Very satisfied!"
        heading3="Vikram Singhania"
        text31="I'm impressed with VIP Number Shop's selection of Jio fancy numbers. I found the perfect one, and they provided excellent discounts and service."
        text32="Highly recommended!"
        heading4="Swati Joshi"
        text41="VIP Number Shop made getting my Jio VIP number hassle-free. Their extensive collection, attractive offers, and responsive support team make them the go-to choice."
        text42="Very pleased with my purchase!"
        heading5="Rohan Desai"
        text51="I recently purchased a Jio VIP number from VIP Number Shop and the experience was superb. The variety of numbers was impressive and I easily found one that resonated with me."
        text52="The transaction was smooth, and the customer service was outstanding."
      />
      <CityFaqs cityPunjabFaqs={NetworkJioFaqs} />
      <QRVipApp />
    </div>
  );
};

export default NetworkJio;
