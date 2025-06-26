import React from "react";
import Image from "next/image";

const Benefits = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const BenefitContentArr = [
    {
      text: "Prepaid / Postpaid Your Choice",
      icon: `${panelImg}/assets/img/vip-images/diamond-icon_krrmnz.webp`,
    },
    {
      text: "Low-Cost Challenge",
      icon: `${panelImg}/assets/img/vip-images/diamond-icon_krrmnz.webp`,
    },
    {
      text: "Every number for Every State",
      icon: `${panelImg}/assets/img/vip-images/diamond-icon_krrmnz.webp`,
    },
    {
      text: "Biggest platform for VIP Mobile Number",
      icon: `${panelImg}/assets/img/vip-images/diamond-icon_krrmnz.webp`,
    },
    {
      text: "Trusted Since 2007",
      icon: `${panelImg}/assets/img/vip-images/diamond-icon_krrmnz.webp`,
    },
  ];

  return (
    <section className="overflow-hidden bg-primary relative py-6 mt-3">
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max whitespace-nowrap"
          style={{
            animation: "smoothMarquee 20s linear infinite",
            display: "flex",
          }}
        >
          {BenefitContentArr.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 text-center px-5"
            >
              {/* {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={50}
                  height={50}
                  priority="true"
                />
              )} */}
              <h4 className="text-lg font-medium text-white">{item.text}</h4>
            </div>
          ))}
          {/* Duplicate content for seamless looping */}
          {BenefitContentArr.map((item, index) => (
            <div
              key={`${index}-duplicate`}
              className="flex items-center space-x-3 text-center px-5"
            >
              {/* {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={50}
                  height={50}
                  priority="true"
                />
              )} */}
              <h4 className="text-lg font-medium text-white">{item.text}</h4>
            </div>
          ))}
        </div>
      </div>
      {/* Custom CSS for the marquee */}
      <style jsx>{`
        @keyframes smoothMarquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Benefits;
