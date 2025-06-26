import React, { useState, useEffect } from "react";
import FaqCard from "../../Shared/FaqCard/FaqCard";
import "./FaqBanner.css";
import "../../Shared/FAQs/FAQs.css";

const FaqBanner = () => {
  const [faqs, setFaqs] = useState({ status: "", message: "", data: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    fetch(`${apiUrl}/web/faq`)
      .then((response) => response.json())
      .then((data) => {
        setFaqs({
          status: data.status,
          message: data.message,
          data: [...data.data],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFaqs = faqs.data.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleExpand = (faqId) => {
    // If the clicked FAQ is already expanded, collapse it; otherwise, expand it
    setExpandedFaqId((prev) => (prev === faqId ? null : faqId));
  };
  return (
    <section className="FaqBanner-section-os">
      <div className="container-os">
        <div className="FaqBanner-data-row-os bg-primary">
          <div className="FaqBanner-data-heading-os">How Can We Help You?</div>
          <p>
            Get answers to your questions or doubts. Our support system is 24/7
            hours a day available to assist you.
          </p>
        </div>
        <div className="FaqBanner-search-input-filed-os">
          <input
            type="text"
            placeholder="Search for answers"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>

        <div className="FAQs-list">
          {filteredFaqs.map((faq, index) => {
            const strippedAnswer = faq.answer
              ? new DOMParser().parseFromString(faq.answer, "text/html").body
                  .innerText
              : "";
            return (
              <FaqCard
                key={index}
                image={`${panelImg}/assets/img/vip-images/faqs-icon-1_skexjf.svg`}
                paragraph={strippedAnswer}
                heading={faq.question}
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

export default FaqBanner;
