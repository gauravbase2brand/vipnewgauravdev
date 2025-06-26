import React from "react";
import "./CityFavouriteNumber.css";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import CityButton from "../CityButton/CityButton";

const CityFavouriteNumber = ({
  title1,
  title2,
  buttonTitle,
  link,
  paragraphStyles,
}) => {
  return (
    <section className=" bg-white py-8">
      <div className="container-os">
        <div className="flex text-center flex-col gap-2 justify-center items-center">
          {title1 && <CityHeading title={title1} />}
          {title2 && <CityParagraph title={title2} customStyles={paragraphStyles} />}
          {buttonTitle && <CityButton link={link} title={buttonTitle} />}
        </div>
      </div>
    </section>
  );
};

export default CityFavouriteNumber;
