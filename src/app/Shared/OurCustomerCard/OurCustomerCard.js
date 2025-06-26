import React from "react";
import "./OurCustomerCard.css";
import Image from "next/image";

const OurCustomerCard = (props) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < props.starCount; i++) {
      stars.push(
        <Image
          key={i}
          src={`${panelImg}/assets/img/vip-images/star_scdp3v.webp`}
          alt="Star"
          width={25}
          height={25}
          priority="true"
        />
      );
    }
    return stars;
  };

  return (
    <div className=" flex flex-col gap-[10px] items-start p-5 border border-secondary   rounded-[10px] ">
      <div className="flex w-full justify-between">
        <div className="flex gap-[10px] w-fit ">
          <Image
            className="w-[40px]"
            src={props.image}
            alt={props.name}
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
            priority="true"
          />

          <span className="text-lg font-semibold   text-primary  ">
            {props.name}
          </span>
          {/* <span>{props.Date}</span> */}
        </div>
        <div className="w-[35px]">
          <Image
            src={`${panelImg}/assets/img/vip-images/Google__G__logo.svg_1_1_gwxoqv.webp`}
            alt="Google Icon"
            width={50}
            height={50}
            priority="true"
          />
        </div>
      </div>
      <div className="flex gap-[3px]">{renderStars()}</div>
      <p
        className="text-[16px] font-normal"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 3,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {props.text}
      </p>
    </div>
  );
};

export default OurCustomerCard;
