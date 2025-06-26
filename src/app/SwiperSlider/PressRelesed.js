"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import debounce from "lodash/debounce";
import "../home/FeaturedNumber/FeaturedNumber.css";
import "../Shared/TabNumbers/TabNumberData/TabNumberData.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const PressRelesed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [slideitem, setSlideItem] = useState(3);
  const perPageLimit = 100; // Set the number of blogs per page
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 767); // Detect if sc
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Attach event listener
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
      handleResize.cancel(); // Cancel pending debounce calls
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660) {
        setSlideItem(2);
      } else if (window.innerWidth < 1025) {
        setSlideItem(2);
      } else {
        setSlideItem(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Fetch blog data from API using axios
  const fetchBlogs = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `https://leafymango.com/blogs.php?perPageLimit=${perPageLimit}&recordStartFrom=0&type=NEWS`
      );
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (abc) => {
    window.open(abc, "_blank");
  };
  return (
    <>
      <div className="container-os overflow-hidden vipNews-all" style={{marginTop:'1rem'}}>
      <div className="VipNumberSlider-heading-os">
          <h2 className="trust-one-h2">
            <span style={{ color: " var(--primary) " }}>VIP </span>
            <span style={{ color: "var(--secondary)" }}>NUMBER </span>
            <span style={{ color: " var(--primary) " }}>SHOP </span>
            <span className="captalize">Proudly Featured on India's Top Websites</span>
          </h2>
          {/* <h2 className="trust-two-h2">🌞It is a brand.🌞</h2> */}
        </div>
        {isMobile ? (
          <div className="featured-number-row-os">
            <div className="scroll__slider">
              {blogs.length > 0 &&
                blogs.map((blog) => {
                  return (
                    <div className="slide__flex__data" key={blog.id}>
                      {blog.mainImage ? (
                        <Image
                          className="rounded-md lg:w-1/3 w-full cursor-pointer"
                          src={blog.mainImage}
                          alt={blog.mainHeading || "Blog Image"}
                          width={500}
                          height={500}
                          onClick={() => handleChange(blog.img_url)}
                        />
                      ) : (
                        <p>Image Not Found</p>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            //   pagination={{ type: "bullets" }}
            loop
            slidesPerView={slideitem}
          >
            {blogs.length > 0 &&
              blogs.map((blog) => {
                return (
                  <SwiperSlide
                    key={blog.id}
                    className="flex justify-center w-full"
                  >
                    <div className="slide__flex__data">
                      {blog.mainImage ? (
                        <Image
                          className="rounded-md lg:w-1/2 w-full cursor-pointer"
                          src={blog.mainImage}
                          alt={blog.mainHeading || "Blog Image"}
                          width={1000}
                          height={500}
                          onClick={() => handleChange(blog.img_url)}
                        />
                      ) : (
                        <p>Image Not Found</p>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default PressRelesed;
