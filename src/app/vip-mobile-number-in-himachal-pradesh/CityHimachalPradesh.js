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
import { CityHimachalPradeshFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityHimachalPradesh = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="Vip Mobile Number in Himachal Pradesh"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img10_fowztt.webp`}
          imageAlt="Himachali man"
          title1="VIP mobile number of different operators are available in Himachal Pradesh"
          para1="Discover the allure of exclusive VIP mobile numbers in Himachal Pradesh. Elevate your style and make a statement with personalized numbers from top operators."
          para2="Whether it's Airtel, Vodafone, Jio, or others, indulge in the luxury of a unique mobile number that reflects your personality. Stand out from the crowd and embrace the prestige of a VIP mobile number in Himachal Pradesh."
        />
        <CityFavouriteNumber
          title1="Register Now and Receive Your VIP Mobile Number in Himachal Pradesh"
          title2="Register with us today to reserve your exclusive fancy mobile number in Himachal Pradesh. Make a statement with a one-of-a-kind and memorable number that reflects your personality and personal branding."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Tamil Nadu"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Benefit From Our Exclusive Offers And Rewarding Incentives Today!"
          subHeading="With the purchase of a VIP mobile number in Himachal Pradesh, unlock a realm of rewards and benefits including discounts, exclusive access to limited edition numbers, and more."
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
          heading="Feel Free to Ask Us any Query"
          text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Tamilnadu"
          text2="Thank you for choosing our online store for VIP mobile numbers in Tamilnadu. We look forward to serving you and helping you find the perfect VIP mobile number that matches your unique style and preference."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img10_v1lfr3.webp`}
          imageAlt="Phone Screen with VIP Numbers Himachal Pradesh"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us for VIP Mobile Number in Himachal Pradesh?"
          heading1="Wide Selection"
          text11="Explore our extensive range of VIP mobile numbers in Himachal Pradesh, encompassing various operators, allowing you to find the perfect number that aligns with your preferences, be it Airtel, Vodafone, Jio, or others."
          heading2="Exclusive Numbers"
          text21="Experience the privilege of owning a truly exceptional VIP number that sets you apart from the rest. Our carefully curated collection features exclusive numbers that exude elegance and sophistication, allowing you to make a lasting impression."
          text22="Embrace the opportunity to showcase your individuality and style with a rare VIP number that speaks volumes about your distinctive persona."
          heading3="Seamless Process"
          text31="With our user-friendly interface and expert guidance, securing your desired VIP mobile number in Himachal Pradesh is a breeze. From browsing our extensive inventory to completing the necessary paperwork, our streamlined process ensures a stress-free journey."
          text32="Sit back and relax as we handle the details, providing you with a seamless and efficient experience that saves you valuable time and effort."
          heading4="Competitive Pricing"
          text41="Attracting affordability and luxury, our competitively priced VIP mobile numbers offer unbeatable value for your investment. Experience the joy of owning a personalized number that reflects your unique identity without straining your budget."
          text42="We believe that exclusivity shouldn't come at a premium, allowing you to enjoy the perfect balance of quality and cost-effectiveness when selecting your VIP mobile number."
          heading5="Reliable Service"
          text51="Our team of experts is committed to delivering exceptional customer service, ensuring a smooth and satisfying VIP number acquisition process. Rest assured, we are here to promptly address any inquiries or concerns you may have, providing professional assistance every step of the way."
          text52="Trust in our reliability and dedication as we guide you towards acquiring your dream VIP mobile number in Himachal Pradesh with confidence and peace of mind."
        />
        <CityFaqs cityPunjabFaqs={CityHimachalPradeshFaqs} />
        <QRVipApp />
        
      </div>
  );
};

export default CityHimachalPradesh;
