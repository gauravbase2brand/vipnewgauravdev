"use client";
import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import Image from "next/image";
import Trusted from "../../../public/assets/Trusted.webp";
import yearsofexperience from "../../../public/assets/yearsofexperience.webp";
import review from "../../../public/assets/review.webp";
import { usePathname } from "next/navigation";
const NumerologyReview = () => {
  const pathname = usePathname()
  const [counterOn, setCounterOn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCounterOn(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div className={`lg:my-8 bg-no-repeat bg-cover ${pathname === "/family-pack" ? "bg-primary" : "bg-[url('/assets/albo.webp')]"}`}>
      <div className="md:py-16 py-6 px-4 flex justify-center flex-wrap md:gap-6 gap-3 max-w-full" ref={ref}>
        <div className="bg-white rounded-xl shadow-md md:px-6 md:py-6 p-3 w-full md:w-auto   min-w-[280px] border-[2px] border-primary  ">
          <div className="flex items-center md:gap-3 gap-1 justify-center">
            <Image
              src={Trusted}
              alt="Trusted"
              width={1000}
              height={600}
              layout="intrinsic"
              className="md:w-14 w-10"
            />
            <div>
              <p className="text-purple-900 font-extrabold text-lg">
                {counterOn && <CountUp start={0} end={1000000}></CountUp>} +
              </p>
              <p className="text-gray-800 text-sm ">Trusted Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md md:px-6 md:py-6 p-3 w-full md:w-auto   min-w-[280px] border-[2px] border-primary  ">
          <div className="flex items-center md:gap-3 gap-1 justify-center">
            <Image
              src={yearsofexperience}
              alt="yearsofexperience"
              width={1000}
              height={600}
              layout="intrinsic"
              className="md:w-14 w-10"
            />
            <div>
              <p className="text-purple-900 font-extrabold text-lg">
                {counterOn && <CountUp start={0} end={18}></CountUp>} +
              </p>
              <p className="text-gray-800 text-sm ">Year's Experience</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md md:px-6 md:py-6 p-3 w-full md:w-auto   min-w-[280px] border-[2px] border-primary  ">
          <div className="flex items-center md:gap-3 gap-1 justify-center">
            <Image
              src={review}
              alt="review"
              width={1000}
              height={600}
              layout="intrinsic"
              className="md:w-14 w-10"
            />
            <div>
              <p className="text-purple-900 font-extrabold text-lg">
                {counterOn && <CountUp start={0} end={99}></CountUp>} %
              </p>
              <p className="text-gray-800 text-sm ">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyReview;

