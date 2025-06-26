"use client";
import React, { useEffect, useState } from "react";
import "../BlogsNumber.css";
import NumberArticleCard from "../NumberArticleCard";
import Image from "next/image";
import { ResponsiveFooter } from "@/app/ResponsiveModule";

const BlogsPage = () => {
  const [article, setArticle] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const BlogCurrentPath = window.location.pathname;
  const isBlogPath =
    BlogCurrentPath.startsWith("/blogs/") &&
    BlogCurrentPath.split("/blogs/")[1].length > 0;

  // Fetch article details based on the URL
  useEffect(() => {
    const fetchArticleDetails = async () => {
      const articleUrl = BlogCurrentPath.split("/blogs/")[1];
      if (isBlogPath) {
        try {
          const response = await fetch(
            `https://leafymango.com/blogDetails.php?img_url=${articleUrl}`
          );
          const data = await response.json();
          setArticle(data);
        } catch (error) {
          console.error("Error fetching article details:", error);
        }
      } else {
        setArticle(null);
      }
    };
    fetchArticleDetails();
  }, [BlogCurrentPath]);

  // Fetch recent articles with pagination
  useEffect(() => {
    const fetchRecentArticles = async () => {
      const recordStartFrom = 0;
      try {
        const response = await fetch(
          `https://leafymango.com/blogs.php?perPageLimit=${itemsPerPage}&recordStartFrom=${recordStartFrom}`
        );
        const data = await response.json();
        setRecentArticles(data.blogs.reverse());
      } catch (error) {
        console.error("Error fetching recent articles:", error);
      }
    };
    fetchRecentArticles();
  }, [currentPage]);

  // Calculate the current items to display
  const sanitizeText = (text) => {
    if (!text) return "";
    return text
      .replace(/Â/g, "") // Remove 'Â'
      .replace(/â/g, "'") // Replace 'â' with a single quote
      .replace(/â¦/g, "...") // Replace 'â¦' with ellipsis
      .replace(/â/g, "-") // Replace 'â' with a dash
      .replace(/â/g, "") // Remove any stray 'â' characters
      .replace(//g, '"') // Replace '' with a double quote
      .replace(//g, '"') // Replace '' with a double quote
      .replace(//g, "-") // Replace '' with a dash
      .replace(//g, ""); // Remove any stray '' characters
  };

  return (
    <>
      {recentArticles.length !== 0 ? (
        <div className="container-os">
          <div className="grid xl:grid-cols-[5fr_2fr] gap-6 mt-9">
            <div className="">
              {article && (
                <>
                  <Image
                    src={article?.mainImage}
                    alt={article?.img_url || "Blog Article"}
                    width={1000}
                    height={300}
                    priority="true"
                    className="rounded-lg"
                  />
                  <div className="desc_blog">
                    <h1>{article?.mainHeading}</h1>
                    {/* <p dangerouslySetInnerHTML={{ __html: article?.mainDescription }} /> */}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: sanitizeText(article?.mainDescription),
                      }}
                    />
                  </div>
                  <div>
                    <h2>{article?.subHeading}</h2>
                    <p>{article?.subHeadingDescription}</p>
                  </div>
                </>
              )}
            </div>

            <div className="">
              <h6 className="text-xl mb-3 font-medium rounded-lg p-3 bg-secondary border-b border-[#31313189]">
                Recent Articles
              </h6>
              <div className="grid grid-cols-2 gap-3">
                {recentArticles.map(
                  (item) =>
                    item?.id !== article?.id && (
                      <NumberArticleCard
                        key={item?.id}
                        id={item?.id}
                        img_url={item?.img_url}
                        width={1000}
                        height={300}
                        image={item?.mainImage}
                        heading={item?.mainHeading}
                        alt_tag={item?.img_url}
                        // handleClick={handleImageClick}
                        articleData={item} // Pass the entire article data
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-os">
          <div className="bg-white grid xl:grid-cols-[5fr_2fr] gap-6 mt-9">
            <div>
              <div className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-[583px] w-full"></div>
                <div className="mt-4">
                  <div className="bg-gray-300 h-8 w-3/4 rounded"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-5/6 rounded mt-2"></div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
                  <div className="bg-gray-300 h-4 w-4/5 rounded mt-2"></div>
                </div>

                <div className="mt-4">
                  <div className="bg-gray-300 h-4 w-5/6 rounded mt-2"></div>

                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
                  <div className="bg-gray-300 h-4 w-4/5 rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-4/5 rounded mt-2"></div>
                  <div className="bg-gray-300 h-6 w-1/2 rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-4/5 rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-4/5 rounded mt-2"></div>
                  <div className="bg-gray-300 h-4 w-full rounded mt-2"></div>
                  <div className="bg-gray-300 h-6 w-1/2 rounded mt-2"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="animate-pulse">
                <h6 className="bg-gray-300 h-10 w-full rounded-lg mb-3"></h6>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-300 h-40 rounded"></div>
                  <div className="bg-gray-300 h-40 rounded"></div>
                  <div className="bg-gray-300 h-40 rounded"></div>
                  <div className="bg-gray-300 h-40 rounded"></div>

                  <div className="bg-gray-300 h-40 rounded"></div>

                  <div className="bg-gray-300 h-40 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogsPage;
