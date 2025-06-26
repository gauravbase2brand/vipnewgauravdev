"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { RiSubtractFill } from "react-icons/ri";
import CityHowGetVipNumber from "../Shared/City/CityHowGetVipNumber/CityHowGetVipNumber";
import { IoMdAdd } from "react-icons/io";
import VipMemberPackage from "../business/VipMemberPackage";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import InflunderHeader from "./InflunderHeader";
import InfluncerBanner from "./InfluncerBanner";
import InfluncerHowItWorks from "./InfluncerHowItWorks";
import InfluncerSuccessStories from "./InfluncerSuccessStories";
import InfluencerTermsConditions from "./InfluencerTermsConditions";
import InfluncerContentcreator from "./InfluncerContentcreator";
import InfluncerReadyToJoin from "./InfluncerReadyToJoin";
import InfluencerFindHere from "./InfluencerFindHere";
import InfluncerLink from "./InfluncerLink";
import InfluncerTrustFactor from "./InfluncerTrustFactor";
import AwardWinner from "../Shared/AwardWinner/AwardWinner/AwardWinner";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className=" w-full bg-white p-4 rounded-lg shadow-md cursor-pointer mb-2 border border-primary md:w-8/12 m-auto transition-transform duration-300">
      <div
        onClick={toggle}
        className="cursor-pointer flex justify-between items-center "
      >
        <h4 className="text-lg font-semibold  text-black">{question}</h4>
        <span className="text-black">
          {isOpen ? <RiSubtractFill /> : <IoMdAdd />}
        </span>
      </div>
      {isOpen && <p className="text-black mt-2">{answer}</p>}
    </div>
  );
};

const InfluencerProgramme = () => {
  const userData = localStorage.getItem("vipcre");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <>
      <InflunderHeader />
      <InfluncerBanner />
      <InfluncerHowItWorks />
      {/* <InfluncerLink /> */}
      {/* <InfluncerSuccessStories /> */}
      <InfluencerTermsConditions />
      <InfluncerContentcreator />
      {/* FAQs Section */}
      <div className="container-os">
        <section className="p-3 mb-4">
          <h2 className="text-2xl font-bold mb-6 md:text-3xl text-black text-center uppercase">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <FAQItem
              question=" Who can join the Influencer Programme?"
              answer="Any Instagram user, YouTuber, or social media influencer with an active account and genuine followers can join."
            />

            <FAQItem
              question=" What is the 3% margin based on?"
              answer="The 3% commission is applied to the price of the VIP number purchased through your referral link."
            />
            <FAQItem
              question=" When do I get paid?"
              answer="Payouts are generally processed at the end of every month. However, if a sale is canceled or refunded, that commission will be adjusted in the next cycle."
            />
            <FAQItem
              question=" Is there a limit to how much I can earn?"
              answer="No, there’s no upper limit! The more sales you refer, the more you earn."
            />
            <FAQItem
              question=" How do I get started?"
              answer={
                <ol className="list-decimal pl-6 space-y-2 text-black">
                  <li>Contact us or sign up on VIPNumberShop.com.</li>
                  <li>Get your unique referral link.</li>
                  <li>Create and share compelling content with the link.</li>
                  <li>Track your sales & earn!</li>
                  <InfluncerLink
                    title="JOIN NOW"
                    buttonColor=" border-1 border-primary text-darktext hover:border-darktext py-2 px-6 rounded-full text- hover:bg-secondary bg-secondary"
                  />
                </ol>
              }
            />
          </div>
        </section>
      </div>
      <InfluncerReadyToJoin />
      <InfluencerFindHere />
      {/* <InfluncerTrustFactor/> */}
      <AwardWinner />
      {/* <div className="container-os">
        <main className="">
          <section className="p-3 mb-4">
            {parsonData && parsonData?.user.email !== "" ? (
              <div className="flex gap-2 justify-center">
                <div className="grid grid-cols-8 gap-2 w-full max-w-[40rem]">
                  <label htmlFor="npm-install" className="sr-only">
                    Label
                  </label>
                  <input
                    id="npm-install"
                    type="text"
                    className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 md:min-w-[30rem] min-w-[15rem]"
                    value={`https://www.vipnumbershop.com/refer/${my_refer_id}`}
                    disabled
                    readOnly
                  />
                  <button
                    onClick={handleCopy}
                    className="col-span-2 text-white bg-primary  hover:bg-secondaryfocus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center"
                  >
                    {copied ? (
                      <div className="inline-flex items-center">
                        <svg
                          className="w-3 h-3 text-white me-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        Copied!
                      </div>
                    ) : (
                      <span id="default-icon">
                        <svg
                          class="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
                <RWebShare
                  data={{
                    // text: "APKA NUMBER, APKI PEHCHAAN",
                    url: `https://www.vipnumbershop.com/refer/${my_refer_id}`,
                    title: "vipnumbershop",
                  }}
                >
                  <button
                    type="button"
                    className="header-login-add-favourite-os animation"
                    aria-label="Share"
                  >
                    <span className="cart-wishlist-os">Share</span>
                    <FontAwesomeIcon
                      icon={faShare}
                      style={{
                        color: "#691EDE",
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </button>
                </RWebShare>
              </div>
            ) : (
              <button
                className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-3 lg:font-bold p-1 text-[13px] font-medium hover:bg-secondary  hover:text-white "
                onClick={() => {
                  if (!user?.token) {
                setActiveSignInWithOtp(true);
                localStorage.setItem("Lead-Page", "Influencer");
              } else {
                setDiscountPop(true);
                localStorage.setItem("Lead-Page", "Influencer");
              }
                }}
              >
                Sign Up Now
              </button>
            )}
          </section>
        </main>
      </div> */}
    </>
  );
};

export default InfluencerProgramme;
