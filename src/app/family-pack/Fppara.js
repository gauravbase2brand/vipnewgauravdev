"use client"
import Image from 'next/image'
import React from 'react'

export default function Fppara() {
    return (
        <div className='bg-secondary'>
            <div className='container-os flex flex-col lg:flex-row'>
                <div className='pt-8 pb-10 max-w-screen-xl m-auto  lg:border-r-[3px] border-dashed border-[var(--primary)]'>
                    <h2 className='font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6 underline md:no-underline'>
                        Benefits of Choosing the<br />
                        <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                            Family Pack</span>
                    </h2>
                    <div className='flex px-[4%] md:px-[10%] gap-4 mb-5'>
                        <div>
                            <Image
                                src="/assets/fpblastimg.webp"
                                alt='image'
                                width={1000}
                                height={500}
                                className='w-[85px] md:w-[45px]'
                            />
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold text-primary pb-3'>A Touch of Home:</h2>
                            <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext'>
                                The Family Pack makes staying connected effortless, keeping your loved ones close no matter the distance. Every call is a reminder that family is always within reach.
                            </p>
                        </div>
                    </div>
                    <div className='flex px-[4%] md:px-[10%] gap-4'>
                        <div>
                            <Image
                                src="/assets/fpblastimg.webp"
                                alt='image'
                                width={1000}
                                height={500}
                                className='w-[85px] md:w-[45px]'
                            />
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold text-primary pb-3'>A Legacy of Love:</h2>
                            <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext'>
                                Give each family member a unique number that symbolizes your bond. It’s not just about communication—it’s about creating memories that last a lifetime.
                            </p>
                        </div>
                    </div>

                </div>
                <div className='pt-5 pb-12 max-w-screen-xl m-auto'>
                    <h2 className='font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6 underline md:no-underline'>
                        Benefits of Choosing the<br />
                        <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                            Business Pack</span>
                    </h2>
                    <div className='flex px-[4%] md:px-[10%] gap-4 mb-5'>
                        <div>
                            <Image
                                src="/assets/fpblastimg.webp"
                                alt='image'
                                width={1000}
                                height={500}
                                className='w-[85px] md:w-[45px]'
                            />
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold text-primary pb-3'>Craft Your Story:</h2>
                            <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext'>
                                The Business Pack is more than just a number; it’s an opportunity to make your brand unforgettable, showcasing professionalism and trust at every turn.
                            </p>
                        </div>
                    </div>
                    <div className='flex px-[4%] md:px-[10%] gap-4'>
                        <div>
                            <Image
                                src="/assets/fpblastimg.webp"
                                alt='image'
                                width={1000}
                                height={500}
                                className='w-[85px] md:w-[45px]'
                            />
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold text-primary pb-3'>Efficiency, Redefined:</h2>
                            <p className='font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext'>
                                Streamline your communication with unique numbers for your team. It means quicker collaboration and a company always ready to serve its clients seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
