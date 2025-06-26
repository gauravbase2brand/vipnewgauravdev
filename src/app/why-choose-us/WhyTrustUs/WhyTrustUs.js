import React from "react";
import WhyChooseHeading from "../WhyChooseHeading/WhyChooseHeading";
import "./WhyTrustUs.css";

const WhyTrustUs = () => {
  return (
    <section className="WhyTrustUs-section-os">
      <div className="container-os">
        <div className="WhyTrustUs-heading">
          <WhyChooseHeading heading="Why Trust Us?" />
        </div>

        <div className="WhyTrustUs-videos-row-os">
          <div className="WhyTrustUs-videos-col-1-os">
            <iframe
              src="https://www.youtube.com/embed/s-oDBLlD5Ew"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h5>Why Trust on VIP Number Shop (Hindi)</h5>
          </div>

          <div className="WhyTrustUs-videos-col-1-os">
            <iframe
              src="https://www.youtube.com/embed/q2ciqF8kGDs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h5>Why Trust on VIP Number Shop (English)</h5>
          </div>

          <div className="WhyTrustUs-videos-col-1-os">
            <iframe
              src="https://www.youtube.com/embed/-aNgyzkajuo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h5>Delivery Process of VIP Number Shop (Hindi)</h5>
          </div>
          <div className="WhyTrustUs-videos-col-1-os">
            <iframe
              src="https://www.youtube.com/embed/50KiSDIMkfE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h5>Delivery Process of VIP Number Shop (English)</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
