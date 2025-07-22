import React, { useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import OutsideClickHandler from "react-outside-click-handler";
import WalletPopup from "../WalletPopup/WalletPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ChatBot from "@/app/chat/ChatBot";
import ClientVideo from "@/app/ClientVideo/ClientVideo";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { FcSimCard } from "react-icons/fc";
const MobileFooterRow = ({
  getName,
  setActiveSignInWithOtp,
  setRedirectTo,
  navigate,
  wishListItem,
  isModalVisible,
  setIsModalVisible,
  arrayOfArrays,
  setFooterCat,
  setActiveWalletMenu,
  setMenuBtn,
  activeWalletMenu,
  wBalance,
  total,
  handleOpenMenu,
  menubtn,
  cartItems,
  setDiscountPop,
  voucher,
  user,
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [isModalVis, setIsModalVis] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Handle opening of modal
  const showModal = () => {
    setIsModalVis(true);
  };

  // Handle closing of modal
  const handleCancel = () => {
    setIsModalVis(false);
  };
  const BasicInfo = () => {
    const target = document.getElementById("delivery-video");
    const offset = 12 * 30; // 3rem in pixels (assuming 1rem = 16px)

    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = targetPosition - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
    window.activeVideoId = 3; // Set video ID to open
    window.dispatchEvent(new Event("openInfoVideo"));
  };
  return (
    <div
      className="block bg-white sticky bottom-0 px-4 py-2 shadow-lg z-[99999999999]"
      id="footer-row-hidden"
    >
      <div className="icon_footer relative ">
        <a
          className="cart-icon"
          onClick={() => {
            if (getName()) {
              navigate.push("/details");
            } else {
              setActiveSignInWithOtp(true);
              setRedirectTo("/details");
              localStorage.setItem("Lead-Page", "cart");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
              stroke="#161616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
              stroke="#161616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
              stroke="#161616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="count_number_mb">
            {cartItems?.length > 9 ? "9+" : cartItems?.length}
          </span>
        </a>
        <div className="relative">
          <a
            className="wish_list_ft"
            onClick={() => {
              if (getName()) {
                navigate.push("/wishlist");
              } else {
                setActiveSignInWithOtp(true);
                setRedirectTo("/wishlist");
                localStorage.setItem("Lead-Page", "Wishlist");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.84 4.60987C20.3292 4.09888 19.7228 3.69352 19.0554 3.41696C18.3879 3.14039 17.6725 2.99805 16.95 2.99805C16.2275 2.99805 15.5121 3.14039 14.8446 3.41696C14.1772 3.69352 13.5708 4.09888 13.06 4.60987L12 5.66987L10.94 4.60987C9.9083 3.57818 8.50903 2.99858 7.05 2.99858C5.59096 2.99858 4.19169 3.57818 3.16 4.60987C2.1283 5.64156 1.54871 7.04084 1.54871 8.49987C1.54871 9.95891 2.1283 11.3582 3.16 12.3899L4.22 13.4499L12 21.2299L19.78 13.4499L20.84 12.3899C21.351 11.8791 21.7563 11.2727 22.0329 10.6052C22.3095 9.93777 22.4518 9.22236 22.4518 8.49987C22.4518 7.77738 22.3095 7.06198 22.0329 6.39452C21.7563 5.72706 21.351 5.12063 20.84 4.60987Z"
                stroke="#161616"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="count_number_mb">{wishListItem?.length}</span>
          </a>
        </div>

        <Modal
          title="Categories"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {arrayOfArrays.map((subArray) =>
            subArray.map((element, elementIndex) => {
              const currentPath = window.location.pathname;
              const categoryUrl = currentPath.split("/")[2];
              return (
                <Link
                  onClick={() => {
                    setFooterCat(element);
                    setIsModalVisible(false);
                  }}
                  className={
                    categoryUrl === element?.detail?.slug
                      ? "MobileHeader-sideNavbar-category-list-data-col-1-heading-rs"
                      : "MobileHeader-sideNavbar-category-list-data-col-1-heading-os"
                  }
                  href={`/category/${
                    element?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
                  }`}
                  key={element?.id}
                >
                  {element.name}
                </Link>
              );
            })
          )}
        </Modal>
        <a
          onClick={() => {
            if (getName()) {
              navigate.push("/profile");
            } else {
              setActiveSignInWithOtp(true);
              setRedirectTo("/profile");
              localStorage.setItem("Lead-Page", "Profile");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#161616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#161616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <OutsideClickHandler
          onOutsideClick={() => {
            setActiveWalletMenu(false);
            setMenuBtn(false);
          }}
        >
          <a
            onClick={() => {
              if (getName()) {
                setActiveWalletMenu(!activeWalletMenu);
              } else {
                setActiveSignInWithOtp(true);
                setRedirectTo("/wallet");
                localStorage.setItem("Lead-Page", "Wallet");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_2003_6617)">
                <mask id="mask0_2003_6617">
                  <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2003_6617)">
                  <path
                    d="M4.7408 0.937502C2.59177 0.937502 0.841359 2.71875 0.941625 4.86539C1.03453 6.85388 2.67605 8.4375 4.6875 8.4375H19.3089C21.382 8.4375 23.0625 10.118 23.0625 12.1911V19.3089C23.0625 21.382 21.382 23.0625 19.3089 23.0625H5.62856C3.03773 23.0625 0.9375 20.9622 0.9375 18.3714V4.92188"
                    stroke="#161616"
                    strokeWidth="1.875"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.6875 0.933938H19.3089C21.382 0.933938 23.0625 2.6145 23.0625 4.6875V5.67188"
                    stroke="#161616"
                    strokeWidth="1.875"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.25 15.75C20.25 16.3972 19.7253 16.9219 19.0781 16.9219C18.4309 16.9219 17.9062 16.3972 17.9062 15.75C17.9062 15.1028 18.4309 14.5781 19.0781 14.5781C19.7253 14.5781 20.25 15.1028 20.25 15.75Z"
                    fill="#161616"
                  />
                  <path
                    d="M4.6875 4.6875H19.3125"
                    stroke="#161616"
                    strokeWidth="1.875"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_2003_6617">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          {activeWalletMenu && (
            <div className="mobile-footer-wallet-popup-os">
              <WalletPopup
                wBalance={wBalance || 0}
                total={parseFloat(total).toLocaleString("en-IN")}
                closePopup={setActiveWalletMenu}
              />
            </div>
          )}
        </OutsideClickHandler>
        <button
          className="menu-btn-Mobile"
          onClick={handleOpenMenu}
          aria-label="Menu"
        >
          Menu
        </button>
        {/* <ChatBot /> */}
        <span
          className="widget-icon"
          style={{ padding: "4px" }}
          onClick={showModal}
        >
          <Image
            src="https://assets.orufy.com/live_Chat_68d5be723f_79778dac51.svg"
            height="20"
            width="20"
            alt="widget"
          />
        </span>
      </div>
      <Modal open={menubtn} footer={null} className="moda___align">
        {/* <style jsx global>{`
          .ant-modal-wrap,
          .ant-modal-mask {
            inset: unset !important;
          }
        `}</style> */}
        {window.location.pathname === "/" ? (
          <div>
            <Link
              href="/numerology"
              onClick={() => {
                localStorage.setItem("Lead-Page", "Numurology");
              }}
            >
              <div className=" mb-[7px] flex gap-[10px] items-center">
                <div className="w-[31px] md:w-[32px]  animate-spin">
                  <Image
                    src={`${panelImg}/assets/img/vip-images/numerology1_wukzmv.webp`}
                    alt="Numerology image"
                    width={300}
                    height={300}
                    priority="true"
                  />
                </div>
                <span>
                  <p>Numerology Report</p>
                </span>
              </div>
            </Link>
            <div
              className="menu-Bar-rs mb-[7px]"
              onClick={() => {
                const target = document.getElementById("delivery-video");
                const offset = 12 * 22; // 3rem in pixels (assuming 1rem = 16px)

                if (target) {
                  const targetPosition =
                    target.getBoundingClientRect().top + window.pageYOffset;
                  const scrollToPosition = targetPosition - offset;

                  window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth",
                  });
                }
                window.activeVideoId = 1; // Set video ID to open
                window.dispatchEvent(new Event("openVideo"));
                setMenuBtn(false);
              }}
            >
              <span>
                <Image
                  src={`${panelImg}/assets/img/vip-images/Group707480509_lri9sc.webp`}
                  alt="Delivery image"
                  width={84}
                  height={86}
                  priority="true"
                />
              </span>
              <span>
                <p>Delivery Process</p>
              </span>
            </div>
            {/* <Link href="/why-choose-us">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/deliveryPro_nxcujx.png`}
                    alt="image"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Why VIP Number Shop?</p>
                </span>
              </div>
            </Link> */}
            <div
              className="menu-Bar-rs mb-[7px]"
              onClick={() => {
                const target = document.getElementById("download-app");
                const offset = 12 * 20; // 3rem in pixels (assuming 1rem = 16px)

                if (target) {
                  const targetPosition =
                    target.getBoundingClientRect().top + window.pageYOffset;
                  const scrollToPosition = targetPosition - offset;

                  window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth",
                  });
                }

                setMenuBtn(false);
              }}
            >
              <span>
                <Image
                  src={`${panelImg}/assets/img/vip-images/download_1_yfx6po.webp`}
                  alt="download image"
                  width={84}
                  height={86}
                  priority="true"
                />
              </span>
              <span>
                <p>Download App</p>
              </span>
            </div>
            <Link href="/search-results?type=family_pack&searchBy=family_pack&fp_total=4&callCount=0">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/Layer_66_csymxc.webp`}
                    alt="family image"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Family Pack</p>
                </span>
              </div>
            </Link>
            <div
              className="menu-Bar-rs mb-[7px]"
              onClick={() => {
                const target = document.getElementById("fit-budget");
                const offset = 12 * 20; // 3rem in pixels (assuming 1rem = 16px)

                if (target) {
                  const targetPosition =
                    target.getBoundingClientRect().top + window.pageYOffset;
                  const scrollToPosition = targetPosition - offset;

                  window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth",
                  });
                }

                setMenuBtn(false);
              }}
            >
              <span>
                <Image
                  src={`${panelImg}/assets/img/vip-images/budget_1_br0iko.webp`}
                  alt="budget image"
                  width={84}
                  height={86}
                  priority="true"
                />
              </span>
              <span>
                <p>Fit Your Budget</p>
              </span>
            </div>
            <Link
              href="/business"
              onClick={() => {
                localStorage.setItem("Lead-Page", "Business");
              }}
            >
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/Group_1707480620_fxdkjg.webp`}
                    alt="business image"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Business With Us</p>
                </span>
              </div>
            </Link>
            <Link href="/faq">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/download_arbzig.png`}
                    alt="faq image"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>FAQs</p>
                </span>
              </div>
            </Link>
            {voucher?.length > 0 && (
              <div
                className="menu-Bar-rs mb-[7px]"
                onClick={() => {
                  if (!user?.token) {
                    setActiveSignInWithOtp(true);
                    localStorage.setItem("Lead-Page", "Get-Discount");
                  } else {
                    setDiscountPop(true);
                    localStorage.setItem("Lead-Page", "Get-Discount");
                  }
                }}
              >
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/CurrencyIcon_gjiirl.webp`}
                    alt="faq image"
                    width={30}
                    height={30}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Get Discount</p>
                </span>
              </div>
            )}
            <div className="menu-Bar-rs mb-[7px]" onClick={() => BasicInfo()}>
              <span>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ color: "#63E6BE", width: "30px", height: "30px" }}
                />
              </span>
              <span>
                <p>Basic Information</p>
              </span>
            </div>
            {/* <Link href="/press-release">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    style={{ color: "#63E6BE", width: "30px", height: "30px" }}
                  />
                </span>
                <span>
                  <p>Press release</p>
                </span>
              </div>
            </Link> */}
          </div>
        ) : (
          <div>
            <Link href="/search-results?searchBy=price&min_price=1500&max_price=900000&callCount=0&comingsoon=yes&star_status=true">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/one_dehsgg.webp`}
                    alt="Vip Number Store"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Vip Number Store</p>
                </span>
              </div>
            </Link>
            {/* <Link href="/qr-stands" >
              <div className="menu-Bar-rs">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/download_n1hp4f.png`}
                    alt="QR-Stand for your Business"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>QR-Stand for your Business</p>
                </span>
              </div>
            </Link> */}
            <Link href="/search-results?type=advanced&not_contain=2%2C4%2C8&callCount=0&searchBy=digit&comingsoon=yes&star_status=true">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/download_ahmtnt.png`}
                    alt="Numerology Numbers"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Numerology Numbers</p>
                </span>
              </div>
            </Link>
            <Link href="/sell-mobile-number">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/four_an9qnb.webp`}
                    alt="Sell Your Number"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Sell Your Number</p>
                </span>
              </div>
            </Link>
            <Link
              href="/business"
              onClick={() => {
                localStorage.setItem("Lead-Page", "Business");
              }}
            >
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/five_ju48tz.webp`}
                    alt="Business With Us"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Business With Us</p>
                </span>
              </div>
            </Link>
            <Link href="/numerology">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/download_xegfcv.png`}
                    alt="Mobile Numerology Report"
                    width={84}
                    height={86}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Numerology Report</p>
                </span>
              </div>
            </Link>
            {voucher?.length > 0 && (
              <div
                className="menu-Bar-rs mb-[7px]"
                onClick={() => {
                  if (!user?.token) {
                    setActiveSignInWithOtp(true);
                    localStorage.setItem("Lead-Page", "Get-Discount");
                  } else {
                    setDiscountPop(true);
                    localStorage.setItem("Lead-Page", "Get-Discount");
                  }
                }}
              >
                <span>
                  <Image
                    src={`${panelImg}/assets/img/vip-images/CurrencyIcon_gjiirl.webp`}
                    alt="faq image"
                    width={30}
                    height={30}
                    priority="true"
                  />
                </span>
                <span>
                  <p>Get Discount</p>
                </span>
              </div>
            )}
            <div
              className="menu-Bar-rs mb-[7px]"
              onClick={() => {
                const target = document.getElementById("delivery-video");
                const offset = 12 * 30; // 3rem in pixels (assuming 1rem = 16px)

                if (target) {
                  const targetPosition =
                    target.getBoundingClientRect().top + window.pageYOffset;
                  const scrollToPosition = targetPosition - offset;

                  window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth",
                  });
                }
                window.activeVideoId = 1; // Set video ID to open
                window.dispatchEvent(new Event("openVideo"));
                setMenuBtn(false);
              }}
            >
              <span>
                <Image
                  src={`${panelImg}/assets/img/vip-images/Group707480509_lri9sc.webp`}
                  alt="Delivery image"
                  width={84}
                  height={86}
                  priority="true"
                />
              </span>
              <span>
                <p>Delivery Process</p>
              </span>
            </div>
            <div className="menu-Bar-rs mb-[7px]" onClick={() => BasicInfo()}>
              <span>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{ color: "#63E6BE", width: "30px", height: "30px" }}
                />
              </span>
              <span>
                <p>Basic Information</p>
              </span>
            </div>
            <Link href="/influencer">
              <div className="menu-Bar-rs mb-[7px]">
                <span>
                  <LiaUserAstronautSolid
                    fontSize={30}
                    color=" var(--primary)"
                  />
                </span>
                <span>
                  <p>Influencer Program</p>
                </span>
              </div>
            </Link>
          </div>
        )}
      </Modal>
      <Modal
        open={isModalVis}
        onCancel={handleCancel}
        footer={null}
        className="moda___align"
      >
        {/* Content inside the modal */}
        <div>
          <div
            className="menu-Bar-rs mb-[7px]"
            onClick={() => {
              const target = document.getElementById("delivery-video");
              const offset = 12 * 22; // 3rem in pixels (assuming 1rem = 16px)

              if (target) {
                const targetPosition =
                  target.getBoundingClientRect().top + window.pageYOffset;
                const scrollToPosition = targetPosition - offset;

                window.scrollTo({
                  top: scrollToPosition,
                  behavior: "smooth",
                });
              }
              window.activeVideoId = 1; // Set video ID to open
              window.dispatchEvent(new Event("openVideo"));
              setMenuBtn(false);
            }}
          >
            <span>
              <Image
                src={`${panelImg}/assets/img/vip-images/Group707480509_lri9sc.webp`}
                alt="Delivery image"
                width={84}
                height={86}
                priority="true"
              />
            </span>
            <span>
              <p>Delivery Process</p>
            </span>
          </div>
          <div className="menu-Bar-rs mb-[7px]" onClick={() => BasicInfo()}>
            <span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ color: "#63E6BE", width: "30px", height: "30px" }}
              />
            </span>
            <span>
              <p>Basic Information</p>
            </span>
          </div>
          <div
            className="menu-Bar-rs mb-[7px]"
            onClick={() => setShowPopup(true)}
          >
            <span>
              <FcSimCard />
            </span>
            <span>
              <p>Prepaid/Postpaid</p>
            </span>
          </div>
          <hr></hr>
          <ChatBot setIsModalVis={setIsModalVis} />
        </div>
      </Modal>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg max-w-lg  shadow-lg m-[10px]">
            <p className="text-gray-600 text-sm md:text-[16px]">
              Our any number is Portable (can be activated) to any state, any
              operator and any nature (Prepaid/Postpaid) as customer choice
              through MNP process.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary hover:text-darktext float-right"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {window.location.pathname !== "/" &&
        window.location.pathname !== "/subcategory" &&
        window.location.pathname.split("/")[1] !== "category" && (
          <div className="popupVideo">
            <ClientVideo />
          </div>
        )}
    </div>
  );
};

export default MobileFooterRow;
