// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css/navigation";
// import "swiper/css";
// import "swiper/css/pagination";

// export default function NumerologyClient() {
//   const apiUrl = process.env.NEXT_PUBLIC_IMAGES;

//   const sliderData = [
//     // Add YouTube Shorts URLs in the sliderData with the hidden UI parameters
//     { id: 0, src: "https://www.youtube.com/embed/3VIt5tYZecE?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//     { id: 1, src: "https://www.youtube.com/embed/sNZbhy-2JFQ?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//     { id: 2, src: "https://www.youtube.com/embed/1J5QBi0Ct-o?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//     { id: 3, src: "https://www.youtube.com/embed/KsyhpyP8S5s?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//     { id: 4, src: "https://www.youtube.com/embed/FGH51hrQX1o?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//     { id: 5, src: "https://www.youtube.com/embed/HayG58Q_t1M?controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&autohide=1" },
//   ];

//   const [slideItem, setSlideItem] = useState(4);
//   const videoRefs = useRef({}); // Store video refs for each slide

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 660) {
//         setSlideItem(2);
//       } else if (window.innerWidth < 1025) {
//         setSlideItem(2);
//       } else {
//         setSlideItem(4);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Function to handle play/pause on click
//   const handleVideoClick = (id) => {
//     const video = videoRefs.current[id];
//     if (video) {
//       if (video.paused) {
//         // Pause all other videos before playing the clicked one
//         Object.values(videoRefs.current).forEach((v) => v?.pause());
//         video.play();
//       } else {
//         video.pause();
//       }
//     }
//   };

//   return (
//     <div className="lg:py-9 py-5">
//       <div className="relative container-os">
//         <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-1/2 mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6">
//           Client <span className="text-primary whitespace-nowrap">Success Story</span>
//         </h2>

//         <Swiper
//           loop={true}
//           pagination={{ clickable: true, type: "bullets" }}
//           speed={1000}
//           navigation={true}
//           modules={[Autoplay, Pagination, Navigation]}
//           slidesPerView={slideItem}
//           centeredSlides={true}
//         >
//           {sliderData.map((item) => (
//             <SwiperSlide key={item.id} className="flex justify-center items-center">
//               {({ isActive }) => (
//                 <div
//                   className={`relative w-full flex justify-center transition-all duration-500 ${isActive ? "scale-100 z-10 rounded-2xl" : "scale-90 opacity-90"}`}
//                 >
//                   {/* Embed YouTube Shorts using iframe */}
//                   <iframe
//                     ref={(el) => (videoRefs.current[item.id] = el)} // Store ref for each video
//                     width="100%"
//                     height="auto"
//                     className="rounded-lg transition-all duration-500 lg:h-[500px] h-auto object-contain cursor-pointer w-fit border-2 border-primary"
//                     src={item.src} // Use the YouTube Shorts URL with the UI removed
//                     frameBorder="0"
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                     title={`Video ${item.id}`}
//                     onClick={() => handleVideoClick(item.id)} // Click to play/pause
//                   ></iframe>
//                 </div>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <style jsx>{`
//         /* Hide navigation buttons */
//         :global(.swiper-button-prev),
//         :global(.swiper-button-next) {
//           display: none !important;
//         }

//         /* Adjust pagination position */
//         :global(.swiper-pagination) {
//           position: relative !important;
//           text-align: center;
//           transition: 300ms opacity;
//           transform: translate3d(0, 0, 0);
//           z-index: 10;
//           bottom: -5px !important;
//         }

//         /* Fix pagination bullet styling */
//         :global(.swiper-pagination-bullet) {
//           background: #ccc !important;
//           width: 10px !important;
//           height: 10px !important;
//           border-radius: 50% !important;
//           transition: all 0.3s ease-in-out;
//         }

//         :global(.swiper-pagination-bullet-active) {
//           background: var(--primary) !important;
//           width: 20px !important;
//           height: 5px !important;
//           border-radius: 0 !important;
//         }

//         :global(.swiper-pagination-bullet) {
//           width: 20px !important;
//           border-radius: unset !important;
//           height: 5px !important;
//         }

//       `}</style>
//     </div>
//   );
// }




"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";

export default function NumerologyClient() {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES;

  const sliderData = [
    { id: 0, src: "/assets/img/vip-images/Sonali Video (1).mp4" },
    { id: 1, src: "/assets/img/vip-images/Rani Testimonial (1).mp4" },
    { id: 2, src: "/assets/img/vip-images/video4.mp4" },
    { id: 3, src: "/assets/img/vip-images/Priya Testimonial.mp4" },
    { id: 4, src: "/assets/img/vip-images/Parshali.mp4" },
    { id: 5, src: "/assets/img/vip-images/Parveen.mp4" },
  ];

  const [slideItem, setSlideItem] = useState(4);
  const videoRefs = useRef({}); // Store video refs for each slide

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

  // Function to handle play/pause on click
  const handleVideoClick = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        // Pause all other videos before playing the clicked one
        Object.values(videoRefs.current).forEach((v) => v?.pause());
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className="lg:py-9 py-5">
      <div className="relative container-os">
        <h2 className="font-semibold text-[26px] md:text-[32px] lg:text-[35px]  text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70% xl:w-1/2  mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6">
          Client <span className="text-primary whitespace-nowrap">Success Story</span>
        </h2>

        <Swiper
          loop={true}
          pagination={{ clickable: true, type: "bullets" }}
          speed={1000}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={slideItem}
          centeredSlides={true}
        >
          {sliderData.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center items-center">
              {({ isActive }) => (
                <div
                  className={`relative w-full flex justify-center transition-all duration-500 ${isActive ? "scale-100 z-10 rounded-2xl" : "scale-90 opacity-90"}`}
                >
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)} // Store ref for each video
                    width="100%"
                    height="auto"
                    className="rounded-lg transition-all duration-500 lg:h-[500px]  h-auto object-contain cursor-pointer w-fit border-2 border-primary"
                    loop
                    // muted={!isActive}
                    // autoPlay={isActive}
                    playsInline
                    onClick={() => handleVideoClick(item.id)} // Click to play/pause
                  >
                    <source src={`${apiUrl}${item.src}`} type="video/mp4" />
                  </video>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        /* Hide navigation buttons */
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          display: none !important;
        }

        /* Adjust pagination position */
        :global(.swiper-pagination) {
          position: relative !important;
          text-align: center;
          transition: 300ms opacity;
          transform: translate3d(0, 0, 0);
          z-index: 10;
          bottom: -5px !important;
        }

        /* Fix pagination bullet styling */
        :global(.swiper-pagination-bullet) {
          background: #ccc !important;
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease-in-out;
        }

        :global(.swiper-pagination-bullet-active) {
          background: var(--primary) !important;
          width: 20px !important;
          height: 5px !important;
          border-radius: 0 !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 20px !important;
          border-radius: unset !important;
          height: 5px !important;
        }
      `}</style>
    </div>
  );
}
