import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import debounce from "lodash/debounce";

function PriceNumber() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 767); // Detect if screen width is <= 767px
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Attach event listener
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
      handleResize.cancel(); // Cancel pending debounce calls
    };
  }, []);

  const playlists = [
    {
      id: 1,
      title: "Below 2500",
      minPrice: 1400,
      maxPrice: 2500,
      images: "budget1",
    },
    {
      id: 2,
      title: "2300/- to 4000/-",
      minPrice: 2300,
      maxPrice: 4000,
      images: "budget2",
    },
    {
      id: 3,
      title: "4000/- to 7500/-",
      minPrice: 4000,
      maxPrice: 7500,
      images: "budget3",
    },
    {
      id: 4,
      title: "7000/- to 13500/-",
      minPrice: 7000,
      maxPrice: 13500,
      images: "budget4",
    },
    {
      id: 5,
      title: "12000/- to 20000/-",
      minPrice: 12000,
      maxPrice: 20000,
      images: "budget5",
      priceRange: "Top Selling Range",
    },
    {
      id: 6,
      title: "18000/- to 35000/-",
      minPrice: 18000,
      maxPrice: 35000,
      images: "budget6",
      priceRange: "Top Selling Range",
    },
    {
      id: 7,
      title: "30000 /- to 65000/-",
      minPrice: 30000,
      maxPrice: 65000,
      images: "budget7",
    },
    {
      id: 8,
      title: "60000 /- to 125000/-",
      minPrice: 60000,
      maxPrice: 125000,
      images: "budget8",
    },
    {
      id: 9,
      title: "100000  /- to 260000/-",
      minPrice: 100000,
      maxPrice: 260000,
      images: "budget9",
    },
    {
      id: 10,
      title: "200000  /- to 500000/-",
      minPrice: 200000,
      maxPrice: 500000,
      images: "budget10",
    },
    {
      id: 11,
      title: "Above 3,50,000",
      minPrice: 350000,
      maxPrice: 5000000,
      images: "budget11",
    },
  ];

  // const handleClick = (minPrice, maxPrice) => {
  //   history.push(
  //     `/search-results?searchBy=price&min_price=${minPrice}&max_price=${maxPrice}&callCount=0`
  //   );
  // };

  return (
    <div id="fit-budget" className="mb-3">
      <div className="bg-primary  text-white text-center py-3 font-bold relative mt-2">
        <h2 className="text-xl sm:text-2xl">VIP Number in Budget</h2>
      </div>

      <div className="">
        <div className="featured-number-row-os budget-prices">
          {isMobile ? (
            <div className="scroll__slider">
              {playlists.map((playlist, index) => (
                <div className="slide__flex__data" key={index}>
                  <Link
                    href={`/search-results?searchBy=price&min_price=${playlist.minPrice}&max_price=${playlist.maxPrice}&callCount=0&comingsoon=yes&star_status=true`}
                  >
                    <div
                      className="flex justify-center card bg-primary text-white  p-4 rounded-lg shadow-lg transform transition-transform duration-300  hover:shadow-2xl hover:bg-secondary mt-5 h-[230px] w-[160px] relative"
                      style={{
                        backgroundImage: `url(${panelImg}/assets/img/vip-images/${playlist.images}.webp)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* <div
                        className={`card-body flex  items-center ${
                          playlist.priceRange
                            ? "justify-between"
                            : "justify-center"
                        }`}
                      >
                        <div className="text-center">
                          <h2 className="card-title text-[17px] font-[900] mb-4">
                            {playlist.minPrice} /-
                          </h2>
                          <p className="text-base mb-4 text-[17px] font-[900]">
                            to
                          </p>
                          <h2 className="card-title text-[17px] font-[900] mb-4">
                            {playlist.maxPrice} /-
                          </h2>
                          {playlist.priceRange && (
                            <h5 className="underline text-[14px] font-[900] mb-2 text-center">
                              Top Selling <br /> Range
                            </h5>
                          )}
                        </div>
                      </div> */}
                       {/* <span className="absolute bottom-0  underline font-medium blink-zoom bg-white text-black p-1 rounded text-[12px]">
                        Click Here
                      </span> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <Splide
              options={{
                type: "loop", // Looping slider
                perPage: 4, // Show 4 items at a time for larger screens
                gap: "1rem", // Gap between the slides
                pagination: false, // Disable pagination
                arrows: false, // Disable navigation arrows
                autoplay: true, // Enable autoplay
                interval: 3000, // Time between each slide in milliseconds (3 seconds)
                pauseOnHover: true, // Pause on hover
                speed: 400, // Transition speed between slides in milliseconds
                breakpoints: {
                  640: {
                    perPage: 2, // Show 2 items on mobile
                  },
                  1024: {
                    perPage: 3, // Show 3 items on tablets or smaller desktops
                  },
                },
              }}
            >
              {playlists.map((playlist, index) => (
                <SplideSlide key={playlist.id}>
                  <Link
                    href={`/search-results?searchBy=price&min_price=${playlist.minPrice}&max_price=${playlist.maxPrice}&callCount=0&comingsoon=yes&star_status=true`}
                  >
                    <div
                      className="card bg-primary text-white w-[280px] h-[400px] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:translate-y-1 hover:shadow-2xl hover:bg-secondary my-5 flex itome-center justify-center border-2 border-secondary hover:border-primary hover:text-darktext relative"
                      style={{
                        backgroundImage: `url(${panelImg}/assets/img/vip-images/${playlist.images}.webp)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* <div
                        className={`card-body flex  items-center   itome-center ${playlist.priceRange
                            ? "justify-between"
                            : "justify-center"
                          }`}
                      >
                        <div className="text-center">
                          <h2 className="card-title text-[2rem] font-bold mb-4">
                            {playlist.minPrice} /-
                          </h2>
                          <p className="text-base mb-4 text-[2rem]">to</p>
                          <h2 className="card-title text-[2rem] font-bold mb-4">
                            {playlist.maxPrice} /-
                          </h2>
                          {playlist.priceRange && (
                            <h5 className="text-lg font-bold mb-2">
                              {playlist.priceRange}
                            </h5>
                          )}
                        </div>
                      </div> */}
                      {/* <span className="absolute bottom-0 bg-white underline font-medium blink-zoom text-black p-1 rounded text-[12px]">
                        Click Here
                      </span> */}
                    </div>
                  </Link>
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
      </div>
    </div>
  );
}

export default PriceNumber;
