"use client";
import React from "react";
import "./CityPunjab.css";
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
import { cityPunjabFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";

const CityPunjab = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="city-page-os">
      <CityBanner
        heading="VIP mobile number in Punjab"
        text="Book Your Number"
        link="/search-your-number"
      />
      <PunjabLeading
        image={`${panelImg}/assets/img/vip-images/PunjabLeading-img_zmactc.webp`}
        imageAlt="Phone Screen with VIP Numbers"
        title1="Punjab's leading VIP mobile numbers shop"
        para1="VIP Number Shop is the number one choice for those who want a
        standout mobile number that represents who they are. We know that
        a mobile number today is more than just numbers. It's a way to
        express who you are."
        para2="So, we make sure our customers get VIP mobile numbers that catch
        the eye, are easy to recall, and carry a touch of className. Our
        numbers help you stand out in the crowd."
      />
      <CityFavouriteNumber
        title1="Register with Us and Buy your Favorite Number"
        title2="Once you register with us, you gain access to a vast collection of VIP mobile numbers in Punjab. We can also suggest you a mobile number that suits your style and status best."
        buttonTitle="Book Your Number"
        link="/search-your-number"
      />
      <CityHowGetVipNumber
        headingPart1="Delivery Process of"
        headingPart2="VIP Mobile Number in Punjab"
        headingPart3="?"
        
      />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
        heading="Enjoy Our Offers and Rewards"
        subHeading="An exclusive range of rewards and offers is waiting for you with your purchase of a VIP mobile number in Punjab."
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
        heading="We Invite You to Explore Our Exclusive Collection of VIP Mobile Numbers in Punjab"
        text1="As Punjab's trusted source for VIP mobile numbers, we invite you to explore our exclusive collection and experience the prestige associated with owning a distinctive mobile number."
        text2="Browse through our website, or better yet, visit us in person to discover why we are the leading VIP mobile number shop in the region. We promise to deliver a shopping experience that is as unique as the numbers we offer. Embrace the privilege of being a VIP. Make your mark with our VIP mobile number in Punjab today!"
        buttonTitle="Search your VIP Number"
        link="/"
        image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img_te7gwd.webp`}
      />
      <CityDifferentFromOthers
        heading="What makes VIP Number Shop different from others?"
        heading1="Unparalleled Collection"
        text11="We take immense pride in our extensive collection of VIP mobile number in Punjab. Whether you're looking for a number sequence that mirrors an important date, a repeating digit pattern, or the desired last six digits that match your business landline, our inventory is likely to have the perfect number for you."
        text12="Our rich database is regularly updated with new numbers to ensure an ongoing supply of unique, VIP numbers to choose from."
        heading2="Customization at its Best"
        text21="Your VIP number should reflect your individuality and that's why we offer a wide range of customization options. If you have a specific number sequence in mind, we will make every effort to secure it for you."
        text22="Alternatively, our team can provide suggestions based on your preferences. We understand the nuances of number sequences and their implications, helping us to curate the most appealing, prestigious, and memorable mobile numbers."
        heading3="Seamless, Secure Process"
        text31="Transparency, security, and customer satisfaction are our guiding principles. We have streamlined our process to make acquiring your VIP mobile number in Punjab as straightforward and secure as possible."
        text32="Our knowledgeable staff guides customers through every step, ensuring all legal formalities are strictly adhered to."
        heading4="Competitive Pricing"
        text41="Despite the exclusivity of our fancy mobile number in Punjab, we have made it a point to offer them at competitive rates."
        text42="Our pricing model has been designed keeping in mind the varying budget needs of our diverse clientele. We believe that owning a VIP number should not just be a luxury, but an affordable luxury."
        heading5="Customer-Centric Approach"
        text51="We believe in building long-term relationships with our clients. Our team is always available to assist, answer queries, and provide after-sales service to ensure that your experience with us is smooth and satisfactory."
        text52="Our high customer retention rate is a testament to our commitment and service quality."
      />
      <CityFaqs cityPunjabFaqs={cityPunjabFaqs} />
      <QRVipApp />
    </div>
  );
};

export default CityPunjab;
