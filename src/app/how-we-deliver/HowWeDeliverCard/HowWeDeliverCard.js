import React from "react";
import "./HowWeDeliverCard.css";
import Image from "next/image";

const HowWeDeliverCard = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className="HowWedeliverCard-section-os">
      <div className="container-os">
        <div className="HowWedeliverCard-row-os">
          <div className="HowWedeliverCard-col-1-os">
            <div className="HowWedeliverCard-image-os">
              <Image
                src={`${panelImg}/assets/img/vip-images/howwedeliver-card-bedge_cdznpu.webp`}
                alt="Bedge"
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <h3>Payment for VIP Number</h3>
            <p>
              To begin the VIP mobile number activation, the customer completes
              the payment. This secures their chosen number and initiates the
              activation process for a seamless and exclusive experience.
            </p>
          </div>
          <div className="HowWedeliverCard-col-2-os">
            <div className="HowWedeliverCard-image-os">
              <Image
                src={`${panelImg}/assets/img/vip-images/howwedeliver-card-bedge_cdznpu.webp`}
                alt="Bedge"
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <h3>Providing a UPC code</h3>
            <p>
              We provide the customer with a unique UPC (Unique Porting Code).
              This code is essential for transferring the number, ensuring the
              customer’s VIP number is securely and accurately processed.
            </p>
          </div>
          <div className="HowWedeliverCard-col-3-os">
            <div className="HowWedeliverCard-image-os">
              <Image
                src={`${panelImg}/assets/img/vip-images/howwedeliver-card-bedge_cdznpu.webp`}
                alt="Bedge"
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <h3>Customer Will Do MNP</h3>
            <p>
              The customer completes the Mobile Number Portability (MNP)
              process. This step transfers the chosen VIP number to the
              customer’s preferred network, ensuring convenience and
              compatibility with their existing service provider.
            </p>
          </div>
          <div className="HowWedeliverCard-col-4-os">
            <div className="HowWedeliverCard-image-os">
              <Image
                src={`${panelImg}/assets/img/vip-images/howwedeliver-card-bedge_cdznpu.webp`}
                alt="Bedge"
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <h3>2 to 4 days for SIM activation</h3>
            <p>
              Once the MNP process is finalized, the VIP number SIM is activated
              within 2 to 4 days. The customer can then start using their
              exclusive number promptly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliverCard;
