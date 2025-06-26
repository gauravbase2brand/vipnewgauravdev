import React from "react";
import "../WhyChooseUs.css";
import NeedMoreReasonsData from "./NeedMoreReasonsData";

const NeedMoreReasons = () => {
  const startYear = 2007;
  const startMonth = 3; // January is 0, so April is 3
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  let yearsOfExperience;
  if (currentMonth >= startMonth) {
    yearsOfExperience = currentYear - startYear;
  } else {
    yearsOfExperience = currentYear - startYear - 1;
  }

  return (
    <section className="NeedMoreReasons-section-os">
      <div className="container-os">
        <div className="main-need-more-section-ud">
          <h1>
            Need More Reasons To Choose VIP Number Shop For Your Next VIP Phone
            Number Purchase?
          </h1>
          <div className="opctions-red-main">
            <div className="need-more-opction-ud-section">
              <NeedMoreReasonsData
                optionId="01"
                optionText={` ${yearsOfExperience} Years Of Proven Track Record, And Number One Seller Across India`}
              />
              <NeedMoreReasonsData
                optionId="02"
                optionText="India's only oldest, biggest, honest, reliable, and trusted website/store"
              />
              <NeedMoreReasonsData
                optionId="03"
                optionText="300+ VIP number subcategory - way more than any store or seller have so far"
              />
              <NeedMoreReasonsData
                optionId="04"
                optionText="100% safe and secure payment via Credit/debit card, UPI, wallet and online banking"
              />
              <NeedMoreReasonsData
                optionId="05"
                optionText="COD option available on most numbers"
              />
              <NeedMoreReasonsData
                optionId="06"
                optionText="No IVR, Direct Contact"
              />
              <NeedMoreReasonsData
                optionId="07"
                optionText="100% Satisfaction Guarantee With Money Back Assurity"
              />
              <NeedMoreReasonsData
                optionId="08"
                optionText="Served VIP numbers to more than 1 Lac+ happy customers"
              />
              <NeedMoreReasonsData
                optionId="09"
                optionText="No Negative Feedback Anywhere; be it Facebook or Google "
              />
            </div>
            <div className="need-more-opction-ud-section">
              <NeedMoreReasonsData
                optionId="10"
                optionText="Full Dedicated and professional customer support from ordering to delivery and satisfaction"
              />
              <NeedMoreReasonsData
                optionId="11"
                optionText="24/7 Chatbot for help"
              />
              <NeedMoreReasonsData
                optionId="12"
                optionText="Dedicated Account Manager for every order and Whatsapp Assistant/Support"
              />
              <NeedMoreReasonsData
                optionId="13"
                optionText="Support until your number get activate"
              />
              <NeedMoreReasonsData
                optionId="14"
                optionText="Get UPC delivered as many time as you need"
              />
              <NeedMoreReasonsData
                optionId="15"
                optionText="No hidden charges, You pay what's mentioned on the website"
              />
              <NeedMoreReasonsData
                optionId="16"
                optionText="Best value for the money - You get what you pay for"
              />
              <NeedMoreReasonsData
                optionId="17"
                optionText="Best search System on the store to find the best one that matches your personality"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeedMoreReasons;
