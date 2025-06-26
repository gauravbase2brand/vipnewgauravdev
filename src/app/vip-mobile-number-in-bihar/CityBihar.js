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
import { CityBiharFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityBihar = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP mobile number in Bihar"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img17_jhej9v.webp`}
          imageAlt="Performing Chatth Puja"
          title1="Discover the Exclusive Collection of VIP Mobile Numbers in Bihar"
          para1="Unlock a world of exclusivity and prestige by browsing our extensive collection of fancy mobile numbers in Bihar. Our selection includes repeating digits, sequential digits, symmetry numbers, and numbers with cultural or religious meanings."
          para2="Choose the perfect VIP number that resonates with your personal preferences and enhances your overall image."
        />
        <CityFavouriteNumber
          title1="Register Now to Receive Your VIP Mobile Number"
          title2="Do not let the chance pass you by! Register right away to reserve your personal VIP mobile number in Bihar, which will give your communications a touch of distinction. Secure your exclusive VIP mobile number in Bihar today and make a lasting impression. Don't miss out on this opportunity to elevate your communication and stand out from the crowd. Register now!"
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Bihar"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Offers and Rewards with Your VIP Mobile Number"
          subHeading="As a valued customer, you'll unlock a world of exclusive offers and exciting rewards with your VIP mobile number purchase. Experience the perks of being a VIP customer and enjoy special benefits with every transaction."
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
          heading="Reach Out to Us for Any Queries"
          text1="If you have any doubts or questions regarding VIP mobile numbers, feel free to reach out to us."
          text2="Our knowledgeable team is here to provide you with the necessary information and guidance, ensuring you make an informed decision."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img17_tthmeo.webp`}
          imageAlt="Phone Screen with VIP Numbers Bihar"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us for Your VIP Mobile Number in Bihar?"
          heading1="Extensive Selection"
          text11="Our wide collection of VIP mobile numbers ensures you have diverse options to choose from, catering to various preferences and tastes."
          text12=" Find a VIP mobile number that resonates with your style and personality."
          heading2="Exclusive Numbers"
          text21="Stand out from the crowd with our exclusive VIP mobile numbers."
          text22="Our curated range includes rare and distinctive numbers that are highly sought after, adding prestige to your mobile communication."
          heading3="Customization Options"
          text31="We offer customization options for VIP mobile numbers in Bihar, allowing you to choose specific patterns, sequences, or digits that hold significance to you."
          text32="Create a VIP mobile number that truly reflects your identity and preferences."
          heading4="Competitive Pricing"
          text41="We understand the importance of affordability without compromising on quality or exclusivity."
          text42="Our pricing is designed to offer excellent value for your investment, allowing you to indulge in the luxury of owning a VIP mobile number without stretching your budget."
          heading5="Dedicated Customer Service"
          text51="Your satisfaction is our top priority. Our team provides dedicated customer service throughout the process, promptly addressing any queries or concerns you may have."
          text52="We strive to ensure a smooth and seamless experience."
        />
        <CityFaqs cityPunjabFaqs={CityBiharFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityBihar;
