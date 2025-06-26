import React from "react";
import "../About.css";
import Image from "next/image";

const AboutImageWithText = (props) => {
  return (
    <section className="py-3 md:py-12">
      <div className="container-os">
        <div
          className={`flex flex-col-reverse items-center ${
            props.reverse ? "md:flex-row-reverse" : "md:flex-row"
          } items-center md:items-center gap-8 m-auto justify-between `}
        >
          <div className="space-y-4 lg:w-[60%]">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
              {props.heading}
            </h2>
            <p className="text-gray-700 text-[16px] leading-[28px] ">
              {props.subHeading}
            </p>
            {(props.subHeading1 || props.subHeading12) && (
              <p className="text-gray-700 text-[16px] leading-[28px] ">
                <span className="text-primary">{props.subHeading1}</span>{" "}
                {props.subHeading12}
              </p>
            )}
            {props.subHeading2 && (
              <p className="text-gray-700 text-[16px] leading-[28px] ">
                <span className="text-primary">{props.subHeading2}</span>
              </p>
            )}
          </div>

          <div className="lg:w-[30%] w-full">
            <Image
              src={props.image}
              alt="Mobile with airtel image"
              width={1000}
              height={100}
              priority="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutImageWithText;
