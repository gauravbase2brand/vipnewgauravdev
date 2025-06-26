import React from "react";

import AwardWinnerCard from "../AwardWinnerCard/AwardWinnerCard";
import "./AwardWinner.css";
import Image from "next/image";
import award from "../../../../../public/assets/award.svg"

const AwardWinner = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const headingStyle = {
    color: " var(--primary) ",
  };
  return (
    <section className="Award-winner-section-os default-section-os py-2">
      <div className="container-os">
        <div className="Award-winner-content-os">
          <div className="flex gap-3 justify-center">
          <h2 className="text-2xl font-bold mb-6 md:text-3xl text-black text-center uppercase">Award Winner</h2>
          <span><Image className="h-9 w-9" src={award} alt=""></Image></span>
          </div>
          <div className="Award-winner-row-os">
            <AwardWinnerCard image={`${panelImg}/assets/img/vip-images/mobilebanner1.png`} />
            <AwardWinnerCard image={`${panelImg}/assets/img/vip-images/mobilebanner3.png`} />
            <AwardWinnerCard image={`${panelImg}/assets/img/vip-images/mobilebanner2.png`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardWinner;
