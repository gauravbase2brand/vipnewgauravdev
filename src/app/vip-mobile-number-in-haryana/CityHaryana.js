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
import { CityHaryanaFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityHaryana = () => {
  const Router = useRouter;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Number in Haryana"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img6_kfl5ta.webp`}
          imageAlt="Haryana man"
          title1="One-stop destination for VIP mobile numbers in Haryana!"
          para1="We understand the desire to have a unique and exclusive mobile number that reflects your personality and makes a lasting impression."
          para2="Our collection of VIP mobile numbers is specifically tailored for customers in Haryana who seek a touch of luxury and individuality in their communication."
        />
        <CityFavouriteNumber
          title1="Sign up with us and acquire your chosen phone number"
          title2="Register to explore a diverse range of VIP mobile numbers in Haryana. Our expert team can also recommend a number that mirrors your style and status."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Haryana"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Get Exclusive Deals on Fancy Mobile Numbers in Haryana"
          subHeading="Take advantage of exclusive deals on fancy mobile numbers in Haryana and get a unique and memorable number that reflects your personality or business."
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
          heading="Reach out to us Today to Get Your VIP Number"
          text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Haryana. We look forward to serving you and helping you find the perfect VIP mobile number in Haryana which matches your unique style and preference."
          text2="Your satisfaction is our priority. Whether you have questions or suggestions, don't hesitate to connect with us. We're devoted to ensuring your journey to find the perfect VIP mobile number in Haryana is exceptional."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img6_plyowt.webp`}
          imageAlt="Phone Screen with VIP Numbers Haryana"
        />
        <CityDifferentFromOthers
          heading="Why Choose Our VIP Mobile Numbers?"
          heading1="Wide Range of Premium Numbers"
          text11="We offer a wide range of premium VIP mobile numbers that cater to various preferences. Whether you're looking for a specific pattern, repeated digits, or a memorable combination, our collection has something for everyone."
          text12="Our inventory is regularly updated to ensure you have access to the latest and most sought-after numbers in Haryana."
          heading2="Exclusivity and Uniqueness"
          text21="Stand out from the crowd with our fancy mobile numbers in Haryana. These numbers are carefully selected to provide a sense of exclusivity to our customers in Haryana."
          text22="With a VIP mobile number in Haryana, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
          heading3="Enhanced Privacy and Security"
          text31="We understand the importance of privacy and security in today's digital world. Our VIP mobile number in Haryana comes with enhanced privacy features, ensuring that your personal information remains protected."
          text32="You can confidently use your VIP mobile number for various purposes without worrying about your privacy being compromised."
          heading4="Easy to Remember"
          text41="Our fancy mobile numbers in Haryana are designed to be easy to remember, allowing you to share your number effortlessly with others."
          text42="Whether it's for personal or business use, having a memorable mobile number can make a significant difference in establishing connections and building relationships."
          heading5="Excellent Customer Service"
          text51="We prioritize customer satisfaction above all else. Our dedicated team is committed to providing excellent customer service and ensuring that your experience with us is smooth and enjoyable."
          text52="We are always available to answer your questions, provide guidance, and assist you throughout the process of selecting and activating your VIP mobile number in Haryana."
        />
        <CityFaqs cityPunjabFaqs={CityHaryanaFaqs} />
        <QRVipApp />
        
      </div>
  );
};

export default CityHaryana;
