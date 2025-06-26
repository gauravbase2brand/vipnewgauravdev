import React from "react";

const NumerologyTableDiv = () => {
  const data = [
    ["Sun", "1", "1,2,3,5,9", "4,6,8"],
                ["Moon", "2", "1,3,4,7,8,9", "5,6"],
                ["Jupiter", "3", "1,2,3,5,6,9", "4,7,8"],
                ["Rahu (Uranus)", "4", "1,2,5,7", "3,6,8"],
                ["Mercury", "5", "1,2,3,4,5,6,8", "None"],
                ["Venus", "6", "3,5,6,9", "1,4,7,8"],
                ["Ketu (Neptune)", "7", "1,2,4,5", "3,6,8,9"],
                ["Saturn", "8", "1,4,5", "2,3,6,7,9"],
                ["Mars", "9", "1,2,3,5,6", "4,7,8"],
  ];

  return (
    <div className=" xl:max-w-screen-2xl lg:max-w-screen-lg md:max-w-screen-sm m-auto py-6 p-4  ">
      <div className="text-center mb-6">
        <h2 className="font-semibold text-[26px] lg:text-[32px] text-HeadingText leading-[35px] lg:leading-[40px] tracking-wide mb-2">
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Relationship
          </span>
          of Numbers in
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
            Numerology
          </span>
        </h2>
        <p className="font-normal text-[16px] leading-[24px] md:text-[17px] md:leading-[30px] text-darktext">
          Check compatibility of your lucky number with other numbers and make a
          <br /> suitable purchase of a lucky mobile number.
        </p>
      </div>

      {/* Header */}
      <div className="grid grid-cols-4 bg-[#4A3274] text-white font-bold text-center rounded-t-2xl overflow-hidden">
        <div className="py-3 px-4 rounded-tl-2xl text-secondary">Planets</div>
        <div className="py-3 px-4 text-secondary">Number </div>
        <div className="py-3 px-4 text-secondary">Friendly</div>
        <div className="py-3 px-4 rounded-tr-2xl text-secondary">Enemy</div>
      </div>

      {/* Rows */}
      {data.map(([planet, number, friendly, enemy], idx) => (
        <div
          key={number}
          className={`grid grid-cols-4 text-center ${
            idx % 2 === 0 ? "bg-white" : "bg-[#f3f3f3]"
          } text-[#333] rounded-full my-1 overflow-hidden`}
        >
          <div className="py-3 px-4">{planet}</div>
          <div className="py-3 px-4">{number}</div>
          <div className="py-3 px-4">{friendly}</div>
          <div className="py-3 px-4">{enemy}</div>
        </div>
      ))}
    </div>
  );
};

export default NumerologyTableDiv;
