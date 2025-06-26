"use client"
import React from 'react'
import NumerologyTrustedNumerology from '../numerology/NumerologyTrustedNumerology';
import Link from 'next/link';
export default function Fpsider() {
    const sliderdata = [
        { id: 1, leftimg: `/assets/fpsliderimg1.webp`, fpdes: "Match Your Mobile Number with Your Car Number" },
        { id: 2, leftimg: `/assets/fpsliderimg2.webp`, fpdes: "Match Your Mobile Number with Your House Number" },
        { id: 3, leftimg: `/assets/fpsliderimg3.webp`, fpdes: "Match Your Mobile Number with Your Superbike" },
        // duplicate for working slider
        { id: 4, leftimg: `/assets/fpsliderimg1.webp`, fpdes: "Match Your Mobile Number with Your Car Number" },
        { id: 5, leftimg: `/assets/fpsliderimg2.webp`, fpdes: "Match Your Mobile Number with Your House Number" },
        { id: 6, leftimg: `/assets/fpsliderimg3.webp`, fpdes: "Match Your Mobile Number with Your Superbike" }
    ];
    return (
        <div>
            <NumerologyTrustedNumerology
                title={
                    <>
                        Pick Your
                        <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                            Perfect
                        </span>{" "}
                        Number!
                    </>
                }
                sliderData={sliderdata}
            />
            {/* <Link href="/search-results?type=advanced&start_with=9%2C8%2C7%2C6&callCount=0&searchBy=digit&comingsoon=yes&star_status=true">
          <div className='m-auto pt-4 pb-4'>
             <div className='cursor-pointer w-max m-auto text-center md:text-[16px] leading-5 bg-primary text-white hover:bg-secondary hover:text-black  rounded-md  lg:p-3 lg:font-bold  p-1  text-[13px] font-medium flex items-center justify-center'>
                <p className='py-2 px-4 lg:px-4 lg:py-1'>Book Now</p>
            </div>
          </div>
          </Link> */}
        </div>
    )
}
