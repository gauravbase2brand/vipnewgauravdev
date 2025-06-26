"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MainHeading from "../MainHeading/MainHeading";
import MainSubHeading from "../../Shared/MainSubHeading/MainSubHeading";
import FaqCard from "../FaqCard/FaqCard";

const FAQs = () => {
  const [faqs, setFaqs] = useState({ status: "", message: "", data: [] });
  const [count] = useState(6);
  const [expandedFaqId, setExpandedFaqId] = useState(null); // Track the expanded FAQ
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // useEffect(() => {
  //   fetch(`${apiUrl}/web/faq`)
  //     .then((response) => response.json())
  //     .then((data) => setFaqs(data))
  //     .catch((error) => console.log(error));
  // }, [apiUrl]);

  useEffect(() => {
    const storedFaqs = sessionStorage.getItem("faqsData");
    if (storedFaqs) {
      // If data exists in sessionStorage, use it and skip the API call
      setFaqs(JSON.parse(storedFaqs));
    } else {
      // Otherwise, fetch from the API
      fetch(`${apiUrl}/web/faq`)
        .then((response) => response.json())
        .then((data) => {
          setFaqs(data);
          // Save the data to sessionStorage
          sessionStorage.setItem("faqsData", JSON.stringify(data));
        })
        .catch((error) => console.log(error));
    }
  }, [apiUrl]);

  // Function to toggle the expansion state
  const toggleExpand = (faqId) => {
    // If the clicked FAQ is already expanded, collapse it; otherwise, expand it
    setExpandedFaqId((prev) => (prev === faqId ? null : faqId));
  };

  return (
    <section>
      <div className="container-os mx-auto px-4">
        {/* FAQ Headings */}
        <div className="text-center py-4">
          <h2 className="lg:text-[26px] text-[16px] leading-[30px] font-semibold text-center md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold text-darktext">
            Frequently Asked Question
          </h2>
          <div className="mt-4">
            <MainSubHeading MainSubHeadingText="To get the best VIP numbers for a lifetime, you must first clear any doubts you may have, if any." />
          </div>
        </div>

        {/* Grid layout for the FAQ section */}
        <div className="grid lg:grid-cols-[2fr_5fr_2fr] grid-cols-1 gap-5">
          {/* Video for large screens */}
          <div className="lg:block hidden">
            <Link href="https://www.base2brand.com/" target="_blank">
              <video
                src="/assets/Leading Digital Marketing Agency (2).mp4"
                width={300}
                height={510}
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              />
            </Link>
          </div>

          {/* FAQ Cards */}
          <div>
            {faqs.data.slice(0, count).map((faq, index) => {
              const strippedAnswer = faq.answer
                ? new DOMParser().parseFromString(faq.answer, "text/html").body
                    .innerText
                : "";
              return (
                <FaqCard
                  key={index}
                  heading={faq.question}
                  paragraph={strippedAnswer}
                  image={`${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`}
                  faqId={faq.id}
                  isExpanded={expandedFaqId === faq.id} // Pass expanded state
                  toggleExpand={toggleExpand} // Pass toggle function
                />
              );
            })}
          </div>

          {/* Another Video for large screens */}
          <div className="lg:block hidden">
            <Link href="https://qrstand.vipnumbershop.com/" target="_blank">
              <video
                src="/assets/Leading Digital Marketing Agency (1).mp4"
                width={300}
                height={510}
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
