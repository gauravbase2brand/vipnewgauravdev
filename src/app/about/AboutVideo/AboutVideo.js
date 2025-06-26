import React from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../About.css";

const AboutVideo = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="AboutVideo-section-os">
      <div className="container-os">
        <MainHeading MainHeading="About VIP NUMBER SHOP" />

        <div className="AboutVideo-row-os">
          <iframe
            src="https://www.youtube.com/embed/e2Jjs5ICX_U"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          >
            <source
              src={`${panelImg}/assets/img/vip-images/QRVipApp-QR_aoiym8.webp' type="image/png`}
            />
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
