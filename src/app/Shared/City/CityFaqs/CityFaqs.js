import React, { useState } from "react";
import "../../../faq/FaqBanner/FaqBanner.css";
import "../../../Shared/FAQs/FAQs.css";
import MainHeading from "../../../Shared/MainHeading/MainHeading";
import MainSubHeading from "../../../Shared/MainSubHeading/MainSubHeading";
import FaqCard from "../../../Shared/FaqCard/FaqCard";

const CityFaqs = ({ cityPunjabFaqs }) => {
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const toggleExpand = (faqId) => {
    // If the clicked FAQ is already expanded, collapse it; otherwise, expand it
    setExpandedFaqId((prev) => (prev === faqId ? null : faqId));
  };
  return (
    <section className="FAQs-section-os">
      <div className="container-os">
        <div className="FAQs-headings">
          <div className="FAQs-heading-os">
            <MainHeading
              MainHeading="Frequently Asked Question"
              rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
            />
          </div>
          <div className="FAQs-subHeading-os">
            <MainSubHeading MainSubHeadingText="To get the best VIP numbers for a lifetime, you must first clear any doubts you may have, if any." />
          </div>
        </div>

        <div className="FAQs-list">
          {cityPunjabFaqs.map((faq, index) => {
            return (
              <FaqCard
                key={index}
                heading={faq.heading}
                paragraph={faq.paragraph}
                image={`${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`}
                faqId={faq.id}
                isExpanded={expandedFaqId === faq.id} // Pass expanded state
                toggleExpand={toggleExpand} // Pass toggle function
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CityFaqs;
