import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "../../home/VipNumberShopSlider/VipNumberShopSlider.css";
import "../GoogleReference.css";
import VipSlider from "react-slick";
import Link from "next/link";
import Image from "next/image";

const GoogleIcons = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/web/images`);
        const data = await response.json();
        setImages(data.data.icon); // Update this line
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <section className="VipNumberSlider-section-os">
      <div className="container-os">
        <div className="VipNumberSlider-row-os">
          <div className="VipNumberSlider-heading-os">
            <MainHeading MainHeading="Enjoy  Exclusive Offers with VIP Number Shop" />
          </div>

          <div className="VipNumberSlider-slider-row-os">
            {isLoading ? (
              <div className="loader-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
                  alt="loader"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
            ) : (
              <VipSlider
                className="vipNumber-slider-row-os"
                {...sliderSettings}
              >
                {images && images.length > 0 ? (
                  images?.map((img, index) => {
                    return (
                      <Link
                        href={img.link}
                        target="_blank"
                        className="googleReference-icon-os"
                        key={index}
                      >
                        <Image
                          src={img.path}
                          alt={img.alt_tag || "googleReference"}
                          width={300} // Replace with actual image width
                          height={300} // Replace with actual image height
                          priority="true"
                        />
                      </Link>
                    );
                  })
                ) : (
                  <p style={{ textAlign: "center" }}>Oops! data not found.</p>
                )}
              </VipSlider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default GoogleIcons;
