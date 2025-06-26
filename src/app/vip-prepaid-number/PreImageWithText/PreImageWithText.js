import React from "react";
import "../../about/About.css";
import Image from "next/image";

const PreImageWithText = (props) => {
  return (
    <section
      className={`AboutImageWithText-section-os ${
        props.qrCode ? "bg-white" : ""
      }`}
    >
      <div className="container-os">
        <div style={props.style} className="looking-number-main-ud ffff">
          <div className="looking-text-part-ud">
            <h2
              style={{
                color: props.qrCode ? "black" : " var(--primary) ",
                fontSize: "36px",
              }}
              className="headVipPrepaid"
            >
              {props.heading}
            </h2>
            {props.qrCode && <p className="vipPeraQr">{props.vipPeragraph}</p>}
            {props.qrCode && (
              <Image
                src={props.qrCode}
                alt="qr code image"
                className="qr-scanCode"
                width={300}
                height={100}
                priority="true"
              />
            )}
            {props.qrCode && <p>{props.vipQrpera}</p>}
            <p>{props.subHeading}</p>
            {(props.subHeading1 || props.subHeading12) && (
              <p>
                <span>{props.subHeading1}</span>
                {props.subHeading12}
              </p>
            )}
            {props.subHeading2 && (
              <p>
                <span>{props.subHeading2}</span>
              </p>
            )}
            {props.PrebtnVip && (
              <button
                className="btn-preVip"
                onClick={props.onClick}
                aria-label="preview"
              >
                {props.PrebtnVip}
              </button>
            )}
          </div>
          <div className="looking-img-part-ud">
            <Image
              className="h-[300px] object-contain"
              src={props.image}
              alt="Girl with mobile"
              width={300}
              height={100}
              priority="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreImageWithText;
