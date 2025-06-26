"use client";
import React, { useContext } from "react";
import PdpProduct from "./PdpProduct/PdpProduct";
import RelatedNumber from "./RelatedNumber/RelatedNumber";
import FAQs from "../Shared/FAQs/FAQs";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import FamilyPack from "../home/FamilyPack/FamilyPack";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const ProductDetails = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  return (
    <div className="PDP-page-os">
      <PdpProduct />
      <FamilyPack counter={2} />
      <RelatedNumber />
      <FamilyPack counter={3} />
      <OurCustomers />
      <FamilyPack counter={4} />
      <VideoTestimonial />
      <RegisterVipNumber
        image={`${panelImg}/assets/img/vip-images/assurance-register-img_b3fsuq.webp`}
        heading="Assurance of a refund"
        subHeading="You can get your payment back if we don't meet your expectations with VIP number service. You must first register for it."
        buttonText="Login"
        buttonText1="Login"
        buttonUrl="/register"
        buttonUrl1="/register"
        onClick={setActiveSignInWithOtp}
      />
      <QRVipApp />
      <FAQs />
    </div>
  );
};

export default ProductDetails;
