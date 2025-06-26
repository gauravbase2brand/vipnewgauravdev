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
import { cityMaharashtraFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityMaharashtra = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Number in Maharashtra"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img1_fsxtv1.webp`}
        imageAlt="Marathi man with VIP Number"
        title1="One Stop Shop for VIP Mobile Number in Maharashtra"
        para1="Welcome to the premier destination in Maharashtra for VIP mobile numbers, where prestige and practicality merge seamlessly. We are the preferred choice for individuals seeking a truly fancy mobile number in Maharashtra which embodies their unique essence, status, and personality."
        para2="In today's digital landscape, your mobile number is more than just a sequence of digits – it serves as an extension of your identity. That's why we are devoted to providing our customers with VIP mobile numbers that are distinctive, easy to remember, and exude an exclusive aura that sets them apart in a crowded world."
      />
      <CityFavouriteNumber
        title1="Register with us to Explore VIP mobile numbers in Maharashtra."
        title2="Search for the perfect mobile number that complements your style and status. Let us assist you in finding your favorite number with a touch of exclusivity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
        paragraphStyles={{
          color: "#555",
          width: "100%", // Custom width
          textAlign: "center",
        }}
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Maharashtra"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Don't miss the opportunity for exclusive deals"
        subHeading="Buying a VIP mobile number in Maharashtra comes with exclusive rewards and offers. Get a VIP mobile number now and stand out from the crowd."
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
        heading="Check out our exclusive collection of fancy mobile numbers in Maharashtra"
        text1="As Maharashtra's trusted provider of VIP mobile numbers, we invite you to explore our exclusive collection and embrace the prestige that comes with owning a distinct mobile number."
        text2="Explore our shop to discover why we are the leading destination for VIP mobile number in Maharashtra. We promise a shopping experience as unique as the numbers we offer. Step into the VIP lifestyle and make your mark with our VIP mobile numbers today!"
        buttonTitle="Search your VIP Number."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img1_zhtgbs.webp`}
        imageAlt="Phone Screen with VIP Numbers Maharashtra"
      />
      <CityDifferentFromOthers
        heading="Why Do People Love to Shop VIP Numbers with Us?"
        heading1="Unparalleled Collection"
        text11="We take great pride in our extensive collection of VIP mobile number in Maharashtra. Whether you desire a number that reflects a significant date, features a pattern of repeating digits, or aligns with the last six digits of your business landline, our selection is likely to have the perfect number waiting for you."
        text12="Our database is regularly refreshed with new numbers, ensuring a constant supply of unique VIP options to choose from."
        heading2="Customized to Suit You"
        text21="We believe your fancy mobile number in Maharashtra should be a reflection of your personal touch, which is why we offer a wide range of customization options. If you have a specific number sequence in mind, we will make every effort to obtain it for you."
        text22="Alternatively, our expert team is available to provide suggestions based on your preferences. "
        heading3="Effortless, Secure Process"
        text31="Transparency, security, and customer satisfaction are the cornerstones of our service. We have streamlined our process to make acquiring your VIP mobile number effortless and secure."
        text32="Our knowledgeable staff will guide you through each step, ensuring that all legal requirements are met with utmost diligence."
        heading4="Accessible Exclusivity"
        text41="Despite the exclusivity of our VIP mobile number in Maharashtra, we ensure they are offered at competitive prices. Our pricing strategy is designed to cater to the diverse budgetary needs of our wide-ranging clientele."
        text42="We firmly believe that owning a VIP number should be an affordable luxury, accessible to all who aspire to stand out."
        heading5="Customer-Centric Approach"
        text51="Building lasting relationships with our customers is our priority. Our dedicated team is always available to assist you, answer your questions, and provide excellent after-sales service, ensuring a smooth and satisfying experience with us."
        text52="Our exceptional customer loyalty rate is a testament to our unwavering commitment and the quality of our services."
      />
      <CityFaqs cityPunjabFaqs={cityMaharashtraFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityMaharashtra;
