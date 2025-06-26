import React from "react";
import { useState } from "react";
import "../../terms-and-conditions/TermsConditions.css";
import Link from "next/link";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";

const RefundConditionAccordion = () => {
  const [activeTerm, setActiveTerm] = useState("");
  const handleTerms = (value) => {
    if (activeTerm === value) {
      setActiveTerm("");
    } else {
      setActiveTerm(value);
    }
  };
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=917009170092");
  };
  return (
    <>
      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-1-os")}
            className={
              activeTerm === "term-1-os" ? "tab-label active" : "tab-label"
            }
          >
            General Refund Policy
          </label>
          <div
            className={
              activeTerm === "term-1-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Our refund policy is designed to ensure a smooth and transparent
              process for our valued customers. Please read the following terms
              carefully to understand the conditions under which refunds will be
              processed.
            </p>
          </div>
        </div>
      </div>

      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-2-os")}
            className={
              activeTerm === "term-2-os" ? "tab-label active" : "tab-label"
            }
          >
            Order Cancellation by User
          </label>
          <div
            className={
              activeTerm === "term-2-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Users are not permitted to cancel their orders once placed. This
              policy helps us maintain efficiency and prevent misuse. Once an
              order is confirmed, it is processed immediately to ensure timely
              delivery of services.
            </p>
          </div>
        </div>
      </div>

      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-3-os")}
            className={
              activeTerm === "term-3-os" ? "tab-label active" : "tab-label"
            }
          >
            Order Cancellation by Seller
          </label>
          <div
            className={
              activeTerm === "term-3-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              In the rare event that the seller cancels an order, the full
              payment will be credited to the user's VIP Wallet. This credited
              amount can be utilized in two ways:
            </p>
            <p>
              *Future Purchases: 🙂 The amount can be used for subsequent
              purchases on our platform.
            </p>
            <p>
              *Withdrawal Request:🤗 Users can request a withdrawal of the
              amount to their bank account through the Wallet's withdrawal
              option. The requested amount will be credited to the user's
              account within 48 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-4-os")}
            className={
              activeTerm === "term-4-os" ? "tab-label active" : "tab-label"
            }
          >
            Refunds for Payment Failures
          </label>
          <div
            className={
              activeTerm === "term-4-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              If a payment failure occurs due to technical issues or errors,
              users must contact our support team immediately. We will
              investigate the issue and process a refund or resolve the payment
              discrepancy as quickly as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-5-os")}
            className={
              activeTerm === "term-5-os" ? "tab-label active" : "tab-label"
            }
          >
            Order Issues and Complaints
          </label>
          <div
            className={
              activeTerm === "term-5-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              We are committed to addressing any issues you may have with your
              order. If there are any problems with your purchase, please follow
              these steps:
            </p>
            <p>
              Contact Us: Email us at <DaynamicEmail colorvariant="text-blue" />{" "}
              within 20 days of the order date to raise a complaint. Provide all
              necessary details, including order number, issue description, and
              any supporting documentation.
            </p>
            <p>
              Resolution Process: Our support team will review your complaint
              and respond with a resolution plan. We aim to resolve all
              complaints efficiently and fairly.
            </p>
            <p>
              No Refunds Post 20 Days: Refunds will not be processed under any
              circumstances if a complaint is raised after the 20-day period
              from the order date.
            </p>
          </div>
        </div>
      </div>
      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-7-os")}
            className={
              activeTerm === "term-7-os" ? "tab-label active" : "tab-label"
            }
          >
            Conditions for Refund
          </label>
          <div
            className={
              activeTerm === "term-7-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Refunds will only be considered under the following conditions:
            </p>
            <p>The order was cancelled by the seller.</p>
            <p>The VIP number provided was not as described or incorrect.</p>
            <p>Payment failures due to technical issues on our end.</p>
            <p>Valid complaints raised within 20 days of the order date.</p>
          </div>
        </div>
      </div>
      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-8-os")}
            className={
              activeTerm === "term-8-os" ? "tab-label active" : "tab-label"
            }
          >
            Non-Refundable Situations
          </label>
          <div
            className={
              activeTerm === "term-8-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>Certain situations do not qualify for refunds:</p>
            <p>Change of mind after the order is processed.</p>
            <p>
              Incorrect information provided by the user at the time of order.
            </p>
            <p>
              Failure to comply with the Mobile Number Portability (MNP)
              process.
            </p>
          </div>
        </div>
      </div>
      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-9-os")}
            className={
              activeTerm === "term-9-os" ? "tab-label active" : "tab-label"
            }
          >
            Refund Processing Time
          </label>
          <div
            className={
              activeTerm === "term-9-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              All eligible refunds will be processed promptly. Once approved,
              refunds will be credited to your VIP Wallet or bank account as
              requested. Typically, bank account refunds are completed within 48
              hours of the request.
            </p>
          </div>
        </div>
      </div>
      <div className="row-os">
        <div className="tab">
          <label
            onClick={() => handleTerms("term-10-os")}
            className={
              activeTerm === "term-10-os" ? "tab-label active" : "tab-label"
            }
          >
            Contact Information
          </label>
          <div
            className={
              activeTerm === "term-10-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              For any questions or assistance regarding our refund policy,
              please contact our customer support team at{" "}
            </p>
            <p>
              <DaynamicEmail colorvariant="text-[blue]" />
              or via our 24*7 WhatsApp support at{" "}
              <span
                onClick={openWhatsApp}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {/* 70091-70092 */}
                <DaynamicMobileno/>
              </span>
              .
            </p>
            <p>
              We appreciate your understanding and cooperation in adhering to
              these policies, which are designed to ensure a fair and seamless
              experience for all our customers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundConditionAccordion;
