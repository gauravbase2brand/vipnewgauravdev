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
const CityMoradabad = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const CityChandigarhFaqs = [
    {
      id: 0,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "What are VIP mobile numbers?",
      paragraph:
        "VIP mobile numbers are exclusive phone numbers featuring memorable patterns, sequences, or repeated digits. These numbers offer a unique way to elevate your communication, making you stand out with a personalized and prestigious contact.",
    },
    {
      id: 1,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How are VIP mobile numbers different from regular numbers?",
      paragraph:
        "VIP mobile numbers in Moradabad are distinct due to their carefully curated digit patterns and combinations. Unlike regular numbers, which are randomly assigned, VIP numbers offer a level of personalization and status that sets you apart from the crowd.",
    },
    {
      id: 2,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why should I choose a VIP mobile number in Moradabad?",
      paragraph:
        "A VIP mobile number not only enhances your personal or professional image but also makes it easier for others to remember your contact details. Whether you’re using it for personal connections or business purposes, a VIP number allows you to create a lasting impression with a sophisticated touch. ",
    },
    {
      id: 3,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "How can I purchase a VIP mobile number in Moradabad?",
      paragraph:
        "Buying a VIP mobile number is simple with VIP Number Shop. Just sign up on our platform, browse through our extensive collection, and choose the number that best suits your needs. Our team will guide you through the entire process, ensuring a seamless experience from start to finish.",
    },
    {
      id: 4,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers more expensive than regular numbers?",
      paragraph:
        "Yes, VIP mobile numbers usually carry a premium price due to their exclusivity and special digit patterns. However, we offer competitive pricing in Moradabad, ensuring you get excellent value for your investment.",
    },
    {
      id: 5,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading:
        "Can I choose specific digits for my VIP mobile number in Moradabad?",
      paragraph:
        "Yes, you can choose specific digits for your VIP mobile number, subject to availability. Whether you have a lucky number, a significant date, or a pattern that holds personal meaning, we offer customization options to ensure your number reflects your identity.",
    },
    {
      id: 6,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Are VIP mobile numbers transferable?",
      paragraph:
        "Yes, VIP mobile numbers are fully transferable, allowing you to retain ownership of your number even if you decide to change mobile service providers. Our team will assist you with the transfer process, ensuring a smooth and hassle-free experience. ",
    },
    {
      id: 7,
      image: `${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`,
      heading: "Why a VIP Mobile Number in Moradabad is the Right Choice",
      paragraph:
        "Owning a VIP mobile number in Moradabad goes beyond just having an easy-to-remember number. It’s about making a statement in both personal and professional settings. Whether you’re a business owner looking to build your brand or an individual wanting a number that reflects your status, a VIP mobile number offers the perfect blend of functionality and prestige.",
    },
  ];
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Number In Moradabad"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/MORADABAD_ticgvz.webp`}
          imageAlt="Moradabad"
          title1="Famous and Well Approached VIP Mobile Number Provider in Moradabad"
          para1="Discover the latest VIP mobile numbers in Moradabad with our trusted and reliable services. Elevate your communication experience with a personalized mobile number that mirrors your unique identity and status. Our vast collection of exclusive numbers ensures you’ll find the perfect match that aligns with your personality and lifestyle, giving you an edge in personal and professional communication."
          para2=""
        />
        <CityFavouriteNumber
          title1="Sign Up with Us to Secure Your Exclusive VIP Mobile Number in Moradabad"
          title2="Join our community today and secure your exclusive VIP mobile number in Moradabad. Enhance the way you communicate with a distinctive and memorable number that will leave a lasting impression on everyone you connect with. Sign up now to claim a unique number that reflects who you are and how you want to be perceived."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Moradabad"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Rewards and Savings with Your VIP Mobile Number Purchase"
          subHeading="In Moradabad, we provide more than just a VIP mobile number—we offer unmatched rewards and savings with every purchase. Experience the premium perks of owning a VIP number while enjoying special offers that elevate your communication with a touch of class. Elevate your mobile experience with one of our VIP mobile numbers in Moradabad, along with the exclusive rewards that come with it."
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
          heading="VIP Number Shop: Moradabad’s Leading Provider of VIP Mobile Numbers"
          text1="At VIP Number Shop, we are proud to be Moradabad’s top provider of elite mobile numbers. Explore our curated collection of VIP mobile numbers, handpicked to redefine the way you communicate. Trust our expertise to help you select the ideal VIP mobile number that not only enhances your communication but also reflects your status with style and sophistication."
          text2=""
          link="/"
          image={`${panelImg}/assets/img/vip-images/download_nhw2bm.png`}
          imageAlt="Phone Screen with VIP Numbers Moradabad"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us for VIP Mobile Numbers in Moradabad?"
          heading1="Unmatched Collection"
          text11="Step into a world of exclusivity with our premium range of VIP mobile numbers in Moradabad. We offer a diverse selection of memorable and unique digit combinations, tailored to make you stand out from the crowd. Whether you’re searching for repeating digits, significant sequences, or a number that aligns with your personality, we have something extraordinary for everyone."
          heading2="Industry Expertise You Can Trust"
          text21="With years of experience, we are the most trusted provider of authentic VIP mobile numbers in Moradabad. Our secure and transparent acquisition process guarantees a hassle-free experience. Each VIP number we offer comes with full legal documentation, ensuring you can buy with total confidence."
          heading3="Tailored Service for Your Unique Identity"
          text31="We understand that a VIP mobile number is more than just a contact—it’s an extension of your identity. Our dedicated team will work with you to select a number that complements your personal or professional image. Whether you’re seeking a number that represents sophistication, success, or simplicity, we’ll ensure your choice enhances your communication style and leaves a lasting impact."
          heading4="Affordable Luxury"
          text41="Owning a VIP mobile number in Moradabad doesn’t have to break the bank. We offer competitive pricing to ensure you can enjoy the exclusivity and prestige of a VIP number without overspending. At VIP Number Shop, we believe in making luxury accessible, so you can experience the best without compromising on affordability."
          heading5="Commitment to Your Satisfaction"
          text51="We are dedicated to providing not just premium numbers but also an exceptional customer experience. Join countless satisfied clients who have enhanced their communication with our VIP mobile numbers in Moradabad. When you choose us, you’re choosing a provider that values quality, convenience, and your complete satisfaction at every stage of the process."
        />
        <CityFaqs cityPunjabFaqs={CityChandigarhFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityMoradabad;
