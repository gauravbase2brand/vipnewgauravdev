import { CiSquareQuestion } from "react-icons/ci";
import { LuPenLine } from "react-icons/lu";
import { LiaUserAstronautSolid } from "react-icons/lia";
import numer1numerology from "../../../../public/assets/numer1numerology.svg";
import { PiHandshake } from "react-icons/pi";
import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFamilyRestroom, MdOutlineSell } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";
import { FaAddressCard, FaRegChartBar } from "react-icons/fa";
import Avatar from "react-avatar";
import Link from "next/link";
import Image from "next/image";
import { IoIosContact } from "react-icons/io";

import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";
import { IoQrCodeSharp } from "react-icons/io5";
const MobileSidebar = ({
  setActiveNavbar,
  activeNavbar,
  firstname,
  lastname,
  getName,
  Router,
  setActiveSignInWithOtp,
  mobileToggleInactive,
  userProfile,
  handleProfileEdit,
  handleMobileLinks,
  setRedirectTo,
  openWhatsApp,
  activeLink,
  setFamilyPackValue,
  familyPackValue,
  setLoaderCat,
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [callCount, setCallCount] = useState(0);
  const handleChangefamilySelect = (e) => {
    setFamilyPackValue(e.target.value);
  };

  //Family Pack
  const familyPackSubmit = (e) => {
    const selectValue = e.target.value;
    e.preventDefault();
    setCallCount(callCount + 1);
    Router.push(
      `/search-results?type=${"family_pack"}&searchBy=${"family_pack"}&fp_total=${selectValue}&callCount=${callCount}`
    );
    setLoaderCat(false);
    mobileToggleInactive();
  };
  return (
    <>
      <section className="MobileHeader-sideNavbar-section-os">
        <OutsideClickHandler
          onOutsideClick={() => {
            setActiveNavbar(false);
          }}
        >
          <div
            className={`fixed top-0 right-0 w-[80%] h-full bg-white z-11 overflow-y-auto flex flex-col justify-between transition-transform duration-500 ${
              activeNavbar ? "translate-x-0 z-[1000]" : "translate-x-full"
            }`}
          >
            <div className="">
              <div className="flex items-center bg-gradient-to-r from-secondary to-primary gap-4 py-4 px-4 relative justify-between">
                {(firstname || lastname) && (
                  <div className="login-account-image-os">
                    <Avatar
                      name={firstname ? firstname : lastname}
                      size="36"
                      round={true}
                      className="avatar-image"
                    />
                  </div>
                )}
                <div
                  className="MobileHeader-sideNavbar-profile-name-os"
                  onClick={() => {
                    if (getName()) {
                      Router.push("/profile");
                    }
                  }}
                >
                  {getName() ? (
                    <div className="MobileHeader-myaccount-profilename-os">
                      {/* <span>My Account,</span> */}
                      <span className="capitalize">Hello {getName()}</span>
                    </div>
                  ) : (
                    <span
                      onClick={() => {
                        setActiveSignInWithOtp(true);
                      }}
                      className="relative inline-flex items-center pr-12 pl-3  py-[8px] overflow-hidden text-lg font-medium text-[white] border-2 border-[white] rounded-[10px] hover:text-white group hover:bg-gray-50"
                    >
                      <span className="absolute left-0 block w-full h-0 transition-all   opacity-100 group-hover:h-full top-1/2 "></span>
                      <span className="absolute right-0 flex items-center justify-start w-10 h-10">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span className="relative text-sm">Login</span>
                    </span>
                  )}
                </div>
                <div
                  onClick={mobileToggleInactive}
                  className="relative inline-block w-8 h-8 cursor-pointer top-[15px]"
                >
                  <span className="absolute block w-[70%] h-0.5 bg-white transform transition-transform duration-300 rotate-45"></span>
                  <span className="absolute block  w-[70%] h-0.5 bg-white transform transition-transform duration-300 -rotate-45"></span>
                </div>
              </div>
              <div className="p-4">
                <div
                  className="flex justify-between pb-3 gap-3 "
                  onClick={handleProfileEdit}
                >
                  <div className="flex items-center gap-4">
                    {/* <Image
                      className="w-6 h-8"
                      width={20}
                      height={30}
                      src={googlelocation}
                      alt="google location"
                    /> */}
                    <FaAddressCard fontSize={35} color=" var(--primary) " />

                    {!userProfile?.address?.address ? (
                      <p>Address:-</p>
                    ) : (
                      <p className="capitalize">
                        {`${userProfile?.address?.address}  ${userProfile?.address?.city}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleProfileEdit}
                    className="MobileHeader-sideNavbar-profile-location-col-2-os"
                    aria-label="Profile"
                  >
                    <span>
                      <LuPenLine fontSize={20} color=" var(--primary) " />
                    </span>
                  </button>
                </div>

                <ul className=" flex flex-col gap-3">
                  <li>
                    <Link
                      className=" font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/"
                      onClick={mobileToggleInactive}
                    >
                      <GoHome fontSize={30} color="var(--primary)" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/numerology"
                      onClick={() => {
                        mobileToggleInactive();
                        localStorage.setItem("Lead-Page", "Numurology");
                      }}
                    >
                      <span className="flex items-center  h-[35px] w-[35px]">
                        <span
                          className="animate-spin"
                          style={{ animationDuration: "1s" }}
                        >
                          <Image
                            className="lg:w-20 md:w-16 w-12"
                            src={numer1numerology}
                            alt="numer1numerology"
                          />
                        </span>
                      </span>
                      Numerology Report
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/business"
                      onClick={() => {
                        mobileToggleInactive();
                        localStorage.setItem("Lead-Page", "Business");
                      }}
                    >
                      <span className="flex items-center  h-[35px] w-[35px]">
                        <PiHandshake fontSize={35} color=" var(--primary) " />
                      </span>
                      Business With Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/sell-mobile-number"
                      onClick={mobileToggleInactive}
                    >
                      <MdOutlineSell fontSize={30} color=" var(--primary)" />
                      Sell Your Number
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/press-news"
                      onClick={mobileToggleInactive}
                    >
                      <FaRegChartBar fontSize={30} color=" var(--primary) " />
                      Press News
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/influencer"
                      onClick={mobileToggleInactive}
                    >
                      <LiaUserAstronautSolid
                        fontSize={30}
                        color=" var(--primary)"
                      />
                      Influencer Program
                    </Link>
                  </li>
                  <div className="">
                    <div
                      onClick={() => handleMobileLinks("link-1")}
                      className={activeLink === "link-1" ? "" : ""}
                    >
                      <div
                        className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                        onClick={() => {
                          if (getName()) {
                            Router.push("/my-account");
                            setActiveNavbar(false);
                          } else {
                            setActiveSignInWithOtp(true);
                            setRedirectTo("/my-account");
                          }
                        }}
                      >
                        <VscAccount fontSize={30} color="var(--primary)" />
                        My Account
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => handleMobileLinks("link-2")}
                    className={
                      activeLink === "link-2"
                        ? "MobileHeader-sideNavbar-myAccount-links-data-row-os open-links-os"
                        : "MobileHeader-sideNavbar-myAccount-links-data-row-os"
                    }
                  >
                    <div className="MobileHeader-sideNavbar-myAccount-links-row-os">
                      <div className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative">
                        <span className="flex items-center  h-[35px] w-[35px]">
                          <CiSquareQuestion
                            fontSize={35}
                            color=" var(--primary) "
                          />
                        </span>
                        FAQs
                      </div>
                      <div className="MobileHeader-sideNavbar-myAccount-links-col-2-os">
                        <span className="hamburger-line-1"></span>
                        <span className="hamburger-line-2"></span>
                      </div>
                    </div>
                    <ul
                      className={
                        activeLink === "link-2"
                          ? "MobileHeader-sideNavbar-myAccount-subLinks-os active"
                          : "MobileHeader-sideNavbar-myAccount-subLinks-os"
                      }
                    >
                      <li>
                        <Link
                          className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                          href="/about"
                          onClick={mobileToggleInactive}
                        >
                          {/* <HiUserGroup fontSize={20} color=" var(--primary) " /> */}
                          About Us
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                          href="/why-choose-us"
                          onClick={mobileToggleInactive}
                        >
                          {/* <TbUserQuestion fontSize={20} color=" var(--primary) " /> */}
                          Why Choose Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                          href="/faq"
                          onClick={mobileToggleInactive}
                        >
                          {/* <FaQ fontSize={20} color=" var(--primary) " /> */}
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                          href="/privacy-policy"
                          onClick={mobileToggleInactive}
                        >
                          {/* <MdOutlinePrivacyTip fontSize={20} color=" var(--primary) " /> */}
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                          href="/terms-and-conditions"
                          onClick={mobileToggleInactive}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/refund-policy"
                          onClick={mobileToggleInactive}
                        >
                          Refund Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/press-release"
                      onClick={mobileToggleInactive}
                    >
                      <span className="flex items-center  h-[35px] w-[35px]">
                        <FaRegNewspaper fontSize={35} color=" var(--primary) " />
                      </span>
                      Press release
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/contact"
                      onClick={mobileToggleInactive}
                    >
                      <span className="flex items-center  h-[35px] w-[35px]">
                        <IoIosContact fontSize={35} color=" var(--primary) " />
                      </span>
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative"
                      href="/qr-stands"
                      onClick={mobileToggleInactive}
                    >
                      <span className="flex items-center  h-[35px] w-[35px]">
                        <IoQrCodeSharp fontSize={33} color=" var(--primary) " />
                      </span>
                      Buy QRCode
                    </Link>
                  </li>
                  <li>
                    <Link href="/family-pack" onClick={mobileToggleInactive}>
                      <div className="font-medium text-[16px] leading-[20px] text-[#333333] flex items-center gap-4 no-underline w-full relative">
                        <MdOutlineFamilyRestroom
                          fontSize={30}
                          color=" var(--primary)"
                        />
                        <span>Family Pack</span>
                      </div>
                    </Link>
                    <div>
                      <select
                        onChange={(e) => {
                          handleChangefamilySelect(e);
                          familyPackSubmit(e); // Trigger the submit function
                        }}
                        value={familyPackValue}
                        className="bg-gray-50 border border-primary text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                      >
                        <option value="0">Select</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        {/* 
                        <option value="8">8</option>
                        <option value="9">9</option> */}
                        {/* <option value="10">10</option> */}
                      </select>
                    </div>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div className="MobileHeader-sideNavbar-main-col-2-os">
              <span className="left-icon-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/mobile-navLink-icon7_csjxd1.webp`}
                  alt="mobile icon"
                  width={300}
                  height={100}
                  priority="true"
                />
              </span>
              <div
                className="footer-getInTouch-phone-whats-app-os"
                onClick={openWhatsApp}
              >
                <DaynamicMobileno />
                <div className="whats-app-icon-os" onClick={openWhatsApp}>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/whats-app-icon_ylcdqy.webp`}
                    alt="WhatsApp"
                    width={300}
                    height={100}
                    priority="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </section>
    </>
  );
};

export default MobileSidebar;
