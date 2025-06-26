import React from "react";
import "./OurCustomers.css";
import VipSlider from "react-slick";
import OurCustomerCard from "../OurCustomerCard/OurCustomerCard";

const OurCustomers = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // slider
  const CustomerSliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 7000,
    autoplay: true,
    lazyLoad: true,
    lazyLoad: "ondemand",
    draggable: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
  
      <div className="container-os">
        <div className="text-center ">
          <h2 className="lg:text-3xl text-2xl mt-2">
            <span style={{ color: "#4285F4", display: "inline-block" }}>G</span>
            <span style={{ color: "#EA4335", display: "inline-block" }}>o</span>
            <span style={{ color: "#FBBC05", display: "inline-block" }}>o</span>
            <span style={{ color: "#4285F4", display: "inline-block" }}>g</span>
            <span style={{ color: "#34A853", display: "inline-block" }}>l</span>
            <span style={{ color: "#EA4335", display: "inline-block" }}>e</span> Review
          </h2>
        </div>

        <div className="OurCustomers-slider-row-os">
            <VipSlider {...CustomerSliderSettings}>
              <OurCustomerCard
                image={`${panelImg}/assets/img/vip-images/download_et2ynn.png`}
                text="Sharing the QR code was easy and rewarding for me. I earned whenever someone purchased a number through my referral link. Great way to earn extra income!"
                name="Sneha Patel"
                // Date="September 12, 2023"
                starCount={4} // Use number to indicate the number of stars
              />

              <OurCustomerCard
                image={`${panelImg}/assets/img/vip-images/V-name_d77hqa.webp`}
                text="I highly recommend VIP Number Shop to anyone in search of a unique and personalized VIP mobile number. The website offers a vast selection of options to choose from, and the customer service is exceptional."
                name="Vikram Khanna"
                // Date="September 12, 2023"
                starCount={4}
              />
              <OurCustomerCard
                image={`${panelImg}/assets/img/vip-images/r-name_epv6be.webp`}
                text="I was hesitant to spend money on a VIP mobile number, but the quality of service and attention to detail I received from VIP Number Shop made it worth every penny. My new number has become a conversation starter among my friends."
                name="Rohini Chakraborty"
                // Date="September 12, 2023"
                starCount={4}
              />
              <OurCustomerCard
                image={`${panelImg}/assets/img/vip-images/r-name_epv6be.webp`}
                text="I had a fantastic experience purchasing a VIP mobile number from this website. The website was easy to navigate, and the support team was quick to respond to any questions I had. I couldn't be happier with my new number."
                name="Ravi Kumar Reddy"
                // Date="September 12, 2023"
                starCount={4}
              />
            </VipSlider>
        </div>
      </div>

  );
};

export default OurCustomers;
