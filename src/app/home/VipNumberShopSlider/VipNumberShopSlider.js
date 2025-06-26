import React, { useState, useEffect } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./VipNumberShopSlider.css";
import VipSlider from "react-slick";
import Link from "next/link";
import Image from "next/image";

const VipNumberShopSlider = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/web/images`);
        const data = await response.json();
        setImages(data.data.image.slice(0, 6)); // Update this line
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
          arrows: true,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <>
      {images && images.length > 0 && (
        <section className="VipNumberSlider-section-os">
          <div className="container-os">
            <div className="VipNumberSlider-row-os">
              <div className="VipNumberSlider-heading-os">
                <MainHeading MainHeading="Enjoy Exclusive Offers with VIP Number Shop" />
              </div>

              <div className="VipNumberSlider-slider-row-os">
                {isLoading ? (
                  <div className="loader-os">
                    <Image
                      src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
                      alt="loading..."
                      width={300}
                      height={100}
                      priority="true"
                    />
                  </div>
                ) : (
                  <>
                    <VipSlider
                      className="vipNumber-slider-row-os"
                      {...sliderSettings}
                    >
                      {images && images.length > 0 ? (
                        images?.map((img, index) => {
                          return (
                            <div
                              className="VipNumberSlider-slider-col-os"
                              key={index}
                            >
                              <Link
                                href={img.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {/* <img src={img.path} alt="" /> */}
                                <p className="catogarys">{img.alt_tag}</p>
                              </Link>
                            </div>
                          );
                        })
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          Oops! data not found.
                        </p>
                      )}
                    </VipSlider>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default VipNumberShopSlider;
