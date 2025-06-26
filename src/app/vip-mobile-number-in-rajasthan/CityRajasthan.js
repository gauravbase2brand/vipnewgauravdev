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
import { CityRajasthanFaqs } from "../Shared/City/CityFaqsArray/CityFaqsArray";
// import { ResponsiveFooter } from "../ResponsiveModule";

const CityRajasthan = () => {
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
      <div className="city-page-os">
        <CityBanner
          heading="VIP Mobile Number in Rajasthan"
          text="Book Your Number"
          link="/search-your-number"
        />
        <PunjabLeading
          image={`${panelImg}/assets/img/vip-images/PunjabLeading-img15_i9qhkq.webp`}
          imageAlt="Rajasthani Dance"
          title1="Your Preferred VIP Mobile Number Provider in Rajasthan"
          para1="Step into Rajasthan's leading hub for VIP mobile numbers, where prestige meets practicality. We are the preferred choice for those in search of VIP mobile number in Rajasthan that echo their distinctive flair, stature, and character."
          para2="In this digital era, a mobile number is more than just a sequence of numbers – it's a reflection of your persona. Hence, we strive to offer our clients VIP mobile numbers that are exceptional, easy to recall, and radiate a unique charm in a world bustling with numbers."
        />
        <CityFavouriteNumber
          title1="Sign Up with Us and Acquire Your Desired Phone Number"
          title2="Register with us to explore our vast array of VIP mobile number in Rajasthan. Our team can also recommend a mobile number that complements your taste and status."
          buttonTitle="Book Your Number"
          link="/search-your-number"
        />
        <CityHowGetVipNumber
          headingPart1="Delivery Process of"
          headingPart2="VIP Mobile Number in Rajasthan"
          headingPart3="?"
          
        />
        <RegisterVipNumber
          image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
          heading="Enjoy Exclusive Offers and Rewards on Your Purchase"
          subHeading="Our perks and offers for purchasing a VIP mobile number in Rajasthan include discounts on future acquisitions and exclusive access to limited edition numbers."
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
          heading="Rated as the Best for VIP Mobile Numbers in Rajasthan"
          text1="As the trusted provider of fancy mobile numbers in Rajasthan, we encourage you to delve into our unique collection and embrace the prestige of owning a unique mobile number. Visit our website or our physical store to understand why we are the foremost destination for VIP mobile numbers in the area."
          text2="We assure an unmatched shopping experience that equals the uniqueness of the numbers we provide. Step into the VIP lifestyle and make your mark with our VIP mobile numbers today!"
          link="/"
          image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img15_uqoglt.webp`}
          imageAlt="Phone Screen with VIP Numbers Rajasthan"
        />
        <CityDifferentFromOthers
          heading="Why Choose Us as Your VIP Mobile Number Provider in Rajasthan?"
          heading1="Unparalleled Collection"
          text11="Our expansive collection of VIP mobile number in Rajasthan is our pride. Whether you seek a number reflecting a memorable date, containing an attractive repeating digits pattern, or syncing with your business landline's last six digits, our collection has the perfect number for you."
          text12="Our database is regularly refreshed to ensure a constant supply of unique VIP numbers."
          heading2="Tailored to Your Needs"
          text21="We believe that your VIP number should mirror your style, and hence, we offer an array of customization options. If you have a specific number sequence in mind, we'll strive to secure it for you."
          text22="Our proficient team can also provide recommendations based on your preferences. Using our deep understanding of number sequences, we create notable, prestigious, and memorable mobile numbers that truly resonate with you."
          heading3="Seamless, Secure Process"
          text31="Transparency, safety, and customer satisfaction form the backbone of our service. We've simplified our process to ensure your VIP mobile number procurement is effortless and secure."
          text32="Our expert staff guides you through each step, ensuring all legal requisites are diligently met."
          heading4="Accessible Luxury"
          text41="Despite the exclusivity of our fancy mobile numbers in Rajasthan, we ensure they're competitively priced. Our pricing model caters to the diverse financial capabilities of our esteemed customers."
          text42="We staunchly believe that owning a VIP number should be an affordable luxury, accessible to anyone wishing to stand out."
          heading5="Customer-Focused Approach"
          text51="We prioritize establishing enduring relationships with our customers. Our devoted team is always available to assist you, answer your queries, and provide excellent post-sales service, ensuring a seamless and gratifying experience with us."
          text52="Our high customer loyalty rate testifies to our unwavering commitment and service quality."
        />
        <CityFaqs cityPunjabFaqs={CityRajasthanFaqs} />
        <QRVipApp />
      </div>
  );
};

export default CityRajasthan;
