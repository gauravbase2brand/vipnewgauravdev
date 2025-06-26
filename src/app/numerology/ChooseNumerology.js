import React from "react";
import Image from "next/image";
import numerologyImage from "../../../public/assets/babaji.webp";
import animatespin from "../../../public/assets/Group.webp";

const ChooseNumerology = () => {
  return (
    <section className="lg:my-8  bg-[url('/assets/bg-pandit221.png')] from-primary to-primary md:pt-11 pt-5 bg-no-repeat bg-cover">
      <div className="max-w-screen-xl m-auto px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center md:gap-6 gap-3">
          <div className="relative overflow-hidden ">
            <div className="flex justify-center relative ">
              {/* Spinning background image */}
              <Image
                src={animatespin}
                alt="Spinning animation"
                className="animate-spin  w-full overflow-hidden absolute h-[400px] object-contain"
                width={200}
                height={200}
                style={{ animationDuration: "5s" }}
              />
              {/* Main numerology image on top */}
              <Image
                src={numerologyImage}
                alt="Numerology Design"
                className="lg:h-[400px] h-auto object-contain z-10"
                width={500}
                height={500}
              />
            </div>
          </div>

          {/* Left Section: Title & Paragraph */}
          <div className="lg:text-left text-center">
            <h2 className="font-semibold text-[28px] md:text-[32px] lg:text-[36px] leading-[35px] md:leading-[45px] lg:leading-[45px] 2xl:text-[38px]  text-[#F2F2F2] tracking-wide">
             Why Choose a 
              <span className="text-secondary inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain  font-bold px-2">
                Numerology
              </span>{" "}
              Mobile Number?
            </h2>
            {/* <h3 className="font-bold lg:text-[24px] md:text-[22px] text-[18px] mb-2 text-whitetext">
              {" "}
              Your mobile number isn’t just a contact detail—it’s a gateway to
              <span className="text-secondary">
                {" "}
                luck, success, and balance.
              </span>{" "}
            </h3> */}
            <p className="font-normal text-[16px] md:text-[18px] pb-11 text-whitetext  w-full md:text-left    ">
              In the world of numbers, not all are created equal. Numerology has
              long been trusted for aligning energies, improving fortune, and
              bringing positivity into life. Your mobile number isn’t just a
              contact detail—it’s a gateway to luck, success, and balance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseNumerology;
