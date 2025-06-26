import React from "react";
import "./NumberArticle.css";
import Link from "next/link";
import Image from "next/image";

const NumberArticleCard = ({
  heading,
  image,
  height,
  width,
  articleData,
  alt_tag,
}) => {
  return (
    <div className="w-full gkblog hover:scale-105 transition-transform duration-200 ease-in-out">
      <Link href={`/blogs/${articleData.img_url}`} className="">
        <Image
          src={image}
          alt={alt_tag || "Blog Article Card"}
          width={width}
          height={height}
          className="cat_img"
          priority="true"
        />
        <h2 className="text-sm my-2">{heading}</h2>
      </Link>
    </div>
  );
};

export default NumberArticleCard;
