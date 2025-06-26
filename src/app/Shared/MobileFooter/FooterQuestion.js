import React from "react";
import Image from "next/image";
import Link from "next/link";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import { MdOutlineCall } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";

const FooterQuestion = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="MobileFooter-gotQuestions-section">
      <div className="container-os">
        <Link href="/">
          <Image
            src={`${panelImg}/assets/img/vip-images/vip_og_q1b0hm.webp`}
            alt="Brand Logo"
            width={261}
            height={76}
            priority="true"
            decoding="async"
            fetchPriority="high"
            className="h-24 w-[80%] m-auto object-cover"
          />
        </Link>

        <div className="flex items-center justify-between py-3 flex-wrap gap-2">
          {/* <Link href="tel:+917009170092"> */}
            <div className="ft-gk">
              <MdOutlineCall fontSize={25} color="var(--primary)" />
              {/* 70091-70092 */}
              <DaynamicMobileno/>
            </div>
          {/* </Link> */}

          <div className="icon-main">
            {/* Email Link */}
            {/* <Link href="mailto:info@vipnumbershop.com"> */}
              <div className="ft-gk">
                <IoMdMail fontSize={25} color="var(--primary)" />
                <DaynamicEmail colorvariant="text-primary" />
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterQuestion;
