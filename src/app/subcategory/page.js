import React from "react";
import SubCategoryData from "./SubCategoryData";

export async function generateMetadata({ searchParams }) {
  const { id } = await searchParams; // Extract `id` from searchParams

  try {
    // Fetch the categories data
    const res = await fetch("https://fancymobilenumber.in/getSubCategories.php", {
      cache: "no-store", // Adjust cache strategy as needed
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Check if `id` exists and match it with the fetched data
    if (id && data?.length) {
      const matchedElement = data.find((element) => element.id === id);
      if (matchedElement) {
        return {
          title: matchedElement.title || "Default Title",
          description: matchedElement.description || "Default Description",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  // Fallback metadata if no match is found
  return {
    title: "Default Title",
    description: "Default Description",
  };
}


const page = () => {
  return <SubCategoryData />;
};

export default page;
