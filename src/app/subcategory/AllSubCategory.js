"use client";
import React, { useContext, useState } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import "./SubCategory.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
const AllSubCategory = () => {
  const { subCategoryData, handleSubCat, similarLoader } =
    useContext(AppStateContext);
    const pathname = usePathname();
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  // State to manage visible subcategories
  const [visibleCount, setVisibleCount] = useState(10);
  // Extract sub-categories along with their parent category names
  const allSubCategories = subCategoryData
    .flatMap((group) => group) // Flatten outer arrays
    .flatMap((category) =>
      (category.sub_categories || []).map((subCategory) => ({
        id: subCategory.id,
        name: subCategory.name,
        parentCategoryName: category.name, // Include parent category name
      }))
    );

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // Check if all subcategories are displayed
  const allShown = visibleCount >= allSubCategories.length;
  return (
    <div className="sub-caty-rs">
      <div className="flex justify-center items-center flex-wrap gap-2">
        {allSubCategories.slice(0, visibleCount).map((subCategory, index) => {
          const queryParams = new URLSearchParams({
            category: subCategory.parentCategoryName,
            id: subCategory.id,
            seller: "PREMIUM",
            comingsoon: "yes",
            page: 1,
            paginate: 60,
          });
          return (
            <Link
              href={`/subcategory?${queryParams.toString()}`}
              prefetch={true}
              key={index}
              className={`sub-caty-slice flex items-center ${
                selectedSubCategory === subCategory.id ? "subCat-btn" : ""
              }`}
              onClick={() => {
                setSelectedSubCategory(subCategory.id);
                handleSubCat(subCategory);
                window.scrollTo(0, 0);
              }}
            >
              <span>{subCategory.name}</span>
              {similarLoader && selectedSubCategory === subCategory.id && (
                <span className="dot-loader ml-2 flex">
                  <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                  <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                  <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {!allShown && (
        <span
          className="sub-caty-btn"
          onClick={handleLoadMore}
          aria-label="Load More"
        >
          Load More...
        </span>
      )}
    </div>
  );
};

export default AllSubCategory;
