import React from "react";
import Link from "next/link";
import Image from "next/image";

const FooterCopyRight = ({ handleLinkClick, currentYear }) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="footer-copyRight-section-os">
      <div className="container-os">
        <div className="flex items-center justify-between py-4">
          <span>VIP Number Shop © {currentYear}. All Rights Reserved</span>
          <div className="flex items-center gap-4">
            <span>We Accept</span>
            <div className="flex items-center gap-2">
              <div className="footer-copyRight-accept-cards-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/footer-cards-img-1_jvzvwd.webp`}
                  alt="visa master card"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="footer-copyRight-accept-cards-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/footer-cards-img-2_bxpaou.webp`}
                  alt="Bhim Upi"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="footer-copyRight-accept-cards-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/footer-cards-img-3_xrynfu.webp`}
                  alt="Google Pay"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="footer-copyRight-accept-cards-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/footer-cards-img-4_eorv8t.webp`}
                  alt="Airtel"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="footer-copyRight-accept-cards-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/footer-cards-img-5_voxy65.webp`}
                  alt="Wallet"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
            </div>
          </div>
        </div>
        <Link
          href="https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html"
          onClick={(e) =>
            handleLinkClick(
              e,
              "https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html"
            )
          }
        >
          <span className="Vipz-telecom">
            Powered by VIPZ TELECOMMUNICATIONS (OPC) PRIVATE LIMITED
          </span>
        </Link>
        <Link href="https://www.base2brand.com/" target="_blank">
          <span className="Base2Brand">
            Website design, marketing and developed by Base2Brand
          </span>
        </Link>
      </div>
    </section>
  );
};

export default FooterCopyRight;
