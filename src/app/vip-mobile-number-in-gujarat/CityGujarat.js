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
import { CityGujaratFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityGujarat = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Number in Gujarat"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img4_hz9avb.webp`}
        imageAlt="Statue Of Unity"
        title1="Top VIP Mobile Number Seller in Gujarat"
        para1="Welcome to Gujarat's premier destination for VIP mobile numbers, where the perfect blend of prestige and practicality awaits you. We are the top choice for individuals seeking VIP mobile number in Gujarat which reflect their unique essence, status, and personality."
        para2="In today's digital landscape, your mobile number is not just a series of digits – it's an extension of your identity. That's why we are committed to providing our customers with VIP mobile numbers that are distinct, easy to remember, and exude an exclusive aura that sets them apart in a crowded world."
      />
      <CityFavouriteNumber
        title1="Register with us and purchase your desired phone number"
        title2="Register with us to gain access to an extensive collection of VIP mobile numbers in Gujarat. Our team can also suggest a mobile number that aligns with your style and status."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Gujarat"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy our exclusive offers and rewards on your purchase"
        subHeading="Our rewards and offers for purchasing a VIP mobile number in Gujarat include discounts on future purchases and exclusive access to limited edition numbers."
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
        heading="Top Rated for VIP Mobile Numbers in Gujarat"
        text1="As the trusted provider of VIP mobile numbers in Gujarat, we invite you to explore our exclusive collection and embrace the prestige that comes with owning a distinct mobile number. Visit our website or our physical store to discover why we are the leading destination for VIP mobile numbers in the region."
        text2="We promise an unparalleled shopping experience that matches the uniqueness of the numbers we offer. Step into the VIP lifestyle and leave your mark with our VIP mobile numbers today!"
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img4_ygjzbn.webp`}
        imageAlt="Phone Screen with VIP Numbers Gujarat"
      />
      <CityDifferentFromOthers
        heading="Why we are Top VIP Mobile Number Seller in Gujarat?"
        heading1="Unmatched Collection"
        text11="We take immense pride in our extensive collection of VIP mobile number in Gujarat. Whether you desire a number that symbolizes a significant date, features an appealing pattern of repeating digits, or aligns with the last six digits of your business landline, our selection is sure to have the perfect number waiting for you."
        text12="Our database is regularly updated, ensuring a continuous supply of unique VIP numbers to choose from."
        heading2="Customized to Suit You"
        text21="We believe that your VIP number should reflect your personal touch, which is why we offer a wide range of customization options. If you have a specific number sequence in mind, we will make every effort to acquire it for you."
        text22="Alternatively, our expert team is available to provide suggestions based on your preferences. With our deep understanding of number sequences, we craft remarkable, prestigious, and memorable mobile numbers that truly resonate with you."
        heading3="Effortless, Secure Process"
        text31="Transparency, security, and customer satisfaction are at the core of our service. We have streamlined our process to make acquiring your VIP mobile number effortless and secure."
        text32="Our knowledgeable staff will guide you through each step, ensuring that all legal requirements are met with the utmost diligence."
        heading4="Accessible Exclusivity"
        text41="Despite the exclusivity of our VIP mobile number in Gujarat, we ensure they are offered at competitive prices. Our pricing strategy is designed to cater to the diverse budgetary needs of our valued clientele."
        text42="We firmly believe that owning a VIP number should be an affordable luxury, accessible to all who aspire to stand out."
        heading5="Customer-Centric Approach"
        text51="Building lasting relationships with our customers is our top priority. Our dedicated team is always available to assist you, answer your questions, and provide excellent after-sales service, ensuring a smooth and satisfying experience with us."
        text52="Our exceptional customer loyalty rate speaks volumes about our unwavering commitment and the quality of our services."
      />
      <CityFaqs cityPunjabFaqs={CityGujaratFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityGujarat;
