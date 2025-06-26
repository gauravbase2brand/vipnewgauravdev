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
import { CityUttarakhandFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityUttarakhand = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Number in Uttarakhand"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img20_fxrybm.webp`}
          imageAlt="Trimbakeshwar Temple, Rishikesh"
          title1="Your Reliable VIP Mobile Number Provider in Uttarakhand"
          para1="Experience the epitome of VIP mobile numbers in Uttarakhand through our trusted and well-established services. Elevate your communication style with personalized digits that mirror your unique identity. Our extensive collection ensures a well-approached selection process, guaranteeing the ideal number that resonates with your status."
          para2="Embrace seamless connectivity and make a statement with an exclusive VIP mobile number that exudes exclusivity. Revel in the zenith of telecommunication luxury with us, your leading VIP mobile number provider in Uttarakhand."
        />
        <CityFavouriteNumber
          title1="Register Now to Secure Your Exclusive Mobile Number"
          title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Uttarakhand"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Indulge in Exclusive Rewards and Savings on Your Purchase"
          subHeading="Revel in the best of both worlds in Uttarakhand – not only an exclusive VIP number but also relish exclusive rewards and savings with your acquisition. Elevate your communication and partake in special benefits today."
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
          heading="Top-Ranked VIP Number Shop for Uttarakhand"
          text1="At VIP Number Shop, we take pride in our distinguished standing as a VIP mobile number provider in Uttarakhand. Explore a curated assortment of sophisticated mobile numbers that redefine communication."
          text2="Rely on our expertise to discover your ideal VIP number, mirroring your stature. Experience seamless connectivity with a touch of refinement."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img20_vlf5ty.webp`}
          imageAlt="Phone Screen with VIP Numbers Pune"
        />
        <CityDifferentFromOthers
          heading="Why Opt for Us for VIP Mobile Numbers in Uttarakhand?"
          heading1="Distinctive Collection"
          text11="Elevate your communication with our unmatched assortment of VIP mobile numbers in Uttarakhand."
          text12="Our carefully curated collection features an array of unique and unforgettable number combinations, enabling you to stand out with undeniable elegance and style. Each number is a masterpiece in itself, reflecting the sought-after exclusivity."
          heading2="Reliable Expertise"
          text21="With a proven track record spanning years, we stand as your unparalleled choice for VIP numbers in Uttarakhand. Our extensive experience ensures that every number we offer is genuine and legally valid."
          text22="Rest assured, our seamless and secure acquisition process is rooted in trust, ensuring your journey toward owning a VIP number is smooth and dependable."
          heading3="Tailored Service"
          text31="Recognizing that your stature deserves a number that resonates, our personalized service takes your preferences to heart. Our team of experts is committed to assisting you in discovering the VIP mobile number that perfectly aligns with your identity."
          text32="Your communication experience will transcend the ordinary, embracing a level of individuality that sets you apart distinctly."
          heading4="Competitive Pricing"
          text41="Our dedication to offering opulence without straining your budget sets us apart. Experience the peak of exclusivity with competitive pricing on our VIP mobile numbers in Uttarakhand."
          text42="We believe that luxury should be accessible, enabling you to embrace the extraordinary without compromising your financial ease.
        "
          heading5="Client Satisfaction"
          text51="Our proven history of customer satisfaction speaks volumes about the excellence we provide. Join the ranks of numerous individuals who have elevated their communication with our exceptional VIP numbers."
          text52="By choosing us, you're selecting a partner that values a seamless process, premium choices, and a communication experience defined by prestige and refinement."
        />
        <CityFaqs cityPunjabFaqs={CityUttarakhandFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityUttarakhand;
