"use client";

import React, { useState, useEffect, useCallback } from "react";
import MobileHeader from "./Shared/MobileHeader/MobileHeader";
import Header from "./Shared/Header/Header";
import MobileFooter from "./Shared/MobileFooter/MobileFooter";
import Footer from "./Shared/Footer/Footer";
import { usePathname } from "next/navigation";

// Custom hook to get isMobile status with debounce on resize
function useIsMobile(breakpoint = 768, debounceDelay = 200) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoint;
    }
    return false; // default on server or fallback
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId;

    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= breakpoint);
      }, debounceDelay);
    };

    window.addEventListener("resize", onResize);

    // No need to debounce the initial call because we initialized state correctly

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [breakpoint, debounceDelay]);

  return isMobile;
}

// ResponsiveHeader Component
export function ResponsiveHeader() {
  const isMobile = useIsMobile();
  const pathName = usePathname();
  const isTenDigitNumber = /vip-/.test(pathName);
  const route = pathName === "/influencer";
  const cart = pathName === "/place-order";
  const details = pathName === "/details";

  if (isMobile) {
    if (isTenDigitNumber || route || cart || details) return null;
    return <MobileHeader />;
  } else {
    if (route || isTenDigitNumber) return null;
    return <Header />;
  }
}

// ResponsiveFooter Component
export function ResponsiveFooter() {
  const isMobile = useIsMobile();
  const pathName = usePathname();
  const cart = pathName === "/place-order";
  const declined = pathName === "/payment-declined";
  const thankyou = pathName === "/thank-you";
  const isTenDigitNumber = /vip-/.test(pathName);
  if (isTenDigitNumber || cart || declined || thankyou) return null;

  return isMobile ? <MobileFooter /> : <Footer />;
}
