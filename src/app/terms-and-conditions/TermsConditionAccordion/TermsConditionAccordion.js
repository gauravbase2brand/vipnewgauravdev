import React from "react";
import { useState } from "react";
import "../TermsConditions.css";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";

const TermsConditionAccordion = () => {
  const [activeTerm, setActiveTerm] = useState("");
  const handleTerms = (value) => {
    if (activeTerm === value) {
      setActiveTerm("");
    } else {
      setActiveTerm(value);
    }
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
            UPC Terms, Conditions And Guideline
          </label>
          <div
            className={
              activeTerm === "term-1-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              UPC will only be provided after the full payment for the ordered
              VIP number.
            </p>
            <p>
              Customers or buyers are allowed to cancel the order only in case
              we fail to provide the UPC within 24 hours of successful payment
              and order placement.
            </p>
            <p>Order once placed can’t be canceled within 24 hours.</p>
            <p>
              IIf UPC successfully generated and sent from us, but not received
              by the customer (due to reasons like operator network failure, SMS
              not received, email received in Junk or SPAM), customer can
              request for the UPC again. However, no cancellation for the order
              will be accepted.
            </p>
            <p>
              Customers can cancel the order only when any issue is encountered
              from the seller for the ordered VIP number.
            </p>
            <p>
              If the above mentioned UPC delivery deadline fails from our end,
              and all the terms and conditions will be met for the refund,
              customers can apply for it. Payment Refund.
            </p>
            <p>
              All the accepted refund requests will be initiated to the
              customer&apos;s VNS wallet. Later, the customer can either use
              this wallet amount to order another VIP number or can withdraw to
              their bank account via PayTM, Google Pay, UPI, bank account
              transfer, or any other compatible medium. Released payment will be
              processed within 48 working hours from the requested date & time.
            </p>
            <p>
              Refunded payment will be on hold in any condition till the 5th day
              of UPC&apos;s expiration.
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
            Order Cancellation
          </label>
          <div
            className={
              activeTerm === "term-2-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              Customer/User can’t request for cancellation or refund if any
              problem persists from our end until three valid UPC delivery
              tries.
            </p>
            <p>
              Customer/User can’t request for cancellation or refund if the
              problem is from the customer/User/their end.
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
            UPC, MNP, Complaints, And Solutions
          </label>
          <div
            className={
              activeTerm === "term-3-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              It can take from 1 to up to 5 days to solve the customer’s
              complaints.
            </p>
            <p>
              If there will be any problem in MNP from our end, we will give our
              best to provide a solution within the minimum possible time. The
              customer will have to wait until we come up with the solution.
            </p>
            <p>
              After the solution is provided, the customer can retry for MNP,
              and this will be counted as one valid try.
            </p>
            <p>
              The new UPC for this MNP attempt will be delivered within 48
              hours.
            </p>
            <p>
              Once the UPC is delivered to the customer via text message or
              email, and the customer doesn&apos;t send an MNP request or face
              any issue related to MNP. THEY MUST CONTACT US WITHIN THE 20 DAYS.
            </p>
            <p>
              No complaint will be accepted or registered if the customer
              doesn&apos;t contact us within 20 days.
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
            Number on Hold
          </label>
          <div
            className={
              activeTerm === "term-4-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              We allow customers to keep their favorite number on hold or booked
              for later purchasing purposes.
            </p>
            <p>
              To hold a number, the customer has to pay 25% of the payment in
              Advance, that’s at least Rs. 500/-.
            </p>
            <p>
              The advance paid for holding a number is nonrefundable. It will
              not be adjusted at all if the customer cancels the order.
            </p>
            <p>
              The customer will no longer be able to hold the number again, and
              the order will be marked “Cancelled By Customer”.
            </p>
            <p>
              No matter what, the payment can’t be adjusted from one order to
              any other order for the number if the order gets canceled by the
              customer. Order Status
            </p>
            <p>
              We mark an order as “completed” after 20 days of ordering if we
              don’t get any notification/update/complaint from the seller or
              customer.
            </p>
            <p>
              No complaints can be raised against any completed orders after 20
              days from the order date.
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
            Postpaid Recharges, Bills, And Other Payable (s)
          </label>
          <div
            className={
              activeTerm === "term-5-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>
              The customer should recharge the number as per their usage after
              the below terms.
            </p>
            <p>
              We will pay the bill for 90 days if the provided number to the
              customer is not ready to port.
            </p>
            <p>
              In the postpaid sim, for the 90 days, we will provide Minimum 1 GB
              data daily + All INDIA unlimited calling on the same network with
              the operator SIM provided by us.
            </p>
            <p>
              The customer should pay the MNP (porting) charges to his nearest
              retailer or store. Multiple Orders
            </p>
            <p>
              If customer orders more than one number & then cancel one of the
              order, it will be VNS’s choice of whether second or other numbers
              should be canceled or not.
            </p>
            <p>
              If the customer doesn’t request to cancel the order within 24
              hours & UPC will be delivered, the customer wouldn’t be able to
              cancel the order. Privacy, Disturbance, And Operator
            </p>
            <p>
              The customer must agree with us to stay one the same network we
              provide for at least 90 days from the number activation.
            </p>
            <p>
              We try our best to ensure that the customer shouldn’t receive
              wrong calls or messages from the number’s old owner contacts.
              However, unfortunately, we never guarantee this.
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
            VNS’s Rights, Responsibilities, And Actions
          </label>
          <div
            className={
              activeTerm === "term-7-os" ? "tab-content active" : "tab-content"
            }
          >
            <p>VNS holds the full right to cancel any order anytime.</p>
            <p>
              We promise to provide the services on the customer’s Indian Mobile
              phone number that can receive calls & text messages.
            </p>
            <p>
              We always suggest customers visit the nearest retailer
              communication shop for MNP for prepaid operator services & company
              store (Outlet) for the postpaid operator services.
            </p>
            <p>
              We, at the VIP Number Shop, can provide NOC on our own behalf on a
              letter pad (if required).
            </p>
            <p>
              We never provide sellers/last owner’s documents to the customer.
            </p>
            <p>We don’t guarantee E-sim availability in any condition.</p>
            <p>
              No Courier complaint will be registered within seven days from the
              date of order on customer request.
            </p>
            <p>
              UPC sent or courier shipped will be marked Order as “in Process.”
            </p>
            <p>“In process” order can never be canceled by the customer.</p>
            <p>We don’t provide any Sim replacement service.</p>
            <p>
              If any sim gets lost by the customer before MNP, then the customer
              will be responsible for the loss.
            </p>
            <p>
              The number will be activated within 2 to 4 days of MNP request as
              per TRAI rules & regulations.
            </p>
            <p>
              Terms & conditions will be changed from time to time as soon as
              TRAI updates the rules & regulations.
            </p>
            <p>
              If any rejection came in MNP due to any issue from our end, then
              the customer must provide rejection reason’s valid screenshot to
              us.
            </p>
            <p>
              A cancellation request can take two working hours to come in the
              cancellation process.
            </p>
            <p>
              For some security reasons, Sometimes UPC will be provided with
              advance notification at the time when the customer will reach the
              MNP store or outlet.
            </p>
            <p>All terms & conditions can be changed by VNS anytime.</p>
            <p>The customer has to follow all TRAI rules & regulations.</p>
            <p>
              We never promise delivery time on behalf of 3rd party courier
              service.
            </p>
            <p>
              If there will be any complaint against the 3rd party (courier
              partner), then the customer has to agree to wait until the
              solution is provided by the courier partner.
            </p>
            <p>
              The customer can contact us by calling on  <DaynamicMobileno/> or directly
              contact his assigned account manager.
            </p>
            <p>
              Customers can also contact us via email at   <DaynamicEmail colorvariant="text-blue"/>
            </p>
            <p>
              Customers can also connect via Whatsapp to communicate with
              his/her assigned account manager on his/her number.
            </p>
            <p>
              We send UPC generally on the registered mobile number provided to
              us.
            </p>
            <p>
              Customers can request to get UPC on another number by asking via
              email or Whatsapp.
            </p>
            <p>
              We will provide only UPC (Not sim). Customers will have to port
              the number from their nearest retailer or company outlet.
            </p>
            <p>
              The customer will get a sim from the retailer/store from where
              he/she will request MNP.
            </p>
            <p>
              In courier condition, all status on the courier site will be count
              true.
            </p>
            <p>
              If number ported out but anything pending like activation or any
              complaint regarding the customer’s selected operator/state will be
              handled by the customer support.
            </p>
            <p>
              We ensure and guarantee safety for the customer’s payment until
              the number is successfully ported.
            </p>
            <p>
              We are responsible for refunding the full payment that the
              customer has paid to us for the number.
            </p>
            <p>
              we are not responsible for any loss of the customer if an order
              got canceled from the customer end in any condition
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditionAccordion;
