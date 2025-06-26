import React from "react";
import MainHeading from "../../MainHeading/MainHeading";
import MainSubHeading from "../../MainSubHeading/MainSubHeading";
import "./DeliveryProcess.css";
import "../../City/CityHowGetVipNumber/CityHowGetVipNumber.css";
import DeliveryProcessCard from "../DeliveryProcessCard/DeliveryProcessCard";

const DeliveryProcess = ({ sectionStyle }) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const headingStyle = {
    color: "#fff",
  };
  const paramStyle = {
    color: "#fff",
  };
  return (
    <section
      className={`Delivery-process-section-os default-section-os ${sectionStyle}`}
    >
      <div className="container-os ">
        <div className="default-heading-os">
          <MainHeading
            MainHeading="No Boundation"
            style={headingStyle}
            justifyContent="center"
          />
          <MainSubHeading
            MainSubHeadingText="Prepaid or Postpaid, the choice is yours"
            style={paramStyle}
          />
        </div>
        <div className="Delivery-process-content-os  ">
          <div className="CityHowGetVipNumber-heading-os">
            <h3>
              Delivery Process
              <span>for VIP Number</span>
              <span>?</span>
            </h3>
          </div>

          <div className="Delivery-process-row-os wavy-border">
            <DeliveryProcessCard
              image={`${panelImg}/assets/img/vip-images/pay_vorvxz.webp`}
              heading="Pay"
              paragraph="to place an Order"
            />
            <DeliveryProcessCard
              image={`${panelImg}/assets/img/vip-images/upc_hpsohc.webp`}
              heading="Get UPC"
              paragraph="UPC will be delivered through SMS, Whatsapp & Email."
            />
            <DeliveryProcessCard
              image={`${panelImg}/assets/img/vip-images/sim_nllgyu.webp`}
              heading="Do MNP"
              paragraph="Start the MNP Process at the nearest retail shop to get the Sim"
            />
          </div>
          <div className="Delivery-process-row-os-1">
            <DeliveryProcessCard
              heading="Money Back Assurity"
              paragraph="100% Money Back if you face any problem with the UPC."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryProcess;
