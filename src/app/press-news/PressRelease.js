"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const PressRelesed = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [currentPage, setCurrentPage] = useState(10); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [showFullDescription, setShowFullDescription] = useState({}); // Track content per blog
  const perPageLimit = 10; // Set the number of blogs per page
  // Fetch blog data from API using axios
  const fetchBlogs = async () => {
    if (loading) return;
    try {
      setLoading(true);
      // const response = await axios.get(
      //   `https://leafymango.com/blogs.php?perPageLimit=${perPageLimit}&recordStartFrom=${
      //     (currentPage - 1) * perPageLimit
      //   }&type=NEWS`
      // );
      const response = await axios.get(
        `https://leafymango.com/blogs.php?perPageLimit=${perPageLimit}&recordStartFrom=0&type=NEWS`
      );
      setBlogs(response.data.blogs || []);
      setTotalPages(Math.ceil(response.data.count / perPageLimit));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.instaplug.app/platform/instaplug.js";
    script.async = true;
    script.onload = () => {
      // Delay execution to ensure DOM is fully loaded
      setTimeout(() => {
        if (window.renderApp) {
          window.renderApp({
            containerId: "4484341a-cd2f-4d5f-b4c5-f5bae5a91870",
            domain: "https://app.instaplug.app/",
            widgetClass: "",
            fontFamily: "",
            color: "",
            colorLink: "",
            colorLinkActive: "",
            colorLinkHover: "",
          });
        }
      }, 500); // Wait 500ms before executing renderApp
    };
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Read More/Show Less toggle
  const handleReadMoreClick = (blogId) => {
    setShowFullDescription((prevState) => {
      const currentLength = prevState[blogId] || 30; // Default to 5 words
      const maxLength =
        blogs
          .find((blog) => blog.id === blogId)
          ?.mainDescriptionNoHtml.split(" ").length || 0;
      const newLength = currentLength + 30 <= maxLength ? maxLength : maxLength;

      return {
        ...prevState,
        [blogId]: newLength,
      };
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleChange = (abc) => {
    window.open(abc, "_blank");
  };
  return (
    <>
      <div className="container-os overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-8 lg:py-14 py-6">
          {/* Left Section - Blog Articles */}
          <div className="flex flex-col gap-3">
            {loading ? (
              // ✅ Dynamic Skeleton Loader
              [...Array(perPageLimit)].map((_, index) => (
                <div key={index} className="bg-white">
                  <div className="animate-pulse">
                    <div className="rounded-md lg:w-1/3 w-full h-40 bg-gray-300 cursor-pointer"></div>
                    <div className="mt-4 border-b border-gray-300 pb-3">
                      <div className="animate-pulse">
                        <div className="bg-gray-300 rounded-md h-10 w-3/4"></div>
                        <div className="bg-gray-300 rounded-md h-8 w-1/2 mt-2"></div>
                        <div className="bg-gray-300 rounded-md h-6 w-full mt-4"></div>
                        <div className="bg-gray-300 rounded-md h-6 w-1/4 mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog) => {
                const currentDescriptionLength =
                  showFullDescription[blog.id] || 30; // Show first 30 words initially
                const fullDescription = blog.mainDescriptionNoHtml.split(" ");
                const truncatedDescription = fullDescription
                  .slice(0, currentDescriptionLength)
                  .join(" ");
                const remainingWords =
                  fullDescription.length - currentDescriptionLength;
                const showReadMore = remainingWords > 0;

                return (
                  <div key={blog.id}>
                    {blog.mainImage ? (
                      <Image
                        className="rounded-md lg:w-1/3 w-full cursor-pointer"
                        src={blog.mainImage}
                        alt={blog.mainHeading || "Blog Image"}
                        width={500}
                        height={500}
                        onClick={() => handleChange(blog.img_url)}
                      />
                    ) : (
                      <p>Image Not Found</p>
                    )}

                    <div className="mt-4 border-b border-[#505050dd] pb-3">
                      <h2
                        className="font-bold text-[20px] md:text-[24px] cursor-pointer"
                        onClick={() => handleChange(blog.img_url)}
                      >
                        {blog.mainHeading}
                      </h2>
                      <p
                        className="text-black font-semibold text-[16px] leading-[24px] mt-2 cursor-pointer"
                        onClick={() => handleChange(blog.img_url)}
                      >
                        {blog.mainShortHeading}
                      </p>
                      <p className="text-gray-700 text-[16px] leading-[24px] mt-4">
                        <span
                          onClick={() => handleChange(blog.img_url)}
                          className="cursor-pointer"
                        >
                          {truncatedDescription}
                        </span>
                        {showReadMore && !showFullDescription[blog.id] && (
                          <span
                            className="text-blue-600 font-semibold text-[14px] ml-2 cursor-pointer hover:underline"
                            onClick={() => handleReadMoreClick(blog.id)} // Collapse content
                          >
                            Read More
                          </span>
                        )}
                      </p>
                      <Link href={blog.img_url || "#"} target="_blank">
                        <p className="text-blue-600 font-semibold text-[14px] mt-4 inline-block hover:underline">
                          {blog.img_url || "#"}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600">No blogs found</p>
            )}

            {/* Pagination Controls */}
            {blogs.length > perPageLimit && (
              <div className="flex space-x-1 justify-center">
                <button
                  className="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-secondary focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {/* Render page buttons dynamically */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`min-w-9 rounded-md py-2 px-3 text-center text-sm transition-all shadow-sm ${
                      index + 1 === currentPage
                        ? "bg-primary text-white"
                        : "border border-slate-300 text-slate-600"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-secondary focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Right Section - Releases by Topic & Instaplug Widget */}
          <div className="bg-gray-100 rounded-md border border-primary overflow-y-scroll md:h-[1000px] h-[700px] lg:block hidden">
            <h3 className="font-bold text-[18px] md:text-[20px] border-b p-4">
              Releases by Topic
            </h3>

            {/* ✅ Instaplug Widget Grid (2 in a row) */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 ">
              <div id="4484341a-cd2f-4d5f-b4c5-f5bae5a91870" className=""></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PressRelesed;
