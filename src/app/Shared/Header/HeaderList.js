import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import FilterTabs from "../FilterTabs/FilterTabs";
import FilterTabsCat from "../FilterTabs/FilterTabsCat";
import { CiSearch } from "react-icons/ci";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MyRegisterSignInContext } from "@/app/contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const HeaderList = ({
  showBrandLogo,
  voucher,
  setDiscountPop,
  setBusinessUs,
  businessUs,
  setAboutUs,
  aboutUs,
  setSearchQuery,
  searchQuery,
  handleKeyDown,
  handleSearchClick,
  type,
  flterHide,
  categoryTab,user
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  return (
    <>
      <div className="header-brand-os">
        {showBrandLogo || voucher?.length === 0 ? (
          <Link href="/">
            <Image
              src={`${panelImg}/assets/img/vip-images/VIP-logo-1_kjdd2v.webp`}
              alt="brand"
              width={300}
              height={100}
              priority="true"
            />
          </Link>
        ) : (
          <div className="header_discount_coupon">
            <Link href="/">
              <Image
                src={`${panelImg}/assets/img/vip-images/download_mty3kf.png`}
                className="vipLogo-rs"
                width={500}
                height={430}
                alt="vip logo"
                priority="true"
              />
            </Link>
            <button
              className="discount_btn"
              onClick={() => {
                if (!user?.token){
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Get-Discount");
                }else{
                setDiscountPop(true);
                localStorage.setItem("Lead-Page", "Get-Discount");
                }
              }}
              aria-label="Get Discount"
            >
              <span>
              <RiDiscountPercentFill color="var(--secondary)" fontSize={25}/>
              </span>
              Get Discount
            </button>
          </div>
        )}
      </div>
      <ul className="header-link-list-os flex justify-center flex-wrap list-none ">
        <li>
          <Link className="text-lg font-medium" href="/">
            Home
          </Link>
        </li>
        <li>
          <OutsideClickHandler
            onOutsideClick={() => {
              setBusinessUs(false);
            }}
          >
            <div
              onClick={() => {
                setBusinessUs(!businessUs);
              }}
              className={`categories-manu-os ${businessUs}`}
            >
              Our products<span></span>
            </div>
            {businessUs && (
              <section className={`${businessUs}`}>
                <div className="absolute top-[65px] flex flex-col gap-4 bg-white p-5 shadow-md">
                  <Link
                    href="/search-results?searchBy=price&min_price=1500&max_price=900000&callCount=0&comingsoon=yes&star_status=true"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setBusinessUs(false)} // Close dropdown when clicked
                  >
                    VIP NUMBER Store
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/business"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => {
                      localStorage.setItem("Lead-Page", "Business");
                      setBusinessUs(false);
                    }}
                  >
                    Business With Us
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/sell-mobile-number"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setBusinessUs(false)} // Close dropdown when clicked
                  >
                    Sell Your Number
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/numerology"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => {
                      localStorage.setItem("Lead-Page", "Numurology");
                      setBusinessUs(false);
                    }}
                  >
                    Numerology Report
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                   <Link
                    href="/family-pack"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => {
                      localStorage.setItem("Lead-Page", "Numurology");
                      setBusinessUs(false);
                    }}
                  >
                    Family/Business Pack
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  {/* <Link
                    href="https://qrstand.vipnumbershop.com/"
                    className="relative group hover:text-primary  hover:font-medium "
                  >
                    QR-Stand for your Business
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link> */}
                  <Link
                    href="/search-results?type=advanced&not_contain=2%2C4%2C8&callCount=0&searchBy=digit&comingsoon=yes&star_status=true"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setBusinessUs(false)} // Close dropdown when clicked
                  >
                    Numerology Numbers
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/qr-stands"
                    className="relative group hover:text-primary "
                    onClick={() => setAboutUs(false)}
                  >
                    Buy QRCode
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              </section>
            )}
          </OutsideClickHandler>
        </li>

        <li>
          <OutsideClickHandler
            onOutsideClick={() => {
              setAboutUs(false);
            }}
          >
            <div
              onClick={() => {
                setAboutUs(!aboutUs);
              }}
              className={`categories-manu-os ${aboutUs}`}
            >
              About Us<span></span>
            </div>
            {aboutUs && (
              <section className={`${aboutUs}`}>
                <div className="absolute top-[65px] flex flex-col gap-4 bg-white p-5 shadow-md">
                  <Link
                    href="/about"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setAboutUs(false)}
                  >
                    About Us
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/why-choose-us"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setAboutUs(false)}
                  >
                    Why Choose Us
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/faq"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setAboutUs(false)}
                  >
                    FAQs
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/contact"
                    className="relative group hover:text-primary  hover:font-medium "
                    onClick={() => setAboutUs(false)}
                  >
                    Contact Us
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/press-news"
                    className="relative group hover:text-primary "
                    onClick={() => setAboutUs(false)}
                  >
                    Press News
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/influencer"
                    className="relative group hover:text-primary "
                    onClick={() => setAboutUs(false)}
                  >
                    Influencer Program
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              </section>
            )}
          </OutsideClickHandler>
        </li>
      </ul>
      <div className="filter-tab-display">
        {/* <div className="rs-search-filter-desktop">
          <input
            className="rs-search-desktop"
            type="number"
            name="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onWheel={(e) => e.target.blur()}
          />
          <button
            className="overlap__btn-rs"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.9999 21L16.6499 16.65"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div> */}

        <div className="w-full mr-1">
          <div className="relative">
            <input
              id="searchQuery"
              type="number"
              name="search"
              placeholder=" "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onWheel={(e) => e.target.blur()}
              className="peer w-full bg-transparent placeholder:text-[#691ede] text-black border border-primary  rounded-full px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary hover:border-primary  shadow-sm focus:shadow text-[16px] leading-4"
            />
            <label
              htmlFor="searchQuery"
              className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${searchQuery
                  ? "-top-2 left-2.5 text-xs text-primary scale-90"
                  : "top-[11px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                }`}
            >
              Search
            </label>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-secondary to-secondary   text-white rounded-full p-[5px] shadow-lg transition duration-300 ease hover:scale-105"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <CiSearch color="black" />
            </button>
          </div>
        </div>

        {type !== "family_pack" && (
          <>
            {flterHide && window.location.pathname === "/search-results" && (
              <div className="ramnish-vip">
                <div className="default-page-filterTabs-os hide-on-mobile">
                  <FilterTabs />
                </div>
              </div>
            )}
            {window.location.pathname === "/subcategory" && (
              <div>
                <FilterTabsCat />
              </div>
            )}
            {categoryTab && (
              <div>
                <FilterTabsCat />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HeaderList;
