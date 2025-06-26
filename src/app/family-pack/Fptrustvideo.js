"use client"
import React from 'react'
import TrustVideo from '../influencer/TrustVideo'

export default function Fptrustvideo() {
    return (
        <div className='container-os !pt-6 !pb-12'>
            <div className='container-os grid grid-cols-1 lg:grid-cols-2'>
                <div className='flex  flex-col md:pb-0 pb-5'>
                    <div>
                        <h2 className='font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-start leading-[1.3] lg:leading-[1.2] mb-4 lg:mb-6 2xl:text-[38px]'>
                            <span>
                                <span className=" bg-[url('/assets/118.webp')]  bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                                    We Care, We Deliver <br />
                                </span> for Your
                                Trusted Partner Always
                            </span>
                        </h2>
                        <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] 2xl:text-[18px] md:leading-[25px] text-darktext'>
                            Trusted by over 10+ lakh happy customers, VIP Number Shop delivers 2,500 <br /> premium numbers daily. Join the elite choosing memorable VIP numbers!
                        </p>
                    </div>
                </div>
                <div>
                    <TrustVideo />
                </div>
            </div>

        </div>
    )
}
