import React from "react";
import "./CategoriesCard.css";

const CategoriesCard = (props) => {
  return (
    <div style={props.bgStyle} className="CategoriesCard-os">
      <div style={props.bgStyle} className="CategoriesCard-col-os">
        <h3>{props.heading}</h3>
        <div style={props.bgStyle2} className="CategoriesCard-number-os">
          {props.categoryNumber}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
