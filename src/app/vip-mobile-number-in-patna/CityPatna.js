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
import { ResponsiveFooter } from "../ResponsiveModule";
const CityPatna = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What is a VIP mobile number?",
      paragraph:
        "A VIP mobile number is a unique, easy-to-remember number, often featuring patterns or repeating digits, offering a premium status and greater recall value.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why choose a VIP mobile number in Patna?",
      paragraph:
        "Choosing a VIP number in Patna enhances your status and makes your contact memorable, adding a touch of personalization and prestige to your communication experience.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How can I purchase a VIP mobile number?",
      paragraph:
        "You can purchase a VIP mobile number by contacting a reliable provider like VIP Number Shop in Patna, where you can browse and reserve your ideal number.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP numbers legal in Patna?",
      paragraph:
        "Yes, VIP numbers are legal in Patna when purchased from authorized providers, ensuring you receive an authentic and officially registered mobile number that’s unique to you.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Can I select my own preferred digits in the number?",
      paragraph:
        "Yes, VIP Number Shop allows you to choose specific patterns or preferred digits, offering a wide selection to help you find a number that reflects your identity.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: " Is there an added cost for VIP mobile numbers?",
      paragraph:
        "VIP numbers generally come at a premium due to their unique, memorable patterns. However, special discounts and rewards can make them a worthwhile investment.",
    },
  ];
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP mobile number in Patna"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/Patna_wtsazq.webp`}
        imageAlt="Patna"
        title1="A Leading VIP Mobile Number Provider in Patna"
        para1="Discover the latest VIP mobile numbers in Patna with our reputable and reliable services. Upgrade your communication experience with a unique mobile number that represents your identity and status. With our wide selection, finding the ideal number that suits your personality and lifestyle has never been easier."
        para2=""
      />
      <CityFavouriteNumber
        title1="Sign Up with Us to Reserve Your Exclusive VIP Mobile Number in Patna"
        title2="Join us today and take the first step towards owning an exclusive VIP mobile number in Patna. Stand out with a distinctive and memorable number that makes a lasting impression. Sign up now to secure a personalized mobile connection that reflects your unique self."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Patna"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Exclusive Rewards and Savings on Your VIP Number Purchase"
        subHeading="In Patna, we offer more than just a VIP number – we provide exclusive rewards and savings with each purchase. Experience the luxury of owning a VIP number along with special deals that add elegance to your communication. Transform your mobile experience with our premium VIP numbers in Patna and enjoy the exceptional benefits that come along."
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
        heading="VIP Number Shop: Patna’s Premier Provider of VIP Mobile Numbers"
        text1="At VIP Number Shop, we are proud to be Patna’s top source for high-end mobile numbers. Explore our specially curated selection of VIP numbers in Patna, designed to elevate the way you connect with others. Trust our expertise to help you choose a VIP number that reflects your status and enhances your communication with sophistication and style."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/download_fhdzlc.png`}
        imageAlt="Phone Screen with VIP Numbers Patna"
      />
      <CityDifferentFromOthers
        heading="Why Choose VIP Number Shop for Your VIP Mobile Number in Patna?"
        heading1="Extensive Selection of VIP Numbers"
        text11="VIP Number Shop offers a wide variety of VIP mobile numbers in Patna, catering to diverse preferences and needs. With options ranging from memorable patterns to lucky numbers, you can easily find a number that aligns with your personality and aspirations."
        heading2="Unmatched Quality and Authenticity"
        text21="As a trusted provider, VIP Number Shop ensures the highest quality and genuine VIP numbers. Every number is carefully curated to guarantee a premium experience, giving you peace of mind that your chosen VIP number will stand out and make a lasting impression."
        heading3="Exclusive Rewards and Savings"
        text31="Choosing VIP Number Shop means access to special rewards and discounts with each purchase. Enjoy not only the prestige of owning a VIP number but also the added benefits that enhance your communication experience, making it more rewarding and value-driven."
        heading4="Professional Guidance and Support"
        text41="Our experienced team provides expert guidance to help you select the ideal VIP number. We understand the significance of choosing the right number, and we’re committed to assisting you in finding a mobile number that matches your style and enhances your image."
        heading5="Personalized Shopping Experience"
        text51="At VIP Number Shop, we prioritize customer satisfaction, offering a smooth and personalized shopping journey. With our dedicated support and customized options, we make it easy to secure a unique mobile number that reflects your status and sets you apart in Patna."
      />
      <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityPatna;
