import Image from "next/image";
import React from "react";
import sonu from "../../../public/assets/sonu.webp";
import model from "../../../public/assets/model.webp";
import ShilpaShetty from "../../../public/assets/ShilpaShetty.webp";

const InfluencerProgramme = () => {
  const awards = [
    {
      title: "Global Icon Award",
      year: "2024-25",
      image: sonu,
    },
    {
      title: "International Business Award",
      year: "2023-24",
      image: model, // Updated to use the imported image path
    },
    {
      title: "Global Icon Award",
      year: "2023-24",
      image: ShilpaShetty,
    },
  ];

  return (
    <div className="py-14">
      <div className="bg-primary pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-items-center md:gap-0 gap-4 p-3 md:p-0">
          {awards.map((award, index) => (
            <div key={index} className="text-center w-full ">
              <Image
                src={award.image}
                alt={award.title}
                width={1000}
                height={200}
                className=" h-[300px] w-full object-cover"
              />
              <h3 className="text-secondary text-xl mt-4 font-bold">
                {award.title}
              </h3>
              <p className="text-whitetext">{award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfluencerProgramme;
