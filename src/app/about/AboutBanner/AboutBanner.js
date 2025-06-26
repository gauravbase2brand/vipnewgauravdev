import React from "react";
import "../About.css";
import Link from "next/link";
import Image from "next/image";

const AboutBanner = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="AboutBanner-section-os">
      <div className="container-os">
        <div className="about-page-text-bg-ud">
          <h1>
            About Us and
            <br /> Our Values
          </h1>
          <div className="about-us-btn-ud">
            <Link href="/contact" aria-label="Contact Us">
              <button aria-label="Contact Us">
                Contact Us
                <span>
                  <span>
                    <Image
                      src={`${panelImg}/assets/img/vip-images/aboutbannercontect_xpowrp.webp`}
                      alt=" Contact Us arrow"
                      width={300}
                      height={100}
                      style={{
                        width: "13px",
                        height: "11px",
                      }}
                      priority="true"
                    />
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;
