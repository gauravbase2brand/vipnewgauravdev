import React from "react";
import "../WhyChooseUs.css";

const NeedMoreReasonsData = (props) => {
  return (
    <div className="NeedMoreReasonsData-section-os">
      <div className="why-choose-us-option-1-os">
        <h3>{props.optionId}</h3>
        <p>{props.optionText}</p>
      </div>
    </div>
  );
};

export default NeedMoreReasonsData;
