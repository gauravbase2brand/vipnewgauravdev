import React, { useContext } from "react";
import "./Numerology.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import NumerologyBtn from "./NumerologyBtn";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
const NumerologyLead = ({ title1, para1, title, titleClass }) => {
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
    <section className={`md:p-8 p-3`}>
      <div className="container-os">
        <div className="space-y-2">
          <h2
            className={`font-semibold text-[20px] lg:leading-[40px] leading-[28px] text-[#3D3D3D]  md:text-[32px] lg:text-[35px] text-center xl:w-9/12 md:w-9/12 w-full m-auto 2xl:text-[38px] tracking-wide  ${titleClass}`}
          >
            {title1}
          </h2>

          <p className="font-normal text-[16px] leading-[24px]  md:text-[17px] md:leading-[30px] text-darktext text-center">
            {para1}
          </p>
          <div className="flex justify-center">
            <NumerologyBtn title={title} onClick={handleOpen} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumerologyLead;
