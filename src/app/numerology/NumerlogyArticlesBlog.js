"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { usePathname } from "next/navigation";

const NumerlogyArticlesBlog = () => {
  const [articles, setArticles] = useState([]); // State to hold API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const api = `https://leafymango.com/blogs.php?perPageLimit=10&recordStartFrom=0&type=${
    pathname === "/family-pack" ? "FamilyPack" : "Numerology"
  }`;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Treat <= 768px as mobile
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setArticles(data?.blogs);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ✅ Hide section if no articles exist
  if (loading || error || articles.length === 0) {
    return null;
  }

  const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="bg-[#F9F9F9] lg:py-9 py-10">
      <div className="container-os mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">
            Articles &{" "}
            <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
              Blog
            </span>
          </h2>
          <Link
            href="/blogs"
            className="text-sm text-black font-medium flex items-center hover:underline"
          >
            READ ALL <FiArrowRight className="ml-1" />
          </Link>
        </div>

        {/* Blog List (Shows Only 5 Articles) */}
        <div className="grid md:gap-6 gap-10">
          {articles.map((post, index) => (
            <>
              <Link href={`/blogs/${post.img_url}`}>
                <div
                  key={post.id}
                  className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg"
                >
                  {/* Blog Image */}

                  <div className="relative w-full lg:w-1/3 md:h-[240px] h-[171px]">
                    <Link href={`/blogs/${post.img_url}`}>
                      <Image
                        src={post.mainImage || "/assets/default-image.png"} // ✅ Uses correct API field
                        alt={post.mainHeading}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none  object-contain md:h-[240px] h-[171px]"
                      />
                    </Link>
                  </div>

                  {/* Blog Content */}
                  <div className="p-5 flex flex-col w-full lg:w-2/3">
                    {/* <p className="text-sm text-gray-500">
                  {post.Date || "No Date"}
                </p> */}
                    <h3 className="text-lg font-semibold">
                      {/* <span className="text-primary">{index + 1}. </span>{" "} */}
                      {/* ✅ Numbering */}
                      {post.mainHeading}
                    </h3>
                    <p className="font-normal text-[16px] leading-[24px] md:text-[17px] md:leading-[30px] text-darktext">
                      {truncateWords(
                        post.mainDescriptionNoHtml.replace(/(<([^>]+)>)/gi, ""),
                        isMobile ? 25 : 60
                      )}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <div className="flex items-center justify-center px-6 relative">
                    <Link
                      href={`/blogs/${post.img_url}`} // ✅ Ensures valid link to blog post
                      className="bg-primary text-white p-3 absolute md:left-[20px] md:right-auto right-0"
                    >
                      <FiArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumerlogyArticlesBlog;
