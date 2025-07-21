import React from "react";
import NumerologyBtn from "./NumerologyBtn";
import Image from "next/image";
import WhatLuckyNumber from "../../../public/assets/MobileNumber.jpg";
import Link from "next/link";
const NumerologyLuckyNumber = ({
  setNumerologyPop,
  user,
  setActiveSignInWithOtp,
}) => {
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
    <>
      <section className="bg-whitetext  lg:py-8 pb-3 ">
        <div className="container-os">
          <div className="grid lg:grid-cols-[2fr_5fr] grid-cols-1 lg:gap-14 gap-2 items-center">
            <div>
              <h2 className="font-semibold text-[26px] lg:leading-[40px] leading-[35px] text-HeadingText  md:text-[32px] lg:text-[35px] 2xl:text-[38px] tracking-wide lg:mb-6 mb-2">
                What is a{" "}
                <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-[#5c469c] font-bold px-2">
                  Lucky
                </span>
                Mobile Number?
              </h2>
              <div>
                {/* <Image className="md:h-[400px] h-[400px] object-[50%_75%] object-cover rounded-lg" src={WhatLuckyNumber}alt="dd"></Image> */}
              </div>
            </div>
            <div>
              <p className="font-normal text-[16px] leading-[24px]  sm:leading-[28px] md:text-[17px] md:leading-[30px] text-darktext  text-left ">
                A lucky mobile number, according to numerology, is a special
                number that's thought to bring good luck. It's calculated using
                your birthdate or other important details. Many people believe
                having a lucky number can bring positive energy, protect them,
                and bring good opportunities their way. People often choose
                lucky mobile numbers for a sense of security and positivity,
                believing they can attract good fortune and ward off negativity.
              </p>
              <div className="mb-4">
                <NumerologyBtn
                  title="Pay 1,999 For Numerology Report"
                  onClick={handleOpen}
                />
              </div>
              {/* <span className="mb-2 text-darktext text-center md:text-[18px] text-[15px]    w-full">
                Get <span className=" text-secondary"> 1,500</span> Cashback
                with your Numerology Report. <br />
                Cashback valid for 30 days only.
              </span> */}
              <span className="mb-2 text-darktext text-center md:text-[18px] text-[15px]    w-full">
                Get <span className="text-primary">1,500 Cashback</span> with
                your Numerology Report.
                <br />
                Cashback valid for 30 days only.
                <br />
                Cashback can be used only on{" "}
                <Link href="/" className="text-primary">
                  www.vipnumbershop.com{" "}
                  <span className="text-black">(For buying a Number)</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NumerologyLuckyNumber;
