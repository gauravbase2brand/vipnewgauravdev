import { MdOutlineCall } from "react-icons/md";

import { IoShareSocialOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import React from "react";
import Avatar from "react-avatar";
import LogoutModal from "../LogoutModal/LogoutModal";
import OutsideClickHandler from "react-outside-click-handler";
import CallUsPopup from "../CallUsPopup/CallUsPopup";
import WalletPopup from "../WalletPopup/WalletPopup";
import { RWebShare } from "react-web-share";
const HeaderLinks = ({
  getName,
  navigate,
  firstname,
  lastname,
  setActiveSignInWithOtp,
  showConfirmationModal,
  handleCancelLogout,
  handleConfirmLogout,
  setDesktopContactPopup,
  desktopContactPopup,
  setFetchData,
  data,
  setRedirectTo,
  cartItems,
  cartAnimation,
  user,
  storedCartCacheSavedData,
  wishListItem,
  setActiveWalletMenu,
  activeWalletMenu,
  total,
  wBalance,
  currentUrl,
}) => {
  return (
    <>
      <div className=" flex items-center gap-1">
        <div className="login-account-login-data-os">
          <div className="login-account-name-os">
            {getName() ? (
              <Link
                href={getName() ? "/profile" : "#"}
                className="loggedIn-data-os"
                onClick={() => {
                  if (getName()) {
                    navigate.push("/profile");
                  }
                }}
              >
                <div className="loggedIn-name-os">
                  <span className="text-darktext">{getName()}</span>
                </div>
                {firstname || lastname ? (
                  <div className="login-account-image-os">
                    <Avatar
                      size="36"
                      round={true}
                      className="avatar-image"
                      {...(getName() === "- "
                        ? { facebookId: "100008343750912" }
                        : { name: getName() })}
                    />
                  </div>
                ) : (
                  <div className="login-account-image-os">
                    <Avatar
                      facebookId="100008343750912"
                      size="36"
                      round={true}
                      className="avatar-image"
                    />
                  </div>
                )}
              </Link>
            ) : (
              <div className="relative group">
                <span
                  onClick={() => {
                    setActiveSignInWithOtp(true);
                    localStorage.setItem("Lead-Page", "Login");
                  }}
                  className="cursor-pointer text-primary border rounded border-primary p-1  font-medium uppercase text-sm  hover:bg-gray-100 "
                >
                  Login
                </span>

                <div className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-bottom w-[170px] top-[38px]">
                  Click to login with OTP
                </div>
              </div>
            )}
          </div>
          {getName() && (
            <div className="GoogleHeader-login-account-os">
              <LogoutModal
                showConfirmationModal={showConfirmationModal}
                handleCancelLogout={handleCancelLogout}
                handleConfirmLogout={handleConfirmLogout}
              />
            </div>
          )}
        </div>

        <span className="header-call-us-button-os relative top-1">
          <OutsideClickHandler
            onOutsideClick={() => {
              setDesktopContactPopup(false);
            }}
          >
            <button
              className="call-us-button-os"
              onClick={() => {
                setDesktopContactPopup(!desktopContactPopup);
                if (!desktopContactPopup) {
                  setFetchData(true);
                }
              }}
              aria-label="call-us"
            >
              <div className="p-[5px] rounded-full border-[2px] border-primary">
                <MdOutlineCall
                  style={{ color: "var(--primary)" }}
                  fontSize="30px"
                />
              </div>
            </button>
            {desktopContactPopup && (
              <div
                className={`MobileHeader-contact-us-pop-os ${desktopContactPopup}`}
              >
                {data && <CallUsPopup contactData={data} />}
              </div>
            )}
          </OutsideClickHandler>
        </span>

        <button
          type="button"
          onClick={() => {
            if (getName()) {
              navigate.push("/details");
            } else {
              setActiveSignInWithOtp(true);
              setRedirectTo("/details");
              localStorage.setItem("Lead-Page", "cart");
            }
            const trackingData = {
              event: "view_item_list", // Custom event name for GTM
              items: cartItems,
              page_location: window.location.href,
              page_referrer: "https://www.vipnumbershop.com/",
              page_title: document.title,
              currency: "INR",
              value: cartItems.map((item) => item?.unit_price),
            };
            // Push the structured data to the dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(trackingData);
          }}
          className={`header-cart-os animation relative ${
            cartAnimation === "buyNow-os" ? "shake" : ""
          }`}
          aria-label="view_item_list"
        >
          <span className="cart-tooltip-os">Cart</span>
          {/* <span className=" absolute rounded-full text-white text-xs p-2 top-[-4px] right-0 flex items-center justify-center bg-primary h-[10px] w-[10px] ">
            {user?.token
              ? cartItems?.length || 0
              : storedCartCacheSavedData?.length || 0}
          </span> */}
          {/* gk change */}
          <span className="absolute rounded-full text-white text-xs p-2 top-[-4px] right-0 flex items-center justify-center bg-primary h-[10px] w-[10px]">
            {(() => {
              const count = user?.token
                ? cartItems?.length || 0
                : storedCartCacheSavedData?.length || 0;
              return count > 9 ? "9+" : count;
            })()}
          </span>
          <span className="p-[5px] rounded-full border-[2px] border-primary">
            <BsCart2 style={{ color: "var(--primary)" }} fontSize="30px" />
          </span>
        </button>
        <button
          type="button"
          className={`header-login-add-favourite-os animation ${
            cartAnimation === "wishlist-os" ? "shake" : ""
          }`}
          onClick={() => {
            if (getName()) {
              navigate.push("/wishlist");
            } else {
              setActiveSignInWithOtp(true);
              setRedirectTo("/wishlist");
              localStorage.setItem("Lead-Page", "Wishlist");
            }
          }}
          aria-label="wishlist"
        >
          <span className="cart-wishlist-os">Wishlist</span>
          <span className=" absolute rounded-full text-white text-xs p-2 top-1 right-0 flex items-center justify-center bg-primary h-[10px] w-[10px] ">
            {/* {wishListItem?.length || 0} */}
            {wishListItem?.length > 9 ? "9+" : wishListItem?.length || 0}
          </span>
          <span className="p-[5px] rounded-full border-[2px] border-primary">
            <MdOutlineFavoriteBorder
              style={{ color: "var(--primary)" }}
              fontSize="30px"
            />
          </span>
        </button>

        <OutsideClickHandler
          onOutsideClick={() => {
            setActiveWalletMenu(false);
          }}
        >
          <button
            type="button"
            style={{ borderStyle: "none" }}
            onClick={() => {
              if (getName()) {
                setActiveWalletMenu(!activeWalletMenu);
              } else {
                setActiveSignInWithOtp(true);
                setRedirectTo("/wallet");
                localStorage.setItem("Lead-Page", "Wallet");
              }
            }}
            className="header-login-wallet-os"
            aria-label="WalletMenu"
          >
            <span className="p-[5px] rounded-full border-[2px] border-primary">
              <IoWalletOutline
                style={{ color: "var(--primary)" }}
                fontSize="30px"
              />
            </span>
          </button>

          {/* Wallet dropdown */}
          {activeWalletMenu && (
            <div className="header-login-wallet-dropdown-os">
              <WalletPopup
                total={parseFloat(total).toLocaleString("en-IN")}
                wBalance={wBalance || 0}
                closePopup={setActiveWalletMenu}
              />
            </div>
          )}
        </OutsideClickHandler>
        <RWebShare
          data={{
            url: currentUrl,
            title: "vipnumbershop",
          }}
        >
          <button
            type="button"
            className="header-login-add-favourite-os animation"
            aria-label="Share"
          >
            <span className="cart-wishlist-os">Share</span>
            <span className="p-[5px] rounded-full border-[2px] border-primary">
              <IoShareSocialOutline
                style={{ color: "var(--primary)" }}
                fontSize="30px"
              />
            </span>
          </button>
        </RWebShare>
      </div>
    </>
  );
};

export default HeaderLinks;
