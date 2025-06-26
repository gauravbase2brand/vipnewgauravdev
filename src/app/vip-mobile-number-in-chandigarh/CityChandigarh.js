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
import { CityChandigarhFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityChandigarh = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Numbers In Chandigarh"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img24_gndp1a.webp`}
          imageAlt="Open hand, Chandigarh"
          title1="Your Trusted and Well Approached VIP Mobile Number Provider in Chandigarh"
          para1="Discover the epitome of VIP mobile numbers in Chandigarh with our trusted and well-established services. Elevate your communication style with personalized digits that reflect your unique identity. Our extensive collection offers a well-approached selection process, ensuring you find the perfect number that resonates with your status. "
          para2="Embrace seamless connectivity and make a statement with a VIP mobile number that defines exclusivity. Experience the pinnacle of telecommunication luxury with us, your premier VIP mobile number provider in Chandigarh."
        />
        <CityFavouriteNumber
          title1="Sign up With us to Get Your Fancy Mobile Number in Chandigarh"
          title2="Join us now to secure your exclusive mobile number in Chandigarh. Elevate your communication with a fancy number that truly stands out. Sign up today for a unique and memorable mobile number connection."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Chandigarh"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Awards and Savings on Your Purchase"
          subHeading="Experience the best of both worlds in Chandigarh - not only an exclusive VIP number but also enjoy special rewards and savings with your purchase. Elevate your communication and indulge in exclusive benefits today."
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
          heading="VIP Number Shop Ranked Well for VIP Mobile Number in Chandigarh"
          text1="At VIP Number Shop, we take pride in our top-ranking position for VIP mobile numbers in Chandigarh. Discover a curated collection of fancy mobile numbers that redefine communication."
          text2="Trust our expertise to find your perfect VIP number, reflecting your status. Experience connectivity with a touch of sophistication."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img24_cz3ggo.webp`}
          imageAlt="Phone Screen with VIP Numbers Chandigarh"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us for VIP Mobile Numbers in Chandigarh?"
          heading1="Unique Collection"
          text11="Elevate your communication with our unparalleled selection of VIP mobile numbers in Chandigarh."
          text12="Our meticulously curated collection boasts an array of unique and memorable number combinations, allowing you to stand out with undeniable style and sophistication. Each number is a masterpiece in itself, reflecting the exclusivity you seek."
          heading2="Trusted Expertise"
          text21="With a proven track record spanning years, we stand as your unrivaled choice for VIP numbers. Our extensive experience ensures that every number we offer is authentic and legally sound."
          text22="Rest assured, our seamless and secure acquisition process is built on trust, making your journey toward owning a VIP number smooth and reliable."
          heading3="Personalized Service"
          text31="Recognizing that your status deserves a number that resonates, our personalized service takes your preferences to heart. Our team of experts is dedicated to assisting you in finding the VIP mobile number that aligns perfectly with your identity."
          text32="Your communication experience will transcend the ordinary, embracing a level of individuality that truly sets you apart."
          heading4="Competitive Pricing"
          text41="Our commitment to offering luxury without undue strain on your budget sets us apart. Experience the pinnacle of exclusivity with competitive pricing on our VIP mobile numbers in Chandigarh."
          text42="We believe that opulence should be accessible, enabling you to embrace the extraordinary without compromising your financial comfort."
          heading5="Customer Satisfaction"
          text51="Our proven history of customer satisfaction speaks volumes about the excellence we provide. Join the ranks of countless individuals who have transformed their communication with our exceptional VIP numbers."
          text52="When you choose us, you're selecting a partner that values a seamless process, premium options, and a communication experience defined by prestige and sophistication."
        />
        <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityChandigarh;
