"use client";
import React, { useEffect, useState } from "react";
import "./BlogsNumber.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import NumberBlogListCard from "./NumberBlogListCard";
const Blog = () => {
  const [data, setData] = useState({ blogs: [] }); // All blogs fetched so far
  const [totalBlogs, setTotalBlogs] = useState(0); // Total blogs from API
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // Number of blogs per page
  useEffect(() => {
    const fetchBlogs = async () => {
      const recordStartFrom = (currentPage - 1) * itemsPerPage; // Calculate offset
      const apiUrl = `https://leafymango.com/blogs.php?perPageLimit=${itemsPerPage}&recordStartFrom=${recordStartFrom}`;
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData({ blogs: result?.blogs }); // Set new blogs fetched for the page
        setTotalBlogs(result?.count); // Set the total number of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Change current page when pagination button is clicked
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {data?.blogs?.length !== 0 ? (
        <div className="container-os">
          <div className=" mb-2">
            <h1 className="text-[33px] text-primary font-semibold">Blogs</h1>
            <p className="md:text-[16px] text-[14px]">
              Are you looking for the best VIP phone numbers or VIP fancy
              numbers in India or its states? You have arrived here on the right
              webpage. That's where the VIP Number Shop comes into the picture
              with top-notch and best-in-market services with the very
              competitive and affordable price tag.
            </p>
            <h2 className="text-primary text-sm">
              VIP Number Shop (VNS) is the nation’s leading
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  md:gap-6 gap-3">
            <>
              {data.blogs?.map((item) => (
                <NumberBlogListCard
                  key={item?.id}
                  id={item?.id}
                  image={item?.mainImage}
                  img_url={item?.img_url}
                  width={1000}
                  height={300}
                  date={formatDate(item?.Date)}
                  alt_tag={item?.img_url}
                  heading={item?.mainHeading}
                  subHeading={item?.mainShortDescription}
                />
              ))}
            </>
          </div>
          <div className="center_pagination">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(totalBlogs / itemsPerPage)} // Correct total pages calculation
                page={currentPage}
                onChange={handlePageChange} // Change page on user interaction
                size="large"
              />
            </Stack>
          </div>
        </div>
      ) : (
        
        <div className="container-os">
        <div className="bg-white">
          <div className="mb-2">
            <div className="h-8 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div className="mt-2 h-4 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="mt-2 h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index}>
                <div className="bg-gray-200 animate-pulse rounded h-48"></div>
                <div className="mt-2 h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="mt-2 h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
       
      )}
    </>
  );
};

export default Blog;
