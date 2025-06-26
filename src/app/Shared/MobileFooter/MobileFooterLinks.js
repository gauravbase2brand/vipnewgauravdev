import React from "react";
import Link from "next/link";

const MobileFooterLinks = ({ handleAccordion, blogsLoad, activeAccordion }) => {
  return (
    <section className="MobileFooter-links-accordion-section-os">
      <div className="container-os">
        <div className="MobileFooter-links-accordion-row-os">
          <div className="MobileFooter-links-accordion-col-1-os">
            <div
              onClick={() => handleAccordion("active-link-1")}
              className={
                activeAccordion === "active-link-1"
                  ? "MobileFooter-links-accordion-head-os active"
                  : "MobileFooter-links-accordion-head-os"
              }
            >
              Quick Links
              <span></span>
            </div>
            <div
              className={
                activeAccordion === "active-link-1"
                  ? "MobileFooter-links-accordion-body-os active"
                  : "MobileFooter-links-accordion-body-os"
              }
            >
              <Link href="/">Home</Link>
              <Link
                href="/business"
                onClick={() => {
                  localStorage.setItem("Lead-Page", "Business");
                }}
              >
                Business With Us
              </Link>
              <Link href="/sell-mobile-number">Sell mobile Number</Link>
              <Link
                href="/numerology"
                onClick={() => {
                  localStorage.setItem("Lead-Page", "Numurology");
                }}
              >
                Numerology Report
              </Link>
              <Link href="/family-pack">Family/Business Pack</Link>
              <Link href="/about">About us</Link>
              <Link href="/why-choose-us">Why Choose Us</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/press-news">Press News</Link>
              <Link href="/influencer">Influencer Program</Link>
              <Link href="/blogs" onClick={blogsLoad}>
                Blogs
              </Link>
            </div>
          </div>

          <div className="MobileFooter-links-accordion-col-1-os">
            <div
              onClick={() => handleAccordion("active-link-2")}
              className={
                activeAccordion === "active-link-2"
                  ? "MobileFooter-links-accordion-head-os active"
                  : "MobileFooter-links-accordion-head-os"
              }
            >
              Terms & Policies
              <span></span>
            </div>
            <div
              className={
                activeAccordion === "active-link-2"
                  ? "MobileFooter-links-accordion-body-os active"
                  : "MobileFooter-links-accordion-body-os"
              }
            >
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/refund-policy">Refund Policy</Link>
            </div>
          </div>

          <div className="MobileFooter-links-accordion-col-1-os">
            <div
              onClick={() => handleAccordion("active-link-3")}
              className={
                activeAccordion === "active-link-1"
                  ? "MobileFooter-links-accordion-head-os active"
                  : "MobileFooter-links-accordion-head-os"
              }
            >
              WORKING DAYS/HOURS
              <span></span>
            </div>
            <div
              className={
                activeAccordion === "active-link-3"
                  ? "MobileFooter-links-accordion-body-os active"
                  : "MobileFooter-links-accordion-body-os"
              }
            >
              <ul className="MobileFooter-links-accordion-body-list-os">
                <li>10:00 AM TO 6:00 PM</li>
                <li>(MON-SAT)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileFooterLinks;
