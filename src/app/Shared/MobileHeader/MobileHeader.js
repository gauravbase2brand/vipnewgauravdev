"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import "./MobileHeader.css";
import { useRouter, usePathname } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import axios from "axios";
import { useGetQueryParams } from "@/app/utils";
import MobileSection from "./MobileSection";
import MobileSidebar from "./MobileSidebar";

const MobileHeader = React.memo(() => {
  const Router = useRouter();
  const Pathname = usePathname();
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const {
    user,
    categoriesData,
    userProfile,
    cartItems,
    wishListItem,
    setRedirectTo,
    setDiscountPop,
    voucher,
    searchPopup,
    setSearchPopup,
    setShowPopup,
    catFilter,
    setFamilyPackValue,
    familyPackValue,
    setLoaderCat,
    skeleton,
  } = useContext(AppStateContext);
  const [category, setCategory] = useState();
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const [activeNavbar, setActiveNavbar] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const [contactPopup, setContactPopup] = useState(false);
  // const [activeCategories, setActiveCategories] = useState("");
  const [headerOption, setHeaderOption] = useState(false);
  const { queryParams } = useGetQueryParams();
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const headerRef = useRef(null);
  const showFilterTabs = Pathname === "/search-results";
  const [showBrandLogo, setShowBrandLogo] = useState(true);
  const showBrandLogoRef = useRef(showBrandLogo); // Track the current state with useRef
  const pathName = window.location.pathname;
  // Extract the slug from the URL (in your case, it's the part after '/category/')
  const categoryTab = pathName.split("/category/")[1];
  const subCatTab = pathName === "/subcategory";
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
  //   let lastScrollTop = 0; // Tracks the last known scroll position
  //   const scrollThreshold = 100; // Minimum pixels to scroll before toggling classes
  //   let debounceTimeout;

  //   const handleScroll = () => {
  //     // Debounce the scroll handler to reduce frequent executions
  //     if (debounceTimeout) clearTimeout(debounceTimeout);

  //     debounceTimeout = setTimeout(() => {
  //       const st = window.pageYOffset || document.documentElement.scrollTop;
  //       const header = headerRef.current;

  //       if (!header) return;

  //       const headerHeight = header.offsetHeight;

  //       // Ignore small scroll changes
  //       if (Math.abs(lastScrollTop - st) <= scrollThreshold) return;

  //       // Scrolling down: hide the header
  //       if (st > lastScrollTop && st > headerHeight) {
  //         header.classList.remove("scroll-down");
  //         header.classList.add("scroll-up");
  //       }
  //       // Scrolling up or at the top: show the header
  //       else if (st < lastScrollTop || st <= 0) {
  //         header.classList.remove("scroll-up");
  //         header.classList.add("scroll-down");
  //       }

  //       lastScrollTop = st <= 0 ? 0 : st; // Update lastScrollTop, ensuring it doesn't go negative
  //     }, 100); // Debounce delay in milliseconds
  //   };

  //   // Attach scroll event listener
  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup on component unmount
  //   return () => {
  //     if (debounceTimeout) clearTimeout(debounceTimeout);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // whats app redirect
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=917009170092");
  };

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

  // useEffect(() => {
  //   if (fetchData) {
  //     axios
  //       .get(`${apiUrl}/web/call/us`)
  //       .then((response) => {
  //         setData(response?.data?.data);
  //         setFetchData(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [fetchData,apiUrl]);

  useEffect(() => {
    // Check if data is already in sessionStorage
    const storedData = sessionStorage.getItem("callUsData");
    if (storedData) {
      // If data exists in sessionStorage, use it
      setData(JSON.parse(storedData));
      setFetchData(false);
    } else {
      // Otherwise, fetch from the API
      if (fetchData) {
        axios
          .get(`${apiUrl}/web/call/us`)
          .then((response) => {
            setFetchData(false);
            const fetchedData = response?.data?.data || [];
            setData(fetchedData);
            // Store the fetched data in sessionStorage
            sessionStorage.setItem("callUsData", JSON.stringify(fetchedData));
          })
          .catch((error) => {
            setFetchData(false);
            console.log(error);
          });
      }
    }
  }, [fetchData, apiUrl]);

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
  // Mobile navbar toogle
  const mobileToggleActive = () => {
    setActiveNavbar(true);
  };
  const mobileToggleInactive = () => {
    setActiveNavbar(false);
  };

  // Mobile Navbar edit profile button
  const handleProfileEdit = () => {
    if (getName()) {
      Router.push("/profile");
      setActiveNavbar(false);
    } else {
      setActiveSignInWithOtp(true);
      setRedirectTo("/profile");
    }
  };

  // NavLinks handle
  const handleMobileLinks = (value) => {
    if (activeLink === value) {
      setActiveLink("");
    } else {
      setActiveLink(value);
    }
  };

  // Show categories menu
  // const handleMobileCategories = () => {
  //   if (activeCategories === "active") {
  //     setActiveCategories("");
  //   } else {
  //     setActiveCategories("active");
  //   }
  // };

  function goBack() {
    window.history.back();
  }

  const handleFocusField = () => {
    const searchInput = document.getElementById("global-input");
    if (searchInput) {
      searchInput.focus();
    }
  };
  useEffect(() => {
    if (searchPopup) {
      handleFocusField(); // Focus the input when searchPopup becomes true and input is rendered
    }
  }, [searchPopup]);

  return (
    <>
      <header className="MobileHeader-main-os">
        <MobileSection
          arrayOfArrays={arrayOfArrays}
          catFilter={catFilter}
          setHeaderOption={setHeaderOption}
          headerOption={headerOption}
          headerRef={headerRef}
          getName={getName}
          currentUrl={currentUrl}
          Router={Router}
          setActiveSignInWithOtp={setActiveSignInWithOtp}
          goBack={goBack}
          wishListItem={wishListItem}
          cartItems={cartItems}
          showBrandLogo={showBrandLogo}
          voucher={voucher}
          setDiscountPop={setDiscountPop}
          setContactPopup={setContactPopup}
          contactPopup={contactPopup}
          setFetchData={setFetchData}
          data={data}
          mobileToggleActive={mobileToggleActive}
          setSearchPopup={setSearchPopup}
          searchPopup={searchPopup}
          setShowPopup={setShowPopup}
          showFilterTabs={showFilterTabs}
          categoryTab={categoryTab}
          subCatTab={subCatTab}
          queryParams={queryParams}
          Pathname={Pathname}
          skeleton={skeleton}
          user={user}
        />
        <MobileSidebar
          setActiveNavbar={setActiveNavbar}
          activeNavbar={activeNavbar}
          firstname={firstname}
          lastname={lastname}
          getName={getName}
          Router={Router}
          setActiveSignInWithOtp={setActiveSignInWithOtp}
          mobileToggleInactive={mobileToggleInactive}
          userProfile={userProfile}
          handleProfileEdit={handleProfileEdit}
          handleMobileLinks={handleMobileLinks}
          setRedirectTo={setRedirectTo}
          openWhatsApp={openWhatsApp}
          activeLink={activeLink}
          setFamilyPackValue={setFamilyPackValue}
          familyPackValue={familyPackValue}
          setLoaderCat={setLoaderCat}
        />
      </header>
    </>
  );
});
MobileHeader.displayName = "MobileHeader";
export default MobileHeader;
