"use client";
import React, { useContext } from "react";
import AboutImageWithText from "../about/AboutImageWithText/AboutImageWithText";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import FAQs from "../Shared/FAQs/FAQs";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import PreImageWithText from "./PreImageWithText/PreImageWithText";
import CityFavouriteNumber from "../Shared/City/CityFavouriteNumber/CityFavouriteNumber";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import HowWeDeliverBanner from "../how-we-deliver/HowWeDeliverBanner/HowWeDeliverBanner";
import { ResponsiveFooter } from "../ResponsiveModule";

const VipPrepaidNumber = () => {
  const { user, setRedirectTo } = useContext(AppStateContext);
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // register popup context
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const columnDirection = {
    flexDirection: "row-reverse",
  };

  return (
    <div>
      <HowWeDeliverBanner
        headingText="Buy VIP Prepaid Number of Your Choice"
        buttonLink="/"
        buttonTitle="Book Your Number"
      />
      <PreImageWithText
        image={`${panelImg}/assets/img/vip-images/prepaid-girl_m3u5el.webp`}
        heading="Get Your Exclusive VIP Prepaid Number from Your Favorite Operator"
        subHeading="Welcome to the ultimate platform for VIP Prepaid Numbers! At VIP Number Shop, we bring you the most trusted and genuine VIP prepaid numbers, including Airtel, Jio, and BSNL. You can grow your communication experience with our memorable and distinctive combinations at the best prices. Order now and enjoy free delivery!"
        subHeading1=""
        subHeading12=""
        subHeading2=""
        PrebtnVip="Search your VIP Number"
        style={columnDirection}
        onClick={() => Router.push("/search-your-number")}
      />
      <CityFavouriteNumber
        title1="Sign Up with Us and Get Your Desired Prepaid Phone Number"
        title2="Choose your dream prepaid fancy numbers from a vast collection of exclusive options. Our user-friendly platform ensures a seamless experience. Stand out with a memorable number that suits your style. Join now and enjoy the convenience of having your desired prepaid phone number delivered to you hassle-free."
        buttonTitle1={user?.token ? "Suggestions" : "Register Now"}
        onClick={() => {
          !user?.token && setRedirectTo("/suggestion-for-you");
          !user?.token && setActiveSignInWithOtp(true);
          user?.token && Router.push("/suggestion-for-you");
        }}
      />
      <h2 className="vipPrepaidHead">
        Our VIP Prepaid Number Collection Include
      </h2>
      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/download_cgi6d7.png`}
        heading="Airtel Prepaid Fancy Numbers"
        subHeading="Discover unique Airtel prepaid choice numbers at VIP Number Shop, offering a diverse range of combinations. Choose a number that resonates with your style. Unlock exclusive offers and enjoy a 100% refund guarantee in case of any issues. Enhance your Airtel experience with a distinct and memorable prepaid fancy number."
        subHeading1=""
        subHeading12=""
        subHeading2=""
      />

      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/download_yqpw7v.png`}
        heading="BSNL Prepaid Fancy Numbers"
        subHeading="Explore premium BSNL prepaid fancy numbers at VIP Number Shop. Secure a BSNL choice number with attractive discounts. Benefit from future purchasing discounts and exclusive access to limited edition numbers. Make a statement with a BSNL prepaid fancy number that reflects your individuality and stands out from the crowd."
        subHeading1=""
        subHeading12=""
        subHeading2=""
        style={columnDirection}
      />
      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/download_p9id7t.png`}
        heading="Jio Prepaid VIP Numbers"
        subHeading="Unleash exclusivity with Jio prepaid choice numbers from VIP Number Shop. Stand out effortlessly with memorable combinations. Enjoy not only discounts on future purchases but also exclusive access to limited edition numbers. Choose a Jio prepaid fancy number that adds a personal touch to your communication and sets you apart."
        subHeading1=""
        subHeading12=""
        subHeading2=""
      />

      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/download_tnaylw.png`}
        heading="Idea Prepaid VIP Numbers"
        subHeading="Explore distinctive Idea VIP numbers at VIP Number Shop. Find combinations that resonate with your style and make a lasting impression. Unlock exclusive offers and enjoy the benefits of a personalized Idea fancy number. Elevate your communication experience with a memorable and unique Idea VIP number."
        subHeading1=""
        subHeading12=""
        subHeading2=""
        style={columnDirection}
      />
      <AboutImageWithText
        image={`${panelImg}/assets/img/vip-images/download_fzrjib.png`}
        heading="VI (Vodafone Idea) Prepaid VIP Numbers"
        subHeading="Discover premium VI (Vodafone Idea) prepaid fancy numbers at VIP Number Shop. Secure your preferred VI choice number with attractive discounts. Benefit from future purchasing discounts and exclusive access to limited edition numbers. Make a statement with a VI VIP prepaid number that adds a touch of uniqueness to your communication."
        subHeading1=""
        subHeading12=""
        subHeading2=""
      />
      <CityHowGetVipNumber
        headingPart1="How to get"
        headingPart2="Prepaid VIP Mobile Number"
        headingPart3="?"
      />
      <PreImageWithText
        image={`${panelImg}/assets/img/vip-images/download_lcbynz.png`}
        heading="Enjoy Exclusive Offers and Rewards on Your Purchase"
        subHeading="When you shop prepaid VIP mobile numbers with us, you get some extra perks! Enjoy special offers and rewards, like discounts on future purchases and access to limited edition items. It's our way of saying thanks for choosing us. Your purchase comes with a little something extra, just for you!"
        subHeading1=""
        subHeading12=""
        subHeading2=""
        PrebtnVip={user?.token ? "Suggestions" : "Register Now"}
        onClick={() => {
          !user?.token && setRedirectTo("/suggestion-for-you");
          !user?.token && setActiveSignInWithOtp(true);
          user?.token && Router.push("/suggestion-for-you");
        }}
      />
      <PreImageWithText
        image={`${panelImg}/assets/img/vip-images/download_iveffc.png`}
        heading="Buy Any Prepaid VIP Number Online Over In India"
        subHeading="Explore a wide selection of prepaid VIP numbers online in India at your convenience. From Airtel and BSNL to Jio, Idea, and VI, find unique combinations that suit your style. Enjoy the ease of online purchase, securing your preferred VIP number hassle-free and adding a personalized touch to your communication."
        subHeading1=""
        subHeading12=""
        subHeading2=""
        style={columnDirection}
        PrebtnVip="Search your VIP Number"
        onClick={() => Router.push("/search-your-number")}
      />
      <OurCustomers />
      <FAQs />
      <QRVipApp />
    </div>
  );
};

export default VipPrepaidNumber;
