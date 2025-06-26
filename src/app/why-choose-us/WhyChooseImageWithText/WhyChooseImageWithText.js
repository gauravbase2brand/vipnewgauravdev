import React from "react";
import Link from "next/link";
import Image from "next/image";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";

const WhyChooseImageWithText = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="py-4 md:py-12 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            <h1 className="font-semibold text-[26px] leading-[36px] md:text-[36px] md:leading-[45px] text-primary capitalize ">
              What Are You Waiting For? Select Your Favourite VIP Number Today
              And Place The Order.
            </h1>
            <p className="font-normal text-[15px] md:text-[16px] leading-[25px] text-black ">
              If you have questions or queries, please feel free to reach our
              customer care executive on the below-given credentials;
            </p>
            <h2 className="font-semibold text-[20px] md:text-[18px] md:leading-[28px] leading-[36px] flex items-center   text-primary  ">
              Phone Call/Whatsapp:{" "}
              <Link
                href="https://api.whatsapp.com/send?phone=917009170092"
                target="_blank"
                className="text-primary underline ml-2"
              >
                +91-70091 70092
              </Link>
            </h2>
            <h2 className="font-semibold text-[20px] md:text-[18px] md:leading-[28px] leading-[36px] flex items-center   text-primary  ">
              Email - <DaynamicEmail colorvariant="text-blue" />
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex justify-center">
            <Image
              src={`${panelImg}/assets/img/vip-images/QRVipApp-QR_aoiym8.webp`}
              alt="info@vipnumbershop.com"
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

export default WhyChooseImageWithText;
