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
const CityJaipur = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What are VIP mobile numbers?",
      paragraph:
        "VIP mobile numbers are exclusive phone numbers featuring easy-to-remember patterns, sequences, or repeated digits. These unique numbers add a personal touch to your communication, helping you stand out and create a lasting impression.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How are VIP numbers different from regular numbers?",
      paragraph:
        "VIP mobile numbers in Jaipur are distinct due to their unique digit patterns and combinations. Regular numbers are typically assigned randomly and do not offer the personal significance or prestige that VIP numbers provide.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why should I choose a VIP mobile number in Jaipur?",
      paragraph:
        "A VIP mobile number not only enhances your image but also makes it easier for people to remember your contact details. Whether for personal or professional use, a VIP number helps you create a memorable and sophisticated identity.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How can I purchase a VIP mobile number in Jaipur?",
      paragraph:
        "Acquiring a VIP mobile number is easy with VIP Number Shop. Sign up, browse through our wide range of options, and select the number that best suits your needs. Our team will guide you through the process, ensuring a smooth and seamless experience.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers more expensive than regular numbers?",
      paragraph:
        "Yes, VIP mobile numbers usually come at a premium due to their exclusivity and special digit combinations. However, we offer competitive pricing in Jaipur, ensuring you receive great value for your investment.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "Can I choose specific digits for my VIP mobile number in Jaipur?",
      paragraph:
        "Yes, you have the option to choose specific digits for your VIP mobile number, subject to availability. Whether it’s a lucky number, special date, or a pattern that holds personal significance, we offer you the ability to personalize your number.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers transferable?",
      paragraph:
        "Yes, VIP mobile numbers are transferable, allowing you to retain ownership even if you change your mobile service provider. Our team will assist you in ensuring that the transfer process is smooth and straightforward.",
    },
  ];
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Number In Jaipur"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/JAIPUR_ftb4tp.webp`}
        imageAlt="Jaipur"
        title1="Famous and Well Approached VIP Mobile Number Provider in Jaipur"
        para1="Explore the newest VIP mobile numbers in Jaipur with our reputable and trustworthy services. Elevate your communication experience with a personalized mobile number that reflects your unique identity and status. Our extensive selection makes it easy to find the perfect number that matches your personality and lifestyle."
        para2=""
      />
      <CityFavouriteNumber
        title1="Sign Up with Us to Reserve Your Exclusive VIP Mobile Number in Jaipur"
        title2="Join us today and take the first step towards owning an exclusive VIP mobile number in Jaipur. Enhance your communication with a distinct and memorable number that leaves a lasting impression. Sign up now to claim a personalized mobile connection that is as unique as you are."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Jaipur"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Special Rewards and Savings on Your VIP Number Shopping"
        subHeading="In Jaipur, we offer more than just a VIP number – we deliver exclusive rewards and savings with every purchase. Experience the premium benefits of owning a VIP number while enjoying special deals designed to enhance your communication with a touch of elegance. Elevate your mobile experience with our VIP mobile number in Jaipur and the exceptional rewards that come with them."
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
        heading="VIP Number Shop: Jaipur’s Leading Provider of VIP Mobile Numbers"
        text1="At VIP Number Shop, we take pride in being Jaipur’s premier provider of high-end mobile numbers. Discover our curated collection of VIP mobile numbers in Jaipur which redefine how you communicate with others. Trust our expertise to guide you in selecting a VIP mobile number that reflects your status and enhances your communication with style and grace."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/download_c38fpn.png`}
        imageAlt="Phone Screen with VIP Numbers Jaipur"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Numbers in Jaipur?"
        heading1="Unmatched Collection"
        text11="Step into a world of exclusivity with our premium selection of VIP mobile number in Jaipur. Our diverse range includes unique and memorable digit combinations designed to make you stand out. Whether you're looking for repeating numbers, significant sequences, or a pattern that reflects your personality, we have something extraordinary for everyone."
        heading2="Industry Expertise You Can Rely On"
        text21="With years of experience, we are Jaipur’s trusted provider of authentic VIP mobile numbers. Our secure and transparent acquisition process ensures a smooth and hassle-free experience. Every VIP number we offer comes with full legal documentation, allowing you to buy with total confidence."
        heading3="Tailored Service for Your Unique Identity"
        text31="We understand that a VIP mobile number is more than just a way to communicate—it’s a reflection of who you are. Our dedicated team will help you choose a number that aligns with your personal or professional image. Whether you want a number that speaks of sophistication, success, or simplicity, we’ll ensure that your choice enhances your communication style. "
        heading4="Affordable Luxury"
        text41="Experience the luxury of owning a VIP mobile number in Jaipur without overspending. Our competitive pricing makes it possible for you to enjoy the exclusivity and prestige of a VIP number while staying within your budget. At VIP Number Shop, we believe that everyone should have access to exceptional numbers without compromising on affordability."
        heading5="Commitment to Your Satisfaction"
        text51="We are committed to providing not just premium mobile numbers, but also an exceptional customer experience. Join countless satisfied clients who have elevated their communication with our VIP mobile numbers in Jaipur. When you choose us, you’re partnering with a provider that values quality, convenience, and customer satisfaction at every stage."
      />
      <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityJaipur;
