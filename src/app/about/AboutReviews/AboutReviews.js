import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const AboutReviews = () => {
  const [counterOn, setCounterOn] = useState(false);
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCounterOn(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="AboutReviews-section-os" ref={ref}>
      <div className="container-os">
        <div className="about-counter-main-ud bg-primary text-center">
          <div className="about-count-1">
            <h3>{counterOn && <CountUp start={0} end={currentYear} />}</h3>
            <p>SINCE 2007</p>
          </div>

          <div className="about-count-1">
            <h3 className="count">
              {counterOn && <CountUp start={0} end={100000} />}+
            </h3>
            <p> CUSTOMERS SERVED </p>
          </div>

          <div className="about-count-1">
            <h3 className="count">
              {counterOn && <CountUp start={0} end={150} />}+
            </h3>
            <p> VENDORS </p>
          </div>
          <div className="about-count-1">
            <h3>24x7</h3>
            <p> SUPPORT AVAILABLE </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutReviews;
