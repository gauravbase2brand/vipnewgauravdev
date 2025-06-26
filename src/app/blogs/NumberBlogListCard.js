import React from "react";
import "./BlogsNumber.css";
import Link from "next/link";
import Image from "next/image";

const NumberBlogListCard = ({
  image,
  width,
  height,
  heading,
  subHeading,
  img_url,
  alt_tag,
}) => {
  const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  const truncatedSubHeading = truncateWords(
    subHeading.replace(/(<([^>]+)>)/gi, ""),
    25
  );
  return (
    <div className="">
      {/* <div className="blog_content" onClick={handleCardClick}>
        <img src={image} alt="" width={width} height={height} />
        <h2>{heading}</h2>
        <p>{truncatedSubHeading}</p>
      </div> */}
      <Link href={`/blogs/${img_url}`} className="">
        <Image
          src={image}
          alt={alt_tag || "Blog Content"}
          width={width}
          height={height}
          priority="true"
          className="rounded-lg "
        />
        <h2 className="md:text-[20px] text-[18px] text-primary font-medium md:my-3 my-1">{heading}</h2>
        {/* <span className="date">{date}</span> */}
        <p className="md:text-[16px] text-[14px]">{truncatedSubHeading}</p>
      </Link>
    </div>
  );
};

export default NumberBlogListCard;
