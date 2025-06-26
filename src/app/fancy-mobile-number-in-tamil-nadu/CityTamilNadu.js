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
import {
  CityPunjabTestimonials,
  CityTamilnaduFaqs,
} from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityTamilNadu = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Fancy Mobile Number in Tamil Nadu"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img9_rtvitv.webp`}
        imageAlt="Thiruvalluvar Statue"
        title1="Your Search for Higher Status Ends Here"
        para1="Welcome to our online store, the ultimate destination for VIP mobile numbers in Tamilnadu! We understand your desire to have a unique and exclusive mobile number that reflects your personality and leaves a lasting impression."
        para2="Our carefully curated collection of VIP mobile numbers is specifically tailored for customers in Tamilnadu who appreciate luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Register with Us and Get Your Fancy Mobile Number Tamilnadu"
        title2="Register with us today and secure your fancy mobile number Tamilnadu. Stand out with a unique and memorable number that reflects your individuality and personal branding."
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
        heading="Take advantage of our exclusive offers and rewards"
        subHeading="
        When you buy VIP mobile numbers Tamilnadu, you will gain access to a world of rewards and benefits, such as enticing discounts on future purchases and exclusive access to limited edition numbers.
        "
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
        text1="Feel free to inquire about any aspect of VIP mobile numbers. We are here to address your queries and provide you with the information you need to make an informed decision."
        text2="Your satisfaction is our priority, so don't hesitate to reach out and ask us anything about VIP mobile numbers."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img9_zwyp4b.webp`}
        imageAlt="Phone Screen with VIP Numbers Tamil nadu"
      />
      <CityDifferentFromOthers
        heading="Why Choose us for Fancy Mobile Number in Tamilnadu?"
        heading1="Extensive Range of Fancy Mobile Numbers"
        text11="Explore our wide range of premium VIP mobile numbers that cater to various preferences. Whether you prefer a specific pattern, repeated digits, or a memorable combination, our collection has something for everyone"
        text12="We continually update our inventory to ensure that you have access to the latest and most sought-after numbers in Tamilnadu."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our exclusive fancy mobile number Tamilnadu. Each number is carefully selected to provide a sense of exclusivity to our esteemed customers in Tamilnadu."
        text22="With a VIP mobile number, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We understand the significance of privacy and security in today's digital world. Our VIP mobile numbers come with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about compromising your privacy."
        heading4="Easy to Remember"
        text41="Our VIP mobile numbers are designed to be effortlessly memorable, allowing you to share your number effortlessly with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can significantly impact your ability to establish connections and build relationships."
        heading5="Customer Satisfaction"
        text51="At our online store, we prioritize customer satisfaction above all else. Our dedicated team is committed to providing excellent customer service, ensuring that your experience with us is smooth and enjoyable."
        text52="We are always available to address your queries, offer guidance, and assist you throughout the process of selecting and activating your VIP mobile number. Your satisfaction is our ultimate goal."
      />
      <CityFaqs cityPunjabFaqs={CityTamilnaduFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityTamilNadu;
