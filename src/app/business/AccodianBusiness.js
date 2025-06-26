"use client";
import React, { useState } from "react";

const AccordionBusiness = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <section className="py-4 md:py-8 ">
        <div className="max-w-5xl mx-auto p-2 ">
          <h2 className="font-semibold text-[24px] leading-[30px] text-center py-4 md:text-[36px] md:leading-[42px] md:py-6 ">
            Frequently Asked Questions
          </h2>
          <ul className="space-y-4">
            {[
              {
                question: "What is a VIP Partner and how do I become one?",
                answer:
                  "Becoming a VIP Partner involves purchasing our business kit for 149 INR. This kit includes tools to start earning from selling exclusive VIP mobile numbers.",
              },
              {
                question: "How do I receive income as a VIP Partner?",
                answer:
                  "Income is generated when someone scans the QR code included in your business kit and purchases a VIP number from the VIP Number Shop. You earn a commission on each sale.",
              },
              {
                question: "What are the benefits of joining as a VIP Partner?",
                answer:
                  "As a VIP Partner, you gain access to a reliable source of lifetime income through minimal effort. The joining process is quick, secure, and without hidden charges.",
              },
              {
                question:
                  "How quickly can I start earning after purchasing the business kit?",
                answer:
                  "You can start earning immediately after setting up the QR code and sharing it. Each scan leading to a sale contributes to your income.",
              },
              {
                question: "Can I install the QR code in multiple locations?",
                answer:
                  "Yes, you can install the QR code physically at your shop, outlet, or any strategic location, as well as share it digitally on social media platforms to maximize visibility and sales.",
              },
              {
                question: "Is there any training or support provided to help me succeed?",
                answer:
                  "Yes, our business kit comes with instructions on how to install and use the QR code effectively. Additionally, we offer ongoing support to ensure your success in selling VIP numbers.",
              },
            ].map((item, index) => (
              <li
                key={index}
                className={`bg-white p-4 rounded-lg shadow-md cursor-pointer ${
                  activeIndex === index ? "ring-2 ring-primary " : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-[16px] md:text-[24px] font-medium text-[#161616] flex justify-between items-center">
                  {item.question}
                  <span
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <img
                      src={`${panelImg}/assets/img/vip-images/arrows_ve4pho.webp`}
                      alt="Arrow Icon"
                      className=""
                    />
                  </span>
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <p className="text-[16px] md:text-[18px] font-normal text-[#161616] mt-3">
                    {item.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default AccordionBusiness;
