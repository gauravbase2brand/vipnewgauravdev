"use client";
import React, { useContext } from "react";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import FAQs from "../Shared/FAQs/FAQs";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import PreImageWithText from "../vip-prepaid-number/PreImageWithText/PreImageWithText";
import CityDifferentFromOthers from "../Shared/City/CityDifferentFromOthers/CityDifferentFromOthers";
import CityFavouriteNumber from "../Shared/City/CityFavouriteNumber/CityFavouriteNumber";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import HowWeDeliverBanner from "../how-we-deliver/HowWeDeliverBanner/HowWeDeliverBanner";
import { ResponsiveFooter } from "../ResponsiveModule";

const Postpaid = () => {
    const { user, setRedirectTo } = useContext(AppStateContext);
    const Router = useRouter();
    const panelImg = process.env.NEXT_PUBLIC_IMAGES;
    // register popup context
    const { setActiveSignInWithOtp } = useContext(
        MyRegisterSignInContext
    );
    const columnDirection = {
        flexDirection: "row-reverse",
    };

    return (
        <div>
            <HowWeDeliverBanner
                headingText="Buy Postpaid Fancy Number of Your Choice"
                buttonLink="/"
                buttonTitle="Book Your Number"
            />
            <PreImageWithText
                image={`${panelImg}/assets/img/vip-images/download_gdoys4.png`}
                heading="Secure Your Exclusive Postpaid Fancy Number with Your Preferred Operator"
                subHeading="Welcome to the ultimate platform for VIP Prepaid Numbers! At VIP Number Shop, we bring you the most trusted and genuine VIP prepaid numbers, including Airtel, Jio, and BSNL. You can grow your communication experience with our memorable and distinctive combinations at the best prices. Order now and enjoy free delivery!"
                subHeading1=""
                subHeading12=""
                subHeading2=""
                PrebtnVip="Search your VIP Number"
                style={columnDirection}
                onClick={() => Router.push("/search-your-number")}
            />

            <CityFavouriteNumber
                title1="Sign Up Now and Get Choice Postpaid Fancy Numbers"
                title2="Unlock an exclusive communication experience! Sign up now and claim your choice postpaid fancy number at VIP Number Shop. Grow your style with unique combinations for Airtel, Jio, Vi and BSNL. Enjoy seamless connectivity and stand out with a number that reflects your personality. Don't miss out—secure your distinct postpaid fancy number today!"
                buttonTitle1={user?.token ? "Suggestions" : "Register Now"}
                // link="/search-your-number"
                onClick={() => {
                    !user?.token && setRedirectTo("/suggestion-for-you");
                    !user?.token && setActiveSignInWithOtp(true);
                    user?.token && Router.push("/suggestion-for-you");
                }}
            />
            <CityDifferentFromOthers
                heading="Explore our premium collection of Postpaid Fancy Numbers"
                heading1="Airtel Prepaid Fancy Numbers"
                text11="Discover distinctive Airtel postpaid choice numbers at VIP Number Shop. Choose from a diverse range of combinations that resonate with your style. Enjoy exclusive offers and benefit from a 100% refund guarantee for any issues. Elevate your Airtel experience with a unique and memorable airtel postpaid vip number."
                text12=""
                heading2="BSNL Postpaid Fancy Numbers"
                text21="Explore premium BSNL postpaid fancy numbers at VIP Number Shop. Secure a BSNL choice number with attractive discounts. Enjoy future purchasing discounts and exclusive access to limited edition numbers. Make a statement with a BSNL postpaid fancy number that reflects your individuality."
                text22=""
                heading3="Jio Postpaid Choice Numbers"
                text31="Experience exclusivity with Jio postpaid fancy numbers from VIP Number Shop. Stand out effortlessly with memorable combinations. Benefit from discounts on future purchases and exclusive access to limited edition numbers. Choose a Jio postpaid fancy number to add a personal touch to your communication."
                text32=""
                heading4="Idea Postpaid VIP Numbers"
                text41="Explore distinctive Idea postpaid fancy numbers at VIP Number Shop. Find combinations that resonate with your style and make a lasting impression. Unlock exclusive offers and enjoy the benefits of a personalized Idea postpaid fancy number. Elevate your communication experience with a memorable and unique Idea VIP number."
                text42=""
                heading5="VI Postpaid VIP Numbers"
                text51="Discover premium VI (Vodafone Idea) postpaid fancy numbers at VIP Number Shop. Secure your preferred Vodafone postpaid number with attractive discounts. Benefit from future purchasing discounts and exclusive access to limited edition numbers. Make a statement with a VI postpaid fancy number that adds a touch of uniqueness to your communication."
                text52=""
            />
            <CityHowGetVipNumber
                headingPart1="How to get"
                headingPart2="Postpaid VIP Mobile Number"
                headingPart3="?"
            />
            <OurCustomers />
            <FAQs />
            <QRVipApp />
            
        </div>
    );
};

export default Postpaid;