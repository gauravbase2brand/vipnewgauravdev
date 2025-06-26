import React from 'react'
import Fpcurvecard from './Fpcurvecard'

export default function Fpcard() {
  return (
    <>
      <div className='py-5'>
        <h2 className='font-semibold text-[26px] md:text-[32px] 2xl:text-[38px] lg:text-[35px] text-HeadingText text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto leading-[1.3] lg:leading-[1.5] mb-4 lg:mb-6'>
          Why Choose  <br />
          <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
          Family Pack & Business Pack?</span>
        </h2>
      </div>
      <div className='container-os mx-auto relative'>
        {/* card 1 */}
        <div className='pb-10 top-[20vh] sticky'>
          <Fpcurvecard
            main_card_bgimg="/assets/fpcardbgyellow.webp"
            bg_color_p1="bg-primar"
            bg_color_c1="bg-secondar"
            bg_color_p2="bg-secondar"
            bg_color_c2="bg-primar"
            c_cardimg='/assets/fpcardimg1.webp'
            card_text_color="text-primary"
            c_card_title="A Touch of Home"
            c_card_des="The Family Pack makes staying connected effortless, keeping your loved ones close no matter the distance. Every call is a reminder that family is always within reach."
            des_text="text-darktext"
            bg_ph="bg-secondary"
            cruve_btn_bg="bg-primary text-white"
            card_btn_link="/search-results?type=family_pack&searchBy=family_pack&fp_total=3&callCount=0"
          />
        </div>
        <div className='pb-10 top-[20vh] sticky'>
          <Fpcurvecard
            main_card_bgimg="/assets/fpcardbgperple.webp"
            bg_color_p1="bg-primar"
            bg_color_c1="bg-secondar"
            bg_color_p2="bg-secondar"
            bg_color_c2="bg-primar"
            c_cardimg='/assets/fpcardimg2.webp'
            card_text_color="text-secondary"
            c_card_title="A Legacy of Love"
            c_card_des="Give each family member a unique number that symbolizes your bond. It’s not just about communication—it’s about creating memories that last a lifetime."
            des_text="text-white"
            bg_ph="bg-primary"
            cruve_btn_bg="bg-secondary text-darktext"
             card_btn_link="/search-results?type=family_pack&searchBy=family_pack&fp_total=3&callCount=0"
          />
        </div>
        <div className='pb-10 top-[20vh] sticky'>
          <Fpcurvecard
            main_card_bgimg="/assets/fpcardbgyellow.webp"
            bg_color_p1="bg-primar"
            bg_color_c1="bg-secondar"
            bg_color_p2="bg-secondar"
            bg_color_c2="bg-primar"
            c_cardimg='/assets/fpcardimg3.webp'
            card_text_color="text-primary"
            c_card_title="Craft Your Story"
            c_card_des="The Business Pack is more than just a number; it’s an opportunity to make your brand unforgettable, showcasing professionalism and trust at every turn."
            des_text="text-darktext"
            bg_ph="bg-secondary"
            cruve_btn_bg="bg-primary text-white"
             card_btn_link="/search-results?type=family_pack&searchBy=family_pack&fp_total=3&callCount=0"
          />
        </div>
        <div className='pb-10 top-[20vh] sticky'>
          <Fpcurvecard
            main_card_bgimg="/assets/fpcardbgperple.webp"
            bg_color_p1="bg-primar"
            bg_color_c1="bg-secondar"
            bg_color_p2="bg-secondar"
            bg_color_c2="bg-primar"
            c_cardimg='/assets/fpcardimg4.webp'
            card_text_color="text-secondary"
            c_card_title="Efficiency, Redefined"
            c_card_des="Streamline your communication with unique numbers for your team. It means quicker collaboration and a company always ready to serve its clients seamlessly."
            des_text="text-white"
            bg_ph="bg-primary"
            cruve_btn_bg="bg-secondary text-darktext"
             card_btn_link="/search-results?type=family_pack&searchBy=family_pack&fp_total=7&callCount=1"
          />
        </div>
      </div>
    </>
  )
}
