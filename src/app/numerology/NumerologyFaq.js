"use client";
import React, { useState } from "react";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className=" w-full bg-white p-4 rounded-lg shadow-md cursor-pointer mb-2 border border-primary md:w-8/12 m-auto transition-transform duration-300  ">
      <div
        onClick={toggle}
        className="cursor-pointer flex justify-between items-center"
      >
        <h4 className="text-lg font-medium text-black">{question}</h4>
        <span className="text-black">
          {isOpen ? <RiSubtractFill /> : <IoMdAdd />}
        </span>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-black">{answer}</p>
      </div>
    </div>
  );
};

const NumerologyFaq = ({data,faqs_description}) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index)); // Toggle open/close for clicked FAQ
  };

  return (
    <section
      className="bg-primary lg:py-10 py-5"
      style={{
        background:
          "radial-gradient(circle, #7354b1 0%, rgba(88,68,127,1) 100%)",
      }}
    >
      <div className="p-3 mb-4 container-os  m-auto">
        <div className="pb-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-4 text-center text-whitetext">
            Frequently{" "}
            <span className="inline-block bg-[url('/assets/1922.webp')] bg-no-repeat bg-center bg-contain text-secondary font-bold px-2">
              Asked Questions!
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-whitetext text-center">
           {faqs_description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {data.map((item, index) => (
            <div key={index} className="">
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                toggle={() => toggleFAQ(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumerologyFaq;
