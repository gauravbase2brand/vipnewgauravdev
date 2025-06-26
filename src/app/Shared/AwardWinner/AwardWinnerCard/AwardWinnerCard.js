import React from "react";
import "./AwardWinnerCard.css";
import Image from "next/image";

const AwardWinnerCard = ({ image, heading, paragraph }) => {
  return (
    <div className="AwardWinnerCard-col-os 2xl:w-1/4">
      {image && (
        <div className="AwardWinnerCard-image-os">
          <Image
            src={image}
            alt="AwardWinnerCard"
            width={300}
            height={100}
            priority="true"
          />
        </div>
      )}
      {heading && <h3>{heading}</h3>}
      {paragraph && <p>{paragraph}</p>}
    </div>
  );
};

export default AwardWinnerCard;
