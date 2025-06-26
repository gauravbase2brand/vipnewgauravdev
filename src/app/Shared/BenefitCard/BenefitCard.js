import React from "react";
import "./BenefitCard.css";
import Image from "next/image";

const BenefitCard = (props) => {
  return (
    <div className="benefit-card-os">
      <div className="benefit-card-col-os">
        <div className="benefit-card-image-os">
          <Image
            src={props.benefit_image}
            alt="benefit-card-image"
            width={300}
            height={100}
            priority="true"
          />
        </div>
        <div className="benefit-card-text-os">{props.benefit_text}</div>
      </div>
    </div>
  );
};

export default BenefitCard;