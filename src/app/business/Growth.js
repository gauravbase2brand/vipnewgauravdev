"use client";
import React, { useEffect } from "react";
import Image from "next/image";

const Growth = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("animateMe");
      const position = element.getBoundingClientRect();

      // Check if the element is in view
      if (position.top < window.innerHeight && position.bottom >= 0) {
        element.classList.add("f29saprate");
        element.classList.remove("hidden00");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="p-section Extrapadding">
      <div className="container-os">
        <div
          className="icon-absluite"
          style={{
            position: "relative",
          }}
        >
          <Image
            className="icon-image"
            src={`${panelImg}/assets/img/vip-images/icon-de_wxyoer.webp`}
            alt="Business icon"
            width={300}
            height={100}
            priority="true"
          />
        </div>

        <div className="text-className">
          <h2 className="font-semibold text-[24px] leading-[30px] text-center py-1 md:text-[36px] md:leading-[42px] ">
            Working Process of This Business for Consistent Growth
          </h2>
          <p className="text-[16px] md:text-[18px] font-normal text-[#161616] mt-3 text-center lg:w-[50%] w-full m-auto">
            The process of buying promotional QR codes is straightforward and
            convenient. Simply click the buy button of QR codes designed to earn
            income through referrals, then follow this process.
          </p>
        </div>

        {/* Growth Section */}
        <div className="line-bg">
          <div className="icon-buy ico hidden00" id="animateMe">
            <Image
              src={`${panelImg}/assets/img/vip-images/buy_i4g15c.webp`}
              alt="Buy A Business Kit"
              width={300}
              height={100}
              priority="true"
            />
            <h4 className="GrouthText">Buy A Business Kit</h4>
          </div>
          <div className="icon-qr ico wtext">
            <Image
              src={`${panelImg}/assets/img/vip-images/qr_tdraf3.webp`}
              alt="Peel Off The QR Code"
              width={300}
              height={100}
              priority="true"
            />
            <h4 className="GrouthText">
              Peel Off The QR Code To Install In Your Shop
            </h4>
          </div>
          <div className="icon-start ico wtext">
            <Image
              src={`${panelImg}/assets/img/vip-images/Start_seyihq.webp`}
              alt="Start Generating Income"
              width={300}
              height={100}
              priority="true"
            />
            <h4 className="GrouthText">Start Generating the Income</h4>
          </div>
          <div className="icon-doller ico wtext ">
            <Image
              src={`${panelImg}/assets/img/vip-images/doller_kpo91r.webp`}
              alt="Generate Income Through Social Media"
              width={300}
              height={100}
              priority="true"
            />
            <h4 className="GrouthText">Generate Income Through Social Media</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Growth;
