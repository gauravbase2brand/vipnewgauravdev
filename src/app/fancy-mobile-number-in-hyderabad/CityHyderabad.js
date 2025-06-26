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
import { CityHyderabadFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityHyderabad = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;

  return (
      <div className="city-page-os">
        <CityBanner
          heading="Fancy mobile number in Hyderabad"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img16_fi5ciw.webp`}
          imageAlt="Charminar"
          title1="Welcome to the Premier Destination for Fancy mobile number in Hyderabad"
          para1="Discover the luxury and style of owning a fancy mobile number from our exclusive collection in Hyderabad. We are the first choice for those who seek an impressive, memorable mobile number that reflects their status and individuality."
          para2="Your mobile number in today's digital age isn't just a combination of digits, but a distinct extension of your identity. Our aim is to offer VIP mobile numbers that are not just unique, but memorable and conveys a sense of exclusivity, setting you apart in this busy world."
        />
        <CityFavouriteNumber
          title1="Register Today and Get Your Exclusive VIP Mobile Number"
          title2="Don't miss out! Register now to secure your special VIP mobile number in Hyderabad, adding a touch of exclusivity to your communication. Reserve your unique VIP mobile number in Hyderabad today and leave a lasting mark. Seize this chance to enhance your communication and make a standout statement. Act now and register today!"
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Hyderabad"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Exclusive Offers and Rewards Await You"
          subHeading="Get up to 30% off during special occasions and festivals. Seize the opportunity to secure a VIP mobile number with exclusive discounts. Make the most of celebrations while reserving a unique number that reflects your individuality."
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
          heading="Embark on Your VIP Journey with Us in Hyderabad"
          text1="As the preferred provider of VIP mobile numbers in Hyderabad, we invite you to explore our exceptional collection and experience the prestige of owning a unique mobile number. Browse our website or visit our shop to understand why we are the leading choice for VIP mobile numbers."
          text2="Step into the world of VIP lifestyle. Make your mark with our VIP mobile numbers today!"
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img16_f0cghq.webp`}
          imageAlt="Phone Screen with VIP Numbers Hyderabad"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us as Your Trusted VIP Number Provider?"
          heading1="Exceptional Collection"
          text11="We take pride in our extensive collection of unique VIP mobile numbers. With constant updates to our collection, we ensure an array of distinctive VIP mobile numbers."
          text12="Our aim is to cater to diverse preferences, ensuring everyone finds a number that resonates with their personality or business identity, making each interaction memorable."
          heading2="Personalized for You"
          text21="We offer a wide variety of customization options, catering to your specific requirements. If you have a number sequence in mind, we will endeavor to procure it."
          text22="In the instance where a specific number sequence isn't readily available, our dedicated team will guide you through alternatives, ensuring you receive a fancy mobile number in Hyderabad that truly reflects your personal or professional brand."
          heading3="Smooth, Secure Transaction"
          text31="We prioritize transparency, security, and customer satisfaction, providing assistance throughout the process and ensuring all legalities are met."
          text32="In addition to this, we strive to make your VIP number acquisition as smooth as possible, guiding you at every step. Your trust is our topmost priority, and we work diligently to uphold it."
          heading4="Affordable Exclusivity"
          text41="We offer competitive prices for our exclusive VIP mobile numbers, making the luxury of a VIP number accessible."
          // text42="We offer competitive prices for our exclusive VIP mobile numbers, making the luxury of a VIP number accessible."

          heading5="Customer-centric"
          text51="We focus on creating lasting relationships with our customers, ensuring smooth experiences and providing after-sales service."
          text52="Beyond the point of purchase, our commitment remains, offering continuous support, addressing any concerns, and ensuring your satisfaction with our fancy mobile number service long term."
        />
        <CityFaqs cityPunjabFaqs={CityHyderabadFaqs} />
        <QRVipApp />
        
      </div>
  );
};

export default CityHyderabad;
