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
import { CityMumbaiFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityMumbai = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Vip Mobile Number In Mumbai"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img5_bqzwuj.webp`}
        imageAlt="Gateway Of India Mumbai"
        title1="Well-Approached VIP Phone Number Shop in Mumbai"
        para1="Welcome to our exclusive VIP mobile number shop in Mumbai, where we offer a wide range of prestigious and unique mobile numbers. With a deep understanding of the significance of a mobile number in today's world, we bring you an unparalleled collection of VIP numbers that reflect your individuality, style, and status."
        para2="Step into our premium VIP mobile number emporium in Mumbai, where an exquisite array of exclusive mobile numbers awaits. Discover numbers that resonate with your personality, elevating your style and status in a digitally connected era."
      />
      <CityFavouriteNumber
        title1="Register with us today and secure your preferred mobile number in Mumbai"
        title2="Unlock a vast selection of VIP mobile numbers that resonate with your persona. Our experts can even recommend a number that mirrors your status and taste."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Mumbai"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Get Exclusive Rewards and Offers By Shopping with Us"
        subHeading="Take advantage of exclusive rewards and offers when you shop for a VIP mobile number with us."
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
        heading="Buy a VIP mobile number to discover the essence of personal identity"
        text1="Our VIP mobile number shop is dedicated to helping you discover the essence of personal identity and distinction through our exclusive collection."
        text2="Explore our extraordinary inventory, unleash your creativity through personalization, and enjoy a seamless acquisition process with transparent pricing."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img5_d22sws.webp`}
        imageAlt="Phone Screen with VIP Numbers Mumbai"
      />
      <CityDifferentFromOthers
        heading="Why Choose VIP Number Shop for Buying VIP numbers?"
        heading1="The Essence of VIP Mobile Numbers"
        text11="In today's digital era, your mobile number has evolved into a powerful statement of your personal identity. It goes beyond being a mere combination of digits and transforms into a symbol of distinction, representing your unique persona and adding a touch of sophistication to your communication. "
        text12="At our VIP mobile number shop, we understand the significance of this extension of your identity and strive to provide you with exclusive numbers that truly reflect your individuality."
        heading2="Unveiling our Extraordinary Collection"
        text21="Prepare to be captivated by our extensive inventory of VIP mobile number in Mumbai, meticulously curated to cater to diverse preferences."
        text22="Our collection boasts a wide array of numbers with remarkable features, such as unique sequences, auspicious combinations, repeating digits, and other visually appealing patterns. We take pride in regularly refreshing our inventory, ensuring a continuous supply of exclusive numbers for you to choose from."
        heading3="Personalization Options"
        text31="We believe that personalization is key when it comes to selecting your fancy mobile number in Mumbai. That's why we offer a range of customization options, allowing you to create a truly personalized number that reflects your personality and preferences."
        text32="Whether you envision a specific sequence that holds sentimental value or a number that aligns with a special date in your life, our dedicated team is here to assist you every step of the way."
        heading4="Seamless Acquisition Process"
        text41="Acquiring your VIP mobile number should be a seamless and hassle-free experience. Our streamlined acquisition process is designed to provide you with clarity, convenience, and peace of mind."
        text42="From clear guidelines to transparent pricing, we prioritize your satisfaction and ensure that every aspect of the acquisition journey is handled with utmost professionalism."
        heading5="Competitive Pricing and Value"
        text51="We understand that owning a VIP mobile number should be an accessible luxury. That's why we are committed to offering competitive pricing that caters to different budgets."
        text52="We believe that exclusivity should not come at an exorbitant cost. Our aim is to provide exceptional value, delivering a unique combination of prestige, quality, and affordability."
      />
      <CityFaqs cityPunjabFaqs={CityMumbaiFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityMumbai;
