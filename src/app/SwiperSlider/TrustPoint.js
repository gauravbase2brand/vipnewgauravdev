import React from "react";
import VipSlider from "react-slick";
import "./TrustPoint.css";

const TrustPoint = () => {

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: false,
    autoplaySpeed: 7000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1440, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  const slideContents = [
    { content: "Selling 100s of numbers on daily basis" },
    {
      content:
        "VIP NUMBER SHOP is India's 1st and #1 VIP Mobile Number service provider",
    },
    { content: "16-17 years of service (Since 2007)" },
    { content: "96% Positive Feedbacks on Google", link: "https://t.ly/OFYpF" },
    {
      content: "More then 1,85,000 downloads",
      link: "https://play.google.com/store/apps/details?id=com.wVipnumbershop.five921843&hl=en_IN&pli=1",
    },
    {
      content: "1.30 lakh followers on Facebook",
      link: "https://www.facebook.com/vipnumbershop",
    },
    // {
    //   content: "Only one VIP Number app is iOS approved in India",
    //   link: "https://apps.apple.com/in/app/vip-number-shop/id1519661902",
    // },
  ];

  return (
    <>
    <section className="VipNumberSlider-section-trust">
      <div className="container-os">
        <div className="VipNumberSlider-heading-os">
          <h2 className="trust-one-h2">
            <span style={{ color: " var(--primary) " }}>VIP </span>
            <span style={{ color: "var(--secondary)" }}>NUMBER </span>
            <span style={{ color: " var(--primary) " }}>SHOP </span>
            <span className="captalize">is not just a title It is a Brand</span>
          </h2>
          {/* <h2 className="trust-two-h2">🌞It is a brand.🌞</h2> */}
        </div>
          <VipSlider {...sliderSettings}>
            {slideContents.map((item, index) => (
              <div className="VipNumberSlider-slider-col-trust" key={index}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slide-link"
                >
                  <div
                    className={`slide-content-trust bg-gradient-${index + 1}`}
                  >
                    {/* <h3 className="TEXT-SLIDER">{item.content}</h3> */}
                  </div>
                </a>
              </div>
            ))}
          </VipSlider>
      </div>
    </section>
    </>
  );
};

export default TrustPoint;
