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
const CityJammu = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What Is a VIP Mobile Number in Jammu?",
      paragraph:
        "A VIP mobile number is a specially selected phone number with a unique pattern, sequence, or symbolic significance. These numbers are popular due to their easy recall, appealing appearance, and positive connotations based on numerology, making them desirable for personal and business use.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why Should I Choose a VIP Mobile Number in Jammu?",
      paragraph:
        "Choosing a VIP mobile number enhances your personal identity and leaves a memorable impression. VIP Number Shop in Jammu offers a variety of options, each designed to elevate your brand and create a unique mobile identity.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How Do I Choose a VIP Mobile Number Based on Numerology?",
      paragraph:
        "To select a VIP mobile number that aligns with numerology, use the VIP Number Shop’s numerology calculator. By entering your birth details, you can discover numbers that align with your energy and aspirations, and help create positive influences in your life.",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are There Special Offers on VIP Mobile Number in Jammu?",
      paragraph:
        "Yes! VIP Number Shop in Jammu frequently provides special discounts, promotions, and loyalty rewards. By signing up, customers can unlock exclusive deals, cashback offers, and more, making the experience both affordable and rewarding.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How Can I Secure a VIP Mobile Number?",
      paragraph:
        "Securing a VIP mobile number is a simple process involving the selection of your desired number, registration, and final purchase. VIP Number Shop guides customers throughout this journey, ensuring a smooth and transparent experience from start to finish.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Can Businesses Benefit from Having a VIP Mobile Number?",
      paragraph:
        "Absolutely! VIP mobile numbers are memorable and professionally appealing, helping businesses create a positive impression on clients. They are ideal for industries focused on customer interactions, improving brand recall and trust.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "How Can I Check the Availability of My Chosen VIP Mobile Number in Jammu?",
      paragraph:
        "VIP Number Shop maintains an updated inventory of available numbers. Customers can browse the shop’s collection online or visit in person to check and verify the availability of their preferred number before making a purchase.",
    },
    {
      id: 7,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What Is the Process for Activating My VIP Number?",
      paragraph:
        "Once you purchase a VIP number, the team at VIP Number Shop in Jammu will guide you through the activation steps. This typically involves selecting a service provider, verifying your identity, and activating the number in a hassle-free manner.",
    },
  ];
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP mobile number in Jammu"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/JAMMU_mqqeq8.webp`}
        imageAlt="Jammu"
        title1="VIP Number Shop: The Premier Destination for VIP Mobile Numbers in Jammu"
        para1="For anyone seeking a distinctive and memorable VIP mobile number in Jammu, VIP Number Shop is the ultimate go-to source. Renowned for its premium collection of exclusive numbers, VIP Number Shop offers personalized solutions that enhance both personal and professional branding. With a reputation for trustworthiness and quality service, VIP Number Shop stands out as a leading choice in Jammu."
        para2=""
      />
      <CityFavouriteNumber
        title1="Unlock an Exclusive Range of VIP Mobile Numbers by Signing Up"
        title2="Signing up with VIP Number Shop in Jammu unlocks an impressive collection of unique and premium mobile numbers. Tailored to cater to individual preferences and business requirements, the shop offers combinations that are easy to remember, symbolically significant, and aesthetically appealing. Enhance your identity and boost your mobile experience by accessing VIP Number Shop’s collection effortlessly."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Jammu"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Get Exclusive Deals and Rewards on VIP Mobile Numbers in Jammu"
        subHeading="VIP Number Shop takes pride in offering exciting rewards and exclusive deals on VIP mobile number in Jammu. Customers can take advantage of exclusive discounts, loyalty benefits, and personalized promotions on premium numbers. With customer satisfaction at its core, VIP Number Shop provides a rewarding and memorable experience for those looking for standout numbers."
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
        heading="Discover Your Ideal VIP Mobile Number in Jammu Using a Numerology Calculator"
        text1="With the VIP Number Shop’s numerology calculator, customers in Jammu can discover a VIP mobile number that aligns perfectly with their personality and aspirations. Based on an individual’s birth date, the numerology tool recommends numbers that resonate with the person’s energy and goals, creating a positive impact on both personal and professional fronts."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/download_z8oexj.png`}
        imageAlt="Phone Screen with VIP Numbers Jammu"
      />
      <CityDifferentFromOthers
        heading="Why Choose VIP Number Shop in Jammu?"
        heading1="Vast Range of Exclusive VIP Numbers"
        text11="VIP Number Shop offers a diverse selection of unique and memorable VIP mobile number in Jammu to suit varying preferences. Whether you’re looking for auspicious numbers, easy-to-recall sequences, or rare combinations, the shop’s extensive collection can help you find the ideal number for your personal or professional needs."
        heading2="Customized Numerology Guidance"
        text21="The shop provides customized numerology consultations, enabling customers to choose numbers that are aligned with their birth date, energy, and aspirations. By using a numerology calculator, VIP Number Shop recommends numbers that resonate with your goals, enhancing your connection with your chosen number. "
        heading3="Exciting Offers and Rewards"
        text31="Customers of VIP Number Shop in Jammu can enjoy a variety of special deals, cashback offers, and loyalty benefits. These exclusive promotions make it a budget-friendly option to secure a VIP mobile number in Jammu which stands out."
        heading4="Reputable and Trustworthy Service"
        text41="Known for its transparency and authenticity, VIP Number Shop has earned a solid reputation in Jammu. Customers trust the shop for delivering genuine numbers and offering reliable support, resulting in a smooth and satisfying buying experience."
        heading5="Seamless Sign-Up and Number Access"
        text51="VIP Number Shop’s user-friendly sign-up process allows customers to explore a wide collection of VIP mobile numbers effortlessly. After registration, customers can enjoy personalized recommendations and exclusive offers, making the selection process easy and convenient."
      />
      <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityJammu;
