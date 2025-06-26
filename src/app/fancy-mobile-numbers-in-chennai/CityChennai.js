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
import { CityChennaiFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityChennai = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
      <CityBanner
        heading="Fancy mobile numbers in Chennai"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img8_v3xhr1.webp`}
        imageAlt="Bharatanatyam"
        title1="Get VIP Mobile Numbers in Chennai"
        para1="Our online store is the one-stop destination for fancy mobile numbers in Chennai! We understand the desire to have a unique and exclusive mobile number that reflects your personality and makes a lasting impression."
        para2="Our collection of VIP mobile numbers is specifically tailored for customers in Chennai who seek a touch of luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Register with Us to Acquire Fancy Mobile Numbers in Chennai"
        title2="Before securing your VIP or fancy mobile numbers in Chennai, registration is essential. Our experts can guide you towards the optimal VIP mobile number, considering factors like your business type, religious affiliations, and social standing."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Chennai"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Don't pass up the chance for exclusive deals"
        subHeading="You can get exclusive rewards and offers when you purchase a VIP mobile number in Chennai. Stand out from the crowd with a VIP mobile number."
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
        heading="Feel Free to Take Suggestion from Us"
        text1="Please feel free to reach out to us with any queries or feedback. We are dedicated to ensuring a smooth and enjoyable experience for our customers in Chennai. We look forward to serving you and helping you find the perfect fancy mobile numbers in Chennai which match your unique style and preference."
        text2="Fancy Mobile Numbers Chennai brings you a wide range of exclusive and memorable mobile numbers to enhance your personal and business branding. Our collection of fancy mobile numbers in Chennai is carefully curated to offer you a variety of options to choose from."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img8_dxy6nr.webp`}
        imageAlt="Phone Screen with VIP Numbers Chennai"
      />
      <CityDifferentFromOthers
        heading="Why choose our fancy mobile number service?"
        heading1="Wide Range of Premium Numbers"
        text11="Discover a wide range of premium mobile numbers that cater to various preferences. Whether you desire a specific pattern, repeated digits, or a memorable combination, our collection of fancy mobile numbers in Chennai has something to suit everyone."
        text12="We consistently update our inventory to ensure you have access to the latest and most sought-after numbers in Chennai."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our exclusive VIP mobile numbers in Chennai. Each number is carefully chosen to provide a sense of exclusivity to our esteemed customers in Chennai."
        text22="With a VIP mobile number, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We prioritize your privacy and security in today's digital world. Our fancy mobile numbers in Chennai come with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about compromising your privacy."
        heading4="Easy to Remember"
        text41="Our fancy mobile numbers in Chennai are designed to be effortlessly memorable, making it easier for you to share your number with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can significantly impact your ability to establish connections and build relationships."
        heading5="Effortless, Secure Process"
        text51="Our service is built on three pillars: security, transparency, and client satisfaction. To make getting your VIP mobile number quick and secure, we have streamlined the process."
        text52="Our experienced staff will assist you at every turn and make sure that all legal requirements are fulfilled with the utmost care."
      />
      <CityFaqs cityPunjabFaqs={CityChennaiFaqs} />
      <QRVipApp />
   
    </div>
  );
};

export default CityChennai;
