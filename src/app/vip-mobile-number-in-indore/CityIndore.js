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
const CityIndore = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What are VIP mobile numbers?",
      paragraph:
        "VIP mobile numbers are special phone numbers known for their easy-to-remember combinations, often featuring repeating digits or significant patterns. They allow users to make a unique statement and enhance their identity.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How do VIP numbers differ from regular numbers?",
      paragraph:
        "VIP numbers in Indore are distinct due to their special patterns or repetitive sequences, making them desirable and memorable. Regular numbers lack these characteristics and are typically assigned randomly.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why should I get a fancy mobile number in Indore?",
      paragraph:
        "A VIP mobile number is a symbol of exclusivity and status. It’s not only memorable for others but also adds a refined touch to your personal or professional image.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How do I acquire a VIP mobile number in Indore?",
      paragraph:
        "You can get a VIP number by registering with VIP Number Shop. Browse our collection of available numbers and choose one that fits your needs and style.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers more expensive?",
      paragraph:
        "Yes, VIP mobile numbers generally have higher prices due to their rarity and unique patterns. Prices depend on the demand and uniqueness of the number you choose.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Can I customize the digits of my VIP number in Indore?",
      paragraph:
        "Yes, depending on availability, you can customize the digits of your VIP mobile number. This allows you to select numbers with special significance or preference.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers transferable to others?",
      paragraph:
        "Yes, VIP mobile numbers are usually transferable, though the process may involve specific procedures and fees based on your service provider.",
    },
    {
      id: 7,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "Are there any legal considerations for purchasing a VIP number?",
      paragraph:
        "It’s essential to ensure that your VIP number is legally obtained. Reputable sellers like VIP Number Shop provide legitimate numbers with the necessary documentation, protecting you from any legal issues.",
    },
  ];
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Numbers in Indore"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/INDORE_svcu9x.webp`}
        imageAlt="Indore"
        title1="Indore's Leading and Trusted VIP Mobile Number Provider"
        para1="Discover the ultimate selection of VIP mobile number in Indore with our reputable and experienced services. Elevate your communication style with personalized numbers that showcase your individuality and status. Our wide-ranging collection of VIP mobile number in Indore ensures an effortless selection process, helping you find a number that resonates with your identity."
        para2=""
      />
      <CityFavouriteNumber
        title1="Sign Up with Us to Secure Your Fancy Mobile Number in Indore"
        title2="Join us today to secure an exclusive VIP mobile number in Indore. Enhance your style of communication with a fancy number that leaves a lasting impression. Sign up now to obtain a unique and memorable mobile number that stands apart from the ordinary."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Indore"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Premium Rewards and Savings with Your Purchase"
        subHeading="Experience the luxury of an exclusive VIP number along with exciting rewards and savings in Indore. Elevate your communication experience with premium benefits designed to offer the best of both worlds."
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
        heading="VIP Number Shop: A Top-Ranked VIP Mobile Number Provider in Indore"
        text1="At VIP Number Shop, we proudly hold a top-ranking position for providing an exclusive collection of VIP mobile number in Indore. Explore a handpicked collection of fancy numbers that redefine communication and reflect your prestige. Trust our expertise to find the perfect number tailored to your needs."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/download_znje8x.png`}
        imageAlt="Phone Screen with VIP Numbers Indore"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Numbers in Indore?"
        heading1="Extensive Collection"
        text11="Elevate your communication game with our unique collection of VIP mobile number in Indore. Each number is thoughtfully curated with distinctive patterns and memorable combinations, offering a range that sets you apart with style and sophistication."
        heading2="Expertise You Can Trust"
        text21="With years of industry experience, we are your trusted partner for VIP numbers. Our proven expertise ensures that every number is genuine and legally secure. Our hassle-free acquisition process, built on trust, guarantees a seamless experience in owning your exclusive number."
        heading3="Personalized Service"
        text31="We understand the importance of finding a number that resonates with your identity. Our team provides personalized guidance to help you select a VIP mobile number that aligns perfectly with your needs. Elevate your communication experience and set yourself apart from the crowd."
        heading4="Competitive Pricing for Exclusive Numbers"
        text41="Indulge in luxury without overspending. We offer competitive pricing on VIP mobile numbers in Indore, making exclusivity accessible without straining your budget. Experience sophistication without compromise."
        heading5="Commitment to Customer Satisfaction"
        text51="Our record of satisfied customers speaks to the quality of our services. Join countless clients who have enhanced their communication with our VIP numbers. Choosing us means selecting a partner that values premium service, smooth processes, and a communication experience defined by prestige."
      />
      <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityIndore;
