import React from "react";
import Select from "react-select";
import "./CountrySelector.css";

const CountrySelector = (props) => {
  return (
    <div className="main-selector-os">
      <Select
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default CountrySelector;
