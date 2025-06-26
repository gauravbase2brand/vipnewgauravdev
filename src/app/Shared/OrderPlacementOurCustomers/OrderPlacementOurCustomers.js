import React from "react";
import MainHeading from "../MainHeading/MainHeading";
import AwardWinnerCard from "../AwardWinner/AwardWinnerCard/AwardWinnerCard";
import "./OrderPlacementOurCustomers.css";
import Link from "next/link";
import Image from "next/image";

const OrderPlacementOurCustomers = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const headingStyle = {
    color: "var(--primary)",
  };

  return (
    <section className="OrderPlacementOurCustomers-section-os default-section-os">
      <div className="container-os">
        <div className="OrderPlacementOurCustomers-content-os">
          <div className="default-heading-os">
            <MainHeading MainHeading="Our Customers" style={headingStyle} />
          </div>
          <div className="OrderPlacementOurCustomers-row-os">
            <AwardWinnerCard
              image={`${panelImg}/assets/img/vip-images/ourCustomers-img-1_roaeed.webp`}
              paragraph="Mustaq Khan"
            />
            <AwardWinnerCard
              image={`${panelImg}/assets/img/vip-images/ourCustomers-img-2_mqihni.webp`}
              paragraph="Upasana Singh"
            />
            <AwardWinnerCard
              image={`${panelImg}/assets/img/vip-images/ourCustomers-img-3_mb8jsv.webp`}
              paragraph="Rushad Rana"
            />
          </div>
          <div className="OrderPlacementOurCustomers-row-os-1">
            <MainHeading MainHeading="& Much More" style={headingStyle} />
          </div>
          <div className="OrderPlacementOurCustomers-row-os-2">
            <Link
              href="https://maps.app.goo.gl/FFo5yf6NUgd2w83U8"
              target="_blank"
            >
              <Image
                src={`${panelImg}/assets/img/vip-images/ourCustomers-img-4_glgb1v.webp`}
                alt="Google Review"
                width={300}
                height={100}
                priority="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPlacementOurCustomers;
