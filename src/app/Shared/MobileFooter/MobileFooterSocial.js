import React from "react";
import Link from "next/link";
import facebook from "../../../../public/assets/facebook.png";
import Instagram from "../../../../public/assets/Instagram.png";
import Twitter from "../../../../public/assets/Twitter.png";
import LinkedIn from "../../../../public/assets/LinkedIn.png";
import Youtube from "../../../../public/assets/Youtube.png";
import Image from "next/image";
const MobileFooterSocial = () => {
  return (
    <section className="MobileFooter-socialMedia-section-os">
      <div className="container-os">
        <div className="MobileFooter-socialMedia-links-os">
          <div className="flex align-center gap-5 justify-center">
            <Link
              href="https://www.facebook.com/vipnumbershop"
              className="MobileFooter-socialMedia-link-col-1-os"
              target="_blank"
              aria-label="Facebook"
            >
              {/* <span className="bg-blue-200 cursor-pointer rounded-full shadow-md shadow-transparent transition-all duration-300 hover:shadow-indigo-200 "> */}
                <Image
                  className="transition-all duration-300 group-hover:scale-110"
                  src={facebook} // Replace with actual path to image
                  alt="Facebook"
                  width="20"
                  height="20"
                />
              {/* </span> */}
            </Link>
            <Link
              href="https://www.instagram.com/vip_number_shop_official/"
              className="MobileFooter-socialMedia-link-col-1-os"
              target="_blank"
              aria-label="Instagram"
            >
              {/* <span className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-red-50 to-pink-50 cursor-pointer rounded-full shadow-md shadow-transparent transition-all duration-300 hover:shadow-red-200"> */}
                <Image
                  className="transition-all duration-300 group-hover:scale-110"
                  src={Instagram} // Replace with actual path to image
                  alt="Facebook"
                  width="20"
                  height="20"
                />
              {/* </span> */}
            </Link>
            <Link
              href="https://twitter.com/vipnumbersshop"
              className="MobileFooter-socialMedia-link-col-1-os"
              target="_blank"
              aria-label="Twitter"
            >
              <Image
                className="transition-all duration-300 group-hover:scale-110"
                src={Twitter} // Replace with actual path to image
                alt="Facebook"
                width="20"
                height="20"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/vip-number-shop/"
              className="MobileFooter-socialMedia-link-col-1-os"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Image
                className="transition-all duration-300 group-hover:scale-110"
                src={LinkedIn} // Replace with actual path to image
                alt="Facebook"
                width="20"
                height="20"
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
              className="MobileFooter-socialMedia-link-col-1-os"
              target="_blank"
              aria-label="YouTube"
            >
              <Image
                className="transition-all duration-300 group-hover:scale-110"
                src={Youtube} // Replace with actual path to image
                alt="Facebook"
                width="20"
                height="20"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileFooterSocial;
