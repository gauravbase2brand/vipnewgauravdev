"use client";
import React, { useContext, useEffect, useState } from "react";
import NumerologyBanner from "./NumerologyBanner";
import NumerologyLead from "./NumerologyLead";
import NumerologyReview from "./NumerologyReview";
import NumCalculator from "./NumCalculator";
import NumerologyScrachCard from "./NumerologyScrachCard";
import NumerologyTable from "./NumerologyTable";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import Search from "../Shared/Search/Search";
import { NumerologyCard } from "./NumerologyCard";
import ChooseNumerology from "./ChooseNumerology";
import NumerologyLuckyNumber from "./NumerologyLuckyNumber";
import NumberNumerology from "./NumberNumerology";
import NumerologyHowWorks from "./NumerologyHowWorks";
import NumerologyPandits from "./NumerologyPandits";
import NumerologyFaq from "./NumerologyFaq";
import NumerologyClient from "./NumerologyClient";
import NumerologyFeatures from "./NumerologyFeatures";
import NumerlogyArticlesBlog from "./NumerlogyArticlesBlog";
import NumerologyConsultation from "./NumerologyConsultation";
import VipNumberShopSliderImages1 from "../home/VipNumberShopSliderImages1/VipNumberShopSliderImages1";
import NewMobileSearch from "../Shared/MobileSearch/NewMobileSearch";
import { useGetQueryParams } from "../utils";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import NumerologyLeadReport from "./NumerologyLeadReport";
import NumerologyTrustedNumerology from "./NumerologyTrustedNumerology";
import NumerologyExplore from "./NumerologyExplore";
import NumerologyReportDetail from "./NumerologyReportDetail";
import AwardWinner from "../Shared/AwardWinner/AwardWinner/AwardWinner";
// import { ResponsiveFooter } from "../ResponsiveModule";
const NumerologyPage = () => {
  const faqdata = [
    {
      question: "What are numerology mobile numbers?",
      answer:
        "Mobile numbers chosen based on numerology to attract positive energy and success.",
    },
    {
      question: "How can they benefit me?",
      answer:
        "They can improve communication, career, relationships, and overall well-being.",
    },
    {
      question: "How are they selected?",
      answer:
        "Based on your birth date, life path number, and personal goals.",
    },
    {
      question: "Can they change my luck?",
      answer:
        "While not guaranteed, they can attract better opportunities and reduce obstacles.",
    },
    {
      question: "Are they different for personal and business use?",
      answer:
        "Yes, personal numbers focus on harmony, while business numbers attract prosperity.",
    },
    {
      question: "Can I keep my current number?",
      answer:
        "Yes, experts can suggest modifications without changing the entire number.",
    },
    {
      question: "Can they improve relationships?",
      answer:
        "Yes, they promote better understanding and reduce misunderstandings.",
    },
  ]
  const sliderdata = [
    { id: 1, leftimg: `/assets/img/vip-images/parshant pandit ji.avif` },
    { id: 2, leftimg: `/assets/img/vip-images/gauravtali.jpg` },
    { id: 3, leftimg: `/assets/img/vip-images/ramnish rajput.avif` },
    { id: 4, leftimg: `/assets/img/vip-images/rishav lala.jpeg` },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const { setNumerologyPop, setFilters, user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { queryParams } = useGetQueryParams();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setFilters({
      type: "advanced",
    });
  }, []);

  return (
    <div>
      <NumerologyBanner />
      {isMobile && <NewMobileSearch queryParams={queryParams} />}
      <div
        className={`bg-[url("/assets/filter.webp")] bg-cover bg-no-repeat bg-center py-8 hidden md:block`}
      >
        <div className="container-os  ">
          <Search />
        </div>
      </div>
      <VipNumberShopSliderImages1 />
      <NumerologyLeadReport
        title1={
          <>
            Know Your{" "}
            <span
              className="inline-block bg-[url('/assets/1922.webp')] bg-no-repeat bg-center bg-contain 
                 text-secondary font-bold px-2 text-[20px] lg:text-[32px] 
                 leading-[30px] lg:leading-[40px] tracking-wide mb-2"
            >
              Lucky Mobile Number
            </span>{" "}
            With{" "}
            <span
              className="inline-block bg-[url('/assets/1922.webp')] bg-no-repeat bg-center bg-contain 
                 text-secondary font-bold px-2"
            >
              Numerology
            </span>
            &amp; <br />
            Order a Lucky Mobile Number{" "}
            <span
              className="inline-block bg-[url('/assets/Vector.webp')] bg-no-repeat bg-contain 
                 text-white font-bold px-2 text-[20px] lg:text-[32px] 
                 leading-[30px] lg:leading-[40px] tracking-wide mb-2 "
              style={{ backgroundPosition: "0px 30px" }}
            >
              Instantly
            </span>
          </>
        }
        para1=""
        title="Pay 1,999 For Numerology Report"
        titleClass="text-white"
      />
      <NumerologyCard />
      <ChooseNumerology />
      <NumerologyLuckyNumber
        setNumerologyPop={setNumerologyPop}
        user={user}
        setActiveSignInWithOtp={setActiveSignInWithOtp}
      />
      <NumberNumerology />
      <NumerologyLead
        title1={
          <>
            Know Your{" "}
            <span
              className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain 
                 text-primary font-bold px-2 text-[20px] lg:text-[32px] 
                 leading-[30px] lg:leading-[40px] 2xl:text-[38px] tracking-wide mb-2"
            >
              Lucky Mobile Number
            </span>{" "}
            With{" "}
            <span
              className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain 
                 text-primary font-bold px-2 2xl:text-[38px]"
            >
              Numerology
            </span>
            &amp; <br />
            Order a Lucky Mobile Number{" "}
            <span
              className="inline-block bg-[url('/assets/Vector.webp')] bg-no-repeat bg-contain 
                 text-primary font-bold px-2 text-[20px] lg:text-[32px] 
                 leading-[30px] lg:leading-[40px] tracking-wide mb-2 2xl:text-[38px] "
              style={{ backgroundPosition: "0px 30px" }}>Instantly
            </span>
          </>
        }
        para1="Lucky numbers are typically derived from a person's birthdate or other significant dates. Numerologists believe that certain numbers influence individuals more than others, and these numbers are considered auspicious or lucky. By analyzing these numbers, numerologists offer insights into personality traits, life events, and potential opportunities."
        title="Pay 1,999 For Numerology Report"
        titleClass="text-darktext"
      />
      <NumerologyReview />
      <NumCalculator />
      <NumerologyPandits />
      <NumerologyTable />
      <NumerologyScrachCard />
      <NumerologyHowWorks />
      {/* <NumerologyTrustedNumerology
        title={
          <>
            Trusted Numerology Reports Based on the
            <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
              Pythagorean (Western) System
            </span>{" "}
          </>
        }
        sliderData={sliderdata}
      /> */}
      <NumerologyReportDetail />
      <NumerologyExplore />

      <NumerlogyArticlesBlog />
      <AwardWinner />
      <NumerologyFeatures />
      <NumerologyFaq data={faqdata} faqs_description="To get the best VIP numbers for a lifetime, you must first clear any doubts you may have, if any."/>
      <NumerologyClient />

      <NumerologyConsultation title="Pay 1,999 For Numerology Report" />
    </div>
  );
};

export default NumerologyPage;
