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

const CityRajkot = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What are VIP mobile numbers?",
      paragraph:
        "VIP mobile numbers are special phone numbers featuring easy-to-remember sequences, patterns, or repeated digits. These numbers add a unique touch to your communication, helping you stand out and leaving a lasting impression.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How are VIP numbers different from regular numbers?",
      paragraph:
        "VIP mobile numbers in Rajkot are distinguished by their exclusive patterns and unique digit arrangements. Regular numbers are typically assigned randomly and lack the personal touch or significance that VIP numbers offer.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why should I choose a VIP mobile number in Rajkot?",
      paragraph:
        "A VIP mobile number not only adds prestige to your communication but also makes it easier for others to remember your number. Whether for business or personal use, a VIP number helps you create a memorable and sophisticated identity.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How can I purchase a VIP mobile number in Rajkot?",
      paragraph:
        "Acquiring a VIP mobile number is simple. Sign up with VIP Number Shop, explore our available options, and select the number that suits you best. Our team will guide you through the process to ensure a seamless experience.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers more expensive than regular numbers?",
      paragraph:
        "Yes, VIP mobile numbers typically come at a premium due to their exclusivity and distinctive patterns. However, we offer competitive pricing in Rajkot to ensure you receive great value for your investment.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "Can I choose specific digits for my VIP mobile number in Rajkot?",
      paragraph:
        "Yes, we offer the option to select specific digits for your VIP mobile number, depending on availability. You can personalize the number to match special dates, lucky numbers, or other preferences to make it truly your own.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers transferable?",
      paragraph:
        "Yes, VIP mobile numbers can usually be transferred to another user, although this process may require certain steps and fees. Our team can guide you through any transfer requirements",
    },
    {
      id: 7,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "Are there legal considerations when buying VIP mobile numbers in Rajkot?",
      paragraph:
        "It’s important to ensure that the VIP mobile number you purchase is obtained legally. At VIP Number Shop in Rajkot, we guarantee that all our numbers are legitimate and come with proper documentation to avoid any legal issues.",
    },
  ];
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Numbers in Rajkot"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/RAJKOT_lrakvc.webp`}
          imageAlt="Rajkot"
          title1="Your Trusted and Well Approached VIP Mobile Number Provider in Rajkot"
          para1="Explore the finest VIP mobile numbers in Rajkot with our reliable and esteemed services. Take your communication to the next level with personalized mobile numbers that reflect your individuality and status. Our vast selection ensures a smooth and easy process to find the perfect number that matches your unique persona."
          para2=""
        />
        <CityFavouriteNumber
          title1="Sign Up with Us to Secure Your Exclusive VIP Mobile Number in Rajkot"
          title2="Join us today and take a step towards owning your own exclusive VIP mobile numbers in Rajkot. Elevate your communication with a number that truly stands out, leaving a lasting impression. Sign up now to get a distinct and memorable mobile connection that is as unique as you are."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Rajkot"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Rewards and Savings on Your VIP Purchase"
          subHeading="In Rajkot, we offer more than just a VIP number – we provide exclusive rewards and savings with every purchase. Experience premium benefits and elevate your communication to reflect a touch of luxury. Enjoy special deals alongside your VIP mobile numbers in Rajkot to enhance your experience even further."
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
          heading="VIP Number Shop: The Leading VIP Mobile Number Provider in Rajkot"
          text1="At VIP Number Shop, we pride ourselves on being Rajkot’s top provider of VIP mobile numbers. Discover our hand-picked collection of elite and fancy mobile numbers that redefine how you connect with others. Trust our expertise to guide you in selecting a VIP number that not only represents your status but also enhances your communication with elegance and flair."
          text2=""
          link="/"
          image={`${panelImg}/assets/img/vip-images/download_rniuau.png`}
          imageAlt="Phone Screen with VIP Numbers Rajkot"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us for VIP Mobile Numbers in Rajkot?"
          heading1="Unmatched Collection"
          text11="Discover a world of exclusivity with our premium selection of VIP mobile numbers in Rajkot. Our diverse range of unique and memorable number combinations is designed to help you stand out. Whether you want a number with repeating digits, significant sequences, or a pattern that reflects your personality, we have something extraordinary for everyone."
          heading2="Industry Expertise You Can Trust"
          text21="With years of experience in the industry, we are Rajkot’s trusted choice for acquiring authentic VIP numbers. Our secure, smooth, and transparent acquisition process guarantees that your journey towards owning a VIP mobile number is both reliable and hassle-free. Every number we offer is legally sound and comes with complete documentation, so you can buy with confidence."
          heading3="Personalized Service to Match Your Identity"
          text31="We understand that a VIP mobile number is more than just a tool—it’s a reflection of who you are. Our dedicated team will help you select a number that aligns with your personal or professional identity. Whether you seek a number that conveys sophistication, success, or simplicity, we ensure that your choice enhances your communication style."
          heading4="Affordable Luxury"
          text41="Enjoy the luxury of owning VIP mobile numbers in Rajkot without breaking the bank. Our competitive pricing allows you to experience the exclusivity you desire while keeping it within your budget. At VIP Number Shop, we believe that everyone deserves access to exceptional numbers without compromising their financial comfort."
          heading5="Commitment to Customer Satisfaction"
          text51="We pride ourselves on delivering not just premium numbers but also premium customer experiences. Join countless satisfied clients who have transformed their communication with our VIP mobile numbers in Rajkot. When you choose us, you’re not just buying a number—you’re partnering with a service that values quality, convenience, and customer satisfaction at every step."
        />
        <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityRajkot;
