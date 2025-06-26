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
import { NetworkAirtelFaqs } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const NetworkAirtel = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="Buy Airtel Fancy Numbers Online"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img25_m04xai.webp`}
        imageAlt="Airtel Logo"
        title1="India's Most Trusted & 100% Genuine Airtel Vip Number Seller"
        para1="Buy Airtel VIP Numbers in different memorable combinations with Prepaid and Postpaid at Best Price Cost. Order Now and Get Free Delivery."
        para2=""
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Phone Number"
        title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Process of Buying an"
        headingPart2="Airtel VIP Number"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Exclusive Offers and Rewards on Your Purchase"
        subHeading="Our perks and offers for purchasing Airtel fancy numbers include discounts on future purchasing and exclusive access to limited edition numbers."
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
        heading="Buy Any Airtel VIP Number Online Over In India"
        text1="Get your dream Airtel choice Number with a maximum discount only on VIP Fancy Numbers that offers 100% genuine and high quality VIP Number services online in all over India."
        text2=""
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img25_hissbv.webp`}
        imageAlt="Phone Screen with VIP Numbers Airtel"
      />
      <CityDifferentFromOthers
        heading="Customer Reviews"
        heading1="Rajesh Kumar"
        text11="VIP Number Shop exceeded my expectations! I found the perfect Airtel fancy number that suits my style."
        text12="The entire process was swift, and their customer service is top-notch. Highly recommended!"
        heading2="Priya Sharma"
        text21="I got my Airtel VIP number from VIP Number Shop, and it's impressive. While the selection could be broader, the number I chose is fantastic."
        text22="The team was helpful throughout."
        heading3="Arjun Patel"
        text31="VIP Number Shop offers a fantastic range of Airtel fancy numbers. I found the ideal one that stands out."
        text32="The purchasing process was smooth, and I'm thrilled with my unique number!"
        heading4="Aisha Khan"
        text41="I recently acquired an Airtel VIP number through VIP Number Shop. The selection process was easy, but I wished they had more options."
        text42="Nonetheless, I'm satisfied with my new VIP number."
        heading5="Rahul Mehta"
        text51="I turned to VIP Number Shop for my Airtel VIP number and was pleasantly surprised by the experience. The range of numbers was decent, and I found one that perfectly suited my preference. The service was efficient and the team, very accommodating."
        text52="I'm delighted with my choice and the seamless process!"
      />
      <CityFaqs cityPunjabFaqs={NetworkAirtelFaqs} />
      <QRVipApp />
    </div>
  );
};

export default NetworkAirtel;
