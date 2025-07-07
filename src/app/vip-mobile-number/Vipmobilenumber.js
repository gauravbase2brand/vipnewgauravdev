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
import { vipmobilenumberfaq } from "../Shared/Network/NetworkFaqsArray/NetworkFaqsArray";
import { ResponsiveFooter } from "../ResponsiveModule";

const Vipmobilenumber = () => {
    const Router = useRouter();
    const panelImg = process.env.NEXT_PUBLIC_IMAGES;
    return (
        <div className="city-page-os">
            <CityBanner
                heading="Buy VIP Mobile Numbers Online"
                text="Book Your Number"
                link="/search-your-number"
            />
            <PunjabLeading
                image={`${panelImg}/assets/img/vip-images/desktop-footer-logo_x9njf3.webp`}
                imageAlt="Bsnl Logo"
                title1="India’s Trusted Platform for Genuine VIP Mobile Numbers"
                para1="Looking for a premium, easy-to-remember mobile number?"
                para2="We offer a wide range of VIP mobile numbers featuring unique patterns and special digit combinations from top telecom operators like Airtel, Jio, Vi, BSNL, and more."
            />
            <CityFavouriteNumber
                title1="Why Buy a VIP Number?"
                title2="A VIP mobile number stands out due to its memorable sequence and rarity. Whether for personal use, business branding, or gifting, these numbers make a powerful impression and are often linked to good fortune, easy recall, and status."
                buttonTitle="Book Your Number"
                link="/search-your-number"
            />
            <CityHowGetVipNumber
                headingPart1="How to Buy a "
                headingPart2="VIP Mobile Number Online"
                headingPart3="?"
            />
            <RegisterVipNumber
                image={`${panelImg}/assets/img/vip-images/vip-number-register-img_lcehxl.webp`}
                heading="Benefits You Get With Every Purchase"
                subHeading="Every VIP mobile number purchase comes with a range of exclusive perks. You’ll receive discount vouchers for your next number, giving you added value with each order. Enjoy early access to limited-edition number drops, so you never miss out on rare combinations. Our dedicated customer support team ensures your entire buying journey is hassle-free."
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
                heading="VIP Numbers Delivered Across India"
                text1="Whether you're based in Delhi, Mumbai, Kolkata, Pune, Bangalore, Chennai, Hyderabad, or any small town or city — we ensure prompt delivery and complete service support throughout India."
                text2="Enjoy the ease of ordering your dream mobile number from the comfort of your home."
                link="/"
                image={`${panelImg}/assets/img/vip-images/CityExclusiveCollection-img27_hyiis0.webp`}
                imageAlt="Phone Screen with VIP Numbers BSNL"
            />
            <CityDifferentFromOthers
                heading="Customer Reviews"
                heading1="Ravi Deshmukh"
                text11="Got my dream VIP number ending in 9999! Seamless service, and the delivery was on time. "
                text12="Definitely recommended!"
                heading2="Neha Bhatia"
                text21="The customer support guided me perfectly through the process. Super happy with my fancy mobile number!"
                text22="Will buy again."
                heading3="Sandeep Kaur"
                text31="Great collection and pricing. I got a triple-digit sequence just like I wanted."
                text32=" Activation was done smoothly!"
                heading4="Mohammed Irfan"
                text41="Even with a small delay in the code, the team handled it professionally. I now own a number I genuinely love."
                text42=""
                heading5="Kiran Pate"
                text51="The best platform I found for VIP numbers. Got mine with mirror digits – and the process was so easy."
                text52="Excellent service!"
            />
            <CityFaqs cityPunjabFaqs={vipmobilenumberfaq} />
            <QRVipApp />
        </div>
    );
};

export default Vipmobilenumber;

