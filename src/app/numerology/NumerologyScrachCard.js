"use client";
import React, { useContext } from "react";
import "./Numerology.css";
import NumerologyBtn from "./NumerologyBtn";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Link from "next/link";
const NumerologyScrachCard = () => {
  const { setNumerologyPop, user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const handleOpen = () => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "Numurology");
    } else {
      setNumerologyPop(true);
      localStorage.setItem("Lead-Page", "Numurology");
    }
  };
  return (
    <div className="ScrachCard-section-os bg-secondary py-6">
      <div className="container-os">
        <div className="ScrachCard-page-bg ph_banner">
          {/* <Image
            src={`${panelImg}/assets/img/vip-images/ph_price_nqu3vb.webp`}
            className="show_only_ph"
            width={300}
            height={100}
            priority="true"
            alt="scrach card"
          /> */}
          <div className="banner-description">
            <h2 className="text-secondary mb-3">
              Get ₹1500 Cashback <br /> in Your Wallet
            </h2>
            <p>
              Cashback can be used to buy <br /> VIP MOBILE Number from <br />{" "}
             <Link href="/" className="text-secondary">VIP NUMBER SHOP</Link>  only
            </p>
            <p className=" border-b border-b-white m-auto w-fit pt-2">Valid for next 30 days</p>
            <div className="valid_btn">
              <NumerologyBtn
                title="Know Your Lucky Mobile Number Now"
                working="1999"
                onClick={handleOpen}
                secondary={true}
              />
            </div>
          </div>
          <div className="banner-price">
            <h2>₹1999/-</h2>
            <h3 className="text-secondary mt-8 text-center">Get ₹1500 Cashback</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyScrachCard;
