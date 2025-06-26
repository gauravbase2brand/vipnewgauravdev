"use client";
import React, { useEffect } from "react";
import Image from "next/image";

const GallaryBusiness = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll(".hidden-rs");
      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          image.classList.remove("hidden-rs");
          image.classList.add(image.dataset.animation);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="p-section hide" style={{ background: "#F9F5FF" }}>
      <div className="container-os">
        <h2 className="font-semibold text-[24px] leading-[30px] text-center py-4 md:text-[36px] md:leading-[42px] md:py-6 ">
          Our Gallery
        </h2>
        <div className="wrapper">
          <div className="one1">
            <Image
              className="hidden-rs"
              data-animation="slide-in-right"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2561_fmbssq.webp`}
              alt="Scan QR"
              width={300}
              height={100}
              priority="true"
            />
            <Image
              className="hidden-rs"
              data-animation="slide-in-right"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2563_ktlgdm.webp`}
              alt="QR Code scanning"
              width={300}
              height={100}
              priority="true"
            />
          </div>
          <div className="two2">
            <Image
              className="hidden-rs"
              data-animation="slide-in-top"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2562_unowlo.webp`}
              alt="Girl scanning qr code"
              width={300}
              height={100}
              priority="true"
            />
            <Image
              className="hidden-rs"
              data-animation="slide-in-bottom"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2564_dlcplu.webp`}
              alt="QR Code in mobile"
              width={300}
              height={100}
              priority="true"
            />
          </div>
          <div className="three3">
            <Image
              className="hidden-rs"
              data-animation="slide-in-left"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2566_q1ucuq.webp`}
              alt="QR Code scan with iphone"
              width={300}
              height={100}
              priority="true"
            />
            <Image
              className="hidden-rs"
              data-animation="slide-in-right"
              src={`${panelImg}/assets/img/vip-images/Rectangle_2565_5_daekmi.webp`}
              alt="QR Code scan from mobile"
              width={300}
              height={100}
              priority="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallaryBusiness;
