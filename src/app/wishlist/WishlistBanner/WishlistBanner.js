import React, { useState } from "react";
import "./WishlistBanner.css";
import Link from "next/link";

const WishlistBanner = (props) => {
    const [activeButton, setActiveButton] = useState(props.setActiveButton);
    const handleToggleBtn = (value) => {
        setActiveButton(value);
    };
    return (
        <section className="WishlistBanner-section-os">
            <div className="container-os">
                <div className="WishlistBanner-row-os bg-primary" 
                 style={{
                    backgroundImage:
                      "url('https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/aboutbg_s9gfut.webp')",
                  }}
                
                >
                    <h1>{props.title}</h1>
                    {props.subHeading && <p>{props.subHeading}</p>}
                    <div className="WishlistBanner-buyNow-wishlist-button-os">
                        <Link
                            onClick={() => handleToggleBtn("toggle-1-os")}
                            href={props.buttonLink}
                            className={`WishlistBanner-buyNow-os ${activeButton === "toggle-1-os" ? "active" : ""
                                }`}
                        >
                            {props.buttonTitle}
                        </Link>
                        <Link
                            onClick={() => handleToggleBtn("toggle-2-os")}
                            href={props.buttonLink1}
                            className={`WishlistBanner-wishList-os ${activeButton === "toggle-2-os" ? "active" : ""
                                }`}
                        >
                            {props.buttonTitle1}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WishlistBanner;