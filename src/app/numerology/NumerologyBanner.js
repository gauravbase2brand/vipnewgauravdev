"use client";
import React, { useContext } from "react";
import "./Numerology.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import Image from "next/image";
import numerlogycircle from "../../../public/assets/numerlogycircle.png";
import numer1numerology from "../../../public/assets/numer1numerology.svg";
import numer2numerology from "../../../public/assets/numer2numerology.svg";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const NumerologyBanner = () => {
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
    // <div className="bg-cover bg-no-repeat bg-right lg:px-20 lg:py-20 px-4 py-10 bg-[url('/assets/nemorilogyreport.webp')] relative overflow-hidden">
    //   <div className="absolute left-[-140px] animate-custom-spin">
    //     <Image
    //       className="lg:w-auto w-[18rem]"
    //       src={numerlogycircle}
    //       alt="numerlogycircle"
    //     />
    //   </div>
    //   <div className="absolute right-[-140px] animate-custom-spin">
    //     <Image
    //       className="lg:w-auto w-[18rem] top-40 "
    //       src={numerlogycircle}
    //       alt="numerlogycircle"
    //     />
    //   </div>

    //   <div className="text-center">
    //     <h1 className="font-bold text-white lg:text-[40px] pb-4 md:text-[40px] text-[32px] md:leading-[50px] lg:leading-[50px]">
    //     Transform Your Life with
    //     </h1>

    //     <div className="text-center text-darktext 2xl:w-7/12 xl:w-3/4  m-auto flex justify-center gap-3 bg-secondary border-[2px] border-whitetext rotate-[-1deg] items-center px-4 py-2 sm:px-6 sm:py-3">
    //       <Image
    //         className="lg:w-20 md:w-16 w-12 animate-spin"
    //         src={numer1numerology}
    //         alt="numer1numerology"
    //       />
    //       <h2 className="font-bold xl:text-[55px] lg:text-[44px] md:text-[24px] text-[21px] xl:leading-[60px]">
    //       Numerology-Based
    //       </h2>
    //       <Image
    //         className="lg:w-20 md:w-16 w-12 animate-spin"
    //         src={numer2numerology}
    //         alt="numer2numerology"
    //       />
    //     </div>

    //     <h3 className="font-bold text-white lg:text-[40px] md:text-[40px] text-[32px] md:leading-[50px] lg:leading-[50px] lg:my-3">
    //       Mobile Numbers
    //     </h3>
    //     <p className="text-secondary text-sm md:text-xl lg:my-3  text-center">
    //     Affordable and flexible payment plans for you

    //     </p>

    //     <div className="flex justify-center flex-col gap-2 align-middle items-center text-whitetext mt-3">

    //       <button
    //         onClick={handleOpen}
    //         aria-label="Pay 1,999 For Numerology Report"
    //         className="text-[16px] leading-[20px] text-center text-darktext font-normal bg-secondary rounded-[9px] flex items-center justify-center gap-3 no-underline lg:px-6 lg:py-4 px-4 py-3 w-max "
    //       >
    //         Pay 1,999 For Numerology Report
    //       </button>

    //       <span className=" flex flex-col">
    //         <p className="mb-2 text-center font-medium md:text-[18px] text-[15px]">
    //           Get <span className=" text-secondary">1,500 </span>
    //           Cashback with your Numerology Report.
    //         </p>
    //         <p className=" mb-2 text-center font-medium md:text-[18px] text-[15px]">  Cashback valid for 30 days only.</p>
    //         <p className="mb-2 text-center font-medium md:text-[18px] text-[15px]">
    //           Cashback can be used only on www.vip
    //           <span className=" text-secondary">number</span>
    //           shop.com
    //         </p>
    //       </span>
    //     </div>
    //   </div>
    //   <style jsx>{`
    //     @keyframes custom-spin {
    //       0% {
    //         transform: rotate(0deg);
    //       }
    //       100% {
    //         transform: rotate(360deg);
    //       }
    //     }

    //     .animate-custom-spin {
    //       animation: custom-spin 5s linear infinite; /* Adjust 5s for speed control */
    //     }
    //   `}</style>
    // </div>
    <div
      className={`bg-[url("/assets/nimrologyaph.webp")] md:bg-[url("/assets/numerologybanner.webp")] bg-cover bg-no-repeat bg-center 
              w-full h-[70vh] md:h-[400px] lg:h-[400px] xl:h-[85vh] 2xl:h-[85vh] relative overflow-hidden`}
    >
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
    </div>
  );
};

export default NumerologyBanner;
