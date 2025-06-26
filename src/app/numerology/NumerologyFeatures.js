"use client";
import React from "react";
import { FaGem, FaCogs, FaBolt } from "react-icons/fa";
import backdotted from "../../../public/assets/frame.svg"; // Correct Import

const features = [
  {
    id: 1,
    icon: <FaGem className="text-2xl md:text-3xl text-black" />,
    title: "Premium Mobile Numbers",
  },
  {
    id: 2,
    icon: <FaCogs className="text-2xl md:text-3xl text-black" />,
    title: "Customized Recommendations",
  },
  {
    id: 3,
    icon: <FaBolt className="text-2xl md:text-3xl text-black" />,
    title: "Fast Activation",
  },
];

export default function NumerologyFeatures() {
  return (
    <section className=" py-3">
      <div className="md:container lg:mx-auto px-4 md:py-6 text-center container-os">
        {/* Title */}
        <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-center text-darktext leading-tight mb-6">
          Harness the Power of{" "}
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Numerology
          </span>{" "}
          for Your{" "}
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Success
          </span>
        </h2>

        {/* Features Container */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center p-4 rounded-xl mg:w-[250px] md:w-[330px]  w-full "
              style={{
                backgroundImage: `url(${backdotted.src})`,
                backgroundSize: "cover", // Ensure it covers properly
                backgroundPosition: "center",
              }}
            >
              <div className="mb-2">{feature.icon}</div>
              <p className="text-lg font-medium text-black">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
