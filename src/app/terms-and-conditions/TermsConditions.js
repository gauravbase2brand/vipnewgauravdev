"use client";
import React, { useContext } from "react";
import TermsConditionAccordion from "./TermsConditionAccordion/TermsConditionAccordion";
import "./TermsConditions.css";
import RegisterVipNumber from "../home/RegisterVipNumber/RegisterVipNumber";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Image from "next/image";
import { ResponsiveFooter } from "../ResponsiveModule";
const TermsConditions = () => {
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="TermsConditions-page-os">
      <section className="TermsConditions-section-os">
        <div className="main-terms-condition-ud">
          <div className="container-os">
            <div className="terms-text-heading-ud">
              <span>
                <h1>Terms & Conditions</h1>
                <Image
                  src={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
                  alt="Terms & Conditions"
                  width={300}
                  height={100}
                  priority="true"
                />
              </span>
              <p>Terms & Conditions</p>
            </div>
            <TermsConditionAccordion />
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default TermsConditions;
