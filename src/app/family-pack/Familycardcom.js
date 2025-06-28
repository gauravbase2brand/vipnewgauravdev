"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { GoArrowRight } from "react-icons/go";

export default function Familycardcom() {
  const text1 =
    " ✶ Family Pack  ✶ Family Pack   ✶ Family Pack  ✶ Family Pack  ✶ Family Pack   ✶ Family Pack   ✶ Family Pack ";
  const text2 =
    " ✶ Business Pack  ✶ Business Pack  ✶ Business Pack  ✶ Business Pack  ✶ Business Pack  ✶ Business Pack ";
  const repeatedText1 = Array(50).fill(text1).join(" ");
  const repeatedText2 = Array(50).fill(text2).join(" ");

  return (
    <div>
      <div className="bg-[#E7DEFA]">
        
         <div className="relative overflow-hidden flex justify-center items-center md:h-[150px] h-[100px]">
          <div className="relative">
            {/* Top Scrolling Banner */}
            <div className="bg-yellow-400 transform  py-2 w-full z-[3] relative">
              <h4 className="text-black text-2xl font-semibold text-nowrap animate-marquee">
                {repeatedText1}
              </h4>
            </div>
 
            {/* Bottom Static/Decorative Banner */}
            <div className=" h-[48px] text-white font-semibold text-center transform rotate-3 mt-2 z-1 absolute top-0 w-[100%]">
             <h4 className="text-white text-2xl font-semibold text-nowrap animate-marquee bg-primary  py-2">
                {repeatedText1}
              </h4>
            </div>
          </div>
        </div>

        <div className="md:py-4 py-6 m-auto">
          <div className="container-os">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {[
                {
                  fp_cardbg: "/assets/fpmember2.webp",
                  fp_people: "2",
                  fp_carddes:
                    "Two VIP numbers that bring you closer.",
                  btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=2&callCount=0"
                },
                {
                  fp_cardbg: "/assets/fpmember3.webp",
                  fp_people: "3",
                  fp_carddes:
                    "Keep the whole family connected with three special VIP numbers",
                    btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=3&callCount=0"
                },
                {
                  fp_cardbg: "/assets/fpmember4.webp",
                  fp_people: "4",
                  fp_carddes:
                    "One for each family member – because every connection counts.",
                    btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=4&callCount=0"
                },
              ].map((data, index) => (
                <Link href={data.btn_link} target='_blank' key={index}>
                <div  className="w-[95%] m-auto">
                  <div
                    className="bar_card_h bg-cover bg-no-repeat rounded-xl relative cursor-pointer group"
                    style={{ backgroundImage: `url(${data.fp_cardbg})` }}
                  >
                    <div className="py-[10px] md:px-[40px] px-3 bg-[linear-gradient(90deg,_rgba(255,233,139,1)_0%,_rgba(255,206,0,1)_40%)] flex items-center absolute w-[90%] bottom-0 rounded-tr-2xl flex-col max-h-[80%] overflow-hidden h-[24%]  group-hover:md:h-[70%] transition-[height] duration-500 ease-in-out">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <h5 className="text-base lg:text-xl font-medium  familypackfor">
                          Family Pack for
                        </h5>

                          <span className="p-4 bg-primary rounded-full w-[24px] h-[24px] flex items-center justify-center text-white font-semibold">{data.fp_people}</span>
                          <span className='text-base lg:text-xl font-medium  familypackfor'>
                            Members
                          </span>
                        
                        
                       
                        </div>
                       
                        {/* <Image
                          src="/assets/fpuparrow.webp"
                          alt="arrow"
                          width={1000}
                          height={100}
                          className="w-[12%] ml-auto"
                        /> */}
                        <div className='p-4 bg-primary rounded-full w-auto h-[24px] flex items-center justify-center text-white font-semibold '>
                          Go
                          <GoArrowRight />
                        </div>
                      </div>
                      <div className="py-3 border-t-[2px] border-[#565656] mt-3 w-full">
                        <p>{data.fp_carddes}</p>
                        <button className="text-primary pt-[10px] flex items-center">
                          Book Now
                          <Image
                            src="/assets/fpbooknowarrow.webp"
                            alt="arrow"
                            width={1000}
                            height={100}
                            className="w-[24px] ms-[10px]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E7DEFA]">

        <div className="relative overflow-hidden flex justify-center items-center md:h-[150px] h-[100px]">
          <div className="relative">
            {/* Top Scrolling Banner */}
            <div className="bg-yellow-400 transform  py-2 w-full z-[3] relative">
              <h4 className="text-black text-2xl font-semibold text-nowrap animate-marquee">
                {repeatedText2}
              </h4>
            </div>
 
            {/* Bottom Static/Decorative Banner */}
            <div className=" h-[48px] text-white font-semibold text-center transform rotate-3 mt-2 z-1 absolute top-0 w-[100%]">
             <h4 className="text-white text-2xl font-semibold text-nowrap animate-marquee bg-primary  py-2">
                {repeatedText2}
              </h4>
            </div>
          </div>
        </div>

        <div className="md:py-4 py-6 m-auto">
          <div className="container-os">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {[
                {
                  fp_cardbg: "/assets/fpmember5.webp",
                  fp_people: "5",
                  fp_carddes: "For small teams with big ambitions",
                  btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=5&callCount=0"
                },
                {
                  fp_cardbg: "/assets/fpmember6.webp",
                  fp_people: "6",
                  fp_carddes: " Keep your growing business organized with six VIP numbers that ensure professional communication.",
                btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=6&callCount=0"
                },
                {
                  fp_cardbg: "/assets/fpmember7.webp",
                  fp_people: "7",
                  fp_carddes: "For a business ready to expand",
                  btn_link:"/search-results?type=family_pack&searchBy=family_pack&fp_total=7&callCount=0"
                },
              ].map((data, index) => (
                <Link href={data.btn_link} target='_blank' key={index}>
                <div className="w-[95%] m-auto">
                  <div
                    className="bar_card_h bg-cover bg-no-repeat rounded-xl relative cursor-pointer  group"
                    style={{ backgroundImage: `url(${data.fp_cardbg})` }}
                  >
                    <div className="py-[10px] md:px-[40px] px-3 bg-[linear-gradient(90deg,_rgba(255,233,139,1)_0%,_rgba(255,206,0,1)_40%)] flex items-center absolute w-[90%] bottom-0 rounded-tr-2xl flex-col max-h-[80%] overflow-hidden h-[24%] group-hover:md:h-[70%] transition-[height] duration-500 ease-in-out">
                      <div className="w-full flex items-center justify-between">
                        <div className='flex items-center gap-2'>
                         
                        <h5 className="text-base lg:text-xl font-medium  ">
                         Business Pack for
                        </h5>
                         <span className="p-4 bg-primary rounded-full w-[24px] h-[24px] flex items-center justify-center text-white font-semibold">{data.fp_people}</span>
                         <span className='text-base lg:text-xl font-medium'>Members</span>
                        
                        </div>
                      
                       <div className='p-4 bg-primary rounded-full w-auto h-[24px] flex items-center justify-center text-white font-semibold'>
                          Go
                          <GoArrowRight />
                        </div>
                      </div>
                      <div className="py-3 border-t-[2px] border-[#565656] mt-3  w-full">
                        <p>{data.fp_carddes}</p>
                        
                        <button className="text-primary pt-[10px] flex items-center">
                          Book Now
                          <Image
                            src="/assets/fpbooknowarrow.webp"
                            alt="arrow"
                            width={1000}
                            height={100}
                            className="w-[24px] ms-[10px]"
                          />
                        </button>
                      
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

          <style jsx>{`
        .clip-arrow {
          clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
          margin-right: 2px;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 5000s linear infinite;
          white-space: nowrap;
        }
        .bar_card_h{
         height:18rem;
        } 
         @media screen and (max-width:1650px)
         {
         .bar_card_h{
         height:15rem;
        } 
         }
      `}</style>
    </div>
  );
}
