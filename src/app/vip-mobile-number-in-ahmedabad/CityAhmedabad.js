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
import { CityAhmedabadFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityAhmedabad = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div>
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Number in Ahmedabad"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img12_ecc2ev.webp`}
          imageAlt="Gujarati girl"
          title1="Grow your status with a VIP mobile number"
          para1="Elevate your status and make a statement with a VIP mobile number in Ahmedabad. Unlock a world of exclusivity and prestige as you communicate with a number that reflects your unique style. "
          para2="Stand out from the crowd and leave a lasting impression with a distinguished VIP mobile number. Enhance your personal and professional image, and experience a new level of connectivity and distinction."
        />
        <CityFavouriteNumber
          title1="Register Now to Get Your VIP Mobile Number Delivered"
          title2="Don't miss out on the opportunity! Register now to secure your exclusive VIP mobile number in Ahmedabad and have it delivered to you, adding a touch of distinction to your communication."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Ahmedabad"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Offers and Rewards On Your Purchase"
          subHeading="Unlock a world of exclusive offers and exciting rewards when you make a purchase. Experience the perks of being a valued customer and enjoy special benefits with every transaction."
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
          heading="Talk to us If you have any query"
          text1="Feel free to reach out to us if you have any doubts or questions regarding VIP mobile numbers. We are here to provide you with the necessary information and guidance to help you make an informed decision."
          text2="Your satisfaction is our priority, and we are dedicated to addressing any concerns you may have."
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img12_t8zcmb.webp`}
          imageAlt="Phone Screen with VIP Numbers Ahmedabad"
        />
        <CityDifferentFromOthers
          heading="Why choose us for a fancy mobile number in Ahmedabad?"
          heading1="Extensive Collection"
          text11="Our vast collection of VIP mobile numbers in Ahmedabad ensures that you have a wide range of options to choose from. Whether you prefer numbers with repeated digits, specific sequences, or unique patterns, we have a diverse selection that caters to various preferences and tastes."
          text12="With numerous choices, you can find a VIP mobile number that resonates with your style and personality."
          heading2="Exclusive Numbers"
          text21="Stand out from the crowd with our exclusive VIP mobile numbers. We curate a range of rare and distinctive numbers that are not easily found elsewhere. Owning one of these exclusive numbers allows you to make a memorable impression and showcase your individuality and status in Ahmedabad."
          text22="Our collection includes numbers that are highly sought after, adding a touch of prestige to your mobile communication."
          heading3="Customization Options"
          text31="We believe in providing a personalized experience for our customers. That's why we offer customization options for VIP mobile numbers in Ahmedabad."
          text32="You can choose specific patterns, sequences, or digits that hold significance to you. This level of customization allows you to create a VIP mobile number that truly reflects your identity and preferences."
          heading4="Competitive Pricing"
          text41="Our pricing is designed to offer excellent value for your investment. We understand the importance of affordability without compromising on the quality or exclusivity of the VIP mobile numbers."
          text42="With competitive pricing, you can indulge in the luxury of owning a VIP mobile number in Ahmedabad without stretching your budget."
          heading5="Dedicated Customer Service"
          text51="We prioritize customer satisfaction and provide dedicated customer service throughout the process. Our team of professionals is available to assist you with any queries or concerns you may have."
          text52="We strive to ensure a smooth and seamless experience, addressing your needs promptly and professionally. Your satisfaction is our top priority."
        />
        <CityFaqs cityPunjabFaqs={CityAhmedabadFaqs} />
        <QRVipApp />
      </div>
    </div>
  );
};

export default CityAhmedabad;
