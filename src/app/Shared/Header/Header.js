"use client";
import { useContext, useState, useEffect, useRef } from "react";
import "./Header.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import HeaderList from "./HeaderList";
import HeaderLinks from "./HeaderLinks";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar";
import TabNavigationSlider from "@/app/TabNavigationSlider/TabNavigationSlider";
import CatSkull from "@/app/TabNavigationSlider/CatSkull";
const Header = () => {
  const navigate = useRouter();
  // register popup context
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const {
    cartItems,
    wishListItem,
    user,
    logout,
    categoriesData,
    cartAnimation,
    userProfile,
    setCartCacheData,
    setCartCache,
    wBalance,
    setRedirectTo,
    setDiscountPop,
    voucher,
    flterHide,
    catFilter,
    skeleton,
  } = useContext(AppStateContext);
  const [category, setCategory] = useState();
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [activeWalletMenu, setActiveWalletMenu] = useState(false);
  const [desktopContactPopup, setDesktopContactPopup] = useState(false);
  const [total, setTotal] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  // const [scrolling, setScrolling] = useState(false);
  // const [position, setPosition] = useState(
  //   window.pageYOffset || document.documentElement.scrollTop
  // );
  // const delta = 5;
  // const headerRef = useRef(null);
  const [aboutUs, setAboutUs] = useState(false);
  const [businessUs, setBusinessUs] = useState(false);
  const storedCartCacheSavedData = JSON.parse(
    localStorage.getItem("cartCacheSavedData")
  );
  const [showBrandLogo, setShowBrandLogo] = useState(true);
  const showBrandLogoRef = useRef(showBrandLogo); // Track the current state with useRef
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const scrollTimeoutRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");
  const pathName = window.location.pathname;
  // Extract the slug from the URL (in your case, it's the part after '/category/')
  const categoryTab = pathName.split("/category/")[1];

  // useEffect(() => {
  //   const handleScrollCoupon = () => {
  //     if (window.scrollY > 100) {
  //       setShowBrandLogo(false); // Hide brand logo after scrolling 100px
  //     } else {
  //       setShowBrandLogo(true); // Show brand logo if less than 100px scroll
  //     }
  //   };

  //   window.addEventListener("scroll", handleScrollCoupon);

  //   return () => {
  //     window.removeEventListener("scroll", handleScrollCoupon);
  //   };
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Use the ref to get the latest state
      if (currentScroll > 50 && showBrandLogoRef.current) {
        showBrandLogoRef.current = false; // Update the ref value
        setShowBrandLogo(false); // Trigger a state update
      } else if (currentScroll <= 50 && !showBrandLogoRef.current) {
        showBrandLogoRef.current = true; // Update the ref value
        setShowBrandLogo(true); // Trigger a state update
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!scrolling) {
  //       setScrolling(true);
  //     }
  //     if (scrollTimeout) clearTimeout(scrollTimeout);
  //     scrollTimeout = setTimeout(() => {
  //       setScrolling(false);
  //       scrollFunction();
  //     }, 150);
  //   };

  //   const scrollFunction = () => {
  //     const st = window.pageYOffset || document.documentElement.scrollTop;
  //     const header = headerRef.current;
  //     const hh = header ? header.offsetHeight : 0;
  //     const dh = document.documentElement.scrollHeight;
  //     const wh = window.innerHeight;

  //     if (Math.abs(position - st) <= delta) return;

  //     if (st > position && st > hh) {
  //       if (!header.classList.contains("scroll-up")) {
  //         header.classList.remove("scroll-down");
  //         header.classList.add("scroll-up");
  //       }
  //     } else if (st + wh < dh) {
  //       if (!header.classList.contains("scroll-down")) {
  //         header.classList.remove("scroll-up");
  //         header.classList.add("scroll-down");
  //       }
  //     }
  //     setPosition(st);
  //   };

  //   let scrollTimeout;

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     if (scrollTimeout) clearTimeout(scrollTimeout);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrolling, position]);

  // useEffect(() => {
  //   if (!fetchData) {
  //     axios
  //       .get(`${apiUrl}/web/call/us`)
  //       .then((response) => {
  //         setFetchData(true);
  //         setData(response?.data?.data || []);
  //       })
  //       .catch((error) => {
  //         setFetchData(true);
  //       });
  //   }
  // }, [fetchData, apiUrl]);

  useEffect(() => {
    // Check if data is already in sessionStorage
    const storedData = sessionStorage.getItem("callUsData");
    if (storedData) {
      // If data exists in sessionStorage, use it
      setData(JSON.parse(storedData));
      setFetchData(true);
    } else {
      // Otherwise, fetch from the API
      if (!fetchData) {
        axios
          .get(`${apiUrl}/web/call/us`)
          .then((response) => {
            setFetchData(true);
            const fetchedData = response?.data?.data || [];
            setData(fetchedData);
            // Store the fetched data in sessionStorage
            sessionStorage.setItem("callUsData", JSON.stringify(fetchedData));
          })
          .catch((error) => {
            setFetchData(true);
            console.log(error);
          });
      }
    }
  }, [fetchData, apiUrl]);

  const getName = () => {
    if (!user) {
      return false;
    }
    const firstName = userProfile?.firstname || firstname || "";
    const lastName = userProfile?.lastname || lastname || "";

    if (firstName || lastName) {
      return `${firstName} ${lastName}`;
    } else if (mobile || email) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    }
    // if (
    //   firstname ||
    //   lastname ||
    //   userProfile?.firstname ||
    //   userProfile?.lastname
    // ) {
    //   return `${userProfile?.firstname || firstname || user?.user?.firstname} ${
    //     userProfile?.lastname || lastname || user?.user?.lastname
    //   }`;
    // }
    // else if (mobile || email) {
    //   return mobile || email;
    // }
    //  else {
    //   return false;
    // }
  };

  useEffect(() => {
    let count = 0;
    cartItems?.forEach((res) => {
      count = count + parseInt(res?.unit_price);
    });

    setTotal(count);
  }, [cartItems]);

  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData);
    }
  }, [categoriesData]);

  const chunkSize = 6;
  const arrayOfArrays = [];

  if (category) {
    for (let i = 0; i < category.length; i += chunkSize) {
      const chunk = category.slice(i, i + chunkSize);
      arrayOfArrays.push(chunk);
    }
  }

  //Logout Pop up menu
  // const handleLogout = () => {
  //   setShowConfirmationModal(true);
  // };
  const handleConfirmLogout = () => {
    logout();
    setShowConfirmationModal(false);
    navigate.push("/");
    localStorage.setItem("cartCacheSavedData", JSON.stringify([]));
    localStorage.setItem("cartCacheNumber", JSON.stringify(""));
    setCartCache("");
    setCartCacheData([]);
  };
  const handleCancelLogout = () => {
    setShowConfirmationModal(false);
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      navigate.push(
        `/search-results?type=global&number=${searchQuery}&callCount=0&searchBy=digit&comingsoon=yes&star_status=true`
      );
      setSearchQuery("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <header className="header-section-os">
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
      {/* {/ </div> /} */}
      <div className="container-os">
        <div className="flex justify-between items-center p-0 relative">
          {skeleton ? (
            <div className=" flex items-center justify-between animate-pulse w-full my-2">
              <div className="w-[240px] h-[50px] bg-gray-200  rounded-md"></div>{" "}
              {/* {/ Logo /} */}
              <ul className="header-link-list-os flex gap-5">
                <li className="w-[100px] h-[20px] bg-gray-200  rounded-md"></li>{" "}
                {/* {/ Home link /} */}
                <li className="w-[150px] h-[20px] bg-gray-200  rounded-md"></li>{" "}
                {/* {/ Products link /} */}
                <li className="w-[100px] h-[20px] bg-gray-200  rounded-md"></li>{" "}
                {/* {/ About Us link /} */}
              </ul>
              <div className="w-[170px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
              <div className="filter-tab-display flex items-center gap-3">
                <div className="w-[120px] h-[40px] bg-gray-200  rounded-md"></div>{" "}
                {/* {/ Search bar /} */}
                <div className="w-[40px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
                {/* {/ User icon /} */}
                <div className="w-[40px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
                {/* {/ Notification icon /} */}
                <div className="w-[40px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
                {/* {/ Shopping cart icon /} */}
                <div className="w-[40px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
                {/* {/ Heart icon /} */}
                <div className="w-[40px] h-[40px] bg-gray-200  rounded-full"></div>{" "}
                {/* {/ Share icon /} */}
              </div>
            </div>
          ) : (
            <>
              <HeaderList
                showBrandLogo={showBrandLogo}
                voucher={voucher}
                setDiscountPop={setDiscountPop}
                setBusinessUs={setBusinessUs}
                businessUs={businessUs}
                setAboutUs={setAboutUs}
                aboutUs={aboutUs}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                handleKeyDown={handleKeyDown}
                handleSearchClick={handleSearchClick}
                type={type}
                flterHide={flterHide}
                categoryTab={categoryTab}
                user={user}
              />
              <HeaderLinks
                getName={getName}
                navigate={navigate}
                firstname={firstname}
                lastname={lastname}
                setActiveSignInWithOtp={setActiveSignInWithOtp}
                showConfirmationModal={showConfirmationModal}
                handleCancelLogout={handleCancelLogout}
                handleConfirmLogout={handleConfirmLogout}
                setDesktopContactPopup={setDesktopContactPopup}
                desktopContactPopup={desktopContactPopup}
                setFetchData={setFetchData}
                data={data}
                setRedirectTo={setRedirectTo}
                cartItems={cartItems}
                cartAnimation={cartAnimation}
                user={user}
                storedCartCacheSavedData={storedCartCacheSavedData}
                wishListItem={wishListItem}
                setActiveWalletMenu={setActiveWalletMenu}
                activeWalletMenu={activeWalletMenu}
                total={total}
                wBalance={wBalance}
                currentUrl={currentUrl}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
