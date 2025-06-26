"use client";
import React, { useContext, useEffect, useState } from "react";
import "./MobileFooter.css";
import "../Footer/Footer.css";
import "../NewsLetter/NewsLetter.css";
import { toast } from "react-toastify";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import MobileFooterRow from "./MobileFooterRow";
import FooterQuestion from "./FooterQuestion";
import MobileFooterLinks from "./MobileFooterLinks";
import MobileFooterSocial from "./MobileFooterSocial";
import MobileFooterCopyRight from "./MobileFooterCopyRight";

const MobileFooter = React.memo(() => {
  const [activeAccordion, setActiveAccordion] = useState("");
  const {
    cartItems,
    wishListItem,
    categoriesData,
    user,
    userProfile,
    setBlogsRoute,
    wBalance,
    setRedirectTo,
    setFooterCat,
    setDiscountPop,
    voucher,
  } = useContext(AppStateContext);
  const [email, setEmail] = useState("");
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [menubtn, setMenuBtn] = useState(false);
  const [activeWalletMenu, setActiveWalletMenu] = useState(false);
  const { firstname, lastname, mobile } = user?.user || {};
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const getName = () => {
    if (!user) {
      return false;
    }
    if (
      firstname ||
      lastname ||
      userProfile?.firstname ||
      userProfile?.lastname
    ) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else if (mobile || email) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else {
      return false;
    }
  };

  const handleOpenMenu = () => {
    setMenuBtn(true);
  };

  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;

  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData);
    }
  }, [categoriesData]);

  const submitNewsletter = (e) => {
    e.preventDefault();
    const url = `${apiUrl}/web/newsletter`;
    const payload = { email: email };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success("Email is successfully send");
          setEmail("");
        } else {
          toast.error("please enter valid email");
        }
      })
      .catch((error) => {
        toast.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  const handleAccordion = (activeLink) => {
    if (activeAccordion === activeLink) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(activeLink);
    }
  };

  useEffect(() => {
    let count = 0;
    cartItems?.forEach((res) => {
      count = count + parseInt(res?.unit_price);
    });

    setTotal(count);
  }, [cartItems]);

  const blogsLoad = () => {
    setBlogsRoute(true);
  };
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      "VIPZ TELECOMMUNICATIONS (OPC) PRIVATE LIMITED"
    );
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      window.open(link, "_blank");
    }, 2000);
  };

  const chunkSize = 6;
  const arrayOfArrays = [];

  if (category) {
    for (let i = 0; i < category.length; i += chunkSize) {
      const chunk = category.slice(i, i + chunkSize);
      arrayOfArrays.push(chunk);
    }
  }
  return (
    <>
      <footer className="MobileFooter-section-os">
        <div className="bg-white">
          <div className="container-os">
            {/* <div className="NewsLetter-col-1-os">
              <span>Subscribe to our exclusive newsletter</span>
              <form
                className="NewsLetter-inputs-os"
                onSubmit={submitNewsletter}
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="NewsLetter-email-input-os"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Submit">
                  Submit
                </button>
              </form>
            </div> */}

            <div className=" p-2 ">
              <h2 className="tlg:text-[20px] text-[16px] leading-[30px] font-semibold text-center md:text-[26px] md:leading-[30px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold sm:text-left  pb-3">
                Subscribe to our exclusive newsletter
              </h2>
              <form
                className="relative flex gap-3 "
                onSubmit={submitNewsletter}
              >
                <input
                  id="newsletterEmail"
                  type="email"
                  name="search"
                  placeholder=" "
                  className="peer w-full p-3 text-gray-800 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="newsletterEmail"
                  className={`absolute cursor-text bg-white px-1 left-3 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                    email
                      ? "-top-2 left-3 text-xs text-primary scale-90"
                      : "top-[18px] text-primary peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                  }`}
                >
                  Email
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary  text-white text-sm font-bold uppercase rounded-md hover:opacity-80"
                  aria-label="Submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <FooterQuestion />
        <MobileFooterLinks
          handleAccordion={handleAccordion}
          blogsLoad={blogsLoad}
          activeAccordion={activeAccordion}
        />
        <MobileFooterSocial />

        <MobileFooterCopyRight handleLinkClick={handleLinkClick} />
        {showNotification && (
          <div className="notification-rs">Link copied to clipboard!</div>
        )}
      </footer>
      <MobileFooterRow
        getName={getName}
        setActiveSignInWithOtp={setActiveSignInWithOtp}
        setRedirectTo={setRedirectTo}
        navigate={router}
        wishListItem={wishListItem}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        arrayOfArrays={arrayOfArrays}
        setFooterCat={setFooterCat}
        setActiveWalletMenu={setActiveWalletMenu}
        setMenuBtn={setMenuBtn}
        activeWalletMenu={activeWalletMenu}
        wBalance={wBalance}
        total={total}
        handleOpenMenu={handleOpenMenu}
        menubtn={menubtn}
        cartItems={cartItems}
        setDiscountPop={setDiscountPop}
        voucher={voucher}
        user={user}
      />
    </>
  );
});
MobileFooter.displayName = "MobileFooter";
export default MobileFooter;
