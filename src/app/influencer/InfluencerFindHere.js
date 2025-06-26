import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import TrustVideo from "./TrustVideo";

const InfluencerFindHere = () => {
  return (
    <section className="bg-white py-8 px-6">
      <div className="container-os mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-center">
        {/* Left Side - Social Links */}
        <div>
          <p className="uppercase text-sm tracking-wide font-semibold text-lightprimery">
            You Can Find Me Here
          </p>
          <div className="mt-4 space-y-4">
            {[
              {
                name: "Instagram",
                href: "https://www.instagram.com/vip_number_shop_official/",
              },
              {
                name: "YouTube",
                href: "https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q",
              },
              {
                name: "Facebook",
                href: "https://www.facebook.com/vipnumbershop",
              },
              { name: "Twitter", href: "https://x.com/vip_number_shop" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center border-t border-gray-700 py-3 text-black font-bold text-xl group"
              >
                {/* Text & Icon inside flex */}
                <IoIosArrowRoundForward className="ml-2 text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="flex items-center transform transition-all duration-300 group-hover:translate-x-8">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side - Image */}
        <TrustVideo/>
      </div>
    </section>
  );
};

export default InfluencerFindHere;
