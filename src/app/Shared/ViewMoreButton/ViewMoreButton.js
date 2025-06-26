import React from "react";
import "./ViewMoreButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

const ViewMoreButton = ({ onClick, title, buttonColor }) => {
  return (
    <button
      className={`${
        window.location.pathname === "/"
          ? "ViewMoreButton-button-os"
          : "font-normal  text-[17px] leading-[20px] text-center text-white bg-primary  rounded-[6px] flex items-center justify-center w-max h-[48px] mx-auto no-underline px-8 transition duration-300 mt-4 hover:border-primary hover:bg-secondary  hover:text-darktext mb-3 capitalize"
      }`}
      type="button"
      onClick={onClick}
      aria-label="book now"
    >
      {window.location.pathname === "/" && title === "Book Now" ? title : ""}
      {window.location.pathname !== "/" && title}
      {window.location.pathname === "/" && (
        <span>
          <FontAwesomeIcon
            icon={faGreaterThan}
            style={{ color: "var(--primary)", fontSize: "15px" }}
          />
          <FontAwesomeIcon
            icon={faGreaterThan}
            style={{ color: "var(--primary)", fontSize: "15px" }}
          />
          <FontAwesomeIcon
            icon={faGreaterThan}
            style={{ color: "var(--primary)", fontSize: "15px" }}
          />
        </span>
      )}
    </button>
  );
};

export default ViewMoreButton;

// fill={`${ buttonColor || " var(--primary) " } `}/>
