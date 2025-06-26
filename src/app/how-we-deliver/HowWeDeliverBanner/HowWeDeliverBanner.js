import React from "react";
import Link from "next/link";

const HowWeDeliverBanner = (props) => {
  return (
    <section className="pb-4">
      <div className="container-os">
        <div
          className="flex flex-col items-center bg-primary justify-center bg-cover bg-center bg-no-repeat rounded-2xl gap-4 text-center py-10 px-6"
          style={{
            backgroundImage:
              "url('https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/aboutbg_s9gfut.webp')",
          }}
        >
          {/* Heading */}
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
            {props.headingText}
          </h1>

          {/* Button */}
          {props.buttonTitle && (
            <Link
              href={props.buttonLink}
              className="flex items-center justify-center gap-3 text-white text-lg font-normal border border-white rounded-full py-3 px-8 hover:opacity-80 transition-opacity duration-300"
            >
              {props.buttonTitle}
              <span>
                <svg
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L6.9823 5.75513L1 10.5103" stroke="white" />
                  <path
                    d="M6.06195 1L12.0443 5.75513L6.06195 10.5103"
                    stroke="white"
                  />
                </svg>
              </span>
            </Link>
          )}

          {/* Paragraph */}
          {props.textPara && (
            <p className="text-white text-base md:text-lg">{props.textPara}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliverBanner;
