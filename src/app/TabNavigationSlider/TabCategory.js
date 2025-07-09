import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CategoryPopup from "./CategoryPopup";

const TabCategory = ({
  FamilyPackSettings,
  homePageclick,
  arrayOfArrays,
  handleCategoryLink,
  catModalOpen,
  setCatModalOpen,
  similarLoader,
  pathname,
  skeleton,
}) => {
  const splideRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for resize
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLeftArrowClick = () => {
    setCatModalOpen(true);
  };

  useEffect(() => {
    if (isMobile) return; // only on desktop
    const splide = splideRef.current?.splide;
    if (!splide) return;

    // grab the built-in prev arrow
    const prev = splide.root.querySelector(".splide__arrow--prev");
    const next = splide.root.querySelector(".splide__arrow--next");
    if (!prev || !next) return;

    // whenever the slide index changes...
    const update = (idx) => {
      // hide at 0, show otherwise
      prev.style.visibility = idx > 0 ? "visible" : "hidden";
      next.style.visibility = idx < splide.length - 5 ? "visible" : "hidden";
    };

    // run once for initial state
    update(splide.index);
    // then hook into moved
    splide.on("moved", update);
    return () => splide.off("moved", update);
  }, [isMobile]);

  return (
    <div className="popgk relative">
      {/* {/ Custom Left Arrow /} */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary  text-white p-[5px_7px] rounded-full block sm:hidden"
        onClick={handleLeftArrowClick}
      >
        <FontAwesomeIcon icon={faChevronDown} size="lg" />
      </button>
      <Splide
        ref={splideRef}
        options={{ ...FamilyPackSettings, arrows: !isMobile }}
      >
        {/* {/ Hide default arrows /} */}
        <SplideSlide key="all-tab">
          <Link
            href="/"
            className={`h-[41px] text-[14px] leading-[41px] p-2 m-[6px] rounded-md ml-[40px] bg-[#e4e4e4] ${
              pathname === "/" ? "bg-black text-white" : ""
            }`}
            onClick={homePageclick}
          >
            All
          </Link>
        </SplideSlide>
        {arrayOfArrays.map((subArray) =>
          subArray.map((element, elementIndex) => {
            const currentPath = pathname;
            const categoryUrl = currentPath.split("/")[2];
            const isSelected = categoryUrl == element?.detail?.slug;

            return (
              <SplideSlide key={`element-${elementIndex}`}>
                <Link
                  href={`/category/${
                    element?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
                  }`}
                  onClick={() => handleCategoryLink(element)}
                  className={`h-[41px] text-[14px] leading-[41px] p-2 m-[6px] rounded-[30px] cursor-pointer
                    ${
                      isSelected && currentPath !== "/"
                        ? "bg-black text-white"
                        : "bg-[#e4e4e4] text-black"
                    }
                    `}
                >
                  {element.name}
                </Link>
              </SplideSlide>
            );
          })
        )}
      </Splide>
      {/* Modal category*/}
      {catModalOpen && (
        <CategoryPopup
          setCatModalOpen={setCatModalOpen}
          arrayOfArrays={arrayOfArrays}
          handleCategoryLink={handleCategoryLink}
          similarLoader={similarLoader}
        />
      )}
    </div>
  );
};

export default TabCategory;
