"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import "./Search.css";
import "../../Shared/MobileSearch/MobileSearch.css";
import SearchFilterInput from "../SearchFilterInput/SearchFilterInput";
import SearchFilterButton from "../SearchFilterButton/SearchFilterButton";
import { usePathname, useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import Information from "./Information";
import Budget from "@/app/Budget";
import NumuroTag from "./NumuroTag";

const Tag = ({ value, onClick }) => {
  return (
    <div>
      {value}
      <button onClick={() => onClick()} aria-label="tag">
        <svg
          width="53"
          height="53"
          viewBox="0 0 53 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027"></circle>
          <path
            d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
            fill="#EFEFEF"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export const AppliedTags = ({ queryParams }) => {
  const pathname = usePathname();
  const router = useRouter();
  const curParams = { ...queryParams };
  // delete curParams?.type;
  delete curParams?.number;
  delete curParams?.searchBy;
  delete curParams?.callCount;
  const [isMobile, setIsMobile] = useState(false);
  const { setFilters } = useContext(AppStateContext);
  // Check screen size on window resize or mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768); // Adjust this to match your mobile breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const call = (deleteKey) => {
    const newparams = { ...queryParams };
    if (deleteKey) {
      if (Array.isArray(deleteKey)) {
        deleteKey?.map((key) => {
          delete newparams?.[key];
        });
      } else {
        delete newparams?.[deleteKey];
      }
    }
    const route = {
      ...newparams,
    };

    const queryString = new URLSearchParams(route).toString();
    router.push(`${pathname}?${queryString}`);
  };

  const handleMobileClick = () => {
    if (isMobile && queryParams?.type === "advanced") {
      setFilters(queryParams);
      router.push("/search"); // Navigate to /search on mobile click
    }
  };

  if (!Object.keys(curParams || {})?.length) {
    return;
  }
  return (
    <div
      className={`flex items-center justify-center gap-4 flex-row sm:flex-col  pt-2 ${
        (queryParams?.type === "advanced" || queryParams?.type === "global") &&
        "tags-hideMobile mb-2"
      }`}
    >
      {/* <span className="font-medium text-[14.7187px] leading-[17px] text-[#333]">
        Applied tags:
      </span> */}
      <div className="filter-tags-list-os" onClick={handleMobileClick}>
        {queryParams?.type === "global" && (
          <Tag value={`Global: ${queryParams?.number}`} />
        )}
        {queryParams?.basicSearchtype === "start_with" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`Start With: ${queryParams?.number}`}
          />
        )}
        {queryParams?.basicSearchtype === "end_with" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`End With: ${queryParams?.number}`}
          />
        )}
        {queryParams?.basicSearchtype === "any_where" && (
          <Tag
            onClick={() => {
              call(["basicSearchtype", "number"]);
            }}
            value={`Anywhere: ${queryParams?.number}`}
          />
        )}

        {queryParams?.start_with && (
          <Tag
            onClick={() => {
              call("start_with");
            }}
            value={`Start With: ${queryParams?.start_with}`}
          />
        )}
        {queryParams?.end_with && (
          <Tag
            onClick={() => {
              call("end_with");
            }}
            value={`End With: ${queryParams?.end_with}`}
          />
        )}
        {queryParams?.any_where && (
          <Tag
            onClick={() => {
              call("any_where");
            }}
            value={`Anywhere: ${queryParams?.any_where}`}
          />
        )}
        {queryParams?.contains && (
          <Tag
            onClick={() => {
              call("contains");
            }}
            value={`Contains: ${queryParams?.contains}`}
          />
        )}
        {queryParams?.not_contain && (
          <Tag
            onClick={() => {
              call("not_contains");
            }}
            value={`Not Contains: ${queryParams?.not_contain}`}
          />
        )}
        {queryParams?.total && (
          <Tag
            onClick={() => {
              call("total");
            }}
            value={`Total: ${queryParams?.total}`}
          />
        )}
        {queryParams?.fp_total && (
          <Tag
            onClick={() => {
              call("fp_total");
            }}
            value={`fp_total: ${queryParams?.fp_total}`}
          />
        )}
        {queryParams?.sum && (
          <Tag
            onClick={() => {
              call("sum");
            }}
            value={`Sum: ${queryParams?.sum}`}
          />
        )}
        {queryParams?.min_price && (
          <Tag
            onClick={() => {
              call("min_price");
            }}
            value={`Minimum price: ${queryParams?.min_price}`}
          />
        )}
        {queryParams?.max_price && (
          <Tag
            onClick={() => {
              call("max_price");
            }}
            value={`maximum price: ${queryParams?.max_price}`}
          />
        )}
        {queryParams?.type !== "mostContained" &&
          queryParams?.search_string && (
            <>
              {queryParams?.search_string?.split("")?.map(
                (ch, i) =>
                  ch !== "*" && (
                    <Tag
                      key={i}
                      onClick={() => {
                        call(i);
                      }}
                      value={`Exact ${ch} at ${i + 1}` || ""}
                    />
                  )
              )}
            </>
          )}

        {queryParams?.type === "mostContained" &&
          queryParams?.search_string && (
            <Tag
              onClick={() => {
                call("search_string");
              }}
              value={`Search value: ${queryParams?.search_string}`}
            />
          )}
      </div>
    </div>
  );
};

const Search = ({ queryParams }) => {
  const {
    skeleton,
    deliveryIsOpen,
    setDeliveryIsOpen,
    deliveryCloseModal,
    setFilterHide,
    setShowPopup,
    familyPackValue,
    setFamilyPackValue,
    setCurrentPage,
    dataLoading,
    searchBy,
    setSearchBy,
  } = useContext(AppStateContext);
  const router = useRouter();
  const [callCount, setCallCount] = useState(0);
  const [priceWarning, setPriceWarning] = useState(false);
  const [exactPlacementError, setExactPlacementError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCheckboxWarning, setShowCheckboxWarning] = useState(false);
  // const [searchBy, setSearchBy] = useState(
  //   router.pathname === "/search-your-number" ? "digit" : "price"
  // );
  const [filters, setFilters] = useState({});
  const [selectedOption, setSelectedOption] = useState(() => {
    return localStorage.getItem("selectedOption") || "any_where";
  });
  const pathname = usePathname();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [firstDigitValidation, setFirstDigitValidation] = useState(false);
  const [popUpEnabled, setPopUpEnabled] = useState(false);
  const [showAdvancedWarning, setShowAdvancedWarning] = useState(false);
  const [mustContainedWarning, setmustContainedWarning] = useState(false);
  // references
  const filtersRef = useRef(filters);
  const searchByRef = useRef(searchBy);
  const [priceRangePopup, setPriceRangePopupView] = useState(null);

  // auto-focus
  const inputRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const startWith = urlParams.get("start_with");
    const anyWhere = urlParams.get("any_where");
    const endWith = urlParams.get("end_with");

    // Set selected option based on which parameter has a value
    if (startWith) {
      setSelectedOption("start_with");
    } else if (anyWhere) {
      setSelectedOption("any_where");
    } else if (endWith) {
      setSelectedOption("end_with");
    }

    // Store selectedOption in localStorage
    localStorage.setItem("selectedOption", selectedOption);
  }, [router.query]);

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    // Set the initial value from queryParams.fp_total when component rendor
    setFamilyPackValue(queryParams?.fp_total || "");
  }, [queryParams?.fp_total]);
  // console.log("familyPackValuefamilyPackValue :", familyPackValue);

  useEffect(() => {}, [priceRangePopup]);
  //Must and not Must contain code
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

  // on component mount
  useEffect(() => {
    if (pathname === "/numerology") {
      setFilters({
        type: "advanced",
        searchBy: "digit",
      });
    } else if (pathname === "/family-pack") {
      setFilters({
        searchBy: "family_pack",
        min_price: 0,
      });
      setSearchBy("family_pack");
    } else {
      setSearchBy("digit");
      setFilters({
        type: "global",
        searchBy: "digit",
      });
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, []);

  // Reset filters once when user switched between tabs.
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    searchByRef.current = searchBy;
  }, [searchBy]);

  useEffect(() => {
    if (queryParams) {
      // if (queryParams?.total >= 1 && queryParams?.total <= 9) {
      //   queryParams.sum = queryParams.total; // Add a sum key with the value of total
      //   delete queryParams.total; // Optionally, remove the total key
      // }
      if (queryParams?.total) {
        // Check if the total is a string and contains commas (i.e., multiple values)
        if (
          typeof queryParams.total === "string" &&
          queryParams.total.includes(",")
        ) {
          // Split the string by commas into an array of values
          const totalValues = queryParams.total
            .split(",")
            .map((value) => value.trim());

          // Filter single-digit and multi-digit values
          const singleDigitValues = totalValues.filter(
            (value) => value.length === 1
          ); // single-digit numbers
          const multiDigitValues = totalValues.filter(
            (value) => value.length > 1
          ); // multi-digit numbers

          // Assign single-digit values to sum (as a comma-separated string)
          queryParams.sum =
            singleDigitValues.length > 0 ? singleDigitValues.join(",") : "";

          // Assign multi-digit values to total (as a comma-separated string)
          queryParams.total =
            multiDigitValues.length > 0 ? multiDigitValues.join(",") : "";
        } else if (queryParams.total >= 1 && queryParams.total <= 9) {
          // Handle single value case (for single-digit values)
          queryParams.sum = queryParams.total.toString(); // Convert single-digit value to sum
          queryParams.total = ""; // No multi-digit values, so reset total
        }
        // Clean up total if it's empty
        if (!queryParams.total) {
          delete queryParams.total;
        }
      }

      if (queryParams?.searchBy === "digit") {
        const currentfilters = { ...queryParams };
        const minPrice = localStorage?.getItem("vip_minprice");
        const maxPrice = localStorage?.getItem("vip_maxprice");
        const hidePopup = localStorage?.getItem("vip_hidePopup");
        if (
          currentfilters?.min_price ||
          minPrice ||
          currentfilters?.max_price ||
          maxPrice ||
          !hidePopup
        )
          setPopUpEnabled(true);
        const obj = {};
        if (queryParams?.type === "exactPlacement") {
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(0)
            )
          )
            obj[0] = queryParams?.search_string?.charAt(0);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(1)
            )
          )
            obj[1] = queryParams?.search_string?.charAt(1);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(2)
            )
          )
            obj[2] = queryParams?.search_string?.charAt(2);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(3)
            )
          )
            obj[3] = queryParams?.search_string?.charAt(3);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(4)
            )
          )
            obj[4] = queryParams?.search_string?.charAt(4);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(5)
            )
          )
            obj[5] = queryParams?.search_string?.charAt(5);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(6)
            )
          )
            obj[6] = queryParams?.search_string?.charAt(6);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(7)
            )
          )
            obj[7] = queryParams?.search_string?.charAt(7);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(8)
            )
          )
            obj[8] = queryParams?.search_string?.charAt(8);
          if (
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              queryParams?.search_string?.charAt(9)
            )
          )
            obj[9] = queryParams?.search_string?.charAt(9);
        }

        setFilters({ ...currentfilters, ...obj });
      } else {
        setFilters(queryParams);
      }
      setCallCount(callCount + 1);
      setSearchBy(queryParams?.searchBy);
      if (queryParams?.searchBy) {
        setFilterHide(true);
      }
    }
  }, [queryParams]);

  const getSearchResults = (type = {}, currentfilters = null) => {
    if (
      filtersRef.current?.max_price > 0 &&
      (filtersRef.current?.min_price < 0 ||
        filtersRef.current?.min_price === undefined)
    ) {
      filtersRef.current = {
        ...filtersRef.current,
        min_price: 0,
      };
    }
    const navObj = {
      ...(currentfilters || filtersRef.current),
      ...type,
      callCount,
      searchBy,
    };
    if (!navObj?.min_price) delete navObj.min_price;
    if (!navObj?.max_price) delete navObj.max_price;
    const queryString = new URLSearchParams(navObj).toString();
    router.push(
      `/search-results?${queryString}&comingsoon=yes&star_status=true`,
      { shallow: true }
    );
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
  const handleFilters = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleFiltersOnSwitching = (obj) => {
    setFirstDigitValidation(false);
    setFilterHide(false);
    setFilters({
      ...obj,
    });
  };

  //exact digit placement
  const placementDigit = (e) => {
    const inputs = document.querySelectorAll("#exact-digits-inputs input");
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
    getSearchResults(
      { type: "exactPlacement" },
      { search_string: digitString }
    );
  };

  //Most Contain Search
  const handleMostContainSearch = (currentfilters) => {
    if (
      filters?.search_string?.length !== 1 &&
      filters?.search_string?.length !== 2
    ) {
      setShowError(true);
    } else {
      getSearchResults({ type: "mostContained" }, currentfilters);
      setShowError(false);
    }
  };

  //Global Search
  const handleSubmit = (currentfilters) => {
    setPriceRangePopupView(false);
    if (filters?.type === "global") {
      getSearchResults({ type: "global" }, currentfilters);
    } else if (filters?.type === "basic") {
      getSearchResults({ type: "basic" }, currentfilters);
    } else if (filters?.type === "advanced") {
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
        getSearchResults({ type: "advanced" }, currentfilters);
      }
    } else if (filters?.type === "exactPlacement") {
      placementDigit();
    } else if (filters?.type === "mostContained") {
      handleMostContainSearch(currentfilters);
    }
  };

  //Price Search Min To Max
  const priceSunmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    // if (
    //   filtersRef?.current?.min_price >= 0 &&
    //   filtersRef?.current?.max_price > filtersRef?.current?.min_price
    // ) {
    setPriceWarning(false);
    getSearchResults();
    setFilterHide(true);
    // }
    // else {
    //   setPriceWarning(true);
    // }
  };

  //Basic Search
  const handleSearchBasic = (e) => {
    e.preventDefault();
    if (!filters?.basicSearchtype) {
      setShowCheckboxWarning(true);
    } else {
      setShowCheckboxWarning(false);
      getSearchResults({ type: "basic" });
    }
  };

  // Price range popup show
  const setPriceRangePopup = () => {
    const hidePopup = localStorage?.getItem("vip_hidePopup");
    if (!priceRangePopup && !popUpEnabled && !hidePopup) {
      setPriceRangePopupView(true);
    } else {
      handleSubmit();
    }
  };

  const globalhit = () => {
    if (!filters?.number) {
      setPriceWarning(true);
      return;
    }
    setPriceWarning(false);
    setPriceRangePopup(true);
    setFilterHide(true);
    setShowPopup(false);
    const trackingData = {
      event: "view_search_results", // Custom event name for GTM
      items: filters,
      page_location: window.location.href,
      page_referrer: "https://www.vipnumbershop.com/",
      page_title: document.title,
      currency: "INR",
    };
    // Push the structured data to the dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(trackingData);
  };

  const basicHit = () => {
    setShowPopup(false);
    if (
      !["9", "8", "7", "6", "*"]?.includes(filters?.start_with?.charAt(0)) &&
      filters?.start_with?.length
    ) {
      return;
    }
    setPriceRangePopup(true);
    setFilterHide(true);
  };

  const advancedHit = () => {
    setShowPopup(false);
    if (
      !["9", "8", "7", "6", "*"]?.includes(filters?.start_with?.charAt(0)) &&
      filters?.start_with?.length
    ) {
      return;
    }
    setPriceRangePopup(true);
    setFilterHide(true);
  };

  const exacthit = () => {
    setShowPopup(false);
    if (!["9", "8", "7", "6"]?.includes(filters?.[0]) && filters?.[0]?.length) {
      return;
    }
    if (
      filters?.["0"] ||
      filters?.["1"] ||
      filters?.["2"] ||
      filters?.["3"] ||
      filters?.["4"] ||
      filters?.["5"] ||
      filters?.["6"] ||
      filters?.["7"] ||
      filters?.["8"] ||
      filters?.["9"]
    ) {
      setFilterHide(true);
      setPriceRangePopup(true);
    } else {
      setExactPlacementError(true);
    }
  };

  const mostHit = () => {
    setPriceRangePopup(true);
    setFilterHide(true);
    setShowPopup(false);
  };

  //Family Pack
  const handleFamilyPack = (e) => {
    e.preventDefault();
    const selectValue = e.target.value;
    setShowPopup(false);
    setCallCount(callCount + 1);
    router.push(
      `/search-results?type=${"family_pack"}&searchBy=${"family_pack"}&fp_total=${selectValue}&callCount=${callCount}`
    );
    setCurrentPage(1);
    setFilterHide(true);
    // console.log("Family pack handle", familyPackValue);
  };

  const handleChangefamilySelect = (e) => {
    setFamilyPackValue(e.target.value);
  };
  return (
    <div className="search-section-os-1">
      <section className="search-section-os">
        <div className="container-os">
          {skeleton ? (
            <>
              <div className="">
                <div className="flex items-center justify-center gap-6 pb-2">
                  <div className="bg-gray-300 h-12 w-40 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 h-12 w-40 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 h-12 w-40 rounded-md animate-pulse"></div>
                </div>
                <div className="mt-4 flex space-x-4 justify-center">
                  <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
                  <div className="bg-gray-300 h-6 w-24 rounded-md animate-pulse"></div>
                </div>
                <div className="mt-6">
                  <div className="bg-gray-300 h-12 w-full rounded-md animate-pulse flex justify-end p-3">
                    <div className="bg-gray-200 w-[15%] rounded-md animate-pulse "></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="search-data-row-os  relative">
                <div
                  className={`${
                    pathname === "/numerology" || pathname === "/family-pack"
                      ? "hidden"
                      : "search-tabs-row-os flex items-center justify-center gap-6 pb-2 "
                  }`}
                >
                  <button
                    onClick={() => {
                      setFilters({});
                      setFilterHide(false);
                      setSearchBy("digit");
                      setFilters({
                        type: "global",
                        searchBy: "digit",
                      });
                      setTimeout(() => {
                        document.getElementById("desktopGlobalSearch")?.focus();
                      }, 0);
                    }}
                    className={`border-2 border-primary rounded-md flex items-center justify-center gap-4 p-3 w-full max-w-[230px] font-bold text-lg leading-5 text-gray-800 cursor-pointer shadow-lg transition transform duration-300 ease-in-out hover:scale-105 ${
                      searchBy === "digit"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }`}
                    aria-label="global"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_342_9010)">
                        <path
                          d="M2.8125 0C1.26163 0 0 1.32413 0 2.875C0 4.42587 1.26163 5.6875 2.8125 5.6875C4.36337 5.6875 5.625 4.42587 5.625 2.875C5.625 1.32413 4.36337 0 2.8125 0Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M10.3125 5.6875C11.8634 5.6875 13.125 4.42587 13.125 2.875C13.125 1.32413 11.8634 0 10.3125 0C8.76163 0 7.5 1.32413 7.5 2.875C7.5 4.42587 8.76163 5.6875 10.3125 5.6875Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M17.8125 5.6875C19.3634 5.6875 20.625 4.42587 20.625 2.875C20.625 1.32413 19.3634 0 17.8125 0C16.2616 0 15 1.32413 15 2.875C15 4.42587 16.2616 5.6875 17.8125 5.6875Z"
                          fill="#1689FC"
                        />
                        <path
                          d="M2.8125 7.5625C1.26163 7.5625 0 8.82413 0 10.375C0 11.9259 1.26163 13.1875 2.8125 13.1875C4.36337 13.1875 5.625 11.9259 5.625 10.375C5.625 8.82413 4.36337 7.5625 2.8125 7.5625Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M10.3125 13.1875C11.8634 13.1875 13.125 11.9259 13.125 10.375C13.125 8.82413 11.8634 7.5625 10.3125 7.5625C8.76163 7.5625 7.5 8.82413 7.5 10.375C7.5 11.9259 8.76163 13.1875 10.3125 13.1875Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M2.8125 15.0625C1.26163 15.0625 0 16.3241 0 17.875C0 19.4259 1.26163 20.6875 2.8125 20.6875C4.36337 20.6875 5.625 19.4259 5.625 17.875C5.625 16.3241 4.36337 15.0625 2.8125 15.0625Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M13.125 17.875C13.125 16.3241 11.8634 15.0625 10.3125 15.0625C8.76163 15.0625 7.5 16.3241 7.5 17.875C7.5 19.4259 8.76163 20.6875 10.3125 20.6875C11.8634 20.6875 13.125 19.4259 13.125 17.875Z"
                          fill="#17ACE8"
                        />
                        <path
                          d="M29.125 18.8125C28.7597 18.8125 28.41 18.883 28.0886 19.0103C27.7636 17.8173 26.6695 16.9375 25.375 16.9375C25.0097 16.9375 24.5975 17.008 24.2761 17.1353C23.9511 15.9423 22.857 15.0625 21.5625 15.0625C21.2338 15.0625 20.9179 15.1193 20.625 15.2227V10.375C20.625 8.82413 19.3634 7.5625 17.8125 7.5625C16.2616 7.5625 15 8.82413 15 10.375V17.875V19.3618L12.4804 21.8814C11.6225 22.7392 11.4111 24.0439 11.953 25.1278L14.5806 30.4454C15.0604 31.404 16.0245 32 17.0965 32H29.125C30.6759 32 32 30.7384 32 29.1875V21.625C32 20.0741 30.6759 18.8125 29.125 18.8125Z"
                          fill="#FEC478"
                        />
                        <path
                          d="M13.125 17.875C13.125 16.3241 11.8634 15.0625 10.3125 15.0625V20.6875C11.8634 20.6875 13.125 19.4259 13.125 17.875Z"
                          fill="#1689FC"
                        />
                        <path
                          d="M13.125 10.375C13.125 8.82413 11.8634 7.5625 10.3125 7.5625V13.1875C11.8634 13.1875 13.125 11.9259 13.125 10.375Z"
                          fill="#1689FC"
                        />
                        <path
                          d="M13.125 2.875C13.125 1.32413 11.8634 0 10.3125 0V5.6875C11.8634 5.6875 13.125 4.42587 13.125 2.875Z"
                          fill="#1689FC"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_342_9010">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Search by Digits
                  </button>

                  <button
                    onClick={() => {
                      setSearchBy("price");
                      setFilterHide(false);
                      setFilters({
                        searchBy: "price",
                        min_price: 0,
                      });
                      setTimeout(() => {
                        inputRef?.current?.focus();
                      }, 0);
                    }}
                    className={` border-2 border-primary rounded-md flex items-center justify-center gap-4 p-3 w-full max-w-[230px] font-bold text-lg leading-5 text-gray-800 cursor-pointer shadow-lg
                  transition transform duration-300 ease-in-out hover:scale-105
                  ${
                    searchBy === "price"
                      ? "filter-tab-os active"
                      : "filter-tab-os"
                  }`}
                    aria-label="Price"
                  >
                    <Image
                      src={`${panelImg}/assets/img/vip-images/serachbyprice_1_zg3cre.webp`}
                      alt=""
                      width={300}
                      height={100}
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                      priority="true"
                    />
                    Search by Price
                  </button>

                  <button
                    onClick={() => {
                      setFilters({
                        searchBy: "family_pack",
                        min_price: 0,
                      });
                      setSearchBy("family_pack");
                      setFilterHide(false);
                    }}
                    className={` border-2 border-primary rounded-md flex items-center justify-center gap-4 p-3 w-full max-w-[230px] font-bold text-lg leading-5 text-gray-800 cursor-pointer shadow-lg filter-tab-os transition transform duration-300 ease-in-out hover:scale-105 ${
                      searchBy === "family_pack"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }`}
                    aria-label="family_pack"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M4.42357 16.0639C4.3462 16.0764 4.26745 16.0846 4.18657 16.0846C3.8552 16.0846 3.5502 15.9746 3.3032 15.791C3.1932 16.3284 3.18245 17.1345 3.60195 18.1833C4.07807 19.3738 2.28358 20.3632 2.44208 22.0232L4.23345 21.571C4.4457 21.5175 4.65182 21.4417 4.84819 21.345L5.72669 20.9119C6.06407 20.7455 6.27769 20.402 6.27769 20.0259V18.9484C5.23644 18.3808 4.50707 17.3071 4.42357 16.0639Z"
                        fill="#FCDD86"
                      />
                      <path
                        d="M12.8938 23.4206C12.1831 23.5349 11.5566 23.0553 11.4312 22.3984C10.1261 24.6887 8.80149 23.6181 8.23712 22.9658C8.19074 22.9122 8.17049 22.8491 8.16911 22.7866H7.76637C7.76499 22.8491 7.74474 22.9122 7.69837 22.9658C7.07712 23.6838 5.535 24.9094 4.11138 21.6016L1.69302 22.2121C1.07477 22.3677 0.629395 22.9073 0.59402 23.5439L0.313146 31.2594C0.300146 31.4915 0.48502 31.6869 0.717519 31.6869H2.96714C3.11838 31.6869 3.24101 31.5643 3.24101 31.413V26.5902L3.63826 27.8627C3.89801 28.6947 4.03013 29.5613 4.03013 30.4329V31.4129C4.03013 31.5641 4.15276 31.6868 4.30401 31.6868H9.73561L9.85498 29.5085C9.88448 28.9793 10.2546 28.5307 10.7686 28.4013L12.2487 28.0288C12.3313 27.744 12.3982 27.5438 12.6943 26.59V27.9165L13.1521 27.8013L13.8622 27.4512C13.8922 27.4258 14.586 27.2012 14.586 26.4349V25.9583C13.6387 25.4823 12.9683 24.5299 12.8938 23.4206Z"
                        fill="#FC657E"
                      />
                      <path
                        d="M11.5699 21.5338C11.1745 21.4154 10.9847 21.2845 10.4157 21.0137C9.95623 21.5518 9.23936 22.2309 8.37874 22.4979C8.17624 22.5608 8.09824 22.8054 8.23699 22.9658C8.80136 23.6182 10.126 24.6887 11.4311 22.3984C11.372 22.0888 11.4281 21.7877 11.5699 21.5338Z"
                        fill="#EDF4FC"
                      />
                      <path
                        d="M7.55656 22.4979C6.69594 22.231 5.97907 21.5518 5.51957 21.0137L4.8482 21.3447C4.65183 21.4414 4.44583 21.5172 4.23345 21.5707L4.11133 21.6015C5.53495 24.9094 7.07707 23.6838 7.69831 22.9658C7.83694 22.8054 7.75906 22.5607 7.55656 22.4979Z"
                        fill="#EDF4FC"
                      />
                      <path
                        d="M10.2088 20.9117C9.87139 20.7454 9.65777 20.4019 9.65777 20.0257V18.9482C9.15439 19.2226 8.57839 19.3787 7.96765 19.3787C7.3569 19.3787 6.7809 19.2226 6.27765 18.9482V20.0257C6.27765 20.4019 6.06403 20.7454 5.72666 20.9117L5.51953 21.0139C5.97903 21.552 6.6959 22.2311 7.55652 22.4981C7.69127 22.54 7.76902 22.6624 7.76627 22.7867H8.16902C8.16627 22.6622 8.24402 22.5399 8.37877 22.4981C9.23939 22.2312 9.95626 21.552 10.4158 21.0139L10.2088 20.9117Z"
                        fill="#F9D0B4"
                      />
                      <path
                        d="M12.7411 26.2811C12.5884 26.2571 12.4416 26.3497 12.3957 26.4974C12.2817 26.8646 12.2017 27.12 12.1417 27.3116C12.0581 27.5786 12.0129 27.7225 11.9692 27.871C11.9203 28.0364 12.0148 28.2102 12.1803 28.2591C12.2098 28.2679 12.2397 28.2721 12.2689 28.2721C12.3779 28.2721 12.4801 28.2146 12.5366 28.1209C12.5828 28.148 12.6367 28.1635 12.6942 28.1635C12.8668 28.1635 13.0067 28.0236 13.0067 27.851V26.5901C13.0067 26.4355 12.8938 26.3042 12.7411 26.2811Z"
                        fill="black"
                      />
                      <path
                        d="M9.73542 31.3743H4.34257V30.4329C4.34257 29.5288 4.20595 28.6327 3.93645 27.7694L3.5392 26.497C3.4932 26.3496 3.34658 26.257 3.19383 26.2811C3.0412 26.3045 2.92845 26.4356 2.92845 26.5901V31.3743H0.717586C0.682836 31.3743 0.660461 31.3561 0.650336 31.3454C0.640086 31.3346 0.623211 31.3114 0.625461 31.2707L0.90596 23.5611C0.93396 23.0583 1.28096 22.6378 1.76946 22.515L4.18782 21.9045C4.3552 21.8622 4.45657 21.6923 4.41432 21.525C4.37207 21.3577 4.20207 21.2567 4.03482 21.2985L1.61671 21.9088C0.861585 22.0988 0.325212 22.7488 0.281588 23.5323L0.00108864 31.2419C-0.00978632 31.4378 0.0612134 31.6322 0.196213 31.7748C0.331212 31.9176 0.521212 31.9993 0.717586 31.9993H2.9672C3.29045 31.9993 3.55357 31.7363 3.55357 31.4131V28.7892C3.6627 29.3294 3.7177 29.8797 3.7177 30.4329V31.4131C3.7177 31.7363 3.9807 31.9993 4.30395 31.9993H9.73555C9.90817 31.9993 10.048 31.8594 10.048 31.6868C10.048 31.5142 9.90805 31.3743 9.73542 31.3743Z"
                        fill="black"
                      />
                      <path
                        d="M12.6322 15.791C12.3852 15.9746 12.0803 16.0846 11.7488 16.0846C11.668 16.0846 11.5892 16.0764 11.5118 16.0639C11.4285 17.3071 10.699 18.3808 9.65771 18.9483V20.0257C9.65771 20.4019 9.87134 20.7454 10.2087 20.9117L11.0872 21.3449C11.2426 21.4215 11.4042 21.4842 11.57 21.5339C11.6515 21.388 11.7606 21.2599 11.8903 21.1561C11.8901 21.1562 11.89 21.1564 11.8897 21.1566V20.0407C11.8897 19.3728 12.0501 18.7425 12.3328 18.1849C12.3331 18.1843 12.3332 18.1836 12.3335 18.1831C12.753 17.1345 12.7422 16.3284 12.6322 15.791Z"
                        fill="#FCDD86"
                      />
                      <path
                        d="M11.749 13.1182C11.6713 13.1182 11.5953 13.1247 11.521 13.1363V15.8262C11.521 15.9063 11.5173 15.9855 11.512 16.0644C11.5893 16.0769 11.6681 16.0852 11.749 16.0852C12.5682 16.0852 13.2325 15.421 13.2325 14.6017C13.2325 13.7824 12.5682 13.1182 11.749 13.1182Z"
                        fill="#F9D0B4"
                      />
                      <path
                        d="M11.3023 12.6848C10.9428 12.6015 10.5062 12.3932 10.0058 11.9386C9.90678 11.8487 9.75415 11.8561 9.66715 11.9576C9.12603 12.5892 7.20716 14.5054 4.41455 13.7101V15.8261C4.41455 17.7803 6.01342 19.3792 7.96766 19.3792C9.9219 19.3792 11.5208 17.7803 11.5208 15.8261V12.9555C11.5209 12.825 11.4295 12.7143 11.3023 12.6848Z"
                        fill="#F9D0B4"
                      />
                      <path
                        d="M4.41462 15.8256V13.7096C4.17062 13.6401 3.92012 13.5502 3.66312 13.4367C3.4975 13.3636 3.30387 13.3972 3.17175 13.5211C2.8835 13.7913 2.70312 14.1747 2.70312 14.6011C2.70312 15.4203 3.36725 16.0846 4.18662 16.0846C4.26749 16.0846 4.34624 16.0763 4.42362 16.0638C4.41837 15.9849 4.41462 15.9057 4.41462 15.8256Z"
                        fill="#F9D0B4"
                      />
                      <path
                        d="M7.96784 7.85352C5.31047 7.85352 3.13623 10.0278 3.13623 12.6851V13.5582C3.14836 13.5461 3.15936 13.5331 3.17186 13.5214C3.30398 13.3975 3.49748 13.3637 3.66323 13.437C3.92023 13.5505 4.17073 13.6404 4.41473 13.7099C7.20734 14.5054 9.12621 12.589 9.66733 11.9574C9.75433 11.8559 9.90695 11.8484 10.006 11.9384C10.5063 12.393 10.9429 12.6012 11.3024 12.6846C11.4296 12.7141 11.5209 12.8247 11.5209 12.9552V13.136C11.5953 13.1245 11.6713 13.1179 11.7489 13.1179C12.1594 13.1179 12.5308 13.2846 12.7994 13.554V12.685C12.7994 10.0278 10.6252 7.85352 7.96784 7.85352Z"
                        fill="#FCDD86"
                      />
                      <path
                        d="M11.7488 12.8057C11.6933 12.8057 11.6386 12.8084 11.5845 12.8135C11.4126 12.8295 11.2862 12.9818 11.3022 13.1537C11.3182 13.3254 11.4702 13.4497 11.6423 13.4359C11.6775 13.4327 11.7128 13.4308 11.7488 13.4308C12.3946 13.4308 12.9198 13.956 12.9198 14.6018C12.9198 15.2474 12.3946 15.7727 11.7488 15.7727C11.7116 15.7727 11.6748 15.7703 11.6387 15.7664C11.4658 15.7482 11.313 15.8718 11.2943 16.0434C11.2757 16.215 11.3997 16.3691 11.5713 16.3878C11.6318 16.3944 11.6916 16.3976 11.7488 16.3976C12.7391 16.3976 13.5448 15.592 13.5448 14.6018C13.5447 13.6114 12.7391 12.8057 11.7488 12.8057Z"
                        fill="black"
                      />
                      <path
                        d="M9.25154 16.7606C9.11917 16.6496 8.92217 16.6671 8.81129 16.7993C8.63792 17.0062 8.34192 17.1297 8.0193 17.1297C7.69667 17.1297 7.40067 17.0063 7.2273 16.7993C7.11655 16.6672 6.91955 16.6497 6.78705 16.7606C6.6548 16.8714 6.63743 17.0686 6.7483 17.2008C7.03893 17.5474 7.51405 17.7546 8.0193 17.7546C8.52454 17.7546 8.99967 17.5476 9.29029 17.2008C9.40117 17.0686 9.38379 16.8714 9.25154 16.7606Z"
                        fill="black"
                      />
                      <path
                        d="M11.3728 12.3804C11.0023 12.2945 10.613 12.0681 10.2158 11.7071C10.1058 11.6071 9.9574 11.5555 9.81015 11.5645C9.66165 11.5739 9.52665 11.6412 9.4299 11.7542C8.93566 12.3311 7.11954 14.1557 4.50017 13.4095C4.40592 13.3825 4.30455 13.4016 4.2263 13.4606C4.14805 13.5197 4.10205 13.612 4.10205 13.71V15.826C4.10205 17.9576 5.83617 19.6917 7.96766 19.6917C10.0992 19.6917 11.8333 17.9576 11.8333 15.826V12.9555C11.8334 12.6799 11.6441 12.4434 11.3728 12.3804ZM11.2084 15.826C11.2084 17.613 9.75465 19.0667 7.96779 19.0667C6.18092 19.0667 4.72717 17.613 4.72717 15.826V14.1082C7.40404 14.6593 9.25891 12.8927 9.85253 12.2207C10.3034 12.6181 10.7591 12.8745 11.2084 12.9836V15.826Z"
                        fill="black"
                      />
                      <path
                        d="M3.53675 13.723C3.79912 13.8388 4.06574 13.9356 4.32899 14.0106C4.49474 14.058 4.66787 13.9616 4.71512 13.7956C4.76237 13.6296 4.66612 13.4567 4.50012 13.4095C4.26449 13.3424 4.02537 13.2556 3.78924 13.1512C3.50837 13.027 3.18225 13.0831 2.958 13.2937C2.59737 13.6317 2.39062 14.1086 2.39062 14.6016C2.39062 15.592 3.19625 16.3976 4.18662 16.3976C4.23687 16.3976 4.28624 16.395 4.33524 16.3905C4.50712 16.3746 4.63349 16.2222 4.61749 16.0505C4.60162 15.8785 4.44924 15.7511 4.27749 15.7681C4.24749 15.7708 4.21724 15.7725 4.18649 15.7725C3.54075 15.7725 3.0155 15.2472 3.0155 14.6015C3.0155 14.2757 3.14687 13.9732 3.38537 13.7495C3.4265 13.7111 3.486 13.7003 3.53675 13.723Z"
                        fill="black"
                      />
                      <path
                        d="M7.96784 7.54102C5.13135 7.54102 2.82373 9.84863 2.82373 12.6851V13.4842C2.82373 13.6569 2.9636 13.7967 3.13623 13.7967C3.30885 13.7967 3.44873 13.6569 3.44873 13.4842V12.6851C3.44873 10.1933 5.47597 8.16601 7.96784 8.16601C10.4597 8.16601 12.4869 10.1934 12.4869 12.6851V13.4634C12.4869 13.636 12.6268 13.7759 12.7994 13.7759C12.9721 13.7759 13.1119 13.636 13.1119 13.4634V12.6851C13.1119 9.84863 10.8043 7.54102 7.96784 7.54102Z"
                        fill="black"
                      />
                      <path
                        d="M12.9544 15.8125C12.9242 15.6427 12.7617 15.5288 12.5919 15.5598C12.422 15.59 12.3088 15.7523 12.339 15.9222C12.4524 16.5588 12.3502 17.3008 12.0433 18.0679C12.0415 18.0724 12.0399 18.0769 12.0383 18.0813C11.9824 18.2386 12.0604 18.4133 12.2168 18.4758C12.2549 18.491 12.2942 18.4983 12.3328 18.4983C12.4568 18.4983 12.5742 18.4239 12.623 18.3018C12.6238 18.2998 12.6245 18.2979 12.6253 18.2958C12.9792 17.4093 13.0899 16.5738 12.9544 15.8125Z"
                        fill="black"
                      />
                      <path
                        d="M3.89219 18.0667C3.58507 17.2991 3.48294 16.5569 3.59657 15.9202C3.62694 15.7503 3.51382 15.588 3.34394 15.5577C3.17395 15.5272 3.0117 15.6403 2.98145 15.8103C2.84532 16.5729 2.95645 17.4102 3.31194 18.2988C3.48457 18.7304 3.25557 19.1409 2.86757 19.7752C2.49357 20.3867 2.06957 21.0797 2.12445 21.9684C2.1347 22.1341 2.2722 22.2617 2.43607 22.2617C2.44257 22.2617 2.44907 22.2614 2.45557 22.261C2.62782 22.2504 2.75882 22.1022 2.7482 21.9299C2.70545 21.2378 3.05895 20.6602 3.40069 20.1014C3.78882 19.4671 4.19007 18.8112 3.89219 18.0667Z"
                        fill="black"
                      />
                      <path
                        d="M11.8594 21.4164C11.8238 21.3286 11.7503 21.2617 11.6596 21.2345C11.5086 21.1892 11.3625 21.132 11.2252 21.0645L10.5538 20.7335C10.4256 20.6701 10.2708 20.7021 10.1781 20.8107C9.75308 21.3084 9.07971 21.9533 8.28621 22.1995C8.08721 22.2611 7.93446 22.4165 7.87759 22.6151C7.82209 22.8096 7.86796 23.0171 8.00059 23.1701C8.37784 23.606 8.96834 24.1058 9.69246 24.1058C9.74308 24.1058 9.79446 24.1033 9.84633 24.0983C10.532 24.0311 11.1565 23.5112 11.7026 22.5531C11.7394 22.4883 11.7521 22.4127 11.7381 22.3397C11.6947 22.1125 11.7308 21.8863 11.8427 21.686C11.8889 21.6034 11.8951 21.5041 11.8594 21.4164ZM11.1058 22.3363C10.6822 23.0485 10.2383 23.4321 9.78546 23.4763C9.24796 23.5301 8.75559 23.0803 8.49696 22.7882C9.32283 22.5241 10.0152 21.921 10.4917 21.3995L10.949 21.6251C11.0165 21.6584 11.0856 21.6895 11.1561 21.7184C11.0987 21.9177 11.0815 22.1261 11.1058 22.3363Z"
                        fill="black"
                      />
                      <path
                        d="M8.05757 22.615C8.0007 22.4164 7.84807 22.261 7.64907 22.1994C6.85533 21.9532 6.18208 21.3083 5.75708 20.8107C5.66421 20.702 5.50946 20.6702 5.38133 20.7334L4.70996 21.0644C4.53396 21.1512 4.34796 21.2195 4.15684 21.2677L4.03471 21.2985C3.94596 21.321 3.87159 21.3812 3.83109 21.4632C3.79059 21.5453 3.78809 21.6409 3.82434 21.725C4.44421 23.1653 5.17721 23.9604 6.00296 24.088C6.07958 24.0999 6.1567 24.1058 6.2342 24.1058C6.8112 24.1058 7.40682 23.7802 7.9347 23.1702C8.0672 23.0169 8.11307 22.8093 8.05757 22.615ZM6.09845 23.4704C5.56333 23.3877 5.03033 22.8139 4.54671 21.8048C4.69734 21.7552 4.84446 21.6949 4.98633 21.625L5.44346 21.3995C5.91983 21.921 6.61208 22.524 7.4382 22.7883C7.16895 23.0927 6.65695 23.5559 6.09845 23.4704Z"
                        fill="black"
                      />
                      <path
                        d="M10.5541 20.7339L10.3468 20.6318C10.1146 20.5173 9.97021 20.2853 9.97021 20.0261V19.0547C9.97021 18.8821 9.83034 18.7422 9.65771 18.7422C9.48509 18.7422 9.34521 18.8821 9.34521 19.0547V20.0261C9.34521 20.5249 9.62321 20.9718 10.0705 21.1923L10.2776 21.2944C10.322 21.3163 10.3691 21.3268 10.4156 21.3268C10.5308 21.3268 10.6417 21.2627 10.6961 21.1524C10.7725 20.9977 10.7088 20.8103 10.5541 20.7339Z"
                        fill="black"
                      />
                      <path
                        d="M8.14695 22.4746H7.78833C7.6157 22.4746 7.47583 22.6145 7.47583 22.7871C7.47583 22.9597 7.6157 23.0996 7.78833 23.0996H8.14695C8.31958 23.0996 8.45945 22.9597 8.45945 22.7871C8.45945 22.6145 8.31958 22.4746 8.14695 22.4746Z"
                        fill="black"
                      />
                      <path
                        d="M6.27772 18.75C6.1051 18.75 5.96522 18.8899 5.96522 19.0625V20.0261C5.96522 20.2852 5.82097 20.5174 5.58847 20.6319L5.38135 20.734C5.2266 20.8104 5.16298 20.9977 5.23935 21.1526C5.29385 21.2629 5.4046 21.327 5.51985 21.327C5.56622 21.327 5.61347 21.3165 5.65785 21.2946L5.86485 21.1925C6.31222 20.972 6.59022 20.5251 6.59022 20.0262V19.0625C6.59022 18.8899 6.45035 18.75 6.27772 18.75Z"
                        fill="black"
                      />
                      <path
                        d="M27.4347 12.4922C27.4326 12.3852 27.3469 12.2971 27.2399 12.294C25.6732 12.2481 24.8476 11.6271 24.5304 11.3161C24.4438 11.2313 24.3041 11.2403 24.2286 11.3351C22.8511 13.0675 20.819 12.823 20.1357 12.68C20.0116 12.654 19.8925 12.7476 19.8923 12.8745V15.9109C19.8923 17.9852 21.5895 19.6823 23.6638 19.6823C25.7382 19.6823 27.4353 17.9852 27.4353 15.9109V12.5512C27.4352 12.5315 27.4351 12.5119 27.4347 12.4922Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M26.6149 8.49139C26.2131 8.49139 25.8373 8.60489 25.5144 8.79864C25.1373 8.16914 24.4502 7.74414 23.667 7.74414H22.5607C20.4196 7.74414 18.6677 9.49601 18.6677 11.6371V13.3815C18.9371 13.1659 19.2783 13.0362 19.6502 13.0362C19.7326 13.0362 19.8133 13.0432 19.8922 13.0555V12.8742C19.8923 12.7474 20.0115 12.6539 20.1356 12.6797C20.8188 12.8227 22.851 13.0672 24.2285 11.3349C24.304 11.24 24.4437 11.231 24.5303 11.3159C24.8476 11.6269 25.6731 12.2477 27.2398 12.2937C27.3467 12.2969 27.4324 12.385 27.4346 12.492C27.4349 12.5116 27.4352 12.5312 27.4352 12.551V13.0555C27.5142 13.0432 27.5948 13.0362 27.6772 13.0362C28.1017 13.0362 28.4862 13.205 28.7693 13.4781V10.6458C28.7693 9.46088 27.7998 8.49139 26.6149 8.49139Z"
                        fill="#414344"
                      />
                      <path
                        d="M27.6773 13.0361C27.5949 13.0361 27.5142 13.043 27.4353 13.0554V15.9106C27.4353 15.9956 27.4314 16.0799 27.4258 16.1635C27.5079 16.1767 27.5915 16.1855 27.6773 16.1855C28.5469 16.1855 29.2519 15.4805 29.2519 14.6109C29.2519 13.7411 28.5469 13.0361 27.6773 13.0361Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M19.8923 15.9106V13.0554C19.8133 13.0431 19.7327 13.0361 19.6503 13.0361C18.7807 13.0361 18.0757 13.7411 18.0757 14.6108C18.0757 15.4804 18.7807 16.1854 19.6503 16.1854C19.7362 16.1854 19.8197 16.1766 19.9018 16.1634C19.8962 16.0799 19.8923 15.9957 19.8923 15.9106Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M31.2699 23.6453C31.2336 22.9949 30.7788 22.4438 30.1471 22.2848L27.2181 21.5476L26.1829 21.0372C25.7379 20.8178 25.4562 20.3647 25.4562 19.8686V19.2266C24.9223 19.5173 24.3114 19.6827 23.6638 19.6827C23.0599 19.6827 22.4885 19.5381 21.9812 19.2829V19.8686C21.9812 20.3647 21.6994 20.8177 21.2544 21.0372L20.3187 21.4986C20.8748 22.4214 20.1038 23.5965 19.0169 23.4217V23.4215C18.9448 24.4959 18.3142 25.4237 17.4141 25.9138V26.4363C17.4141 27.2022 18.1082 27.4274 18.1378 27.4525L18.8479 27.8027L21.2315 28.4027C21.7455 28.532 22.1157 28.9807 22.1452 29.5098L22.2645 31.688H31.2736C31.5111 31.688 31.7 31.4884 31.6868 31.2513L31.2699 23.6453Z"
                        fill="#70D6F9"
                      />
                      <path
                        d="M26.1829 21.0372C25.7379 20.8178 25.4562 20.3647 25.4562 19.8686V19.2266C24.9223 19.5173 24.3114 19.6827 23.6638 19.6827C23.0599 19.6827 22.4885 19.5381 21.9812 19.2829V19.8686C21.9812 20.3647 21.6994 20.8177 21.2544 21.0372L21.0918 21.1173C21.583 22.0706 22.5777 22.7267 23.7187 22.7267C24.8597 22.7267 25.8542 22.0704 26.3455 21.1173L26.1829 21.0372Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M27.7471 12.4858C27.7416 12.2108 27.5227 11.9892 27.2491 11.9815C25.7667 11.9378 25.0069 11.3455 24.7491 11.0927C24.6448 10.9907 24.5022 10.9382 24.3561 10.9461C24.2106 10.9551 24.0748 11.0261 23.9838 11.1406C22.7376 12.7076 20.922 12.5255 20.1996 12.374C20.047 12.3425 19.89 12.3801 19.7687 12.4785C19.6487 12.5758 19.5797 12.7201 19.5796 12.877V15.9108C19.5796 18.1628 21.4117 19.9948 23.6636 19.9948C25.9154 19.9948 27.7476 18.1628 27.7476 15.9108V12.5512L27.7471 12.4858ZM27.1227 15.9106C27.1227 17.8179 25.5709 19.3696 23.6637 19.3696C21.7565 19.3696 20.2047 17.8179 20.2047 15.9106V13.0113C20.9755 13.1477 22.9872 13.3025 24.3986 11.6206C24.8133 11.9932 25.6604 12.5347 27.1227 12.6022V15.9106Z"
                        fill="black"
                      />
                      <path
                        d="M26.6151 8.17876C26.2713 8.17876 25.9308 8.25251 25.6157 8.39389C25.1506 7.79401 24.4278 7.43164 23.667 7.43164H22.5607C20.2418 7.43164 18.3552 9.31826 18.3552 11.6371V13.3815C18.3552 13.5016 18.4241 13.6111 18.5323 13.6631C18.6407 13.7152 18.7692 13.7005 18.863 13.6255C19.0893 13.4444 19.3615 13.3486 19.6502 13.3486C19.7127 13.3486 19.778 13.3539 19.8445 13.3641C19.9346 13.3776 20.0263 13.3519 20.0956 13.2926C20.1648 13.2331 20.2047 13.1465 20.2047 13.0554V13.0112C20.9753 13.1475 22.9872 13.3021 24.3986 11.6205C24.8133 11.9931 25.6604 12.5346 27.1227 12.6021V13.0554C27.1227 13.1465 27.1626 13.2332 27.2318 13.2926C27.3011 13.352 27.3927 13.3779 27.4829 13.3641C27.5494 13.3539 27.6147 13.3486 27.6772 13.3486C28.0047 13.3486 28.3154 13.4745 28.5524 13.703C28.6119 13.7602 28.6901 13.7905 28.7694 13.7905C28.8107 13.7905 28.8522 13.7824 28.8916 13.7656C29.0069 13.7165 29.0818 13.6034 29.0818 13.478V10.6456C29.0819 9.28538 27.9753 8.17876 26.6151 8.17876ZM28.4569 12.8921C28.2356 12.7912 27.9954 12.734 27.7478 12.7249L27.7472 12.4856C27.7417 12.2106 27.5228 11.989 27.2492 11.9812C25.7668 11.9376 25.0071 11.3452 24.7492 11.0925C24.645 10.9905 24.5023 10.938 24.3562 10.9459C24.2107 10.9549 24.075 11.0259 23.984 11.1404C22.7377 12.7075 20.9222 12.5251 20.1997 12.3737C20.0471 12.3422 19.8901 12.3799 19.7688 12.4782C19.6891 12.543 19.632 12.6282 19.6025 12.7242C19.3891 12.7297 19.1785 12.772 18.9802 12.8475V11.637C18.9802 9.66276 20.5865 8.05651 22.5607 8.05651H23.667C24.3076 8.05651 24.9128 8.40239 25.2464 8.95913C25.2891 9.03013 25.3582 9.08151 25.4386 9.10163C25.5189 9.12188 25.6041 9.10913 25.6752 9.06663C25.9618 8.89464 26.2869 8.80376 26.6151 8.80376C27.6307 8.80376 28.4569 9.63001 28.4569 10.6456V12.8921Z"
                        fill="black"
                      />
                      <path
                        d="M28.9424 25.1211C28.7698 25.1211 28.6299 25.261 28.6299 25.4336V31.5896C28.6299 31.7622 28.7698 31.9021 28.9424 31.9021C29.115 31.9021 29.2549 31.7622 29.2549 31.5896V25.4336C29.2549 25.261 29.115 25.1211 28.9424 25.1211Z"
                        fill="black"
                      />
                      <path
                        d="M18.4949 25.1211C18.3222 25.1211 18.1824 25.261 18.1824 25.4336V27.5722C18.1824 27.7448 18.3222 27.8847 18.4949 27.8847C18.6675 27.8847 18.8074 27.7448 18.8074 27.5722V25.4336C18.8074 25.261 18.6675 25.1211 18.4949 25.1211Z"
                        fill="black"
                      />
                      <path
                        d="M27.6772 12.7236C27.583 12.7236 27.4854 12.7314 27.3875 12.7465C27.2352 12.77 27.1227 12.9011 27.1227 13.0554V15.9106C27.1227 15.9794 27.12 16.053 27.114 16.1425C27.1031 16.3036 27.2169 16.4465 27.3762 16.4721C27.4849 16.4896 27.5834 16.498 27.6774 16.498C28.718 16.498 29.5645 15.6515 29.5645 14.6109C29.5645 13.5703 28.7179 12.7236 27.6772 12.7236ZM27.7477 15.871V13.3506C28.411 13.3874 28.9394 13.9385 28.9394 14.6109C28.9395 15.2831 28.4111 15.8342 27.7477 15.871Z"
                        fill="black"
                      />
                      <path
                        d="M20.2048 15.9106V13.0554C20.2048 12.9013 20.0924 12.7701 19.9401 12.7465C19.8421 12.7314 19.7446 12.7236 19.6503 12.7236C18.6097 12.7236 17.7632 13.5701 17.7632 14.6109C17.7632 15.6514 18.6097 16.498 19.6503 16.498C19.7442 16.498 19.8428 16.4896 19.9514 16.4721C20.1108 16.4465 20.2244 16.3036 20.2137 16.1426C20.2077 16.0529 20.2048 15.9792 20.2048 15.9106ZM19.5798 15.8711C18.9166 15.8344 18.3882 15.2832 18.3882 14.611C18.3882 13.9386 18.9166 13.3875 19.5798 13.3508V15.8711Z"
                        fill="black"
                      />
                      <path
                        d="M21.981 19.0586C21.8083 19.0586 21.6685 19.1985 21.6685 19.3711V19.8681C21.6685 20.248 21.4568 20.5883 21.1161 20.7563L20.2247 21.1958C20.07 21.2721 20.0062 21.4595 20.0826 21.6143C20.137 21.7247 20.2478 21.7888 20.3631 21.7888C20.4095 21.7888 20.4566 21.7785 20.5011 21.7565L21.3926 21.317C21.9483 21.0428 22.2936 20.4876 22.2936 19.8681V19.3711C22.2935 19.1985 22.1535 19.0586 21.981 19.0586Z"
                        fill="black"
                      />
                      <path
                        d="M31.9986 31.233L31.5816 23.6267C31.5375 22.8355 30.9916 22.174 30.2231 21.9804L27.3263 21.2514L26.3209 20.7556C25.9801 20.5875 25.7685 20.2473 25.7685 19.8674V19.3535C25.7685 19.1809 25.6286 19.041 25.456 19.041C25.2834 19.041 25.1435 19.1809 25.1435 19.3535V19.8674C25.1435 20.4869 25.4888 21.042 26.0445 21.3163L27.0798 21.8266C27.0995 21.8364 27.1203 21.8441 27.1416 21.8495L30.0706 22.5866C30.5724 22.713 30.9289 23.1449 30.9576 23.6612L31.3746 31.2675C31.3767 31.3053 31.3582 31.3308 31.347 31.3427C31.3359 31.3546 31.3114 31.3745 31.2735 31.3745H22.2644C22.0918 31.3745 21.9519 31.5143 21.9519 31.687C21.9519 31.8596 22.0918 31.9995 22.2644 31.9995H31.2735C31.4722 31.9995 31.6645 31.9167 31.8011 31.7723C31.9376 31.6277 32.0096 31.4311 31.9986 31.233Z"
                        fill="black"
                      />
                      <path
                        d="M26.4462 20.9418C26.296 20.857 26.1052 20.9104 26.0206 21.0605C25.5501 21.8951 24.6681 22.4135 23.7185 22.4135C22.761 22.4135 21.8754 21.8888 21.4071 21.044C21.3235 20.893 21.1333 20.8383 20.9824 20.9221C20.8314 21.0058 20.7769 21.196 20.8605 21.3469C21.4389 22.3903 22.534 23.0384 23.7185 23.0384C24.8932 23.0384 25.9841 22.398 26.565 21.3673C26.6499 21.217 26.5966 21.0265 26.4462 20.9418Z"
                        fill="black"
                      />
                      <path
                        d="M24.9859 16.7732C24.8535 16.6622 24.6565 16.6798 24.5456 16.8121C24.3702 17.0213 24.0706 17.1463 23.7442 17.1463C23.4179 17.1463 23.1184 17.0213 22.943 16.8121C22.8321 16.6798 22.635 16.6625 22.5027 16.7732C22.3704 16.8841 22.353 17.0811 22.4639 17.2133C22.7566 17.5627 23.2352 17.7712 23.7442 17.7712C24.2532 17.7712 24.7319 17.5627 25.0246 17.2133C25.1354 17.0811 25.1181 16.884 24.9859 16.7732Z"
                        fill="black"
                      />
                      <path
                        d="M25.2975 14.2578C25.0235 14.2578 24.8013 14.4799 24.8013 14.7541C24.8013 15.0281 25.0234 15.2503 25.2975 15.2503C25.5716 15.2503 25.7938 15.0282 25.7938 14.7541C25.7938 14.4801 25.5716 14.2578 25.2975 14.2578Z"
                        fill="black"
                      />
                      <path
                        d="M22.2023 14.2578C21.9283 14.2578 21.7061 14.4799 21.7061 14.7541C21.7061 15.0281 21.9282 15.2503 22.2023 15.2503C22.4764 15.2503 22.6986 15.0282 22.6986 14.7541C22.6986 14.4801 22.4763 14.2578 22.2023 14.2578Z"
                        fill="black"
                      />
                      <path
                        d="M9.54752 14.5078C9.27352 14.5078 9.05127 14.7299 9.05127 15.0041C9.05127 15.2781 9.27339 15.5003 9.54752 15.5003C9.82164 15.5003 10.0438 15.2782 10.0438 15.0041C10.0438 14.7301 9.82164 14.5078 9.54752 14.5078Z"
                        fill="black"
                      />
                      <path
                        d="M6.4523 14.5078C6.1783 14.5078 5.95605 14.7299 5.95605 15.0041C5.95605 15.2781 6.17818 15.5003 6.4523 15.5003C6.72643 15.5003 6.94855 15.2782 6.94855 15.0041C6.94855 14.7301 6.7263 14.5078 6.4523 14.5078Z"
                        fill="black"
                      />
                      <path
                        d="M18.6876 20.5467H18.6841C17.7202 20.5467 16.8657 20.0795 16.334 19.3594C16.1666 19.1328 15.8332 19.1328 15.666 19.3594C15.1341 20.0794 14.2797 20.5467 13.3159 20.5467C13.2854 20.5467 13.255 20.5462 13.2247 20.5452C13.0391 20.5392 12.8862 20.6887 12.8862 20.8744V23.2159C12.8862 24.904 14.2674 26.2851 15.9555 26.2851C17.6436 26.2851 19.0247 24.904 19.0247 23.2159V20.8767C19.0246 20.6918 18.8726 20.5464 18.6876 20.5467Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M16 15.9307C13.7299 15.9307 11.8896 17.7709 11.8896 20.041V21.1569C12.1089 20.9814 12.3865 20.8759 12.6891 20.8759C12.7561 20.8759 12.8219 20.8815 12.8861 20.8915V20.8735C12.8861 20.6878 13.039 20.5383 13.2246 20.5443C13.2549 20.5453 13.2853 20.5458 13.3158 20.5458C14.2796 20.5458 15.1341 20.0786 15.6659 19.3585C15.8333 19.1319 16.1666 19.1319 16.3339 19.3585C16.8658 20.0785 17.7201 20.5458 18.684 20.5458H18.6875C18.8725 20.5455 19.0244 20.6908 19.0244 20.8758V20.8914C19.0886 20.8814 19.1542 20.8758 19.2214 20.8758C19.5667 20.8758 19.8796 21.0131 20.1101 21.2353V20.0408C20.1104 17.7709 18.2701 15.9307 16 15.9307Z"
                        fill="#414344"
                      />
                      <path
                        d="M19.2214 20.876C19.1544 20.876 19.0886 20.8816 19.0244 20.8916V23.2151C19.0244 23.2843 19.0212 23.3528 19.0166 23.421C19.0834 23.4317 19.1515 23.4388 19.2212 23.4388C19.929 23.4388 20.5026 22.8651 20.5026 22.1575C20.5028 21.4497 19.9291 20.876 19.2214 20.876Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M12.8861 23.2151V20.8916C12.8218 20.8816 12.7562 20.876 12.6891 20.876C11.9813 20.876 11.4077 21.4497 11.4077 22.1573C11.4077 22.8651 11.9815 23.4387 12.6891 23.4387C12.759 23.4387 12.827 23.4316 12.8937 23.4208C12.8893 23.3528 12.8861 23.2843 12.8861 23.2151Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M22.1452 29.5091C22.1157 28.9798 21.7455 28.5313 21.2316 28.402L18.8479 27.802L18.0054 27.3866C17.6433 27.2081 17.4141 26.8393 17.4141 26.4356V25.9131C16.9796 26.1497 16.4824 26.2843 15.9554 26.2843C15.4641 26.2843 14.999 26.1666 14.5861 25.959V26.4356C14.5861 26.8393 14.3568 27.208 13.9947 27.3866L13.1522 27.802L10.7686 28.402C10.2546 28.5313 9.88434 28.9799 9.85497 29.5092L9.7356 31.6873H22.2645L22.1452 29.5091Z"
                        fill="#F5C84C"
                      />
                      <path
                        d="M18.0054 27.3866C17.6433 27.2081 17.414 26.8393 17.414 26.4356V25.9131C16.9795 26.1497 16.4824 26.2843 15.9554 26.2843C15.464 26.2843 14.9989 26.1666 14.5861 25.959V26.4356C14.5861 26.8393 14.3568 27.208 13.9947 27.3866L13.8623 27.4518C14.2622 28.2276 15.0714 28.7616 16 28.7616C16.9287 28.7616 17.7379 28.2276 18.1378 27.4518L18.0054 27.3866Z"
                        fill="#F9C1A8"
                      />
                      <path
                        d="M20.251 29.8105C20.0784 29.8105 19.9385 29.9504 19.9385 30.123V31.6542C19.9385 31.8268 20.0784 31.9667 20.251 31.9667C20.4236 31.9667 20.5635 31.8268 20.5635 31.6542V30.123C20.5635 29.9504 20.4236 29.8105 20.251 29.8105Z"
                        fill="black"
                      />
                      <path
                        d="M11.749 29.8105C11.5764 29.8105 11.4365 29.9504 11.4365 30.123V31.6542C11.4365 31.8268 11.5764 31.9667 11.749 31.9667C11.9216 31.9667 12.0615 31.8268 12.0615 31.6542V30.123C12.0615 29.9504 11.9216 29.8105 11.749 29.8105Z"
                        fill="black"
                      />
                      <path
                        d="M19.2214 20.5635C19.1625 20.5635 19.1019 20.567 19.0411 20.5741C18.8698 20.594 18.7469 20.7491 18.7668 20.9205C18.7866 21.0918 18.9406 21.2148 19.1133 21.1948C19.1488 21.1907 19.1848 21.1883 19.2214 21.1883C19.7556 21.1883 20.1903 21.6231 20.1903 22.1573C20.1903 22.6915 19.7556 23.1262 19.2214 23.1262C19.1875 23.1262 19.1524 23.1238 19.114 23.1191C18.9429 23.0963 18.7866 23.2193 18.7651 23.3905C18.7438 23.5617 18.8653 23.7178 19.0365 23.7392C19.1008 23.7472 19.1613 23.7512 19.2214 23.7512C20.1003 23.7512 20.8153 23.0362 20.8153 22.1573C20.8153 21.2785 20.1004 20.5635 19.2214 20.5635Z"
                        fill="black"
                      />
                      <path
                        d="M13.1176 23.4011C13.1002 23.2295 12.9475 23.1038 12.7752 23.1217C12.7468 23.1245 12.7182 23.1263 12.6892 23.1263C12.155 23.1263 11.7203 22.6916 11.7203 22.1575C11.7203 21.6232 12.155 21.1885 12.6892 21.1885C12.7151 21.1885 12.7407 21.1897 12.7661 21.1918C12.9386 21.2063 13.0893 21.0792 13.1042 20.9072C13.1191 20.7352 12.9916 20.5839 12.8196 20.5691C12.7767 20.5655 12.7332 20.5635 12.6893 20.5635C11.8105 20.5635 11.0955 21.2786 11.0955 22.1575C11.0955 23.0363 11.8105 23.7513 12.6893 23.7513C12.7396 23.7513 12.7892 23.7486 12.8382 23.7435C13.0098 23.7262 13.135 23.5728 13.1176 23.4011Z"
                        fill="black"
                      />
                      <path
                        d="M22.4572 29.4919C22.4199 28.8225 21.9579 28.2626 21.3078 28.0989L18.9563 27.5071L18.1435 27.1064C17.8863 26.9795 17.7265 26.7226 17.7265 26.4357V26.0156C17.7265 25.843 17.5867 25.7031 17.414 25.7031C17.2414 25.7031 17.1015 25.843 17.1015 26.0156V26.4357C17.1015 26.9625 17.3949 27.4341 17.8672 27.667L18.7097 28.0824C18.7294 28.0921 18.7502 28.0997 18.7715 28.1052L21.1552 28.7052C21.5387 28.8016 21.8112 29.1319 21.833 29.5264L21.9345 31.3749H10.0656L10.167 29.5265C10.189 29.1317 10.4613 28.8015 10.8448 28.7051L13.2284 28.1051C13.2498 28.0996 13.2706 28.0921 13.2903 28.0822L14.1327 27.6669C14.6051 27.4341 14.8984 26.9624 14.8984 26.4356V26.0676C14.8984 25.895 14.7586 25.7551 14.5859 25.7551C14.4133 25.7551 14.2734 25.895 14.2734 26.0676V26.4356C14.2734 26.7225 14.1137 26.9795 13.8564 27.1062L13.0437 27.507L10.6922 28.0987C10.042 28.2625 9.5802 28.8222 9.54283 29.492L9.42333 31.6702C9.41858 31.756 9.44933 31.8397 9.50846 31.9021C9.56758 31.9645 9.6497 31.9998 9.73558 31.9998H22.2645C22.3504 31.9998 22.4324 31.9646 22.4914 31.9022C22.5504 31.8398 22.5812 31.756 22.5765 31.6704L22.4572 29.4919Z"
                        fill="black"
                      />
                      <path
                        d="M18.2524 27.2486C18.1016 27.1645 17.9113 27.2186 17.8273 27.3694C17.4558 28.035 16.7557 28.4486 16.0002 28.4486C15.2551 28.4486 14.5597 28.0435 14.1854 27.3911C14.0996 27.2414 13.9086 27.1895 13.7588 27.2756C13.6091 27.3615 13.5574 27.5525 13.6433 27.7021C14.1287 28.5481 15.0318 29.0736 16.0002 29.0736C16.9821 29.0736 17.8913 28.5373 18.373 27.6739C18.457 27.5231 18.403 27.3328 18.2524 27.2486Z"
                        fill="black"
                      />
                      <path
                        d="M17.0688 23.8719C16.9366 23.7609 16.7394 23.7784 16.6286 23.9106C16.4967 24.068 16.2696 24.162 16.0211 24.162C15.7726 24.162 15.5455 24.068 15.4136 23.9106C15.3028 23.7785 15.1057 23.7611 14.9733 23.8719C14.8411 23.9829 14.8237 24.1799 14.9346 24.3121C15.1838 24.6094 15.5901 24.7869 16.0211 24.7869C16.4521 24.7869 16.8583 24.6094 17.1076 24.3121C17.2184 24.1799 17.2011 23.9829 17.0688 23.8719Z"
                        fill="black"
                      />
                      <path
                        d="M17.285 21.8701C17.062 21.8701 16.8811 22.0509 16.8811 22.274C16.8811 22.497 17.0619 22.6777 17.285 22.6777C17.508 22.6777 17.6889 22.497 17.6889 22.274C17.6887 22.0509 17.508 21.8701 17.285 21.8701Z"
                        fill="black"
                      />
                      <path
                        d="M14.7662 21.8701C14.5432 21.8701 14.3623 22.0509 14.3623 22.274C14.3623 22.497 14.5431 22.6777 14.7662 22.6777C14.9892 22.6777 15.1701 22.497 15.1701 22.274C15.1699 22.0509 14.9892 21.8701 14.7662 21.8701Z"
                        fill="black"
                      />
                      <path
                        d="M19.1493 20.4241C18.9398 20.2148 18.6997 20.2366 18.6871 20.2339C18.6742 20.2308 17.4087 20.2884 16.5852 19.1737C16.446 18.9851 16.2326 18.877 15.9998 18.877C15.7671 18.877 15.5537 18.9851 15.4145 19.1737C14.9241 19.8377 14.1395 20.2339 13.3156 20.2339C13.2885 20.2339 13.2615 20.2334 13.2346 20.2326C13.061 20.2268 12.8946 20.2909 12.769 20.4124C12.6429 20.5346 12.5735 20.6984 12.5735 20.8741V23.2156C12.5735 25.0802 14.0905 26.5973 15.9552 26.5973C17.82 26.5973 19.337 25.0802 19.337 23.2156V20.8763C19.337 20.7056 19.2703 20.5448 19.1493 20.4241ZM18.712 23.2158C18.712 24.7358 17.4753 25.9726 15.9552 25.9726C14.4351 25.9726 13.1985 24.7358 13.1985 23.2158V20.8742C13.1985 20.8721 13.1985 20.8664 13.2144 20.8573C13.248 20.8584 13.2817 20.8589 13.3156 20.8589C14.3369 20.8589 15.3094 20.3677 15.9171 19.545C15.9448 19.5075 15.9808 19.5018 15.9998 19.5018C16.0188 19.5018 16.0548 19.5075 16.0826 19.545C16.6903 20.3677 17.6628 20.8589 18.6841 20.8589H18.6881C18.6983 20.8589 18.7043 20.8629 18.712 20.8766V23.2158Z"
                        fill="black"
                      />
                      <path
                        d="M16 15.6182C13.5613 15.6182 11.5771 17.6022 11.5771 20.0409V21.0935C11.5771 21.2661 11.717 21.406 11.8896 21.406C12.0623 21.406 12.2021 21.2661 12.2021 21.0935V20.0409C12.2021 17.9468 13.9059 16.2432 16 16.2432C18.0941 16.2432 19.7977 17.9468 19.7977 20.0409V21.1091C19.7977 21.2818 19.9376 21.4216 20.1102 21.4216C20.2829 21.4216 20.4227 21.2818 20.4227 21.1091V20.0409C20.4227 17.6022 18.4387 15.6182 16 15.6182Z"
                        fill="black"
                      />
                      <path
                        d="M18.9524 3.66779C18.1565 2.92667 16.9036 2.98354 16.1346 3.75254C16.0603 3.82692 15.9396 3.82692 15.8653 3.75254C15.0963 2.98354 13.8434 2.92654 13.0475 3.66779C12.212 4.44591 12.1945 5.75453 12.9949 6.5549L15.5855 9.14564C15.8144 9.37452 16.1854 9.37452 16.4143 9.14564L19.0049 6.5549C19.8054 5.75453 19.7879 4.44591 18.9524 3.66779Z"
                        fill="#FC657E"
                      />
                      <path
                        d="M19.1653 3.43991C18.2918 2.62616 16.8963 2.63966 15.9998 3.45041C15.1032 2.63953 13.7078 2.62628 12.8344 3.43991C12.369 3.8734 12.1065 4.46165 12.0951 5.09615C12.0839 5.73102 12.3249 6.32789 12.7737 6.77664L15.3643 9.36738C15.534 9.53701 15.7597 9.63051 15.9997 9.63051C16.2397 9.63051 16.4655 9.53713 16.6351 9.36738L19.2257 6.77664C19.6746 6.32777 19.9156 5.73102 19.9043 5.09615C19.8932 4.46153 19.6307 3.87328 19.1653 3.43991ZM18.784 6.33477L16.1933 8.92551C16.09 9.02876 15.9098 9.02876 15.8065 8.92551L13.2157 6.33477C12.8878 6.0069 12.7119 5.57102 12.7201 5.10727C12.7282 4.64378 12.9202 4.21403 13.2603 3.89715C13.5752 3.60391 13.9837 3.45891 14.3962 3.45891C14.8467 3.45891 15.3017 3.63203 15.6441 3.9744C15.8402 4.17028 16.1592 4.17015 16.3553 3.97428C17.0112 3.31853 18.0806 3.28416 18.7391 3.89715C19.0793 4.21403 19.2712 4.64378 19.2793 5.10727C19.2878 5.5709 19.1118 6.0069 18.784 6.33477Z"
                        fill="black"
                      />
                      <path
                        d="M12.3056 1.98521C11.7433 1.88059 11.3002 1.44647 11.1933 0.895719C11.1879 0.868094 11.1493 0.868094 11.1439 0.895719C11.0371 1.44647 10.5939 1.88059 10.0317 1.98521C10.0034 1.99046 10.0034 2.02834 10.0317 2.03359C10.5939 2.13834 11.0371 2.57246 11.1439 3.12321C11.1493 3.15083 11.1879 3.15083 11.1933 3.12321C11.3002 2.57246 11.7433 2.13834 12.3056 2.03359C12.3338 2.02834 12.3338 1.99059 12.3056 1.98521Z"
                        fill="#F5C84C"
                      />
                      <path
                        d="M22.7363 5.49323C22.3748 5.42586 22.0898 5.14673 22.0211 4.79261C22.0176 4.77486 21.9928 4.77486 21.9893 4.79261C21.9206 5.14673 21.6357 5.42598 21.2741 5.49323C21.256 5.49661 21.256 5.52098 21.2741 5.52436C21.6356 5.59173 21.9206 5.87085 21.9893 6.22498C21.9928 6.24273 22.0176 6.24273 22.0211 6.22498C22.0898 5.87085 22.3747 5.59161 22.7363 5.52436C22.7545 5.52098 22.7545 5.49673 22.7363 5.49323Z"
                        fill="#70D6F9"
                      />
                      <path
                        d="M2.14442 9.03743H1.85329V8.74619C1.85329 8.52819 1.67667 8.35156 1.45867 8.35156C1.24067 8.35156 1.06405 8.52819 1.06405 8.74619V9.03743H0.772797C0.554798 9.03743 0.378174 9.21406 0.378174 9.43206C0.378174 9.65006 0.554798 9.82668 0.772797 9.82668H1.06405V10.1179C1.06405 10.3359 1.24067 10.5126 1.45867 10.5126C1.67667 10.5126 1.85329 10.3358 1.85329 10.1179V9.82668H2.14442C2.36242 9.82668 2.53904 9.65006 2.53904 9.43206C2.53917 9.21406 2.36242 9.03743 2.14442 9.03743Z"
                        fill="#FC657E"
                      />
                      <path
                        d="M13.8076 0.844247C14.0408 0.844247 14.2297 0.655256 14.2297 0.422123C14.2297 0.188991 14.0408 0 13.8076 0C13.5745 0 13.3855 0.188991 13.3855 0.422123C13.3855 0.655256 13.5745 0.844247 13.8076 0.844247Z"
                        fill="#87D147"
                      />
                      <path
                        d="M0.422123 12.375C0.188999 12.375 0 12.564 0 12.7971C0 13.0302 0.188999 13.2192 0.422123 13.2192C0.655247 13.2192 0.844247 13.0302 0.844247 12.7971C0.844247 12.564 0.655247 12.375 0.422123 12.375Z"
                        fill="#F5C84C"
                      />
                    </svg>
                    Family Pack
                  </button>
                </div>

                <div
                  className={`search-filter-data-os ${
                    searchBy === "digit"
                      ? "filter-content-os active"
                      : "filter-content-os"
                  }`}
                >
                  <div
                    className={`${
                      pathname === "/numerology" || pathname === "/family-pack"
                        ? "hidden"
                        : "search-filter-checkboxes-row-os flex pb-4 flex-wrap justify-center gap-6"
                    }`}
                  >
                    {location?.pathname !== "/search-your-number" ? (
                      <>
                        <label
                          onClick={() => {
                            handleFiltersOnSwitching({ type: "global" });
                            setTimeout(() => {
                              document
                                .getElementById("desktopGlobalSearch")
                                ?.focus();
                            }, 0);
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value="option1"
                            checked={filters?.type === "global"}
                            onChange={() =>
                              handleFiltersOnSwitching({ type: "global" })
                            }
                          />
                          <span className="custom-radio">
                            <span className=" dot"></span>
                            Global Search
                          </span>
                          <div className="recommended-checkbox-os">
                            (Recommended)
                          </div>
                        </label>
                        <label
                          onClick={() => {
                            handleFiltersOnSwitching({ type: "basic" });
                            setTimeout(() => {
                              document.getElementById("premium-id")?.focus();
                            }, 0);
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value="option2"
                            checked={filters?.type === "basic"}
                            onChange={() =>
                              handleFiltersOnSwitching({
                                type: "basic",
                              })
                            }
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>
                            Premium Search
                          </span>
                        </label>
                        <label
                          onClick={() => {
                            handleFiltersOnSwitching({ type: "advanced" });
                            setTimeout(() => {
                              document
                                .getElementById("advanceStart_with")
                                ?.focus();
                            }, 0);
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value="option3"
                            checked={filters?.type === "advanced"}
                            onChange={() =>
                              handleFiltersOnSwitching({ type: "advanced" })
                            }
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Numerology Search
                          </span>
                        </label>
                        <label
                          onClick={() => {
                            handleFiltersOnSwitching({
                              type: "exactPlacement",
                            });
                            setTimeout(() => {
                              document.getElementById("otc-2")?.focus();
                            }, 0);
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value="option4"
                            checked={filters?.type === "exactPlacement"}
                            onChange={() =>
                              handleFiltersOnSwitching({
                                type: "exactPlacement",
                              })
                            }
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Exact Digit Placement
                          </span>
                        </label>
                        <label
                          onClick={() => {
                            handleFiltersOnSwitching({ type: "mostContained" });
                            setTimeout(() => {
                              document
                                .getElementById("most-contain-id")
                                ?.focus();
                            }, 0);
                          }}
                        >
                          <input
                            type="radio"
                            name="option"
                            value="option5"
                            checked={filters?.type === "mostContained"}
                            onChange={() =>
                              handleFiltersOnSwitching({
                                type: "mostContained",
                              })
                            }
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Most Contains
                          </span>
                        </label>{" "}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (filters?.type === "global") {
                        globalhit();
                      } else if (filters?.type === "basic") {
                        basicHit();
                      } else if (filters?.type === "advanced") {
                        advancedHit();
                      } else if (filters?.type === "exactPlacement") {
                        exacthit();
                      } else if (filters?.type === "mostContained") {
                        mostHit();
                      }
                    }}
                  >
                    <div
                      className={`search-filter-radio-button-data-row-1-os ${
                        filters?.type === "global"
                          ? "search-filter-radio-button-content-1 active"
                          : "search-filter-radio-button-content-1"
                      }`}
                    >
                      <div className="search-filter-input-data-os">
                        <div className="search-filter-input-data-col-1-os">
                          <SearchFilterInput
                            radius="5px 0 0 5px"
                            inputLabel="Enter Digits Here"
                            inputType="text"
                            placeHolder="E.g. 987"
                            inputValue={filters?.number}
                            inputOnChange={(e) => {
                              const regex = /^[0-9,*]*$/;
                              if (regex.test(e.target.value)) {
                                handleFilters("number", e.target.value);
                              }
                            }}
                            id="desktopGlobalSearch"
                          />
                        </div>

                        <div className="search-filter-input-data-col-3-os">
                          <SearchFilterButton
                            onClick={() => {
                              globalhit();
                            }}
                            buttonRadius="0px 5px 5px 0px"
                            dataLoading={dataLoading}
                          />
                        </div>
                      </div>
                      {priceWarning && (
                        <p className="warning-message" style={{ color: "red" }}>
                          Please enter a 0 to 9 digit number.
                        </p>
                      )}
                    </div>

                    <div
                      className={`search-filter-radio-button-data-row-2-os ${
                        filters?.type === "basic"
                          ? "search-filter-radio-button-content-1 active"
                          : "search-filter-radio-button-content-1"
                      }`}
                    >
                      <div className="search-filter-input-data-os">
                        <div className="search-filter-basic-search-col-1-os">
                          {/* <SearchFilterInput
                        inputLabel="Enter Digits Here"
                        inputType="text"
                        inputValue={filters?.number}
                        placeHolder="e.g: 0000"
                        inputOnChange={(e) => {
                          const regex = /^[0-9,\*]*$/; // regular expression to allow only numbers and commas
                          if (regex.test(e.target.value)) {
                            handleFilters("number", e.target.value);
                            if (
                              !["9", "8", "7", "6"]?.includes(
                                e.target.value?.charAt(0)
                              )
                            ) {
                              setFirstDigitValidation(true);
                            } else {
                              setFirstDigitValidation(false);
                            }
                          }
                        }}
                      /> */}
                          {selectedOption === "start_with" && (
                            <>
                              <SearchFilterInput
                                inputLabel="Start With"
                                radius="5px 0 0 5px"
                                inputType="text"
                                placeHolder="e.g: 0000"
                                inputValue={filters?.start_with}
                                inputOnChange={(e) => {
                                  const inputValue = e.target.value;
                                  const regex = /^[0-9,\*]*$/; // regex to allow only numbers and commas
                                  if (regex.test(inputValue)) {
                                    // check if the input matches the regex
                                    if (
                                      !["9", "8", "7", "6", "*"].includes(
                                        inputValue.charAt(0)
                                      ) &&
                                      inputValue.length
                                    ) {
                                      setFirstDigitValidation(true); // Set validation error to true
                                    } else {
                                      setFirstDigitValidation(false); // Reset validation error
                                    }
                                    handlePreFilters("start_with", inputValue);
                                  } else {
                                    // Invalid input format, reset validation error
                                    setFirstDigitValidation(false);
                                  }
                                }}
                                id="premium-id"
                              />
                            </>
                          )}
                          {selectedOption === "any_where" && (
                            <SearchFilterInput
                              inputLabel="Anywhere"
                              radius="5px 0 0 5px"
                              inputType="text"
                              placeHolder="e.g: 367"
                              inputValue={filters?.any_where}
                              inputOnChange={(e) => {
                                const filteredValue = e.target.value.replace(
                                  /[^0-9,\*]/g,
                                  ""
                                );
                                handlePreFilters("any_where", filteredValue);
                              }}
                              id="premium-id"
                            />
                          )}
                          {selectedOption === "end_with" && (
                            <SearchFilterInput
                              inputLabel="End With"
                              radius="5px 0 0 5px"
                              inputType="text"
                              placeHolder="e.g: 000"
                              inputValue={filters?.end_with}
                              inputOnChange={(e) => {
                                const filteredValue = e.target.value.replace(
                                  /[^0-9,\*]/g,
                                  ""
                                );
                                handlePreFilters("end_with", filteredValue);
                              }}
                              id="premium-id"
                            />
                          )}
                        </div>
                        <div className="search-filter-basic-search-col-2-os">
                          <SearchFilterButton
                            onClick={() => {
                              basicHit();
                            }}
                            buttonRadius="0px 5px 5px 0px"
                            dataLoading={dataLoading}
                          />
                        </div>
                      </div>
                      {firstDigitValidation && (
                        <p style={{ color: "red" }}>
                          Only *,9, 8, 7, and 6 are allowed to start with.
                        </p>
                      )}
                      <div className="search-by-digits-filter-subFilter-os items-center">
                        <label>
                          <input
                            type="radio"
                            name="search_option"
                            value="start_with"
                            checked={selectedOption === "start_with"}
                            onChange={handleOptionChange}
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Start with
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="search_option"
                            value="any_where"
                            checked={selectedOption === "any_where"}
                            onChange={handleOptionChange}
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>Anywhere
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="search_option"
                            value="end_with"
                            checked={selectedOption === "end_with"}
                            onChange={handleOptionChange}
                          />
                          <span className="custom-radio">
                            <span className="dot"></span>End with
                          </span>
                        </label>
                        <BsInfoCircleFill
                          className="blink-zoom cursor-pointer"
                          color="red"
                          fontSize={20}
                          onClick={() => setDeliveryIsOpen(true)}
                        />
                      </div>
                      {showCheckboxWarning && (
                        <p style={{ color: "red" }}>
                          Please select a checkbox option.
                        </p>
                      )}
                    </div>

                    <div
                      className={`search-filter-radio-button-data-row-3-os ${
                        filters?.type === "advanced"
                          ? "search-filter-radio-button-content-1 active"
                          : "search-filter-radio-button-content-1"
                      }`}
                    >
                      <div
                        className={`text-center flex items-center gap-[1rem] justify-center  ${
                          pathname === "/numerology"
                            ? "font-bold text-[26px] lg:text-[32px] text-HeadingText leading-[35px] lg:leading-[40px] tracking-wide mb-4 2xl:text-[38px]"
                            : "search-filter-advance-search-heading-os"
                        }`}
                      >
                        <span>
                          {pathname === "/numerology" ? (
                            <span>
                              Advance{" "}
                              <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-[#5c469c] font-bold px-2">
                                Numerology
                              </span>
                              Search
                            </span>
                          ) : (
                            "Advance Search"
                          )}
                        </span>
                        <BsInfoCircleFill
                          className="blink-zoom cursor-pointer"
                          color="red"
                          fontSize={20}
                          onClick={() => setDeliveryIsOpen(true)}
                        />
                      </div>

                      <div className="search-filter-advance-search-row-1-os">
                        <div className="search-filter-advance-search-col-1-os">
                          <SearchFilterInput
                            inputLabel="Start With"
                            inputType="text"
                            placeHolder="e.g: +91 855"
                            inputValue={filters?.start_with}
                            inputOnChange={(e) => {
                              const regex = /^[0-9,\*]*$/; // regex to allow only numbers and commas
                              if (regex.test(e.target.value)) {
                                // check if the input matches the regex
                                if (
                                  !["9", "8", "7", "6", "*"]?.includes(
                                    e.target.value?.charAt(0)
                                  ) &&
                                  e.target.value?.length
                                ) {
                                  setFirstDigitValidation(true);
                                } else {
                                  setFirstDigitValidation(false);
                                }
                                handleFilters("start_with", e.target.value);
                              }
                            }}
                            id="advanceStart_with"
                          />

                          {firstDigitValidation && (
                            <p style={{ color: "red" }}>
                              Only *,9,8,7 and 6 are allowed to start with.
                            </p>
                          )}
                        </div>
                        <div className="search-filter-advance-search-col-2-os">
                          <SearchFilterInput
                            inputLabel="Anywhere"
                            inputType="text"
                            placeHolder="e.g: 367"
                            inputValue={filters?.any_where}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              handleFilters("any_where", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-3-os">
                          <SearchFilterInput
                            inputLabel="End With"
                            inputType="text"
                            placeHolder="e.g: 000"
                            inputValue={filters?.end_with}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              handleFilters("end_with", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-4-os">
                          <SearchFilterInput
                            inputLabel="Must Contain"
                            inputType="text"
                            placeHolder="e.g: 14,18"
                            inputValue={filters?.contains}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              // if (
                              //   checkForDuplicates(
                              //     filteredValue,
                              //     filters?.not_contain
                              //   )
                              // ) {
                              handleFilters("contains", filteredValue);
                              //   setErrorMustContain("");
                              // } else {
                              //   setErrorMustContain(
                              //     "Please do not enter the same number in both fields."
                              //   );
                              // }
                            }}
                          />
                          {/* {errorMustContain && (
                        <div className="error-message">{errorMustContain}</div>
                      )} */}
                        </div>
                        <div className="search-filter-advance-search-col-5-os">
                          <SearchFilterInput
                            inputLabel="Not Contain"
                            inputType="text"
                            placeHolder="e.g: 4,69"
                            inputValue={filters?.not_contain}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              // if (
                              //   checkForDuplicates(filters?.contains, filteredValue)
                              // ) {
                              handleFilters("not_contain", filteredValue);
                              //   setErrorNotContain("");
                              // } else {
                              //   setErrorNotContain(
                              //     "Please do not enter the same number in both fields."
                              //   );
                              // }
                            }}
                          />
                          {/* {errorNotContain && (
                        <div className="error-message">{errorNotContain}</div>
                      )} */}
                        </div>

                        <div className="filter-advance-search-alert-message-os">
                          For multiple values use comma (s) e.g 14,18
                        </div>
                      </div>

                      <div className="search-filter-advance-search-row-1-os">
                        <div className="search-filter-advance-search-col-1-os">
                          <SearchFilterInput
                            inputLabel="Total"
                            inputType="text"
                            placeHolder="e.g: 88"
                            inputValue={filters?.total}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,]/g,
                                ""
                              );
                              handleFilters("total", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-1-os">
                          <SearchFilterInput
                            inputLabel="Sum"
                            inputType="text"
                            placeHolder="e.g: 9"
                            inputValue={filters?.sum}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,]/g,
                                ""
                              );
                              handleFilters("sum", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-1-os">
                          <SearchFilterInput
                            inputLabel="Max-Contain"
                            inputType="text"
                            placeHolder="e.g: 9"
                            inputValue={filters?.max_contain}
                            inputOnChange={(e) => {
                              const filteredValue = e.target.value.replace(
                                /[^0-9,=/]/g,
                                ""
                              );
                              handleFilters("max_contain", filteredValue);
                            }}
                          />
                        </div>
                        <div className="search-filter-advance-search-col-8-os">
                          <SearchFilterButton
                            searchOnSubmit={() => {}}
                            onClick={() => {
                              advancedHit();
                            }}
                            dataLoading={dataLoading}
                          />
                        </div>
                        {showAdvancedWarning && (
                          <p style={{ color: "red" }}>
                            Please fill atleast one field.
                          </p>
                        )}
                        {mustContainedWarning && (
                          <p style={{ color: "red" }}>
                            Please make sure none of the values match the "Not
                            Contain" field to continue.
                          </p>
                        )}
                      </div>
                      <NumuroTag />
                    </div>

                    <div
                      className={`search-filter-radio-button-data-row-3-os ${
                        filters?.type === "exactPlacement"
                          ? "search-filter-radio-button-content-1 active"
                          : "search-filter-radio-button-content-1"
                      }`}
                    >
                      <div className="text-darktext flex justify-center gap-2 items-center p-2 capitalize">
                        <span>
                          Fill Digits at exact placement where you want that and
                          left others box empty
                        </span>
                        <span>
                          <button
                            className="capitalize rounded-md text-[12px] tracking-[1px] p-2 text-whitetext bg-primary "
                            onClick={() => {
                              // Reset all fields in the filters state to empty strings
                              setFilters({
                                0: "",
                                1: "",
                                2: "",
                                3: "",
                                4: "",
                                5: "",
                                6: "",
                                7: "",
                                8: "",
                                9: "",
                              });
                              handleFiltersOnSwitching({
                                type: "exactPlacement",
                              });
                            }}
                            aria-label="clear all"
                          >
                            clear all
                          </button>
                        </span>
                      </div>
                      <div
                        className="search-by-exact-digits-row-os"
                        id="exact-digits-inputs"
                      >
                        <div className="search-by-exact-digits-input-os">
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[0] || ""}
                            inputtype="numeric"
                            id="otc-2"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("0", "");
                              }
                            }}
                            onChange={(e) => {
                              if (
                                !["9", "8", "7", "6"]?.includes(
                                  e.target.value
                                ) &&
                                e.target.value?.length
                              ) {
                                setFirstDigitValidation(true);
                              } else {
                                setFirstDigitValidation(false);
                              }
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                handleFilters("0", e.target.value);
                                setExactPlacementError(false);
                                document.getElementById("otc-3").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[1] || ""}
                            inputtype="numeric"
                            id="otc-3"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("1", "");
                                document.getElementById("otc-2").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("1", e.target.value);
                                document.getElementById("otc-4").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[2] || ""}
                            inputtype="numeric"
                            id="otc-4"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("2", "");
                                document.getElementById("otc-3").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("2", e.target.value);
                                document.getElementById("otc-5").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[3] || ""}
                            inputtype="numeric"
                            id="otc-5"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("3", "");
                                document.getElementById("otc-4").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("3", e.target.value);
                                document.getElementById("otc-6").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[4] || ""}
                            inputtype="numeric"
                            id="otc-6"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("4", "");
                                document.getElementById("otc-5").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("4", e.target.value);
                                document.getElementById("otc-7").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[5] || ""}
                            inputtype="numeric"
                            id="otc-7"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("5", "");
                                document.getElementById("otc-6").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("5", e.target.value);
                                document.getElementById("otc-8").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[6] || ""}
                            inputtype="numeric"
                            id="otc-8"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("6", "");
                                document.getElementById("otc-7").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("6", e.target.value);
                                document.getElementById("otc-9").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[7] || ""}
                            inputtype="numeric"
                            id="otc-9"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("7", "");
                                document.getElementById("otc-8").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("7", e.target.value);
                                document.getElementById("otc-10").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={filters?.[8] || ""}
                            inputtype="numeric"
                            id="otc-10"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("8", "");
                                document.getElementById("otc-9").focus();
                              }
                            }}
                            onChange={(e) => {
                              if (
                                e.target.value.length === e.target.maxLength
                              ) {
                                setExactPlacementError(false);
                                handleFilters("8", e.target.value);
                                document.getElementById("otc-11").focus();
                              }
                            }}
                          />
                          <input
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            maxLength="1"
                            value={filters?.[9] || ""}
                            inputtype="numeric"
                            id="otc-11"
                            onKeyDown={(e) => {
                              if (e?.code === "Backspace") {
                                handleFilters("9", "");
                                document.getElementById("otc-10").focus();
                              }
                            }}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              if (inputValue >= 0 && inputValue <= 9) {
                                handleFilters("9", inputValue);
                              } else {
                                e.preventDefault();
                              }
                            }}
                            onInput={(e) => {
                              if (e.target.value.length > e.target.maxLength) {
                                e.target.value = e.target.value.slice(
                                  0,
                                  e.target.maxLength
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="search-by-exact-digits-search-btn-os">
                          <SearchFilterButton
                            id="submitClick"
                            onClick={() => {
                              exacthit();
                            }}
                            dataLoading={dataLoading}
                          />
                        </div>
                      </div>
                      {exactPlacementError && (
                        <p
                          className="warning-message"
                          style={{ color: "red", textAlign: "center" }}
                        >
                          Please enter at least one digit.
                        </p>
                      )}

                      {firstDigitValidation && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          Only 9,8,7 and 6 are allowed to start with.
                        </p>
                      )}
                    </div>

                    <div
                      className={`search-filter-radio-button-data-row-3-os ${
                        filters?.type === "mostContained"
                          ? "search-filter-radio-button-content-1 active"
                          : "search-filter-radio-button-content-1"
                      }`}
                    >
                      <div className="search-by-most-contains-row-os">
                        <div className="search-by-most-contains-col-1-os">
                          <SearchFilterInput
                            inputLabel="Enter Single or two digits that you want in your VIP Mobile Number"
                            inputType="text"
                            placeHolder="e.g: 00"
                            inputValue={filters?.search_string}
                            maxLength="2"
                            inputOnChange={(e) => {
                              // Remove any non-numeric and non-comma characters from the input value
                              const filteredValue = e.target.value.replace(
                                /[^0-9,\*]/g,
                                ""
                              );
                              handleFilters("search_string", filteredValue);
                            }}
                            id="most-contain-id"
                          />
                        </div>
                        <div className="search-by-most-contains-col-2-os">
                          <SearchFilterButton
                            onClick={() => {
                              mostHit();
                            }}
                            dataLoading={dataLoading}
                          />
                        </div>
                        {showError && (
                          <p style={{ color: "red", paddingTop: "4px" }}>
                            Can enter 1 or 2 digits only
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className={`search-filter-data-os ${
                    searchBy === "price"
                      ? "filter-content-os active"
                      : "filter-content-os"
                  }`}
                >
                  <form
                    onSubmit={priceSunmit}
                    className="search-filter-input-data-os"
                    style={{
                      flexWrap: "nowrap",
                      gap: "1rem",
                    }}
                  >
                    <div className="search-by-price-filter-col-1-os">
                      <SearchFilterInput
                        inputLabel="Enter Min. Price"
                        inputType="text" // Change inputType to "text" to accept text input
                        placeHolder="e.g: Rs:5000"
                        inputOnChange={(e) => {
                          const inputValue = e.target.value;
                          const numericRegex = /^[0-9]*$/; // Regular expression to match only numeric values

                          if (numericRegex.test(inputValue)) {
                            setPriceWarning(false);
                            handleFilters("min_price", parseInt(inputValue));
                          } else {
                            setPriceWarning(true);
                          }
                        }}
                        inputValue={filters?.min_price}
                        ref={inputRef}
                      />
                    </div>

                    <div className="search-by-price-filter-col-2-os">
                      <SearchFilterInput
                        inputLabel="Enter Max. Price"
                        inputType="text" // Change inputType to "text" to accept text input
                        min={0}
                        placeHolder="e.g: Rs:10000"
                        inputOnChange={(e) => {
                          const inputValue = e.target.value;
                          const numericRegex = /^[0-9]*$/; // Regular expression to match only numeric values

                          if (numericRegex.test(inputValue)) {
                            setPriceWarning(false);
                            handleFilters("max_price", parseInt(inputValue));
                          } else {
                            setPriceWarning(true);
                          }
                        }}
                        inputValue={filters?.max_price}
                      />
                    </div>

                    <div className="search-by-price-filter-col-3-os">
                      <SearchFilterButton
                        onClick={priceSunmit}
                        dataLoading={dataLoading}
                      />
                    </div>
                  </form>
                  {priceWarning && (
                    <p
                      className="price-warning-message"
                      style={{ color: "red" }}
                    >
                      Please enter a valid range of minimum and maximum prices.
                    </p>
                  )}
                </div>
                {searchBy === "price" && <Budget />}
                <div
                  className={`search-filter-data-os ${
                    searchBy === "family_pack"
                      ? "filter-content-os active"
                      : "filter-content-os"
                  }`}
                >
                  <div className="text-base  max-w-2xl mx-auto md:text-lg">
                    How much Similar Numbers do you want for your family or
                    Business?
                  </div>
                  <form className="search-filter-input-data-os">
                    <div className="MobileSearch-filter-familyPack-content-col-1-os">
                      <span style={{ fontSize: "16px" }}>I Want</span>
                      <div>
                        <select
                          onChange={(e) => {
                            handleChangefamilySelect(e); // Update the selected value
                            handleFamilyPack(e); // Trigger the submit function
                          }}
                          value={familyPackValue}
                        >
                          <option value="0">Select</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          {/* <option value="8">8</option>
                          <option value="9">9</option> */}
                          {/* <option value="10">10</option> */}
                        </select>
                      </div>
                      <span style={{ fontSize: "16px" }}>
                        SIMILAR VIP MOBILE NUMBER
                      </span>
                    </div>
                    {/* <div className="search-by-familyPack-col-4-os">
                  <SearchFilterButton onClick={handleFamilyPack} />
                </div> */}
                  </form>
                </div>
                {/* Search Tags */}
                {/* <AppliedTags queryParams={queryParams} /> */}
              </div>
            </>
          )}
        </div>
      </section>
      {deliveryIsOpen && (
        <Information deliveryCloseModal={deliveryCloseModal} />
      )}
    </div>
  );
};

export default Search;
