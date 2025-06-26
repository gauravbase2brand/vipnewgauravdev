"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { AppStateContext } from "./contexts/AppStateContext/AppStateContext";

const PageLoader = () => {
  const { loaderCat, setLoaderCat } = useContext(AppStateContext);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    // Add className after 2 seconds
    const timer = setTimeout(() => {
      setLoaderCat(true);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [loaderCat]);
  return (
    <div className={`loader-os home_page_loader ${loaderCat ? "active" : ""}`}>
      <Image
        src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
        alt="loading..."
        width={300}
        height={100}
        priority="true"
      />
    </div>
  );
};

export default PageLoader;
