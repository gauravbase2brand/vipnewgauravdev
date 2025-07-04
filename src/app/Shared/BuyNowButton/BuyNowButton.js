import React from "react";
import "./BuyNowButton.css";
import Link from "next/link";

const BuyNowButton = (props) => {
  return (
    <Link
      href={props.buttonUrl}
      onClick={props.onclickHandle}
      className="visit-store-button-os"
    >
      {props.buttonTitle}
      <span>
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
            fill="white"
          />
        </svg>
      </span>
    </Link>
  );
};

export default BuyNowButton;
