import React, { useContext } from "react";
import NumerologyBtn from "./NumerologyBtn";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const NumerologyReportDetail = () => {
  const { user, setNumerologyPop } = useContext(AppStateContext);
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
    <div className="bg-secondary text-center py-12 px-4 relative">
      {/* Header with underline background */}
      <h2 className="text-3xl font-bold 2xl:text-[38px] text-black relative inline-block mb-3">
        <span className="relative z-10">
          Pythagorean Western System  <br />
          <span className="inline-block bg-[url('/assets/1922.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Numerology Report
          </span>
        </span>
        {/* Background image underline */}
      </h2>

      {/* Description Text */}
      <p className="max-w-xl mx-auto text-sm md:text-base text-black  p-2">
        Get a personalized numerology report based on your date of birth and zodiac sign. Discover your life's purpose, strengths, challenges, plus your Lucky Number and Lucky Color!
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <NumerologyBtn title="Numerology Report Options" onClick={handleOpen} />
      </div>
    </div>
  );
};

export default NumerologyReportDetail;
