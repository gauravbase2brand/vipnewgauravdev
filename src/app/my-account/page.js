"use client";
import React, { useContext, useState, useEffect } from "react";
import "./MyAccount.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import LogoutModal from "../Shared/LogoutModal/LogoutModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const MyAccount = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { logout, user, userProfile, setCartCacheData, setCartCache } =
    useContext(AppStateContext);
  const { email, firstname, lastname, mobile } = user?.user || {};
  const Router = useRouter();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const getNameAndContact = () => {
    if (firstname || lastname) {
      return `${firstname || ""} ${lastname || ""} `;
    } else if(mobile) {
      return firstname || false;
    }
  };

  //Logout Pop up menu
  const handleLogout = () => {
    setShowConfirmationModal(true);
  };
  const handleConfirmLogout = () => {
    logout();
    setShowConfirmationModal(false);
    Router.push("/");
    localStorage.setItem("cartCacheSavedData", JSON.stringify([]));
    localStorage.setItem("cartCacheNumber", JSON.stringify(""));
    setCartCache("");
    setCartCacheData([]);
  };
  const handleCancelLogout = () => {
    setShowConfirmationModal(false);
  };
  return (
    <div className="MyAccount-page-os">
      <section className="MobileProfileData-section-os">
        <div className="MobileProfileData-heading-os">My Account</div>
        <div className="MobileProfileData-main-row-os">
          <div className="MobileProfileData-col-1-os">
            <div className="MobileProfileData-profile-row-1-os">
              <div className="container-os">
                <div className="MobileProfileData-profile-data-col-1-os">
                  <div className="MobileProfileData-profile-name-data-os">
                    <div className="MobileProfileData-profile-img-os">
                      <Image
                        src={`${panelImg}/assets/img/vip-images/mobile-profile-image_ff44fp.webp`}
                        alt="My Account"
                        width={100}
                        height={100}
                        priority="true"
                      />
                    </div>
                    {getNameAndContact() ? (
                      <div className="MobileProfileData-profile-name-os">
                        <h3>{getNameAndContact()}</h3>
                        {email && <span>{email}</span>}
                        {mobile && <span>{mobile}</span>}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="MobileProfileData-profile-data-col-2-os">
                  <div className="MobileProfileData-location-address-os">
                    <span>
                      <svg
                        width="19"
                        height="22"
                        viewBox="0 0 19 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.62244 12.4299C10.0322 12.4299 10.4379 12.3492 10.8164 12.1924C11.1949 12.0357 11.5389 11.8058 11.8286 11.5161C12.1183 11.2264 12.3482 10.8824 12.5049 10.5039C12.6617 10.1254 12.7424 9.71967 12.7424 9.30994C12.7424 8.90022 12.6617 8.49451 12.5049 8.11597C12.3482 7.73743 12.1183 7.39349 11.8286 7.10377C11.5389 6.81405 11.1949 6.58423 10.8164 6.42744C10.4379 6.27064 10.0322 6.18994 9.62244 6.18994C8.79497 6.18994 8.00138 6.51865 7.41627 7.10377C6.83115 7.68888 6.50244 8.48247 6.50244 9.30994C6.50244 10.1374 6.83115 10.931 7.41627 11.5161C8.00138 12.1012 8.79497 12.4299 9.62244 12.4299Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M1.24276 7.49C3.21276 -1.17 16.0428 -1.16 18.0028 7.5C19.1528 12.58 15.9928 16.88 13.2228 19.54C12.2548 20.4735 10.9625 20.9952 9.61776 20.9952C8.273 20.9952 6.98068 20.4735 6.01276 19.54C3.25276 16.88 0.0927559 12.57 1.24276 7.49Z"
                          stroke="black"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </span>
                    {userProfile?.address?.address},{userProfile?.address?.city}{" "}
                    {userProfile?.address?.state}
                  </div>
                  <button
                    onClick={() => {
                      Router.push("/profile");
                    }}
                    aria-label="Change"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="MobileProfileData-profile-row-2-os">
              <div className="container-os">
                <Link href="/profile">
                  <p>
                    <span>
                      <Image
                        src={`${panelImg}/assets/img/vip-images/myaccount-icon-3_guu95q.webp`}
                        alt="wallet"
                        width={16}
                        height={12}
                        priority="true"
                      />
                    </span>
                    My Profile
                  </p>
                </Link>
                <Link href="/details">
                  <p>
                    <span>
                      <Image
                        src={`${panelImg}/assets/img/vip-images/myaccount-icon-1_mo1gyb.webp`}
                        alt="Cart"
                        width={14}
                        height={13}
                        priority="true"
                      />
                    </span>
                    Cart
                  </p>
                </Link>
                <Link href="/wishlist">
                  <p>
                    <span>
                      <Image
                        src={`${panelImg}/assets/img/vip-images/myaccount-icon-5_uhc7ym.webp`}
                        alt="Wishlist"
                        width={14}
                        height={16}
                        priority="true"
                      />
                    </span>
                    Wishlist
                  </p>
                </Link>
                <Link href="/wallet">
                  <p>
                    <span>
                      <Image
                        src={`${panelImg}/assets/img/vip-images/myaccount-icon-2_bldrym.webp`}
                        alt="Withdrawn Money"
                        width={16}
                        height={14}
                        priority="true"
                      />
                    </span>
                    Wallet
                  </p>
                </Link>
                <Link href="" onClick={handleLogout}>
                  <p>
                    <span>
                      <Image
                        src={`${panelImg}/assets/img/vip-images/myaccount-icon-8_hmsqcf.webp`}
                        alt="Logout"
                        width={17}
                        height={16}
                        priority="true"
                      />
                    </span>
                    Logout
                  </p>
                </Link>
                {/* The confirmation modal */}
                <LogoutModal
                  showConfirmationModal={showConfirmationModal}
                  handleCancelLogout={handleCancelLogout}
                  handleConfirmLogout={handleConfirmLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
