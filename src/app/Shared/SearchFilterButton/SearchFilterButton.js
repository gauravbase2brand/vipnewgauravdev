import React from "react";
import "./SearchFilterButton.css";

const SearchFilterButton = ({ onClick, buttonRadius,dataLoading }) => {
  return (
    <button
      type="submit"
      className={`search-filter-btn-os ${dataLoading ? "pointer-events-none" : ""}`}
      style={{
        borderRadius: buttonRadius || "",
        opacity: dataLoading ? 0.8 : 1, // Add opacity change based on dataLoading state
      }}
      onClick={onClick}
      aria-label="search-filter"
      disabled={dataLoading}
    >
      <span className="flex flex-row">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z"
            fill="white"
          />
          <path
            d="M9.41195 6.58609C9.79095 6.96609 9.99995 7.46809 9.99995 8.00009H12C12.0008 7.47451 11.8975 6.95398 11.696 6.46857C11.4945 5.98316 11.1988 5.54251 10.826 5.17209C9.31195 3.66009 6.68695 3.66009 5.17395 5.17209L6.58595 6.58809C7.34595 5.83009 8.65595 5.83209 9.41195 6.58609Z"
            fill="white"
          />
        </svg>
      </span>
      SEARCH
    </button>
  );
};

export default SearchFilterButton;
