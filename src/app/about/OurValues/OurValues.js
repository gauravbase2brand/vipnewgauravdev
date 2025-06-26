import React from "react";
import "../About.css";
import Image from "next/image";

const OurValues = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
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
    <section className="OurValues-section-os">
      <div className="container-os">
        <div className="our-values-title">
          <h1>Our Values</h1>
          <p>
            At VIP Number Shop (VNS), we work with values. It&apos;s our values
            that further helps us in providing our customers 100% satisfaction.
            Thanks to this, they are trusting and choosing us again and again
            from the last {yearsOfExperience} years.
          </p>
        </div>
        <div className="main-value-about-img-text-ud">
          <div className="our-values-img-part">
            <Image
              src={`${panelImg}/assets/img/vip-images/value-mob-img_n5v7jc.webp`}
              alt="Mobile with vip logo"
              width={1000}
              height={100}
              priority="true"
            />
          </div>

          <div className="our-values-text-part">
            <div className="text-1-value">
              <h2> We Respect You And Your Time </h2>
              <p>
                At VNS, we respect our customers and their time. Instead of
                doing a lot of jargon, we keep everything simple yet easy to
                understand.
              </p>
            </div>
            <div className="text-1-value">
              <h2> We Prefer Transparency And Honesty </h2>
              <p>
                Whether you talk about pricing or our services, we prefer to
                remain transparent and honest in every aspect. As we said
                earlier, you get what you pay for. There are no hidden games and
                charges at all.
              </p>
            </div>
            <div className="text-1-value">
              <h2>100% Satisfaction Guarantee</h2>
              <p>
                What matters the most to us is the customer’s satisfaction.
                Customer satisfaction is what we have been working for the last
                {yearsOfExperience} years. The reputation and popularity we have
                today in the market is thanks to our “100% Customer Satisfaction
                Or Money Back” policy. When you choose us and use our services,
                rest assured that you are going to get the top-notch and
                best-in-market VIP phone number services at a very competitive
                and affordable price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
