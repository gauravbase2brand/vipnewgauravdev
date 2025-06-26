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
import { NetworkBsnlFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const NetworkBsnl = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Buy BSNL Fancy Numbers"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img27_ds5dgt.webp`}
        imageAlt="Bsnl Logo"
        title1="Buy BSNL Prepaid Numbers of Your Choice from VIP Number Shop"
        para1="We are a well-known platform for buying VIP Numbers of different patterns all over India."
        para2="You can find your preferred BSNL fancy mobile number to grow your status and let people or customers remember your number."
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying a"
        headingPart2="BSNL VIP Number"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Unlock Exclusive Benefits with Your BSNL Fancy Mobile Number"
        subHeading="With BSNL fancy numbers, you can enjoy discounts on future purchases as well as exclusive access to limited edition numbers."
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
        heading="Purchase Your Preferred BSNL VIP Number Online from Anywhere in India"
        text1="Get your desired BSNL VIP number at unbeatable rates, exclusively from VIP Number Shop, a reputable platform for 100% authentic VIP mobile numbers throughout India."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img27_hyiis0.webp`}
        imageAlt="Phone Screen with VIP Numbers BSNL"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Aarav Gupta"
        text11="Outstanding service! The VIP Number Shop provided me with a fantastic BSNL fancy number at an unbeatable price."
        text12="Highly recommended for hassle-free purchases!"
        heading2="Nisha Verma"
        text21="I was doubtful at first, but VIP Number Shop delivered as promised."
        text22="My BSNL VIP number came with great discounts, making it a truly VIP experience. Five stars!"
        heading3="Ramesh Kumar"
        text31="Impressed with the range of exclusive BSNL fancy numbers available online. I found my ideal VIP number effortlessly and saved money."
        text32="A convenient and reliable service."
        heading4="Anika Dasgupta"
        text41="VIP Number Shop made acquiring my BSNL fancy number a breeze. The discounts and limited edition options exceeded my expectations."
        text42="Definitely the go-to platform for BSNL fancy numbers!"
        heading5="Aditya Singh"
        text51="Shopping for a BSNL VIP number from VIP Number Shop was a fantastic experience. Their exclusive collection and affordable pricing made it easy to find the perfect number."
        text52="Highly satisfied!"
      />
      <CityFaqs cityPunjabFaqs={NetworkBsnlFaqs} />
      <QRVipApp />
    </div>
  );
};

export default NetworkBsnl;
