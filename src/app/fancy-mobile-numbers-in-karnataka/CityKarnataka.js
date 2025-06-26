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
import { cityKarnatakaFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityKarnataka = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Fancy mobile numbers in Karnataka"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img2_frcawr.webp`}
        imageAlt="Kannada man with VIP Number"
        title1="You Personal Shop for Buying Fancy Mobile Numbers in Karnataka"
        para1="Welcome to our online store, your ultimate destination for VIP mobile numbers in Karnataka! We understand your desire to have a unique and exclusive mobile number that reflects your personality and leaves a lasting impression. "
        para2="Our carefully curated collection of VIP mobile numbers is specifically tailored for customers in Karnataka who appreciate luxury and individuality in their communication."
      />
      <CityFavouriteNumber
        title1="Register with us to Buy Fancy Mobile Numbers in Karnataka"
        title2="Unlock the world of style and exclusivity by registering with us to buy fancy mobile numbers in Karnataka. Don't miss out on the chance to own a number that reflects your individuality and sets you apart from the crowd."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Karnataka"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Don't miss the opportunity for exclusive deals"
        subHeading="Buying a VIP mobile number in Karnataka comes with exclusive rewards and offers. Get a VIP mobile number now and stand out from the crowd."
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
        heading="Talk Freely with Us About Your needs"
        text1="Don't hesitate to reach out to us with any queries or feedback. We are committed to ensuring a smooth and enjoyable experience for our customers in Karnataka."
        text2="Thank you for choosing our online store for VIP mobile numbers in Karnataka. We look forward to serving you and helping you find the perfect VIP mobile number that matches your unique style and preference."
        buttonTitle="Search your VIP Number."
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img2_r3paw5.webp`}
        imageAlt="Phone Screen with VIP Numbers Karnataka"
      />
      <CityDifferentFromOthers
        heading="Why Choose us for Fancy Mobile Numbers in Karnataka"
        heading1="Extensive Range of Premium Numbers"
        text11="Explore our wide range of premium VIP mobile numbers in Karnataka which cater to various preferences. Whether you prefer a specific pattern, repeated digits, or a memorable combination, our collection has something for everyone."
        text12="We continually update our inventory to ensure that you have access to the latest and most fancy mobile numbers in Karnataka."
        heading2="Exclusivity and Uniqueness"
        text21="Stand out from the crowd with our exclusive fancy mobile numbers in Karnataka. Each number is carefully selected to provide a sense of exclusivity to our esteemed customers in Karnataka. "
        text22="With a VIP mobile number, you can make a bold statement and leave a lasting impression on your friends, family, and business associates."
        heading3="Enhanced Privacy and Security"
        text31="We understand the significance of privacy and security in today's digital world. Our VIP mobile numbers come with enhanced privacy features, ensuring that your personal information remains protected."
        text32="You can confidently use your VIP mobile number for various purposes without worrying about compromising your privacy."
        heading4="Easy to Remember"
        text41="Our VIP mobile numbers are designed to be effortlessly memorable, allowing you to share your number effortlessly with others."
        text42="Whether it's for personal or business use, having a memorable mobile number can significantly impact your ability to establish connections and build relationships."
        heading5="Superior Customer Support"
        text51="At our online store, we place customer satisfaction at the forefront of our priorities. Our dedicated team is fully committed to providing exceptional customer support, ensuring that your experience with us is seamless and enjoyable."
        text52="We are readily available to address any inquiries, offer guidance, and assist you throughout the process of selecting and activating your VIP mobile number."
      />
      <CityFaqs cityPunjabFaqs={cityKarnatakaFaqs} />
      <QRVipApp />
      
    </div>
  );
};

export default CityKarnataka;
