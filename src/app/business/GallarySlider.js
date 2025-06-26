"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const GallarySlider = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const interval = 3000;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const imgs = [
    {
      id: "img-1",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2561_fmbssq.webp`,
      alt: "Scan QR",
    },
    {
      id: "img-2",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2562_unowlo.webp`,
      alt: "Girl scanning qr code",
    },
    {
      id: "img-3",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2563_ktlgdm.webp`,
      alt: "QR Code scanning",
    },
    {
      id: "img-4",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2564_dlcplu.webp`,
      alt: "QR Code in mobile",
    },
    {
      id: "img-5",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2565_5_daekmi.webp`,
      alt: "QR Code scan from mobile",
    },
    {
      id: "img-6",
      src: `${panelImg}/assets/img/vip-images/Rectangle_2566_q1ucuq.webp`,
      alt: "QR Code scan with iphone",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prevImg) => (prevImg + 1) % imgs.length);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const changeSlide = (n) => {
    setCurrentImg(n);
  };

  return (
    <section
      className="p-section  slider-hiden "
      style={{
        background: "#F9F5FF",
      }}
    >
      <div className="container-os">
        <h2 className="gk-main-heading text-center ">Our Gallery</h2>
        <div className="slider  ">
          {imgs.map((img, index) => (
            <Image
              key={img.id}
              src={img.src}
              alt={img.alt}
              style={{
                opacity: currentImg === index ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              width={300}
              height={100}
              priority="true"
            />
          ))}

          <div className="navigation-button">
            {imgs.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentImg === index ? "active" : ""}`}
                onClick={() => changeSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallarySlider;
