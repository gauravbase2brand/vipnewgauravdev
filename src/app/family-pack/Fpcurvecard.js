"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Fpcurvecard = ({ main_card_bgimg, des_text, bg_color_p1, bg_color_c1, bg_color_p2, bg_color_c2, c_cardimg, card_text_color, c_card_title, c_card_des, bg_ph,cruve_btn_bg,card_btn_link }) => {
  return (
    <>
      <div className={`container-os mx-auto relative sim_card_img ${bg_ph} md:bg-transparent rounded-2xl`}>
        <Image
          src={main_card_bgimg}
          alt="bgimg"
          width={1000}
          height={500}
          className='h-[100%] hidden md:block'
        />
        <div className="grid  md:grid-cols-2 items-center md:absolute top-0 h-[100%]">
          <div className={`${bg_color_p1}  rounded-tl-[50px]  rounded-bl-[50px]`}>
            <div className={`${bg_color_c1} rounded-tl-[50px]  rounded-bl-[50px] rounded-tr-[50%]`}>
              <Image
                src={c_cardimg}
                alt="card_img"
                width={1000}
                height={500}
                className='w-[75%] m-auto py-[5%]'
              />
            </div>
          </div>
          <div className={`${bg_color_p2} h-[100%] rounded-tr-[50px] rounded-br-[50px] pb-4 md:pb-0`}>
            <div className={`${bg_color_c2} h-[100%]  rounded-tr-[50px] rounded-br-[50px] flex items-center rounded-bl-[50%]`}>
              <div className='ps-[4%] pe-[4%] md:pe-[10%] text-center md:text-start pt-0 md:pt-[17%]'>
                <div className={`text-3xl 2xl:text-4xl font-semibold pb-2 ${card_text_color}`}>
                  {c_card_title}
                </div>
                <div>
                  <p className={`font-normal text-[16px] leading-[24px]  md:text-[16px] md:leading-[30px] xl:text-[21px] xl:leading-[34px] ${des_text}`}>
                    {c_card_des}
                  </p>
                </div>
                <Link href={card_btn_link}>
                  <div className='m-auto pt-4 pb-4'>
                    <div className={`cursor-pointer w-max text-center md:text-[16px] leading-5 ${cruve_btn_bg} rounded-md  lg:p-3 lg:font-bold  p-1  text-[13px] font-medium mx-auto lg:mx-0 flex items-center justify-center`}>
                      <p className='py-2 px-4 lg:px-4 lg:py-1 xl:text-[18px] 2xl:text-[20px]'>Book Now</p>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
      <style jsx>{`
    @media screen and (max-width:1600px)
    {
    .sim_card_img
    {
      height:500px;
    }
    }
     @media screen and (max-width:1400px)
    {
    .sim_card_img
    {
      height:auto;
    }
    @media screen and (max-width:1024px)
    {
    .sim_card_img
    {
      height:350px;
    }
    @media screen and (max-width:768px)
    {
    .sim_card_img
    {
      height:auto;
    }
    }
    `}

      </style>

    </>
  );
};

export default Fpcurvecard;
