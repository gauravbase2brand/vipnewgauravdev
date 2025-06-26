import React from "react";
import "./DeliveryProcessCard.css";
import Image from "next/image";

const DeliveryProcessCard = ({ image, heading, paragraph }) => {
  return (
    <div className="DeliveryProcessCard-col-os">
      {image && (
        <div className="DeliveryProcessCard-image-os">
          <Image
            src={image}
            alt={heading}
            width={50} // Adjust based on your layout
            height={42} // Adjust based on your layout
            loading="eager" // Use "eager" for LCP elements
            priority="true"
          />
        </div>
      )}
      {heading && <h3>{heading}</h3>}
      {paragraph && <p>{paragraph}</p>}
    </div>
  );
};

export default DeliveryProcessCard;
