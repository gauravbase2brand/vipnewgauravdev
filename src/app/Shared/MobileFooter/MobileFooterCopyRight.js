import React from "react";
import Link from "next/link";

const MobileFooterCopyRight = ({ handleLinkClick }) => {
  return (
    <section className="MobileFooter-coptRight-section-os">
      <div className="MobileFooter-coptRight-data-os">
        <div className="container-os">
          <div className="footer-gk">
            <Link href="https://www.base2brand.com/" target="_blank" >
              <span className="gaurav221">
                Website design, marketing and developed by Base2Brand
              </span>
            </Link>
          </div>
          <div className="gk-footer">
            <Link
              href="https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html"
              onClick={(e) =>
                handleLinkClick(
                  e,
                  "https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html"
                )
              }
            >
              <span className="mobileaj-footer">
                Powered by VIPZ TELECOMMUNICATIONS (OPC) PRIVATE LIMITED
              </span>
            </Link>
          </div>
          <h4 className="text-sm text-center w-full text-white">
  VIP Number Shop © {new Date().getFullYear()}. All Rights Reserved
</h4>

        </div>
      </div>
    </section>
  );
};

export default MobileFooterCopyRight;
