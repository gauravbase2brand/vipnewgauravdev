"use client"
import Image from 'next/image';
import React from 'react'

export default function Familypackclientreview() {
    const row1 = [
        {
            id: 1,
            title_char: "S",
            cusomer_name: "Sneha Patel",
            cusomer_comment: "The family pack exceeded my expectations. It’s made communication more fun!",
            rating: "5"
        },
        {
            id: 2,
            title_char: "V",
            cusomer_name: "Vikas Rana",
            cusomer_comment: "As a small business owner, I wanted a number that’s easy for clients to remember. The business pack from VIP Number Shop did just that. It's elevated our brand image and made communication seamless.",
            rating: "5"
        },
        {
            id: 3,
            title_char: "N",
            cusomer_name: "Neha",
            cusomer_comment: "Loved the family pack! Simple numbers, easy to dial, and perfect for staying connected. Will buy again!",
            rating: "4"
        },
        {
            id: 4,
            title_char: "R",
            cusomer_name: "Ramesh Kumar",
            cusomer_comment: "The business number boosted my brand image—sleek, memorable, and super professional. VIP Number Shop nailed it!",
            rating: "5"
        },
    ];
    const row2 = [
        {
            id: 1,
            title_char: "S",
            cusomer_name: "Sneha Patel",
            cusomer_comment: "The family pack exceeded my expectations. It’s made communication more fun!",
            rating: "5"
        },
        {
            id: 2,
            title_char: "V",
            cusomer_name: "Vikas Rana",
            cusomer_comment: "As a small business owner, I wanted a number that’s easy for clients to remember. The business pack from VIP Number Shop did just that. It's elevated our brand image and made communication seamless.",
            rating: "5"
        },
        {
            id: 3,
            title_char: "N",
            cusomer_name: "Neha",
            cusomer_comment: "Loved the family pack! Simple numbers, easy to dial, and perfect for staying connected. Will buy again!",
            rating: "4"
        },
        {
            id: 4,
            title_char: "R",
            cusomer_name: "Ramesh Kumar",
            cusomer_comment: "The business number boosted my brand image—sleek, memorable, and super professional. VIP Number Shop nailed it!",
            rating: "5"
        },
    ];
    const row3 = [
        {
            id: 1,
            title_char: "S",
            cusomer_name: "Sneha Patel",
            cusomer_comment: "The family pack exceeded my expectations. It’s made communication more fun!",
            rating: "5"
        },
        {
            id: 2,
            title_char: "V",
            cusomer_name: "Vikas Rana",
            cusomer_comment: "As a small business owner, I wanted a number that’s easy for clients to remember. The business pack from VIP Number Shop did just that. It's elevated our brand image and made communication seamless.",
            rating: "5"
        },
        {
            id: 3,
            title_char: "N",
            cusomer_name: "Neha",
            cusomer_comment: "Loved the family pack! Simple numbers, easy to dial, and perfect for staying connected. Will buy again!",
            rating: "4"
        },
        {
            id: 4,
            title_char: "R",
            cusomer_name: "Ramesh Kumar",
            cusomer_comment: "The business number boosted my brand image—sleek, memorable, and super professional. VIP Number Shop nailed it!",
            rating: "5"
        },
    ];
    return (
        <div className='max-w-screen-2xl md:py-12  py-6 m-auto'>
            <div className="container-os pb-0 !md:pb-5">
                <h2 className='font-semibold text-[26px] md:text-[32px] lg:text-[35px] text-HeadingText leading-[1.3] lg:leading-[1.2] mb-0 lg:mb-6 text-center'>
                    Voices of Satisfaction <br />
                    <span className="bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                      What Our Customers Say
                    </span>
                </h2>
            </div>
            <div className="container-os flex flex-wrap !my-7 !md:my-12 h-[70vh] overflow-hidden relative">
                <div className='absolute left-0 z-10 hidden h-[120px] w-full sm:block'
                    style={{ background: 'linear-gradient(0deg,rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 81%)' }}></div>
                <div className=' w-full md:w-[33%] review_animation'>
                    {
                        row1.map((data, index) => (
                            <div className='bg-secondary my-5 text-center py-[10%] px-[7%] w-[80%] m-auto rounded-[15px]' key={index}>
                                <div className='my-3 w-[48px] h-[48px] mx-auto flex justify-center items-center bg-primary rounded-[50%]'>
                                    <p className='text-white font-medium text-[20px]'>{data.title_char}</p>
                                </div>
                                <div className='my-2'>
                                    <p className='text-[22px] font-semibold'>{data.cusomer_name}</p>
                                </div>
                                <div className='mb-2'>
                                    <p>{data.cusomer_comment}</p>
                                </div>
                                <div className='flex justify-center'>
                                    {
                                        data.rating == "5" ?
                                            <Image
                                                src="/assets/familyrating5.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[45%] h-[30px] object-contain'
                                            />
                                            :
                                            <Image
                                                src="/assets/fmailyrating4.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[40%] h-[30px] object-contain'
                                            />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className=' w-full md:w-[33%] review_animation_reverce'>
                    {
                        row2.map((data, index) => (
                            <div className='bg-secondary my-5 text-center py-[10%] px-[7%] w-[80%] m-auto rounded-[15px]' key={index}>
                                <div className='my-3 w-[48px] h-[48px] mx-auto flex justify-center items-center bg-primary rounded-[50%]'>
                                    <p className='text-white font-medium text-[20px]'>{data.title_char}</p>
                                </div>
                                <div className='my-2'>
                                    <p className='text-[22px] font-semibold'>{data.cusomer_name}</p>
                                </div>
                                <div className='mb-2'>
                                    <p>{data.cusomer_comment}</p>
                                </div>
                                <div className='flex justify-center'>
                                    {
                                        data.rating == "5" ?
                                            <Image
                                                src="/assets/familyrating5.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[45%] h-[30px] object-contain'
                                            />
                                            :
                                            <Image
                                                src="/assets/fmailyrating4.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[40%] h-[30px] object-contain'
                                            />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className=' w-full md:w-[33%] review_animation'>
                    {
                        row3.map((data, index) => (
                            <div className='bg-secondary my-5 text-center py-[10%] px-[7%] w-[80%] m-auto rounded-[15px]' key={index}>
                                <div className='my-3 w-[48px] h-[48px] mx-auto flex justify-center items-center bg-primary rounded-[50%]'>
                                    <p className='text-white font-medium text-[20px]'>{data.title_char}</p>
                                </div>
                                <div className='my-2'>
                                    <p className='text-[22px] font-semibold'>{data.cusomer_name}</p>
                                </div>
                                <div className='mb-2'>
                                    <p>{data.cusomer_comment}</p>
                                </div>
                                <div className='flex justify-center'>
                                    {
                                        data.rating == "5" ?
                                            <Image
                                                src="/assets/familyrating5.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[45%] h-[30px] object-contain'
                                            />
                                            :
                                            <Image
                                                src="/assets/fmailyrating4.webp"
                                                alt='rating'
                                                width={1000}
                                                height={300}
                                                className='w-[40%] h-[30px] object-contain'
                                            />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='absolute left-0 bottom-0 z-10 hidden h-[120px] w-full sm:block'
                    style={{ background: 'linear-gradient(0deg, rgb(255 255 255) 0%, rgb(255 255 255 / 0%) 81%)' }}></div>
            </div>
            <style jsx>{`
                @keyframes marquee_review {
                 0% {
                     transform: translateY(0%);
                    }
                 100% {
                     transform: translateY(-50%);
                    }
                }
                .review_animation {
                 animation: marquee_review 20s linear infinite;
                }
                @keyframes marquee_reverce { 
                 0% {
                     transform: translateY(-50%);
                    }
                 100% {
                     transform: translateY(0%);
                    }
                }
                .review_animation_reverce {
                 animation: marquee_reverce 20s linear infinite;
                }
          
        }
             `}</style>
        </div>
    )
}
