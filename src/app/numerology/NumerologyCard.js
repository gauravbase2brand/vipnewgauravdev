import React, { useEffect, useState } from "react";
import Image from "next/image";
import f1 from "../../../public/assets/f1.webp";
import f2 from "../../../public/assets/f2.webp";
import f3 from "../../../public/assets/f3.webp";
import f4 from "../../../public/assets/f4.webp";
import desing from "../../../public/assets/103.png";
import desing2 from "../../../public/assets/1033.png";
export const NumerologyCard = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const cardRotations = ["-2deg", "-2deg", "5deg", "4deg"];
  const cardData = [
    {
      id: 0,
      cardimage: f1,
      title: "Positive Energy",
      paragraph: "Attract harmony and balance in life",
    },
    {
      id: 1,
      cardimage: f2,
      title: "Career Growth",
      paragraph: "Numbers that resonate with success and opportunities",
    },
    {
      id: 2,
      cardimage: f3,
      title: "Better Relationships",
      paragraph: "Foster stronger personal and professional connections",
    },
    {
      id: 3,
      cardimage: f4,
      title: "Financial Stability",
      paragraph: "A number that aligns with wealth and prosperity",
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind's `lg` breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
        <div className=" relative">
  <Image src={desing} alt=""   className="h-[400px] object-contain absolute left-0 w-fit"/>
    <Image src={desing} alt=""   className="h-[400px] object-contain absolute left-0 w-fit bottom-0"/>
      <Image src={desing2} alt=""   className="h-[400px] object-contain absolute right-0 w-fit top-1/2"/>

    <section className="lg:mt-8 lg:mb-[8rem] my-5 max-w-screen-xl m-auto relative ">
      
      <div className="container-os">
        <h2 className="font-semibold text-[26px] lg:leading-[40px] leading-[35px] text-HeadingText md:text-[32px] lg:text-[35px]  tracking-wide 2xl:text-[38px] lg:mb-6 text-center mb-4 lg:w-1/2 m-auto">
          Benefits of Choosing a{" "}
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-[#5c469c] font-bold px-2">
            Numerology
          </span>{" "}
          Mobile Number
        </h2>
      
        <div className="grid grid-cols-1 gap-6 relative lg:mt-14 mt-4">

          {cardData.map((card, index) => (
            <div
              key={card.id}
              className={`
                flex flex-col lg:flex-row items-center rounded-[20px] overflow-hidden shadow-md md:p-6 p-2 sticky top-[200px]
                ${
                  index % 2 === 0
                    ? "bg-[#4F3B76] text-white"
                    : "bg-[#FFD500] text-black"
                }
              `}
              style={
                isDesktop
                  ? { transform: `rotate(${cardRotations[index]})` }
                  : {}
              }
            >
              <div className="lg:w-1/2 w-full md:p-5 p-2 space-y-2 text-center lg:text-left">
                <h3 className="lg:text-[22px] text-xl font-medium ">
                  {card.title}
                </h3>
                <p className="text-sm font-medium">{card.paragraph}</p>
              </div>

              <div className="lg:w-1/2 w-full">
                <Image
                  src={card.cardimage}
                  alt={card.title}
                  className="object-cover h-[250px] rounded-[20px] w-full object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};
