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
const CityJalandhar = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What is a VIP Mobile Number?",
      paragraph:
        "A VIP mobile number is a unique phone number with a special pattern, sequence, or significance. These numbers are often easy to remember, aesthetically appealing, or hold symbolic meanings based on numerology, making them desirable for personal and business branding.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why Should I Choose a VIP Mobile Number in Jalandhar?",
      paragraph:
        "Choosing a VIP mobile number can elevate your identity, create a memorable impression, and even bring positive energy based on numerology. In Jalandhar, VIP Number Shop offers a wide range of these numbers, enhancing your personal or business brand.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How Do I Select a VIP Mobile Number Based on Numerology?",
      paragraph:
        "To choose a number aligned with your numerology, use VIP Number Shop’s numerology calculator. Enter your birth details to find numbers resonating with your energy and aspirations. The calculator suggests numbers that align with your life path and desired outcomes.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are There Any Offers Available on VIP Mobile Numbers?",
      paragraph:
        "Yes, VIP Number Shop frequently offers exclusive rewards, discounts, and promotions on VIP mobile numbers. By signing up, customers can access special deals, cashback offers, and loyalty benefits, making it an affordable and rewarding experience in Jalandhar.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: " Is There Any Process for Securing a VIP Number?",
      paragraph:
        "Securing a VIP number involves selecting your desired number, completing a registration or booking process, and purchasing it. VIP Number Shop guides customers through the entire process, ensuring clarity, transparency, and a smooth experience from selection to activation.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Can Businesses Benefit from Using VIP Mobile Numbers?",
      paragraph:
        "Absolutely! VIP mobile numbers enhance brand recall and add a professional touch to a business’s communication. They are easy to remember and can help businesses create a positive impression on clients, which is especially beneficial for customer-centric industries.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "How Do I Know If My Chosen VIP Mobile Number in Jalandhar Is Available?",
      paragraph:
        "VIP Number Shop in Jalandhar has an updated inventory of available numbers. You can check the shop’s collection online or visit the store to explore and verify the availability of your preferred VIP mobile number before making a purchase.",
    },
    {
      id: 7,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How Can I Get My Preferred VIP Number Activated?",
      paragraph:
        "Once you purchase a VIP number from VIP Number Shop, the team will guide you through the activation process. This usually involves choosing a service provider, verifying your identification, and ensuring a seamless and hassle-free number activation experience.",
    },
  ];
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP Mobile Numbers in Jalandhar"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/JALANDHAR_brzkas.webp`}
        imageAlt="Jalandhar"
        title1="VIP Number Shop: The Top Choice for VIP Mobile Number in Jalandhar"
        para1="VIP Number Shop is the go-to destination for those seeking VIP mobile number in Jalandhar. Known for its exclusive collection of premium numbers, it offers personalized options that enhance personal and business branding. With a reputation for reliability and quality service, VIP Number Shop stands out in Jalandhar."
        para2=""
      />
      <CityFavouriteNumber
        title1="Sign Up with VIP Number Shop to Unlock an Exclusive Collection of VIP Mobile Numbers"
        title2="Sign up with VIP Number Shop to access an extensive collection of VIP mobile number in Jalandhar which cater to both personal and business needs. Offering unique, easy-to-remember, and auspicious number combinations, VIP Number Shop helps you enhance your identity and brand. Discover exclusive numbers and elevate your mobile experience effortlessly."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Jalandhar"
        headingPart3="?"
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Exclusive Rewards and Offers on VIP Mobile Number in Jalandhar"
        subHeading="VIP Number Shop in Jalandhar offers amazing rewards and exclusive deals on VIP mobile numbers. Customers can enjoy special discounts, loyalty benefits, and personalized offers on premium numbers. With a focus on customer satisfaction, VIP Number Shop ensures a rewarding experience for those seeking standout mobile numbers."
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
        heading="Find Your Perfect VIP Number with a Numerology Calculator"
        text1="With VIP Number Shop's numerology calculator, you can find a VIP mobile number that perfectly aligns with your energy and aspirations. The calculator helps you select a number based on your birth date and numerology, ensuring it resonates with your personality and brings positive vibes."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/download_h8u8zl.png`}
        imageAlt="Phone Screen with VIP Numbers Jalandhar"
      />
      <CityDifferentFromOthers
        heading="Why Choose Us for VIP Mobile Numbers in Jalandhar?"
        heading1="Extensive Collection of VIP Numbers"
        text11="VIP Number Shop offers an extensive range of exclusive VIP mobile numbers to suit different preferences. Whether you’re looking for lucky numbers, easy-to-remember sequences, or unique combinations, the shop has a variety of options to elevate your personal or business branding."
        heading2="Personalized Numerology Assistanc"
        text21="The shop provides personalized numerology assistance, helping customers find numbers that align with their birth date, energy, and aspirations. Using a numerology calculator, it recommends numbers that resonate positively with the customer’s goals, ensuring a more meaningful connection with their chosen number. "
        heading3="Special Offers and Rewards"
        text31="VIP Number Shop frequently provides exclusive offers and loyalty rewards on its collection of premium numbers. Customers can take advantage of discounts, cashback deals, and special promotions, making it a cost-effective choice for securing their desired VIP number in Jalandhar."
        heading4="Trust and Reliability"
        text41="With a solid reputation in Jalandhar, VIP Number Shop is known for its transparent services and genuine offerings. Customers trust the shop for its commitment to delivering authentic VIP numbers and reliable support, enhancing the overall buying experience and customer satisfaction."
        heading5="Effortless Sign-Up and Access"
        text51="VIP Number Shop offers an easy and user-friendly sign-up process. Once registered, customers gain access to its vast collection of VIP mobile numbers, exclusive offers, and personalized recommendations. This seamless experience allows customers to explore and choose their ideal number with ease."
      />
      <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityJalandhar;
