import React, { useContext } from "react";
import "./Numerology.css";
import numerlogycircle from "../../../public/assets/numerlogycircle.webp";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import NumerologyBtn from "./NumerologyBtn";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Image from "next/image";
import Link from "next/link";
const NumerologyLeadReport = ({ title1, para1, title, titleClass }) => {
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
    <section
      className={`lg:p-20 p-5 my-3 bg-[url('/assets/backnumerology.webp')] bg-no-repeat bg-center bg-cover  relative overflow-hidden`}
    >
      <div className="container-os">
        <div className="hidden md:block">
          <div className="bg-cover bg-no-repeat bg-right   ">
            <div className="absolute left-[-140px] animate-custom-spin">
              <Image
                className=" w-[20rem]"
                src={numerlogycircle}
                alt="numerlogycircle"
              />
            </div>
            <div className="absolute right-[-140px] animate-custom-spin">
              <Image
                className="w-[20rem] "
                src={numerlogycircle}
                alt="numerlogycircle"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h2
            className={`font-semibold text-[20px] lg:leading-[40px] leading-[28px] text-[#3D3D3D]  md:text-[32px] lg:text-[35px] text-center xl:w-9/12 md:w-9/12 w-full m-auto tracking-wide  ${titleClass}`}
          >
            {title1}
          </h2>

          <p className="font-normal text-[16px] leading-[24px]  md:text-[17px] md:leading-[30px] text-darktext text-center">
            {para1}
          </p>
          <div className="flex justify-center pb-4">
            <NumerologyBtn title={title} onClick={handleOpen} 
            secondary={true}
            />
          </div>
            <span className="mb-2 text-white text-center md:text-[18px] text-[15px]    w-full">
                Get <span className="text-secondary">1,500 Cashback</span> with
                your Numerology Report.
                <br />
                Cashback valid for 30 days only.
                <br />
                Cashback can be used only on{" "}
                <Link href="/" className="text-secondary">
                  www.vipnumbershop.com{" "}
                  <span className="text-white">(For buying a Number)</span>
                </Link>
              </span>
        </div>
        
      </div>
      <style jsx>{`
        @keyframes custom-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-custom-spin {
          animation: custom-spin 5s linear infinite; /* Adjust 5s for speed control */
        }
      `}</style>
    </section>
  );
};

export default NumerologyLeadReport;
