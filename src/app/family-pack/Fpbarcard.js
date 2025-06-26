"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from "swiper/modules";
import "swiper/css";
import Image from 'next/image'

const Fpbarcard = ({ slider_data=[] ,dirprops }) => {
    const [slideitem, setSlideItem] = useState(3);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 660) {
                setSlideItem(1);
            } else if (window.innerWidth < 1025) {
                setSlideItem(2);
            } else {
                setSlideItem(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (

        <div>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}  
                speed={1000}
                modules={[Autoplay]}
                slidesPerView={slideitem}
                centeredSlides={true}
                    dir={dirprops === false ? "rtl" : undefined}
                >
                {
                    slider_data.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div className='border-[1px] m-2 border-[#AEAEAE] rounded-2xl p-6 h-[100%] bg-primary flex flex-col justify-evenly min-h-[218px]'>
                                <div className='w-max p-3 rounded-[50%] bg-white mb-2'>
                                    <Image
                                        src={data.barcard_img}
                                        alt={data.barcard_title}
                                        width={1000}
                                        height={500}
                                        className='w-[42px] h-[42px] object-contain'
                                    />
                                </div>
                                <div>
                                    <p className='text-secondary font-semibold text-lg'>
                                        {data.barcard_title}
                                    </p>
                                </div>
                                <div>
                                    <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[25px] text-white'>
                                        {data.barcard_des}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div >
    )
}

export default Fpbarcard
