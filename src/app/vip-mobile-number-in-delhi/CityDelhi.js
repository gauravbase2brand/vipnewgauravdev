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
import { CityDelhiFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityDelhi = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Number in Delhi"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img14_xvddyk.web`}
        imageAlt="Qutub Minar"
        title1="Enhance your status with a VIP mobile number"
        para1="Boost your standing and make an impact with a VIP mobile number in Delhi. Step into an exclusive world of distinction and reputation, communicating through a number that mirrors your individuality."
        para2="Differentiate yourself from the masses and create a lasting impression with a distinctive VIP mobile number. Improve your personal and professional persona, experiencing a newfound level of connectivity and prominence."
      />
      <CityFavouriteNumber
        title1="Register with us Today and Get Your Exclusive VIP Mobile Number in Delhi"
        title2="Sign up with us today to secure your premium VIP mobile number in Delhi. Make a lasting impression with a distinctive and unforgettable number that mirrors your individuality and personal brand."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Delhi"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Unlock exclusive offers and rewards with every purchase"
        subHeading="Experience the benefits of being a valued customer and enjoy special benefits with every transaction."
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
        heading="Reach out to us for any queries"
        text1="Don’t hesitate to contact us if you have any queries or doubts regarding VIP mobile numbers. We are here to provide you with the necessary information and guidance to help you make an informed decision."
        text2="Your satisfaction is our priority, and we are committed to addressing any concerns you may have."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img14_dairzp.web`}
        imageAlt="Phone Screen with VIP Numbers Delhi"
      />
      <CityDifferentFromOthers
        heading="Why Should You Choose Us for a VIP Mobile Number in Delhi?"
        heading1="Wide Variety"
        text11="Our extensive assortment of VIP mobile numbers in Delhi ensures you have numerous options to choose from. Whether you prefer numbers with repetitive digits, particular sequences, or unique patterns, we have an assorted selection catering to various preferences and tastes."
        text12="With such wide-ranging choices, you can find a VIP mobile number that aligns with your style and personality."
        heading2="Distinct Numbers"
        text21="Differentiate yourself from the crowd with our distinct VIP mobile numbers. We have a range of unique and rare numbers not easily available elsewhere."
        text22="Owning one of these distinctive numbers allows you to leave a memorable impression and showcase your individuality and standing in Delhi. Our collection comprises highly desired numbers, adding a touch of luxury to your mobile communication."
        heading3="Options for Personalization"
        text31="We believe in delivering a custom experience to our clients. Hence, we offer personalization options for VIP mobile numbers in Delhi. You can choose specific patterns, sequences, or digits of significance to you."
        text32="This level of personalization enables you to craft a VIP mobile number that truly reflects your identity and preferences."
        heading4="Reasonable Pricing"
        text41="Our pricing is designed to offer excellent value for your investment. We appreciate the importance of affordability without compromising on the quality or exclusivity of the VIP mobile numbers."
        text42="With reasonable pricing, you can indulge in the luxury of owning a VIP mobile number in Delhi without overstepping your budget."
        heading5="Committed Customer Service"
        text51="We prioritize customer satisfaction and provide committed customer service throughout the process. Our team of professionals is available to assist you with any queries or concerns you may have."
        text52="We strive to ensure a smooth and seamless experience, addressing your needs promptly and professionally. Your satisfaction is our utmost priority."
      />
      <CityFaqs cityPunjabFaqs={CityDelhiFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityDelhi;
