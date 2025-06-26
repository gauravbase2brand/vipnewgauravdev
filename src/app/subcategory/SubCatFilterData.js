"use client";
import React, { useContext, useEffect } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useSearchParams } from "next/navigation";
import CategoryPage from "../category/[subcategory]/CategoryPage";

const SubCatFilterData = () => {
  const {
    setApiData,
    selectedPriceOptions,
    loaderdata,
    setSubCatDetail,
    selectedStartWithOption,
    catFilter,
    maxPrice,
    minPrice,
    sellers,
    numurologyValues,
    coming,
    setCatFilter,categoryCurrentPage,setLoadMore
  } = useContext(AppStateContext);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const id = searchParams.get("id");
  const seller = searchParams.get("seller");
  const comingsoon = searchParams.get("comingsoon");
  const page = searchParams.get("page");
  const paginate = searchParams.get("paginate");
  const startWith = searchParams.get("startWith");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const sort = searchParams.get("sort");
  const total = searchParams.get("total");
  const sum = searchParams.get("sum");
  const end_with = searchParams.get("end_with");
  const contains = searchParams.get("contains");
  const not_contain = searchParams.get("not_contain");

  const fetchDataOnLoad = async () => {
    if (!category || !id || !page || !paginate) return;
    if (!loaderdata) {
      const queryParams = new URLSearchParams({
        category,
        id,
        page,
        paginate,
      });
      if (selectedStartWithOption && selectedStartWithOption.length > 0) {
        queryParams.set("startWith", selectedStartWithOption.join(","));
      } else if (startWith) {
        queryParams.set("startWith", startWith);
      }
      if (minPrice !== null) {
        queryParams.append("min_price", minPrice);
      } else if (min_price) {
        queryParams.set("min_price", min_price);
      }
      if (maxPrice !== null) {
        queryParams.append("max_price", maxPrice);
      } else if (max_price) {
        queryParams.set("max_price", max_price);
      }
      if (sellers) {
        queryParams.append("seller", "PREMIUM,BASIC");
      } else if (seller) {
        queryParams.set("seller", seller);
      }

      if (numurologyValues.EndWith) {
        queryParams.append("end_with", numurologyValues.EndWith);
      } else if (end_with) {
        queryParams.set("end_with", end_with);
      }
      if (numurologyValues.Contains) {
        queryParams.append("contains", numurologyValues.Contains);
      } else if (contains) {
        queryParams.set("contains", contains);
      }
      if (numurologyValues.notContain) {
        queryParams.append("not_contain", numurologyValues.notContain);
      } else if (not_contain) {
        queryParams.set("not_contain", not_contain);
      }
      if (numurologyValues.Total) {
        queryParams.append("total", numurologyValues.Total);
      } else if (total) {
        queryParams.set("total", total);
      }
      if (numurologyValues.Sum) {
        queryParams.append("sum", numurologyValues.Sum);
      } else if (sum) {
        queryParams.set("sum", sum);
      }
      if (selectedPriceOptions) {
        queryParams.append("sort", selectedPriceOptions);
      } else if (sort && selectedPriceOptions !== "") {
        queryParams.set("sort", sort);
      }
      if (coming) {
        queryParams.append("comingsoon", "no");
      } else if (comingsoon) {
        queryParams.set("comingsoon", comingsoon);
      }
      queryParams.set("star_status", true);
      const apiUrl = `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/categories/search?${queryParams.toString()}`;
      const dynamicApiUrl = `https://leafymango.com/getSubCategoriesDetails.php?id=${id}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApiData(data.data);
        // Fetch dynamic data based on ID
        const dynamicResponse = await fetch(dynamicApiUrl);
        const dynamicData = await dynamicResponse.json();
        setSubCatDetail(dynamicData);
        const newUrl = `/subcategory?${queryParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
      } catch (error) {
        console.error("Error fetching data on load:", error);
        setCatFilter(false);
        setLoadMore(false);
      }finally{
        setCatFilter(false);
        setLoadMore(false);
      }
    }
  };

  useEffect(() => {
    // Fetch data on page load
    fetchDataOnLoad();
  }, [id, catFilter,categoryCurrentPage]);

  return (
    <div>
      <CategoryPage />
    </div>
  );
};

export default SubCatFilterData;
