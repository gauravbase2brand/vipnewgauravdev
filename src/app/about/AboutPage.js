"use client";
import React from "react";
import AboutBanner from "./AboutBanner/AboutBanner";
import AboutImageWithText from "./AboutImageWithText/AboutImageWithText";
import YearsOfExperience from "./YearsOfExperience/YearsOfExperience";
import AboutVideo from "./AboutVideo/AboutVideo";
import OurValues from "./OurValues/OurValues";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import { ResponsiveFooter } from "../ResponsiveModule";
import AboutReviews from "./AboutReviews/AboutReviews";
const About = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const columnDirection = {
    flexDirection: "row-reverse",
  };
  return (
    <div>
      <AboutBanner />
      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/girl-about_tcf530.webp`}
        heading="About Us and Our Values"
        subHeading="Are you looking for the best VIP phone numbers or VIP fancy numbers in India or its states? You have arrived here on the right webpage. That's where the VIP Number Shop comes into the picture with top-notch and best-in-market services with the very competitive and affordable price tag."
        subHeading1="VIP Number Shop (VNS) is the nation’s leading #1"
        subHeading12="VIP Number Shop (VNS) is the nation’s leading #1 VIP and fancy number provider since 2007 with over 70k+ happy customers. We feel proud to say that our VIP and fancy numbers attract thousands of eyes in the market, bring conversions, and boost engagement."
        subHeading2=""
        style={columnDirection}
      />
      <YearsOfExperience />
      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/about-boy_ubprmt.webp`}
        heading="They Deliver Numbers... We Deliver Numbers With Real Value And Experience"
        subHeading="Whether you talk about pricing or our services, we prefer to remain transparent and honest in every aspect. As we said earlier, you get what you pay for. There are no hidden games and charges at all."
        subHeading1=""
        subHeading12="Being a reputed VIP and Fancy phone number provider in India, we promise you the best-in-market experience every time you choose us. No hidden games, no hidden terms, you get what you pay for. Customer satisfaction is one of our top tier priorities, and we never compromise on it."
        subHeading2="Whenever It Comes To VIP Phone Phone Numbers, VIP Number Shop Should Be On Top Of Your List"
      />
      <AboutVideo />
      <OurValues />
      <AboutReviews />
      <OurCustomers />
      <VideoTestimonial />
    </div>
  );
};

export default About;
