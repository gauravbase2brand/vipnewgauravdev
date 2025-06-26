"use client";
import React, { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { RWebShare } from "react-web-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const InfluncerLink = ({ title, buttonColor, hide, border }) => {
  const { setDiscountPop, user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const userData = localStorage.getItem("vipcre");
  const parsonData = JSON.parse(userData);
  const [copied, setCopied] = useState(false);
  const my_refer_id = localStorage.getItem("my_refer_id");
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://www.vipnumbershop.com/refer/${my_refer_id}`)
      .then(() => {
        setCopied(true);
      });
  };
  return (
    <section className="">
      <div className="space-y-6 md:block">
        {parsonData &&
        parsonData?.user?.email !== "" &&
        user?.token &&
        my_refer_id ? (
          <>
            {hide !== "hide-link" && (
              <div className="flex gap-2 justify-start mt-2">
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
                    className={`col-span-2 text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:focus:ring-blue-800 items-center inline-flex justify-center  ${border}`}
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
                          className="w-4 h-4"
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
                        color: "var(--secondary)",
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </button>
                </RWebShare>
              </div>
            )}
          </>
        ) : (
          <button
            className={buttonColor}
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
            {title}
          </button>
        )}
      </div>
    </section>
  );
};

export default InfluncerLink;
