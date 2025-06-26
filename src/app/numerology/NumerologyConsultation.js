"use client";
import React, { useContext } from "react";
import NumerologyBtn from "./NumerologyBtn";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const NumerologyConsultation = ({ title }) => {
  const { setNumerologyPop,user } = useContext(AppStateContext);
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
    <section className="bg-[#F9F9F9] py-10">
      <div className="container-os mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-5">
        {/* Left Section: Text Content */}
        <div className="lg:w-3/4 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-black capitalize">
            your Numerology Mobile Number Consultation
          </h2>
          <p className="text-darktext mt-2 md:text-lg">
            Consult with one of our team members to select your Numerology
            mobile number. We’ll assist you in finding the perfect digits
            aligned with your good luck. Take the first step towards getting
            your Numerology mobile number today!
          </p>
        </div>

        {/* Right Section: Button */}
        <NumerologyBtn title={title} onClick={handleOpen} />
      </div>
    </section>
  );
};

export default NumerologyConsultation;
