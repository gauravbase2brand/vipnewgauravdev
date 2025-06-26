"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const testimSpeed = 4500;
  let testimTimer;

  const slides = [
    {
      img: `${panelImg}/assets/img/vip-images/vikramImg_is1spl.webp`,
      name: "Rajesh P. from Mumbai",
      text: "I found the perfect VIP number at VIP Number Shop. The process was simple, and their customer service is outstanding. Highly recommended!",
    },
    {
      img: `${panelImg}/assets/img/vip-images/AnitaDelhi_msn4ph.webp`,
      name: "Anita K. from Delhi",
      text: "VIP Number Shop made it easy to get the number I wanted. It adds a touch of className to my business. Worth every rupee!",
    },
    {
      img: `${panelImg}/assets/img/vip-images/RajeshMumbai_wrj79g.webp`,
      name: "Vikram S. from Bangalore",
      text: "I’ve been wanting a VIP number for a while. VIP Number Shop delivered exactly what I needed, with great service. Very satisfied!",
    },
    {
      img: `${panelImg}/assets/img/vip-images/PriyaChennai_axmzye.webp`,
      name: "Priya M. from Chennai",
      text: "VIP Number Shop has a great selection of numbers. I got one that’s easy to remember, and the whole experience was hassle-free. Love it!",
    },
    {
      img: `${panelImg}/assets/img/vip-images/SanjayHyderabad_nyqczk.webp`,
      name: "Sanjay R. from Hyderabad",
      text: "Excellent service and a great range of VIP numbers. I found a number that suits my personality perfectly. I’m very happy with my purchase!",
    },
    {
      img: `${panelImg}/assets/img/vip-images/PoojaPune_y0aaff.webp`,
      name: "Pooja D. from Pune",
      text: "Buying a VIP number from VIP Number Shop was a smooth process. The number adds value to my personal brand. I’m really pleased with their service!",
    },
  ];

  useEffect(() => {
    const playSlide = (slide) => {
      if (slide < 0) {
        slide = slides.length - 1;
      } else if (slide >= slides.length) {
        slide = 0;
      }
      setCurrentSlide(slide);

      testimTimer = setTimeout(() => {
        playSlide(slide + 1);
      }, testimSpeed);
    };

    playSlide(currentSlide);

    return () => clearTimeout(testimTimer);
  }, [currentSlide]);

  const goToSlide = (slide) => {
    clearTimeout(testimTimer);
    setCurrentSlide(slide);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  return (
    <div className=" setitom-os backblue ">
      <section id="testim" className="testim container-os">
        <div className="testim-cover">
          <div className="wrap-22">
            <span
              id="right-arrow"
              className="arrow right fa fa-chevron-right"
              onClick={nextSlide}
            />
            <span
              id="left-arrow"
              className="arrow left fa fa-chevron-left"
              onClick={prevSlide}
            />
            <ul id="testim-dots" className="dots">
              {slides.map((_, index) => (
                <li
                  key={index}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </ul>
            <div id="testim-content" className="cont">
              {slides.map((slide, index) => {
                return (
                  <div
                    key={index}
                    className={`${currentSlide === index ? "active" : ""}`}
                  >
                    <div className="back-itom">
                      <h2 className="gk-main-heading text-center happy-quote ">
                        Our Happy Customer
                      </h2>
                      <div className="display-testmonial">
                        <div className="img div-image-main">
                          <div className="img-set">
                            <Image
                              src={slide.img} // Handle both the imported image and object format
                              alt={slide.name}
                              width={1000} // Provide fallback values
                              height={300} // Provide fallback values
                              // blurDataURL={slide.img.blurDataURL || ""}
                              priority="true"
                            />
                          </div>
                        </div>
                        <div className="content-text">
                          <p className="text-active">{slide.text}</p>
                          <div className="name-text">
                            <h2 className="text-quote">{slide.name}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerReviews;
