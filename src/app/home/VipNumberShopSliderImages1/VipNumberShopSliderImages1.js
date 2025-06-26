import React, { useState, useEffect, useContext } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import VipSlider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const Arrow = ({ onClick, direction }) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const arrowIcon =
    direction === "next"
      ? `${panelImg}/assets/img/vip-images/banner-arrow-right_d5ztmu.webp`
      : `${panelImg}/assets/img/vip-images/banner-arrow-left_bfnus1.webp`;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-5 h-5 bg-white shadow-md rounded-full flex items-center justify-center hover:shadow-lg ${
        direction === "next" ? "right-2" : "left-2"
      }`}
    >
      <img src={arrowIcon} alt={`${direction} arrow`} className="w-5 h-5" />
    </button>
  );
};

const VipNumberShopSliderImages1 = () => {
  const { skeleton } = useContext(AppStateContext);
  // gaurav comment code
  const [images, setImages] = useState([]);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${apiUrl}/web/images`);
        const data = await response.json();
        const imageData = data.data.image || [];
        // sessionStorage.setItem("vipImages", JSON.stringify(imageData));
        setImages(imageData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Ensure this runs regardless of success or failure
      }
    };

    // const storedImages = sessionStorage.getItem("vipImages");

    // if (storedImages) {
    //   // If data exists in sessionStorage, use it and skip the API call
    //   setImages(JSON.parse(storedImages));
    //   setIsLoading(false);
    // } else {
    // Otherwise, fetch from the API
    fetchImages();
    // }
  }, []);
  // here numurology images display home and numurology page according to filter
  const filteredImages = images.filter((img) => {
    if (pathname === "/numerology" && img.imageType === "Numerology") {
      return true;
    }
    if (pathname === "/" && img.imageType === "Home") {
      return true;
    }
    return false;
  });
  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="p-2 pb-[1rem]">
      <div className="container-os mx-auto">
        {!isLoading ? (
          <>
            <div className="text-center lg:mb-6 mb-3">
              <h2 className="text-center flex items-center gap-[1rem] justify-center  font-bold text-[20px] lg:text-[32px] text-HeadingText 2xl:text-[38px] leading-[30px] lg:leading-[40px] tracking-wide mt-4 ">
                Tap Into the Magic of Diverse{" "}
              </h2>
              <span className="text-center text-[20px] lg:text-[32px] text-HeadingText leading-[30px] lg:leading-[40px] tracking-wide mb-4 2xl:text-[38px] inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-[#5c469c] font-bold px-2">
                Numerology Numbers
              </span>
            </div>

            <div className="relative cat-slide">
              <VipSlider {...sliderSettings}>
                {filteredImages.map((img, index) => (
                  <div className="px-1 lg:px-3" key={index}>
                    <Link
                      href={img.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative ">
                        <Image
                          src={img.path}
                          alt={img.alt || "VIP Number"}
                          width={1000}
                          height={300}
                          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="lg:h-[300px] h-28 w-full overflow-hidden rounded-lg"
                          priority="true"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </VipSlider>
            </div>
          </>
        ) : (
          <section>
            <div>
              <div className="text-center lg:mb-6 mb-3">
                <div className="h-6 md:w-1/5 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
              <div className="relative cat-slide">
                <div className="flex">
                  <div className="px-1 lg:px-3 w-1/3">
                    <div className="relative">
                      <div
                        className="
                    lg:h-[300px] h-28 w-full overflow-hidden rounded-lg
                     bg-gray-200 animate-pulse"
                      ></div>
                    </div>
                  </div>
                  <div className="px-1 lg:px-3 w-1/3">
                    <div className="relative">
                      <div
                        className="
                    lg:h-[300px] h-28 w-full overflow-hidden rounded-lg
                     bg-gray-200 animate-pulse"
                      ></div>
                    </div>
                  </div>
                  <div className="px-1 lg:px-3 w-1/3">
                    <div className="relative">
                      <div
                        className="
                    lg:h-[300px] h-28 w-full overflow-hidden rounded-lg
                     bg-gray-200 animate-pulse"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 transform -translate-y-1/2 z-10 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center animate-pulse left-2"></div>
                <div className="absolute top-1/2 transform -translate-y-1/2 z-10 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center animate-pulse right-2"></div>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default VipNumberShopSliderImages1;
