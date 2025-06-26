"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const panelImg = process.env.NEXT_PUBLIC_IMAGES;
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed left-5 bottom-20 z-50 flex items-center justify-center rounded-full bg-secondary  p-3 md:bottom-16 md:left-4 lg:bottom-24 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    aria-label="Scroll to top"
                >
                     <Image 
                      src={`${panelImg}/assets/img/vip-images/scrolltotop_1_py7oim.webp`}
                      alt="acroll arrow"
                      width={300}
                      height={100}
                      style={{
                        width:"40px",
                        height:"40px"
                      }}
                      priority="true"
                     />
                </button>
            )}
        </>
    );
}
