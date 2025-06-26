import React from "react";
import Image from "next/image";
import numerologycake from "../../../public/assets/numerologycake.svg";
import crown from "../../../public/assets/crown.svg";
import toush from "../../../public/assets/toush.svg";
import path from "../../../public/assets/path.webp";

const steps = [
  {
    title: "Tell Us Your Date of Birth & Life Goals",
    description:
      "Our team will help match numbers that align with your life, bringing peace, balance, and positive energy to every part of your journey.",
    imageSrc: numerologycake,
    alt: "numerologycake",
  },
  {
    title: "Choose From a Range of Numerology Numbers",
    description:
      "Pick a number that resonates with your life’s path, designed to bring success, happiness, and peace into both your personal and professional life.",
    imageSrc: crown,
    alt: "crown",
  },
  {
    title: "Activate & Start Experiencing the Change!",
    description:
      "Once chosen, we help you activate the number quickly for seamless connectivity, enhanced luck, positive energy, and improved opportunities in life and career.",
    imageSrc: toush,
    alt: "toush",
  },
];

const NumerologyHowWorks = () => {
  return (
    <div className="max-w-screen-2xl md:py-12  py-6 m-auto">
      <div className="container-os">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-HeadingText leading-tight mb-2">
            How it
            <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
              {" "}
              Works
            </span>
          </h2>
          <p className="text-[16px] leading-[24px] md:text-[17px] md:leading-[30px] text-darktext">
            Follow these simple steps to experience the magic of numerology!
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-2 border-secondary p-8 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:scale-105 hover:border-2 hover:border-secondary hover:shadow-xl bg-[#FFFAE3]"
            >
              <div className="flex justify-center m-auto">
                <div className=" p-4 ">
                  <Image className="w-20" src={step.imageSrc} alt={step.alt} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 max-w-xs break-words m-auto bg-[url('/assets/path.webp')] bg-no-repeat bg-center bg-contain h-11 w-full">
                {step.title}
              </h3>

              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumerologyHowWorks;
