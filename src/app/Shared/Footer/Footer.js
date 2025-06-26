"use client";
import React, { useState, useEffect, useContext } from "react";
import "./Footer.css";
import "../../Shared/NewsLetter/NewsLetter.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { toast } from "react-toastify";
import { FooterLink } from "./FooterLink";
import FooterCopyRight from "./FooterCopyRight";
import FooterCategory from "./FooterCategory";
function getCurrentYear() {
  const year = new Date().getFullYear();
  return year;
}

const Footer = () => {
  const { categoriesData, setBlogsRoute, setFooterCat, setTabCategory,subCategoryData,handleSubCat } =
    useContext(AppStateContext);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const currentYear = getCurrentYear();
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const myDataString = localStorage.getItem("vipcre");
  let contactid = "";
  if (myDataString) {
    const myData = JSON.parse(myDataString);
    contactid = myData?.user?.contact_cf?.contactid;
  }

  const allSubCategories = subCategoryData
  .flatMap((group) => group) // Flatten outer arrays
  .flatMap((category) =>
    (category.sub_categories || []).map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
      parentCategoryName: category.name, // Include parent category name
    }))
  );

  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=917009170092");
  };

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!contactid || contactid === "") {
      setActiveSignInWithOtp(true);
      return;
    }
    const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
    const url = `${apiUrl}/web/newsletter`;
    const payload = { email: email, contactid: contactid };

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
          toast.success("Email is successfully sent");
          setEmail("");
        } else if (
          data.status === "error" &&
          data.message === "email already exist in list"
        ) {
          toast.error("Email already exists in the list");
        } else {
          toast.error("Please enter a valid email");
        }
      })
      .catch((error) => {
        toast.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  };

  useEffect(() => {
    if (categoriesData) {
      setCategory(categoriesData);
    }
  }, [categoriesData]);

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

  return (
    <footer className="desktopFooter-main-os">
      <FooterLink
        blogsLoad={blogsLoad}
        submitNewsletter={submitNewsletter}
        setEmail={setEmail}
        email={email}
        openWhatsApp={openWhatsApp}
      />
      <FooterCategory
        category={category}
        setFooterCat={setFooterCat}
        setTabCategory={setTabCategory}
        allSubCategories={allSubCategories}
        handleSubCat={handleSubCat}
      />
      <FooterCopyRight
        handleLinkClick={handleLinkClick}
        currentYear={currentYear}
      />
      {showNotification && (
        <div className="notification-rs">Link copied to clipboard!</div>
      )}
    </footer>
  );
};

export default Footer;
