import Link from "next/link";
import React from "react";
import MainHeading from "../Shared/MainHeading/MainHeading";
import "../home/Home.css";
const NumurologySub = ({user,setActiveSignInWithOtp,setNumerologyPop}) => {
  return (
    <div>
      <div className="container-os">
        <div className="home-row-rs grid lg:grid-cols-2 grid-cols-1 gap-5 border-[2px] rounded-md items-center p-6  border-primary">
          <div className="">
            <MainHeading MainHeading="Get Personalized Numerology Report" />
            <a onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Numurology");
                } else {
                  setNumerologyPop(true);
                  localStorage.setItem("Lead-Page", "Numurology");
                }
              }}>
              Pay 1,999 For Numerology Report
            </a>
            <p>Pay 1,999 and Get 1,500 Cashback with your Numerology Report.</p>
            <p style={{ fontSize: "16px", color: "#000" }}>
              Cashback can be used only on{" "}
              <span
                className="block-vip desktop-only"
                style={{ color: " var(--primary) " }}
              >
                www.vip<span style={{ color: "#EF6B19" }}>number</span>
                shop.com
              </span>
              {/* block  show */}
            </p>
            <p
              className="block-not mobile-only"
              style={{ color: " var(--primary) " }}
            >
              www.vip<span style={{ color: "#EF6B19" }}>number</span>
              shop.com
            </p>
          </div>
          <div>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-3 subcategory-num-data">
              <Link href="/search-results?searchBy=price&min_price=1500&max_price=900000&callCount=0&comingsoon=yes&star_status=true">
                <button
                  className="button-Name-rs"
                  aria-label="Vip Number Store"
                >
                  Vip Number Store
                </button>
              </Link>
              <Link href="/qr-stands">
                <button
                  className="button-Name-rs"
                  aria-label="QR-Stand for your Business"
                >
                  QR-Stand for your Business
                </button>
              </Link>
              <Link href="/search-results?type=advanced&not_contain=2%2C4%2C8&callCount=0&searchBy=digit&comingsoon=yes&star_status=true">
                <button
                  className="button-Name-rs"
                  aria-label="Numerology Numbers"
                >
                  Numerology Numbers
                </button>
              </Link>
              <Link href="/sell-mobile-number">
                <button
                  className="button-Name-rs"
                  aria-label="Sell Your Number"
                >
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
                  className="button-Name-rs"
                  aria-label="Business With Us"
                >
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
                  className="button-Name-rs"
                  aria-label="Mobile Numerology Report"
                >
                  Numerology Report
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumurologySub;
