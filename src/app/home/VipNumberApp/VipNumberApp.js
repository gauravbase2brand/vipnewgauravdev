import React from "react";
import Link from "next/link";
import "./VipNumberApp.css";

const VipNumberApp = () => {
  return (
    <section className="vipnumber-app-section-os">
      <div className="container-os">
        <div className="vipnumber-app-row-os">
          <p>Get More User Experience with VIP NUMBER SHOP APP</p>
          <Link
            href="https://play.google.com/store/apps/details?id=com.wVipnumbershop.five921843&amp;pli=1"
            target="_blank"
          >
            GET APP
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VipNumberApp;
