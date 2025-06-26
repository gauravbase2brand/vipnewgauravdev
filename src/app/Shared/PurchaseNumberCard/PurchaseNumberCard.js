import React from "react";
import "./PurchaseNumberCard.css";
import Image from "next/image";

const PurchaseNumberCard = (props) => {
  return (
    <div className="PurchaseNumberCard-os">
      <div className="PurchaseNumberCard-col-os">
        <div className="PurchaseNumberCard-image-os">
          <Image
            src={props.Image}
            alt="PurchaseNumberCard"
            width={300}
            height={100}
            priority="true"
          />
        </div>
        <h5>{props.headingText}</h5>
        <p>
          {props.subText}
          {props.star && (
            <span style={{ color: "red", fontSize: "20px", fontWeight: "700" }}>
              {props.star}
            </span>
          )}
          {props.spanText && (
            <span style={{ fontSize: "12px", fontWeight: "700" }}>
              {props.spanText}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PurchaseNumberCard;
