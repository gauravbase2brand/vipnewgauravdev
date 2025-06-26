import React from "react";
import Image from "next/image";

const Award = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="block md:hidden pb-4">
      <div className="container mx-auto flex justify-center">
        <Image
          src={`${panelImg}/assets/img/vip-images/award-banner-for-mobile_lybues.webp`}
          alt="AwardImg"
          width={300}
          height={100}
          priority="true"
          className="w-auto h-auto"
        />
      </div>
    </section>
  );
};

export default Award;
