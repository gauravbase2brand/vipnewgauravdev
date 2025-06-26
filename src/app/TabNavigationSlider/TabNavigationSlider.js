"use client";
import React, { useState, useEffect, useContext } from "react";
import "./TabNavigationSlider.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import CatSubcategory from "./CatSubcategory";
import TabCategory from "./TabCategory";
import { usePathname } from "next/navigation";

const TabNavigationSlider = ({ arrayOfArrays, catFilter }) => {
  const router = useRouter();
  const {
    setApiData,
    categoryCurrentPage,
    setCategoryCurrentPage,
    setFromTab,
    footerCat,
    setShowPopup,
    showPopup,
    setCatLoader,
    setCatData,
    SetSelectedStartWithOption,
    selectedStartWithOption,
    setSelectedPriceRanges,
    setMaxPrice,
    maxPrice,
    minPrice,
    setMinPrice,
    numurologyValues,
    setNewInputValue,
    selectedPriceOptions,
    setSelectedPriceOptions,
    checkboxState,
    setCheckboxState,
    coming,
    setCatFilter,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategories,
    setSelectedSubCategories,
    setTabCategory,
    tabCategory,
    setSubCategoryData,
    setComing,
    setActiveCategoryLink,
    setLoaderCat,
    setSimilarLoader,
    setSelectedNumbers,
    catModalOpen,
    setCatModalOpen,
    similarLoader,setLoadMore,skeleton
  } = useContext(AppStateContext);
  const apiMainUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [skipEffect, setSkipEffect] = useState(false);

  // Array to store input values

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const FamilyPackSettings = {
    type: "slide",
    perPage: isMobile ? 2 : 5,
    perMove: 1,
    autoplay: false,
    gap: "1rem",
    pagination: false,
    arrows: true,
    drag: true,
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const categoryUrl = currentPath.split("/")[2];
    if (categoryUrl) {
      setShowPopup(true);
    }
  }, []);

  const handleCategoryLink = (category) => {
    const slug = category?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP";
    router.push(`/category/${slug}`);
    // window.history.pushState(
    //   null,
    //   "",
    //   `/category/${
    //     category?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
    //   }`
    // );
    setLoaderCat(false);
    setSkipEffect(true);
    setSimilarLoader(true);
    setShowPopup(true);
    const clearedStartWithOption = [];
    const clearedMinPrice = null;
    const clearedMaxPrice = null;
    const clearedCheckboxState = {
      basicSeller: false, // default 'premium'
      comingSoon: false, // default 'no'
    };
    const clearedComing = "";
    const clearedEnd_with = "";
    const clearedContains = "";
    const clearedNot_contain = "";
    const clearedTotal = "";
    const clearedSum = "";
    const clearedSort = "";
    setSelectedSubCategories([]);
    setNewInputValue({});
    SetSelectedStartWithOption([]);
    setMinPrice(null);
    setMaxPrice(null);
    setCheckboxState({
      basicSeller: false, // default 'premium'
      comingSoon: false, // default 'no'
    });
    setSelectedPriceOptions("");
    setComing("");
    setFromTab(false);
    setCatFilter(false);
    setApiData([]);
    setCategoryCurrentPage(1);
    setActiveCategoryLink(category.id); // Set the active category
    setSelectedCategory(category);
    handleCategoryTab(
      category,
      [],
      clearedStartWithOption,
      clearedMinPrice,
      clearedMaxPrice,
      clearedCheckboxState,
      clearedComing,
      clearedEnd_with,
      clearedContains,
      clearedNot_contain,
      clearedTotal,
      clearedSum,
      clearedSort
    );
    setTabCategory(true);
    setSkipEffect(false);
    setSelectedNumbers([]);
    setSelectedPriceRanges([]);
    window.scrollTo(0, 0);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    if (subCategoryId) {
      setSimilarLoader(true);
      setApiData([]);
      setCategoryCurrentPage(1);
      setSelectedSubCategories((prev) => {
        // Convert all to strings for consistent comparison
        const normalizedSubCategoryId = String(subCategoryId);
        const updatedSubCategories = prev.includes(normalizedSubCategoryId)
          ? prev.filter((id) => String(id) !== normalizedSubCategoryId) // Remove if already selected
          : [...prev, normalizedSubCategoryId]; // Add new subcategory
        return updatedSubCategories;
      });
    }
    setTabCategory(false);
    window.scrollTo(0, 0);
  };

  // Trigger API call and update the URL when subcategories are updated
  useEffect(() => {
    if (window.location.pathname.split("/")[1] === "category") {
      if (catFilter) {
        handleApplyFilter();
      } else if (categoryCurrentPage > 1) {
        handleApplyFilter();
      }
    }
  }, [catFilter, categoryCurrentPage]);

  useEffect(() => {
    if (skipEffect) return;
    if (window.location.pathname.split("/")[1] === "category") {
      handleApplyFilter(selectedCategory);
    }
  }, [selectedCategory, selectedSubCategories, skipEffect]);

  // Footer category when clicked then this hitted footerCat
  useEffect(() => {
    if (tabCategory) {
      setSimilarLoader(true);
      setFromTab(false);
      setNewInputValue({});
      setSelectedSubCategories([]);
      setCatFilter(false);
      SetSelectedStartWithOption([]);
      setMinPrice(null);
      setMaxPrice(null); // Update selected category
      handleApplyFilter(footerCat);
      setSelectedCategory(footerCat);
      setShowPopup(true);
      setApiData([]);
      setCheckboxState({
        basicSeller: false, // default 'premium'
        comingSoon: false, // default 'no'
      });
      setCategoryCurrentPage(1);
    }
  }, [footerCat]);

  useEffect(() => {
    const initializeFiltersFromQuery = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const categoryName = queryParams.get("category");
      const catId = queryParams.get("catId");
      const subCategoryIds = queryParams.get("id");
      const startWith = queryParams.get("startWith")?.split(",") || [];
      const minPriceParam = queryParams.get("min_price");
      const maxPriceParam = queryParams.get("max_price");
      const endWith = queryParams.get("end_with");
      const contains = queryParams.get("contains");
      const notContain = queryParams.get("not_contain");
      const total = queryParams.get("total");
      const sum = queryParams.get("sum");
      const sorting = queryParams.get("sort");
      const seller = queryParams.get("seller");
      const comingSoon = queryParams.get("comingsoon");
      // Initialize category
      if (categoryName) {
        setSelectedCategory({
          name: categoryName,
          detail: { category_id: catId },
        });
      }
      // Initialize subcategories from URL
      if (subCategoryIds) {
        const subCategoriesArray = subCategoryIds.split(",");
        setSelectedSubCategories(subCategoriesArray);
      }
      // Initialize other filters
      if (startWith.length > 0) {
        SetSelectedStartWithOption(startWith);
      }
      if (minPriceParam) {
        setMinPrice(Number(minPriceParam));
      }
      if (maxPriceParam) {
        setMaxPrice(Number(maxPriceParam));
      }
      // Initialize price ranges
      if (minPriceParam && maxPriceParam) {
        const min = Number(minPriceParam);
        const max = Number(maxPriceParam);
        setSelectedPriceRanges([{ 0: min, 1: max }]);
      }
      setNewInputValue((prevValues) => ({
        ...prevValues,
        EndWith: endWith || "",
        Contains: contains || "",
        notContain: notContain || "",
        Total: total || "",
        Sum: sum || "",
      }));

      if (sorting) {
        setSelectedPriceOptions(sorting);
      }
      setCheckboxState((prevState) => ({
        ...prevState,
        basicSeller: seller === "PREMIUM,BASIC",
      }));
      setCheckboxState((prevState) => ({
        ...prevState,
        comingSoon: comingSoon === "no",
      }));
    };
    initializeFiltersFromQuery();
  }, []); // Only run once when the component mounts

  useEffect(() => {
    const currentPath = window.location.pathname;
    const slug = currentPath.split("/")[2]; // Extract slug from the URL
    // Loop through the arrayOfArrays and find the matched category by slug
    setSubCategoryData(arrayOfArrays);
    let matchedCategory = null;
    arrayOfArrays.forEach((categoryArray) => {
      categoryArray.forEach((category) => {
        if (category.detail.slug === slug) {
          matchedCategory = category; // If found, assign the category
        }
      });
    });
    // If a category is matched, set it in the state
    if (matchedCategory) {
      setSelectedCategory(matchedCategory);
    }
  }, []);

  const handleApplyFilter = async (
    cat,
    subCategories = selectedSubCategories,
    clearedStartWithOption = selectedStartWithOption,
    clearedMinPrice = minPrice,
    clearedMaxPrice = maxPrice,
    clearedCheckboxState = checkboxState,
    clearedComing = coming,
    clearedEnd_with = numurologyValues.EndWith,
    clearedContains = numurologyValues.Contains,
    clearedNot_contain = numurologyValues.notContain,
    clearedTotal = numurologyValues.Total,
    clearedSum = numurologyValues.Sum,
    clearedSort = selectedPriceOptions
  ) => {
    if (loading) return;
    if (!selectedCategory) return;
    setLoading(true);
    setCatLoader(true);
    const updatedCheckboxState = {
      ...checkboxState,
      [cat]: !checkboxState[cat],
    };
    setCheckboxState(updatedCheckboxState);
    try {
      const queryParams = new URLSearchParams();
      if (cat || selectedCategory?.name)
        queryParams.append("category", cat?.name || selectedCategory.name);
      if (selectedCategory?.detail?.category_id || cat)
        queryParams.append(
          "catId",
          cat?.detail?.category_id || selectedCategory?.detail?.category_id
        );
      // if (
      //   Array.isArray(selectedSubCategories) &&
      //   selectedSubCategories.length > 0
      // ) {
      //   queryParams.append("id", selectedSubCategories.join(","));
      // }
      if (Array.isArray(subCategories) && subCategories.length > 0) {
        queryParams.append("id", subCategories.join(","));
      }
      if (clearedStartWithOption.length > 0)
        queryParams.append("startWith", clearedStartWithOption.join(","));
      if (clearedMinPrice !== null)
        queryParams.append("min_price", clearedMinPrice);
      if (clearedMaxPrice !== null)
        queryParams.append("max_price", clearedMaxPrice);
      if (clearedEnd_with) queryParams.append("end_with", clearedEnd_with);
      if (clearedContains) queryParams.append("contains", clearedContains);
      if (clearedNot_contain)
        queryParams.append("not_contain", clearedNot_contain);
      if (clearedTotal) queryParams.append("total", clearedTotal);
      if (clearedSum) queryParams.append("sum", clearedSum);
      if (clearedSort) queryParams.append("sort", clearedSort);
      if (clearedCheckboxState.basicSeller === false) {
        queryParams.append("seller", "PREMIUM");
      } else {
        queryParams.append("seller", "PREMIUM,BASIC");
      }
      if (clearedComing==='no') {
        queryParams.append("comingsoon", "no");
      } else {
        queryParams.append("comingsoon", "yes");
      }
      queryParams.append("page", categoryCurrentPage);
      queryParams.append("paginate", 60);
      queryParams.append("star_status", true);
      // Update the URL without reloading the page
      if (!tabCategory) {
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }
      // Fetch API data based on filters
      const apiUrl = `${apiMainUrl}/web/categories/search?${queryParams.toString()}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (categoryCurrentPage > 1) {
        // If it's pagination, append the new data
        setApiData((prevData) => [...prevData, ...data.data]);
        setCatData(data.data);
        setCatFilter(false);
      } else {
        // If it's the first page, replace the existing data
        setApiData(data.data);
        setCatData(data.data);
        setCatFilter(false);
        setSimilarLoader(false);
      }
    } catch (error) {
      setApiData([]);
      console.error("Error fetching data:", error);
      setCatLoader(false);
      setCatFilter(false);
      setSimilarLoader(false);
      setShowPopup(false);
      setLoadMore(false);
    } finally {
      setLoadMore(false);
      setSimilarLoader(false);
      setLoading(false); // Reset loading state once the API call finishes
      setCatLoader(false);
      setFromTab(true);
      setShowPopup(true);
      setCatModalOpen(false);
      // if (cat && selectedSubCategories.length === 0) {
      //   router.push(
      //     `/category/${cat?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"}`
      //   );
      // }
    }
  };
  const handleCategoryTab = async (
    cat,
    subCategories = selectedSubCategories,
    clearedStartWithOption = selectedStartWithOption,
    clearedMinPrice = minPrice,
    clearedMaxPrice = maxPrice,
    clearedCheckboxState = checkboxState,
    clearedComing = coming,
    clearedEnd_with = numurologyValues.EndWith,
    clearedContains = numurologyValues.Contains,
    clearedNot_contain = numurologyValues.notContain,
    clearedTotal = numurologyValues.Total,
    clearedSum = numurologyValues.Sum,
    clearedSort = selectedPriceOptions
  ) => {
    if (loading) return;
    // if (!selectedCategory) return;
    setLoading(true);
    setCatLoader(true);
    const updatedCheckboxState = {
      ...checkboxState,
      [cat]: !checkboxState[cat],
    };
    setCheckboxState(updatedCheckboxState);
    try {
      const queryParams = new URLSearchParams();
      if (cat || selectedCategory?.name)
        queryParams.append("category", cat?.name || selectedCategory.name);
      if (selectedCategory?.detail?.category_id || cat)
        queryParams.append(
          "catId",
          cat?.detail?.category_id || selectedCategory?.detail?.category_id
        );
      if (Array.isArray(subCategories) && subCategories.length > 0) {
        queryParams.append("id", subCategories.join(","));
      }
      if (clearedStartWithOption.length > 0)
        queryParams.append("startWith", clearedStartWithOption.join(","));
      if (clearedMinPrice !== null)
        queryParams.append("min_price", clearedMinPrice);
      if (clearedMaxPrice !== null)
        queryParams.append("max_price", clearedMaxPrice);
      if (clearedEnd_with) queryParams.append("end_with", clearedEnd_with);
      if (clearedContains) queryParams.append("contains", clearedContains);
      if (clearedNot_contain)
        queryParams.append("not_contain", clearedNot_contain);
      if (clearedTotal) queryParams.append("total", clearedTotal);
      if (clearedSum) queryParams.append("sum", clearedSum);
      if (clearedSort) queryParams.append("sort", clearedSort);
      if (clearedCheckboxState.basicSeller === false) {
        queryParams.append("seller", "PREMIUM");
      } else {
        queryParams.append("seller", "PREMIUM,BASIC");
      }
      if (clearedComing) {
        queryParams.append("comingsoon", "no");
      } else {
        queryParams.append("comingsoon", "yes");
      }
      queryParams.append("page", categoryCurrentPage);
      queryParams.append("paginate", 60);
      queryParams.append("star_status", true);
      // Fetch API data based on filters
      const apiUrl = `${apiMainUrl}/web/categories/search?${queryParams.toString()}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (categoryCurrentPage > 1) {
        // If it's pagination, append the new data
        setApiData((prevData) => [...prevData, ...data.data]);
        setCatData(data.data);
        setCatFilter(false);
      } else {
        // If it's the first page, replace the existing data
        setApiData(data.data);
        setCatData(data.data);
        setCatFilter(false);
        setSimilarLoader(false);
      }
    } catch (error) {
      setApiData([]);
      console.error("Error fetching data:", error);
      setCatLoader(false);
      setCatFilter(false);
      setShowPopup(false);
      setSimilarLoader(false);
    } finally {
      setSimilarLoader(false);
      setLoading(false); // Reset loading state once the API call finishes
      setCatLoader(false);
      setFromTab(true);
      setShowPopup(true);
      setCatModalOpen(false);
    }
  };
  const handleClearAll = () => {
    // Reset checkboxState
    setCheckboxState({
      basicSeller: true, // default 'premium'
      comingSoon: false, // default 'no'
    });
    setShowPopup(false);
    setNewInputValue({});
    setSelectedSubCategories([]);
    SetSelectedStartWithOption([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedPriceOptions("");
    handleApplyFilter();
    const newUrl = `/category/${
      selectedCategory?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
    }`;

    window.history.replaceState(null, "", newUrl);

    router.push(newUrl);
  };

  const homePageclick = () => {
    setCheckboxState({
      basicSeller: true,
      comingSoon: false,
    });

    setSelectedCategory(null);
    setSelectedSubCategories([]);
    setNewInputValue({});
    SetSelectedStartWithOption([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedPriceOptions("");
    setShowPopup(false);
    setActiveCategoryLink(null);

    const queryParams = new URLSearchParams({});

    const newUrl = `${window.location.pathname}${queryParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
    router.push(
      `/category/${
        selectedCategory?.detail.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
      }`
    );
  };
  const FamilyPackSettingsSec = {
    type: "slide",
    perPage: isMobile ? 2 : 5,
    perMove: 1,
    autoplay: false,
    gap: "1rem",
    pagination: false,
    arrows: true,
    drag: true,
    wheel: false,
  };

  return (
    <>
      <TabCategory
        FamilyPackSettings={FamilyPackSettings}
        homePageclick={homePageclick}
        arrayOfArrays={arrayOfArrays}
        handleCategoryLink={handleCategoryLink}
        catModalOpen={catModalOpen}
        setCatModalOpen={setCatModalOpen}
        similarLoader={similarLoader}
        pathname={pathname}
        skeleton={skeleton}
      />
      {showPopup && selectedCategory && pathname?.split("/")[2] && (
        <CatSubcategory
          selectedCategory={selectedCategory}
          FamilyPackSettingsSec={FamilyPackSettingsSec}
          selectedSubCategories={selectedSubCategories}
          handleClearAll={handleClearAll}
          handleSubCategoryChange={handleSubCategoryChange}
        />
      )}
    </>
  );
};

export default TabNavigationSlider;
