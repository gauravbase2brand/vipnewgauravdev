import React, { useState, useEffect, useContext } from "react";
  // Import context hook
import Link from "next/link";
import Image from "next/image";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import InfluncerModal from "./InfluncerModal";
import InfluncerLink from "./InfluncerLink";

const InflunderHeader = () => {
  const { setPopupModal} = useContext(AppStateContext);
  // Access the context method to change modal state
  const [scrolling, setScrolling] = useState(false);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyNowClick = () => {
    setPopupModal(true);  // Open modal when button is clicked
  };

  return (
    <div className="px-3">
      <div
        className={`flex justify-between items-center p-4 fixed left-0 right-0 z-50 transition-all duration-300 ${scrolling ? "bg-whitetext top-0" : "bg-transparent top-[20px] container-os"}`}
        // style={!scrolling ? { background: "none" } : {}}
      >
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              className="md:w-full w-2/3 max-w-[300px] sm:h-[60px] md:max-w-[300px] lg:h-[60px] object-contain transition-all duration-300"
              src={`${panelImg}/assets/img/vip-images/${scrolling ? "VIP-logo-1_kjdd2v.webp" : "VIP-logo-1_kjdd2v.webp"}`}
              alt="brand"
              width={300}
              height={60}  // Ensures fixed height
              priority
            />
          </Link>
        </div>

        {/* Apply Now Button */}
        {/* <button
          className=""
          onClick={()=>handleApplyNowClick()}  // Open modal on click
        >
          Apply Now
        </button> */}
        <InfluncerLink title="Apply Now" buttonColor="bg-white text-black md:py-3 md:px-4 md:p-[10px] p-[10px] rounded-full border flex justify-center items-center text-[14px]" hide="hide-link"/>
      </div>
      <InfluncerModal/>
    </div>
  );
};

export default InflunderHeader;
