import React from "react";
import "../About.css";

const YearsOfExperience = () => {
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
    <section className="YearsOfExperience-section-os">
      <div className="container-os">
        <div className="about-text-proving-part">
          <h1>
            We Have {yearsOfExperience} Years Of In-Depth Experience And Proven
            Track Record Of Providing The Best VIP Number Services
          </h1>
          <p>
            {""}
            <span> Over the last {yearsOfExperience} years,</span> we have been
            offering unmatched, top-notch, and satisfactory VIP phone number
            services to our clients and customers. We are creating a new
            milestone every day in our business niche by offering what our
            customers look for and giving the best value and beyond expectation
            VIP phone number services to them at a very competitive price.
          </p>
          <p>
            Be it business or individual, we are helping everyone from all over
            India. With our easy to remember and eye-catching VIP numbers, our
            customers are able to take the response rate, marketing
            effectiveness, and advertisement approaches to the next level.
          </p>
          <p>
            Till date, we haven’t disappointed any of our customers in any
            aspect and served more than <span> 70k+ VIP </span>and fancy numbers
            to our happy customers. Our reviews and our customer’s success rate
            speak the same.
          </p>
        </div>
      </div>
    </section>
  );
};

export default YearsOfExperience;
