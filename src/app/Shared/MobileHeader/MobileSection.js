import { RxHamburgerMenu } from "react-icons/rx";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineCall } from "react-icons/md";
import React from "react";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar";
import OutsideClickHandler from "react-outside-click-handler";
import ListIcon from "@mui/icons-material/Style";
import Image from "next/image";
import Link from "next/link";
import CallUsPopup from "../CallUsPopup/CallUsPopup";
import { RWebShare } from "react-web-share";
import FilterTabs from "../FilterTabs/FilterTabs";
import FilterTabsCat from "../FilterTabs/FilterTabsCat";
import TabNavigationSlider from "@/app/TabNavigationSlider/TabNavigationSlider";
import { CiSearch } from "react-icons/ci";
import { RiDiscountPercentFill } from "react-icons/ri";
import CatSkull from "@/app/TabNavigationSlider/CatSkull";

const MobileSection = ({
  arrayOfArrays,
  catFilter,
  setHeaderOption,
  headerOption,
  getName,
  currentUrl,
  Router,
  setActiveSignInWithOtp,
  goBack,
  wishListItem,
  cartItems,
  showBrandLogo,
  voucher,
  setDiscountPop,
  setContactPopup,
  contactPopup,
  setFetchData,
  data,
  mobileToggleActive,
  setSearchPopup,
  searchPopup,
  setShowPopup,
  showFilterTabs,
  categoryTab,
  subCatTab,
  Pathname,
  skeleton,
  user,
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <>
      <section className="MobileHeader-section-os">
        {arrayOfArrays?.length > 0 ? (
          <TabNavigationSlider
            arrayOfArrays={arrayOfArrays}
            catFilter={catFilter}
          />
        ) : (
          <CatSkull />
        )}
        {/* {/ <div ref={headerRef} className="header-to-hide scroll-down"> /} */}
        <AnnouncementBar />
        <div className="container-os">
          <div className="MobileHeader-row-os">
            {skeleton ? (
              <div className="flex items-center justify-between animate-pulse w-full mt-1">
                <div className="w-[150px] h-[40px] bg-gray-300 rounded-md"></div>{" "}
                <div className="flex gap-1">
                  <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>{" "}
                  <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>{" "}
                  <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>{" "}
                </div>
              </div>
            ) : (
              <div className="MobileHeader-header-os">
                <section className="option-widgid-section-os">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setHeaderOption(false);
                    }}
                  >
                    <div
                      className={`option-widgid-content-os ${
                        headerOption ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          setHeaderOption(!headerOption);
                        }}
                        className="option-widgid-os"
                        aria-label="ListIcon"
                      >
                        <ListIcon />
                      </button>
                      <div className="option-widgid-link-1-os">
                        <div className="MobileHeader-user-os">
                          {Pathname.pathname === "/" ? (
                            <div
                              className="MobileHeader-user-icon-os"
                              onClick={() => {
                                if (getName()) {
                                  Router.push("/profile");
                                } else {
                                  setActiveSignInWithOtp(true);
                                }
                              }}
                            >
                              <Image
                                src={`${panelImg}/assets/img/vip-images/mobile-user-icon_heotae.webp`}
                                alt="userIcon"
                                width={300}
                                height={100}
                                priority="true"
                              />
                            </div>
                          ) : (
                            <Link href="" onClick={goBack}>
                              <Image
                                src={`${panelImg}/assets/img/vip-images/mobile-header-arrow_kebyvm.webp`}
                                alt="backArrow"
                                width={300}
                                height={100}
                                priority="true"
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                      <Link
                        className="option-widgid-link-2-os"
                        href="/wishlist"
                      >
                        <span className="widgit-count-os">
                          {wishListItem?.length}
                        </span>
                        <span>
                          <svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
                              fill=" var(--primary) "
                            ></path>
                          </svg>
                        </span>
                      </Link>
                      <Link className="option-widgid-link-3-os" href="/details">
                        <span className="widgit-count-os">
                          {cartItems?.length}
                        </span>
                        <span>
                          <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.27569 0.104314C8.35668 0.1538 8.42733 0.219083 8.4836 0.296433C8.53986 0.373783 8.58064 0.461685 8.6036 0.555117C8.62656 0.648549 8.63125 0.745681 8.61741 0.840965C8.60357 0.936248 8.57147 1.02782 8.52294 1.11044L4.86306 7.33345H18.1369L14.4756 1.11044C14.3776 0.943566 14.3486 0.743816 14.395 0.55513C14.4414 0.366445 14.5593 0.204282 14.7229 0.104314C14.8864 0.00434541 15.0822 -0.0252382 15.2671 0.0220706C15.4521 0.0693793 15.611 0.189705 15.709 0.356578L19.8131 7.33345H21.5625C21.9437 7.33345 22.3094 7.48798 22.579 7.76303C22.8485 8.03808 23 8.41113 23 8.80011V10.2668C23 10.6557 22.8485 11.0288 22.579 11.3038C22.3094 11.5789 21.9437 11.7334 21.5625 11.7334V18.3334C21.5625 19.3058 21.1839 20.2384 20.5099 20.9261C19.836 21.6137 18.9219 22 17.9688 22H5.03125C4.07813 22 3.16404 21.6137 2.49009 20.9261C1.81613 20.2384 1.4375 19.3058 1.4375 18.3334V11.7334C1.05625 11.7334 0.690618 11.5789 0.421034 11.3038C0.15145 11.0288 0 10.6557 0 10.2668V8.80011C0 8.41113 0.15145 8.03808 0.421034 7.76303C0.690618 7.48798 1.05625 7.33345 1.4375 7.33345H3.18694L7.28813 0.356578C7.33663 0.273938 7.40061 0.201857 7.47643 0.144452C7.55224 0.0870474 7.63839 0.0454435 7.72997 0.0220174C7.82154 -0.00140872 7.91674 -0.00619815 8.01013 0.00792242C8.10352 0.022043 8.19327 0.054797 8.27425 0.104314H8.27569ZM2.875 11.7334V18.3334C2.875 18.9168 3.10218 19.4764 3.50655 19.889C3.91093 20.3016 4.45938 20.5333 5.03125 20.5333H17.9688C18.5406 20.5333 19.0891 20.3016 19.4935 19.889C19.8978 19.4764 20.125 18.9168 20.125 18.3334V11.7334H2.875ZM1.4375 8.80011V10.2668H21.5625V8.80011H1.4375ZM5.75 13.2001C5.94062 13.2001 6.12344 13.2773 6.25823 13.4149C6.39302 13.5524 6.46875 13.7389 6.46875 13.9334V18.3334C6.46875 18.5279 6.39302 18.7144 6.25823 18.8519C6.12344 18.9894 5.94062 19.0667 5.75 19.0667C5.55938 19.0667 5.37656 18.9894 5.24177 18.8519C5.10698 18.7144 5.03125 18.5279 5.03125 18.3334V13.9334C5.03125 13.7389 5.10698 13.5524 5.24177 13.4149C5.37656 13.2773 5.55938 13.2001 5.75 13.2001ZM8.625 13.2001C8.81562 13.2001 8.99844 13.2773 9.13323 13.4149C9.26802 13.5524 9.34375 13.7389 9.34375 13.9334V18.3334C9.34375 18.5279 9.26802 18.7144 9.13323 18.8519C8.99844 18.9894 8.81562 19.0667 8.625 19.0667C8.43438 19.0667 8.25156 18.9894 8.11677 18.8519C7.98198 18.7144 7.90625 18.5279 7.90625 18.3334V13.9334C7.90625 13.7389 7.98198 13.5524 8.11677 13.4149C8.25156 13.2773 8.43438 13.2001 8.625 13.2001ZM11.5 13.2001C11.6906 13.2001 11.8734 13.2773 12.0082 13.4149C12.143 13.5524 12.2188 13.7389 12.2188 13.9334V18.3334C12.2188 18.5279 12.143 18.7144 12.0082 18.8519C11.8734 18.9894 11.6906 19.0667 11.5 19.0667C11.3094 19.0667 11.1266 18.9894 10.9918 18.8519C10.857 18.7144 10.7812 18.5279 10.7812 18.3334V13.9334C10.7812 13.7389 10.857 13.5524 10.9918 13.4149C11.1266 13.2773 11.3094 13.2001 11.5 13.2001ZM14.375 13.2001C14.5656 13.2001 14.7484 13.2773 14.8832 13.4149C15.018 13.5524 15.0938 13.7389 15.0938 13.9334V18.3334C15.0938 18.5279 15.018 18.7144 14.8832 18.8519C14.7484 18.9894 14.5656 19.0667 14.375 19.0667C14.1844 19.0667 14.0016 18.9894 13.8668 18.8519C13.732 18.7144 13.6562 18.5279 13.6562 18.3334V13.9334C13.6562 13.7389 13.732 13.5524 13.8668 13.4149C14.0016 13.2773 14.1844 13.2001 14.375 13.2001ZM17.25 13.2001C17.4406 13.2001 17.6234 13.2773 17.7582 13.4149C17.893 13.5524 17.9688 13.7389 17.9688 13.9334V18.3334C17.9688 18.5279 17.893 18.7144 17.7582 18.8519C17.6234 18.9894 17.4406 19.0667 17.25 19.0667C17.0594 19.0667 16.8766 18.9894 16.7418 18.8519C16.607 18.7144 16.5312 18.5279 16.5312 18.3334V13.9334C16.5312 13.7389 16.607 13.5524 16.7418 13.4149C16.8766 13.2773 17.0594 13.2001 17.25 13.2001Z"
                              fill=" var(--primary) "
                            ></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </OutsideClickHandler>
                </section>
                <div className="MobileHeader-brand-os">
                  {showBrandLogo || voucher?.length === 0 ? (
                    <Link href="/">
                      <Image
                        src={`${panelImg}/assets/img/vip-images/VIP-logo-1_kjdd2v.webp`}
                        alt="brand1"
                        width={1000}
                        height={100}
                        priority="true"
                      />
                    </Link>
                  ) : (
                    <div className="vip-logo-mobile-rs">
                      <Link href="/">
                        <Image
                          src={`${panelImg}/assets/img/vip-images/download_mty3kf.png`}
                          className="vipLogo-rs"
                          alt="Vip logo"
                          width={500}
                          height={430}
                          priority="true"
                        />
                      </Link>
                      <button
                        className="mobile-discount_btn"
                        onClick={() => {
                          if (!user?.token) {
                            setActiveSignInWithOtp(true);
                            localStorage.setItem("Lead-Page", "Get-Discount");
                          } else {
                            setDiscountPop(true);
                            localStorage.setItem("Lead-Page", "Get-Discount");
                          }
                        }}
                        style={{ width: "unset" }}
                        aria-label="CurrencyIcon"
                      >
                        <span>
                          <RiDiscountPercentFill
                            color="var(--secondary)"
                            fontSize={25}
                          />
                        </span>
                        Get Discount
                      </button>
                    </div>
                  )}
                </div>
                <div className="MobileHeader-toggle-data-os">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setContactPopup(false);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setContactPopup(!contactPopup);
                        if (!contactPopup) {
                          setFetchData(true);
                        }
                      }}
                      className="MobileHeader-contact-btn-os"
                      aria-label="whatsapp"
                    >
                      <div className="p-[5px] rounded-full border-[2px] border-primary">
                        <MdOutlineCall
                          style={{ color: "var(--primary)" }}
                          fontSize="25px"
                        />
                      </div>
                    </button>

                    {contactPopup && (
                      <div className="MobileHeader-contact-us-pop-os">
                        <CallUsPopup contactData={data} />
                      </div>
                    )}
                  </OutsideClickHandler>
                  <RWebShare
                    data={{
                      // text: "APKA NUMBER, APKI PEHCHAAN",
                      url: currentUrl,
                      title: "vipnumbershop",
                    }}
                  >
                    <span className="p-[5px] rounded-full border-[2px] border-primary">
                      <IoShareSocialOutline
                        style={{ color: "var(--primary)" }}
                        fontSize="25px"
                      />
                    </span>
                  </RWebShare>
                  <div
                    onClick={mobileToggleActive}
                    className="p-[5px] rounded-full border-[2px] border-primary"
                  >
                    <RxHamburgerMenu
                      style={{ color: "var(--primary)" }}
                      fontSize="25px"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* {/ gk changes /} */}
            <OutsideClickHandler
              onOutsideClick={() => {
                setSearchPopup(false);
              }}
            >
              {!searchPopup && (
                <div className="Gk-search-filter-mobile">
                  {skeleton ? (
                    <>
                      <div className="relative flex gap-3 items-center p-1">
                        <div className="w-full h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <button
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 animate-pulse"
                          aria-label="Search"
                        ></button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative flex gap-3 items-center lg:p-0 p-1">
                        <input
                          className={`w-full border rounded-full text-base bg-white bg-[97%] bg-no-repeat p-2 pl-3 pr-8 border-primary placeholder-primary`}
                          type="text"
                          name="search"
                          placeholder="Search..."
                          readOnly
                          onClick={() => {
                            // setSearchPopup(!searchPopup);
                            setShowPopup(false);
                            Router.push("/search", { shallow: true });
                          }}
                        />
                        <button
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-secondary to-secondary hover:from-purple-600 hover:to-indigo-600 text-white rounded-full p-[5px] shadow-lg transition duration-300 ease hover:scale-105"
                          onClick={() => {
                            // setSearchPopup(!searchPopup);
                            setShowPopup(false);
                            Router.push("/search", { shallow: true });
                          }}
                          aria-label="Search"
                        >
                          <CiSearch color="black" />
                        </button>
                        {showFilterTabs &&
                          window.location.pathname === "/search-results" && (
                            <div>
                              <FilterTabs />
                            </div>
                          )}
                        {categoryTab &&
                          window.location.pathname.split("/")[1] ===
                            "category" && (
                            <div>
                              <FilterTabsCat />
                            </div>
                          )}
                        {subCatTab &&
                          window.location.pathname === "/subcategory" && (
                            <div>
                              <FilterTabsCat />
                            </div>
                          )}
                      </div>
                    </>
                  )}
                </div>
              )}
              {/* {searchPopup && (
                <section className={`${searchPopup}`}>
                  <NewMobileSearch queryParams={queryParams} />
                </section>
              )} */}
            </OutsideClickHandler>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileSection;
