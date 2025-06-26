import React from "react";
import MainHeading from "../MainHeading/MainHeading";
import "./CategoriesContent.css";

// Utility function to decode HTML entities
const decodeHTML = (htmlContent) => {
  if (!htmlContent) return "";
  const textArea = document.createElement("textarea");
  textArea.innerHTML = htmlContent;
  return textArea.value;
};

const CategoriesContent = ({ id, HTMLContent, categoryH2 }) => {
  // Decode the HTML content to render properly
  const decodedContent = decodeHTML(HTMLContent);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <>
      {HTMLContent && categoryH2 && (
        <section className="CategoriesContent-section-os default-section-os">
          <div className="container-os">
            <div className="CategoriesContent-heading-os featured-number-heading-os">
              <MainHeading
                MainHeading={categoryH2?.h2_tag}
                rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
              />
            </div>
            <div className="CategoriesContent-os">
              <div
                className="CategoriesContent-row-os"
                key={id}
                dangerouslySetInnerHTML={{ __html: decodedContent }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CategoriesContent;
