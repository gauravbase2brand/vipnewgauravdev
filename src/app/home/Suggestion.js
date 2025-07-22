import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import debounce from "lodash/debounce";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Link from "next/link";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import MainHeading from "../Shared/MainHeading/MainHeading";
import ReatedNumber from "../SuggestionNumber/ReatedNumber";
import Image from "next/image";

const Suggestion = () => {
  const { user, setNumerologyPop } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const [showFirstTitle, setShowFirstTitle] = useState(true);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const handleResize = debounce(() => {
      setShowFirstTitle(window.innerWidth <= 600);
    }, 100); // Delay execution by 100ms
    window.addEventListener("resize", handleResize);
    handleResize(); // Run once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container-os cash_back">
        <div className="p-4 bg-white m-2 border-2 border-primary  grid lg:grid-cols-2 rounded-lg lg:gap-7 gap-4 items-center ">
          <div className=" bg-cover bg-no-repeat bg-[url('https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/NumerologyReport_f5o2qk.webp')] h-[220px] rounded-[10px] sm:h-[200px] sm:bg-right md:h-[230px]">
            <div className="of-Numerology">
              <h2 className="p-2.5 px-15 bg-[#ffffffbd] w-fit rounded-t-[20px] text-[32px] text-primary font-roboto font-extrabold">
                1500/- Cashback
              </h2>
            </div>
          </div>
          <div>
            <MainHeading MainHeading="Get Personalized Numerology Report" />
            <button
              onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Numurology");
                } else {
                  setNumerologyPop(true);
                  localStorage.setItem("Lead-Page", "Numurology");
                }
              }}
              className="font-roboto font-bold lg:text-[17px] lg:p-5 p-3 text-[13px] leading-[20px] text-center bg-primary  rounded-[6px] flex items-center justify-center gap-2 w-fit   text-white m-auto"
            >
              Pay 1,999 For Numerology Report
            </button>
            <p className="text-center my-1 lg:text-[18px] text-[13px] ">
              Pay 1,999 and Get 1,500 Cashback with your Numerology Report.
            </p>
            <p
              className="text-center my-1"
              style={{ fontSize: "16px", color: "#000" }}
            >
              Cashback can be used only on{" "}
              <span
                className="block-vip desktop-only"
                style={{ color: " var(--primary) " }}
              >
                www.vip<span style={{ color: "#EF6B19" }}>number</span>
                shop.com
              </span>
            </p>
            <p
              className="block-not mobile-only text-center"
              style={{ color: " var(--primary) " }}
            >
              www.vip<span style={{ color: "#EF6B19" }}>number</span>
              shop.com
            </p>
          </div>
        </div>
      </div>
      {user?.token ? (
        <ReatedNumber />
      ) : (
        <div>
          <div className="flex  justify-center !text-center container-os">
            <MainHeading
              MainHeading="Suggestion For You"
              justifyContent="center"
            />
          </div>
          <div className="grid lg:grid-cols-[3fr_6fr] grid-cols-1 items-center gap-4 w-full   mb-2 container-os">
            <button
              className="relative flex items-center justify-between h-20 lg:w-96 w-full rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-lg px-6"
              onClick={() => setActiveSignInWithOtp(true)}
              aria-label="Suggestions"
            >
              <span>
                {showFirstTitle
                  ? "Login For Suggestions"
                  : "Login For Suggestions"}
              </span>
              {/* <img
                className="w-14 h-14"
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png"
                alt="Handshake"
              /> */}

              <Image
                src={`${panelImg}/assets/img/vip-images/Handshake1-ezgif.com-crop_zhwnmw.png`}
                alt="acroll arrow"
                width={300}
                height={100}
                style={{
                  width: "40px",
                  height: "40px",
                }}
                priority="true"
              />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:gap-5 gap-3 lg:p-4 p-2">
              <Link href="/search-results?searchBy=price&min_price=1500&max_price=900000&callCount=0&comingsoon=yes&star_status=true">
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="Vip Number Store"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                  Vip Number Store
                </button>
              </Link>
              <Link href="/qr-stands">
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="QR-Stand for your Business"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                  QR-Stand for your Business
                </button>
              </Link>
              <Link href="/search-results?type=advanced&not_contain=2%2C4%2C8&callCount=0&searchBy=digit&comingsoon=yes&star_status=true">
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="Numerology Numbers"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                  Numerology Numbers
                </button>
              </Link>
              <Link href="/sell-mobile-number">
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="Sell Your Number"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                  Sell Your Number
                </button>
              </Link>
              <Link
                href="/business"
                onClick={() => {
                  localStorage.setItem("Lead-Page", "Business");
                }}
              >
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="Business With Us"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                  Business With Us
                </button>
              </Link>
              <Link
                href="/numerology"
                onClick={() => {
                  localStorage.setItem("Lead-Page", "Numurology");
                }}
              >
                <button
                  className="relative z-10 w-full h-full rounded-lg overflow-hidden px-4 py-3 font-roboto font-bold  lg:text-base text-[13px] text-primary border-2 border-transparent bg-gradient-to-r from-[#691ede] to-[#ef6b19] hover:opacity-90"
                  aria-label="Mobile Numerology Report"
                >
                  <span className="absolute inset-0 bg-[#ede2fb] z-[-1] rounded-lg"></span>
                 Numerology Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Suggestion;
