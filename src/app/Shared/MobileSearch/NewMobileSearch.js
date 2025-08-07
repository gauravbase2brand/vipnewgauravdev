import React, { useState, useEffect, useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { usePathname, useRouter } from "next/navigation";
import { AppliedTags } from "../Search/Search";
import "./MobileSearch.css";
import "./NewMobileSearch.css";
import Image from "next/image";
import AllSubCategory from "@/app/subcategory/AllSubCategory";
import MobileSearchFilters from "./MobileSearchFilters";
import MobileSearchTabs from "./MobileSearchTabs";
import Budget from "@/app/Budget";
import NumuroTag from "../Search/NumuroTag";

const NewMobileSearch = ({ queryParams }) => {
  const router = useRouter();
  const {
    setFilterHide,
    setSearchPopup,
    setLoaderCat,
    dataLoading,
    familyPackValue,
    setFamilyPackValue,
    filters,
    setFilters,
    setCurrentPage,
    deliveryIsOpen,
    setDeliveryIsOpen,
    deliveryCloseModal,
    searchBy,
    setSearchBy,
  } = useContext(AppStateContext);
  // register popup context
  const [priceWarning, setPriceWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  const [callCount, setCallCount] = useState(0);
  // const [filters, setFilters] = useState({
  //   type: "global",
  // });
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("selectedOption") || "any_where";
  });
  const [firstDigitValidation, setFirstDigitValidation] = useState(false);
  const [errorMustContain, setErrorMustContain] = useState("");
  const [errorNotContain, setErrorNotContain] = useState("");
  const [showAdvancedWarning, setShowAdvancedWarning] = useState(false);
  const [mustContainedWarning, setmustContainedWarning] = useState(false);
  const [priceFamily, setPriceFamily] = useState(false);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    document.body.classList.add("body-no-scroll");
    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    if (queryParams) {
      if (queryParams?.total) {
        if (
          typeof queryParams.total === "string" &&
          queryParams.total.includes(",")
        ) {
          const totalValues = queryParams.total
            .split(",")
            .map((value) => value.trim());

          const singleDigitValues = totalValues.filter(
            (value) => value.length === 1
          );
          const multiDigitValues = totalValues.filter(
            (value) => value.length > 1
          ); // multi-digit numbers
          queryParams.sum =
            singleDigitValues.length > 0 ? singleDigitValues.join(",") : "";
          queryParams.total =
            multiDigitValues.length > 0 ? multiDigitValues.join(",") : "";
        } else if (queryParams.total >= 1 && queryParams.total <= 9) {
          queryParams.sum = queryParams.total.toString(); // Convert single-digit value to sum
          queryParams.total = ""; // No multi-digit values, so reset total
        }
        if (!queryParams.total) {
          delete queryParams.total;
        }
      }
      if (queryParams?.searchBy === "digit") {
        const currentfilters = { ...queryParams };
        const obj = {};
        if (queryParams?.type === "exactPlacement") {
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(0)
            )
          )
            obj[0] = queryParams?.search_string.charAt(0);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(1)
            )
          )
            obj[1] = queryParams?.search_string.charAt(1);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(2)
            )
          )
            obj[2] = queryParams?.search_string.charAt(2);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(3)
            )
          )
            obj[3] = queryParams?.search_string.charAt(3);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(4)
            )
          )
            obj[4] = queryParams?.search_string.charAt(4);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(5)
            )
          )
            obj[5] = queryParams?.search_string.charAt(5);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(6)
            )
          )
            obj[6] = queryParams?.search_string.charAt(6);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(7)
            )
          )
            obj[7] = queryParams?.search_string.charAt(7);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(8)
            )
          )
            obj[8] = queryParams?.search_string.charAt(8);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string.charAt(9)
            )
          )
            obj[9] = queryParams?.search_string.charAt(9);
        }
        setFilters({ ...currentfilters, ...obj });
      } else {
        // setFilters(queryParams);
      }
      setSearchBy(queryParams?.searchBy);
    }
  }, [queryParams]);

  const getSearchResultsData = (type = {}) => {
    const params = new URLSearchParams({
      searchBy,
      ...filters,
      ...type,
    });
    const queryString = params.toString(); // Get the query string
    router.push(
      `/search-results?${queryString}&comingsoon=yes&star_status=true`,
      { shallow: true }
    );
  };

  const handleFiltersResults = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  const handlePreFilters = (filterType, value) => {
    const updatedFilters = { ...filters, [filterType]: value };

    // Clear other filter values
    if (filterType === "start_with") {
      updatedFilters.any_where = "";
      updatedFilters.end_with = "";
    } else if (filterType === "any_where") {
      updatedFilters.start_with = "";
      updatedFilters.end_with = "";
    } else if (filterType === "end_with") {
      updatedFilters.start_with = "";
      updatedFilters.any_where = "";
    }

    setFilters(updatedFilters);
  };

  //Advance search
  const hmobileAdvanceSearch = (e) => {
    e.preventDefault();
    getSearchResultsData({ type: "advanced" });
  };

  //exact digit placement
  const mobilePlacementDigit = (e) => {
    e.preventDefault();
    getSearchResultsData({ type: "exactPlacement" });
  };

  //Most Contain Search
  const mobileMostContainSearch = (e) => {
    e.preventDefault();
    if (
      filters?.search_string?.length !== 1 &&
      filters?.search_string?.length !== 2
    ) {
      setShowError(true);
    } else {
      getSearchResultsData({ type: "mostContained" });
      setShowError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[\d\*,]{0,10}$/.test(filters?.number)) {
      setPriceWarning(true);
    } else {
      getSearchResultsData({ type: "global" });
    }
  };

  const mobilePriceSunmit = (e) => {
    // Check if either min_price or max_price are valid or if max_price is greater than min_price
    // if (
    //   filters?.min_price >= 0 &&
    //   filters?.max_price >= 0 && // Ensure both prices are positive
    //   filters?.max_price > filters?.min_price // Ensure max_price is greater than or equal to min_price
    // ) {
    setPriceWarning(false); // No warning if prices are valid
    getSearchResultsData(); // Fetch the search results
    setLoaderCat(false); // Hide loader
    // }
    // else {
    //   // If max_price is smaller than min_price
    //   setPriceWarning(true); // Show warning
    // }
  };
  //Basic Search
  const mobileSearchBasic = () => {
    if (!filters?.basicSearchtype) {
      setShowCheckboxWarning(true);
    } else {
      setShowCheckboxWarning(false);
      getSearchResultsData({ type: "basic" });
    }
  };

  // Mobile tabs
  const handleMobileTab = (val) => {
    setSearchBy(val);
    setFilters({
      searchBy: val,
    });
  };

  const handleMobileFilter = (obj) => {
    setFilters({
      ...obj,
    });
    setPriceWarning(false);
    setErrorMustContain(false);
    setErrorNotContain(false);
    setFirstDigitValidation(false);
    setShowAdvancedWarning(false);
    setmustContainedWarning(false);
    setFilterHide(false);
  };
  const checkForDuplicates = (value1, value2) => {
    if (!value1 || !value2) {
      return true;
    }
    const value1Array = value1.split(",").filter(Boolean);
    const value2Array = value2.split(",").filter(Boolean);
    const duplicates = value1Array.filter((value) =>
      value2Array.includes(value)
    );
    if (duplicates.length > 0) {
      return false;
    }
    return true;
  };

  const handleMobileSearch = () => {
    switch (filters?.type) {
      case "global":
        if (!/^[\d\*,]{0,10}$/.test(filters?.number)) {
          setPriceWarning(true);
        } else {
          setFilterHide(true);
          setPriceWarning(false);
          getSearchResultsData({ type: "global" });
          setLoaderCat(false);
        }
        break;
      case "basic":
        if (
          filters?.start_with &&
          !["9", "8", "7", "6", "*"]?.includes(filters?.start_with?.charAt(0))
        ) {
          return false;
        }
        if (
          (!filters?.start_with || filters?.start_with === "") &&
          (!filters?.any_where || filters?.any_where === "") &&
          (!filters?.end_with || !filters?.end_with === "") &&
          (!filters?.contains || filters?.contains === "") &&
          (!filters?.not_contain || filters?.not_contain === "") &&
          (!filters?.total || filters?.total === "") &&
          (!filters?.sum || filters?.sum === "") &&
          (!filters?.max_contain || filters?.max_contain === "")
        ) {
          setShowAdvancedWarning(true);
        } else {
          setFilterHide(true);
          setShowAdvancedWarning(false);
          getSearchResultsData({ type: "basic" });
          setLoaderCat(false);
        }
        break;
      case "advanced":
        if (
          filters?.contains &&
          filters?.not_contain &&
          filters?.not_contain === filters?.contains
          // filters?.start_with === filters?.not_contain ||
          // filters?.any_where === filters?.not_contain ||
          // filters?.end_with === filters?.not_contain
        ) {
          setmustContainedWarning(true);
          return false;
        }
        if (
          filters?.start_with &&
          !["9", "8", "7", "6", "*"]?.includes(filters?.start_with?.charAt(0))
        ) {
          return false;
        }
        if (
          (!filters?.start_with || filters?.start_with === "") &&
          (!filters?.any_where || filters?.any_where === "") &&
          (!filters?.end_with || !filters?.end_with === "") &&
          (!filters?.contains || filters?.contains === "") &&
          (!filters?.not_contain || filters?.not_contain === "") &&
          (!filters?.total || filters?.total === "") &&
          (!filters?.sum || filters?.sum === "") &&
          (!filters?.max_contain || filters?.max_contain === "")
        ) {
          setShowAdvancedWarning(true);
        } else {
          setmustContainedWarning(false);
          setShowAdvancedWarning(false);
          setFilterHide(true);
          getSearchResultsData({ type: "advanced" });
          setLoaderCat(false);
        }
        break;
      case "exactPlacement":
        const inputs = document.querySelectorAll(
          "#exact-digits-inputs-m input"
        );
        let digitString = "";
        inputs.forEach((input, index) => {
          if (input.value) {
            digitString += input.value;
            if (index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          } else {
            digitString += "*";
            if (index > 0) {
              inputs[index - 1].focus();
            }
          }
        });
        if (digitString?.split("")?.every((key) => key === "*")) {
          setPriceWarning(true);
          return false;
        }
        setFilterHide(true);
        setPriceWarning(false);
        getSearchResultsData({
          type: "exactPlacement",
          search_string: digitString,
        });
        setLoaderCat(false);
        break;
      case "mostContained":
        if (
          filters?.search_string?.length !== 1 &&
          filters?.search_string?.length !== 2
        ) {
          setShowError(true);
        } else {
          setFilterHide(true);
          getSearchResultsData({ type: "mostContained" });
          setShowError(false);
          setLoaderCat(false);
        }
        break;

      default:
        break;
    }
  };

  const handleExactChange = (e, iIndex) => {
    if (e.target.value.length === 1) {
      handleFiltersResults(iIndex, e.target.value);
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form[index + 1]?.focus();
      e.preventDefault();
    }
  };

  // handle change for family selector
  const handleChangefamilySelect = (e) => {
    setFamilyPackValue(e.target.value);
  };

  //Family Pack
  const familyPackSubmit = (e) => {
    const selectValue = e.target.value;
    e.preventDefault();
    setCallCount(callCount + 1);
    router.push(
      `/search-results?type=${"family_pack"}&searchBy=${"family_pack"}&fp_total=${selectValue}&callCount=${callCount}`
    );
    setCurrentPage(1);
    setLoaderCat(false);
  };
  return (
    <div className="main-mobile-filter">
      <section
        id="mobile-search-id-os"
        className={`${
          pathname === "/numerology" || pathname === "/family-pack"
            ? ""
            : "MobileSearch-section-os gk-new-filter"
        }`}
      >
        <div className="MobileSearch-filter-content-data-os active">
          <div className="MobileSearch-filter-search-by-digits-row-os">
            <div className="MobileSearch-filter-search-by-digits-heading-os">
              <div>
                <Image
                  src={`${panelImg}/assets/img/vip-images/seach-with-digits-heading-icon_xg4ksp.webp`}
                  alt="back"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              Search by Digits
            </div>
            <MobileSearchTabs
              setSearchPopup={setSearchPopup}
              handleMobileTab={handleMobileTab}
              handleMobileFilter={handleMobileFilter}
              setPriceFamily={setPriceFamily}
              filters={filters}
              router={router}
              pathname={pathname}
            />
            <MobileSearchFilters
              handleSubmit={handleSubmit}
              filters={filters}
              handleFiltersResults={handleFiltersResults}
              priceWarning={priceWarning}
              mobileSearchBasic={mobileSearchBasic}
              selectedOption={selectedOption}
              setFirstDigitValidation={setFirstDigitValidation}
              handlePreFilters={handlePreFilters}
              firstDigitValidation={firstDigitValidation}
              handleOptionChange={handleOptionChange}
              showCheckboxWarning={showCheckboxWarning}
              hmobileAdvanceSearch={hmobileAdvanceSearch}
              checkForDuplicates={checkForDuplicates}
              setErrorMustContain={setErrorMustContain}
              errorMustContain={errorMustContain}
              setErrorNotContain={setErrorNotContain}
              errorNotContain={errorNotContain}
              showAdvancedWarning={showAdvancedWarning}
              mustContainedWarning={mustContainedWarning}
              mobilePlacementDigit={mobilePlacementDigit}
              setFilters={setFilters}
              handleExactChange={handleExactChange}
              mobileMostContainSearch={mobileMostContainSearch}
              showError={showError}
              mobilePriceSunmit={mobilePriceSunmit}
              setPriceWarning={setPriceWarning}
              familyPackSubmit={familyPackSubmit}
              handleChangefamilySelect={handleChangefamilySelect}
              familyPackValue={familyPackValue}
              dataLoading={dataLoading}
              pathname={pathname}
              deliveryIsOpen={deliveryIsOpen}
              setDeliveryIsOpen={setDeliveryIsOpen}
              deliveryCloseModal={deliveryCloseModal}
            />
          </div>
          {/* changes */}
          {pathname !== "/family-pack" && (
            <div className="newgk px-4">
              {filters.type !== "price" && !priceFamily && (
                <button
                  type="button"
                  onClick={() => {
                    handleMobileSearch();
                  }}
                  className={`search-filter-search-number-btn-os ${
                    dataLoading ? "loading-padding" : ""
                  }`}
                  aria-label="Search Number"
                >
                  {/* {!dataLoading ? ( */}
                  <span>Search Number</span>
                  {/* ) : (
                  <span className="dot-loader ml-2 flex">
                    <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                    <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                    <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                  </span>
                )} */}
                </button>
              )}
            </div>
          )}
          <AppliedTags queryParams={queryParams} />
        </div>
        {pathname === "/search" && <AllSubCategory />}
        <hr />
        {searchBy === "price" && <Budget />}
        {filters.type === "advanced" && <NumuroTag />}
      </section>
    </div>
  );
};

export default NewMobileSearch;
