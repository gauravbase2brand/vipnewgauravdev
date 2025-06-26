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
import { CityPuneFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const CityPune = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;

  return (
      <div className="city-page-os">
        <CityBanner
          heading="Fancy Mobile Number In Pune"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img19_c2zwrx.webp`}
          imageAlt="Girl in Yellow and White Dress Playing Drum"
          title1="Your Preferred Fancy Mobile Number Provider in Pune"
          para1="Enter Pune's premier hub for Fancy mobile numbers, where practicality meets prestige. We are the top choice for those seeking Fancy mobile numbers in Pune that reflect their distinctive style, stature, and character."
          para2="In the digital era, a mobile number is more than just digits—it's a reflection of your persona. That's why we offer exceptional Fancy mobile numbers that are memorable, easy to recall, and radiate a unique charm in a world filled with numbers."
        />
        <CityFavouriteNumber
          title1="Sign Up with Us and Get Your Desired Phone Number"
          title2="We understand the importance of finding the perfect Fancy mobile number in Pune, and our dedicated team is ready to provide personalized guidance to help you discover a number that not only aligns with your taste but also enhances your status and reflects your unique identity."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Pune"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Offers and Rewards on Your Purchase"
          subHeading="Our perks and offers for purchasing a Fancy mobile number in Pune include discounts on future acquisitions and exclusive access to limited edition numbers."
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
          heading="Ranked as the Best for Fancy Mobile Numbers in Pune"
          text1="As the trusted provider of VIP mobile numbers in Pune, we encourage you to explore our unique collection and embrace the prestige of owning a distinctive mobile number."
          text2="Visit our website or physical store to understand why we are the foremost destination for Fancy mobile numbers in the area"
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img19_m6jap8.webp`}
          imageAlt="Phone Screen with VIP Numbers Pune"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us as Your Fancy Mobile Number Provider in Pune?"
          heading1="Unparalleled Collection"
          text11="Our expansive collection of Fancy mobile numbers in Pune is our pride. Whether you seek a number reflecting a significant date, featuring an attractive repeating digit pattern, or matching the last six digits of your business landline, our collection has the perfect number for you."
          text12="We regularly update our database to ensure a constant supply of unique Fancy numbers."
          heading2="Tailored to Your Needs"
          text21="We believe that your Fancy number should mirror your style, which is why we offer customization options. If you have a specific number sequence in mind, we'll strive to secure it for you."
          text22="Our proficient team can also provide recommendations based on your preferences. Using our deep understanding of number sequences, we create notable, prestigious, and memorable mobile numbers that truly resonate with you."
          heading3="Seamless, Secure Process"
          text31="Transparency, safety, and customer satisfaction form the backbone of our service. We've simplified our process to ensure effortless and secure procurement of your Fancy mobile number in Pune."
          text32="Our expert staff guides you through each step, ensuring all legal requisites are diligently met."
          heading4="Accessible Luxury"
          text41="Despite the exclusivity of our fancy mobile numbers in Pune, we ensure competitive pricing."
          text42="Our pricing model caters to diverse financial capabilities, firmly believing that owning a Fancy number should be an affordable luxury accessible to anyone wishing to stand out."
          heading5="Customer-Focused Approach"
          text51="Establishing enduring relationships with our customers is our priority. Our devoted team is available to assist you, answer your queries, and provide excellent post-sales service, ensuring a seamless and gratifying experience."
          text52="Our high customer loyalty rate testifies to our unwavering commitment and service quality."
        />
        <CityFaqs cityPunjabFaqs={CityPuneFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityPune;
