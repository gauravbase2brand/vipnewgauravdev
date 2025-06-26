import { useState, useContext, useEffect } from "react";
import "./FilterTabs.css";
import OutsideClickHandler from "react-outside-click-handler";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useGetQueryParams } from "@/app/utils";

const FilterTabsCat = () => {
  const {
    SetSelectedStartWithOption,
    selectedPriceRanges,
    setSelectedPriceRanges,
    setMaxPrice,
    setMinPrice,
    numurologyValues,
    setNewInputValue,
    inputValues,
    setInputValues,
    selectedPriceOptions,
    setSelectedPriceOptions,
    setShowPopup,
    setSellers,
    setComing,
    setTabCategory,
    setLoaderData,
    setCategoryCurrentPage,
    setSelectedSubCategories,
    setCheckboxState,
    setCatFilter,
    selectedNumbers,
    setSelectedNumbers,
    activeFilter,
    setActiveFilter,
    sellers,
    coming,
  } = useContext(AppStateContext);
  const { queryParams } = useGetQueryParams();
  const [selectFilter, setSelectFilter] = useState("filter-1-os");

  const priceOptions = [
    { label: "Under ₹1,500", range: [0, 1500] },
    { label: "Under ₹2,500", range: [0, 2500] },
    { label: "₹1,500 - ₹4,000", range: [1500, 4000] },
    { label: "₹3,000 - ₹7,500", range: [3000, 7500] },
    { label: "₹5,000 - ₹12,500", range: [5000, 12500] },
    { label: "₹8,000 - ₹25,000", range: [8000, 25000] },
    { label: "₹18,000 - ₹50,000", range: [18000, 50000] },
    { label: "Over ₹35,000", range: [35000, 10000000] },
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    // Check if any numbers are selected
    if (selectedNumbers.length > 0) count++;
    // Check if any price range is selected
    if (selectedPriceRanges.length > 0) count++;
    // Check if any seller filter is applied
    if (sellers?.includes("BASIC")) count++;
    // Check if any "coming soon" filter is applied
    if (coming === "no") count++;
    // Check if numerology values are set
    if (Object.values(numurologyValues).some(value => value !== "")) count++;
    // Check if price sorting option is selected
    if (selectedPriceOptions === "desc" || selectedPriceOptions === "asc") count++;
  
    return count;
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Load selected numbers
    const startWith = urlParams.get("startWith");
    if (startWith) {
      const startWithArray = startWith.split(",");
      SetSelectedStartWithOption(startWithArray);
      setSelectedNumbers(startWithArray);
    }

    // Load selected price ranges
    const selectedRanges = [];
    priceOptions.forEach((option) => {
      const minPrice = parseInt(urlParams.get("min_price"));
      const maxPrice = parseInt(urlParams.get("max_price"));
      if (minPrice === option.range[0] && maxPrice === option.range[1]) {
        selectedRanges.push(option.range);
      }
    });
    setSelectedPriceRanges(selectedRanges);
    setMinPrice(parseInt(urlParams.get("min_price")));
    setMaxPrice(parseInt(urlParams.get("max_price")));

    // Load other filter values
    const seller = urlParams.get("seller");
    if (seller) {
      setSellers(seller);
    }

    const comingSoon = urlParams.get("comingsoon");
    if (comingSoon) {
      setComing(comingSoon);
    }

    const priceSort = urlParams.get("sort");
    if (priceSort) {
      setSelectedPriceOptions(priceSort);
    }
  }, [queryParams]);

  // const handleCheckboxChange = () => {
  //   setCheckboxState({
  //     basicSeller: true, // default 'premium'
  //     // comingSoon: false, // default 'no'
  //   });
  // };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const sellerType = event.target.name; // Either "PREMIUM" or "BASIC"
    // If the Basic checkbox is checked
      if (isChecked && sellerType === "basic") {
        setCheckboxState({
          basicSeller: true, // default 'premium'
        });
        setSellers("PREMIUM,BASIC")
      } else {
        setCheckboxState({
          basicSeller: false, // default 'premium'
        });
        setSellers("PREMIUM");
    }
  };

  const handleSelectFilter = (activeFilter) => {
    setSelectFilter(activeFilter);
  };

  const handleFilterShow = () => {
    setActiveFilter(true);
    setCatFilter(false);
    setTabCategory(false);
    setLoaderData(false);
  };

  const handleFilterHide = () => {
    setActiveFilter(false);
  };

  const handleUncheckedAll = () => {
    setSelectedSubCategories([]);
    setSelectedNumbers([]); // Reset selected numbers
    setSelectedPriceRanges([]); // Reset price ranges
    setSelectedPriceOptions(""); // Reset price sorting options
    setNewInputValue({}); // Reset numerology values
    setSellers(""); // Reset seller filter
    setComing(""); // Reset coming soon filter
    setMinPrice(null); // Reset minimum price
    setMaxPrice(null); // Reset maximum price
    SetSelectedStartWithOption([]);
    setShowPopup(false);
    setCatFilter(true);
    setActiveFilter(false);
  };

  const handleComingSoon = (event) => {
    setComing("no");
  };

  const handleSelect = (e) => {
    const selectedNumber = e.target.value;
    let newSelectedNumbers = [...selectedNumbers];
    if (e.target.checked) {
      newSelectedNumbers.push(selectedNumber);
    } else {
      newSelectedNumbers = newSelectedNumbers.filter(
        (num) => num !== selectedNumber
      );
    }
    setSelectedNumbers(newSelectedNumbers);
    SetSelectedStartWithOption(newSelectedNumbers);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setSelectedPriceOptions(value);
  };

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    const updatedValues = [...inputValues];
    const index = updatedValues.findIndex((item) => item.id === id);

    if (index !== -1) {
      updatedValues[index].value = value;
    } else {
      updatedValues.push({ id, value });
    }
    setInputValues(updatedValues);

    const updatedNumurologyValues = {
      ...numurologyValues,
      [id]: value,
    };
    setNewInputValue(updatedNumurologyValues);
  };

  const handlePriceOptionChange = (range) => {
    const isSelected = selectedPriceRanges.some(
      (selectedRange) =>
        selectedRange[0] === range[0] && selectedRange[1] === range[1]
    );

    const updatedRanges = isSelected
      ? selectedPriceRanges.filter(
          (selectedRange) =>
            selectedRange[0] !== range[0] || selectedRange[1] !== range[1]
        ) // Remove the range
      : [...selectedPriceRanges, range]; // Add the range

    setSelectedPriceRanges(updatedRanges);

    if (updatedRanges.length > 0) {
      const min = Math.min(...updatedRanges.map((r) => r[0]));
      const max = Math.max(...updatedRanges.map((r) => r[1]));
      setMinPrice(min);
      setMaxPrice(max);
    } else {
      setMinPrice(null);
      setMaxPrice(null);
    }
  };
  const handleClear = () => {
    setSelectedPriceOptions("");
    setCatFilter(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or button trigger
      setCatFilter(true);
      setActiveFilter(false);
      setCategoryCurrentPage(1);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setActiveFilter(false);
      }}
    >
      <div className="multiple-filters-row-os">
        <div className="multiple-filters-col-os" onClick={handleFilterShow}>
        {/* <div className="multiple-filters-count-os">{`${getActiveFiltersCount()}`}</div> */}
          Apply Filters
          <button
            className="multiple-filters-selector-arrow-os"
            aria-label="arrow"
          >
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 0H2.71713H0L8 8L16 0Z" fill=" var(--primary) " />
            </svg>
          </button>
        </div>
        {activeFilter && (
          <div
            className={`multiple-filters-tabs-main-row-os ${activeFilter}`}
            onKeyDown={handleKeyDown}
          >
            <div className="multiple-filters-tabs-heading-row-os">
              <div className="multiple-filters-tabs-heading-col-1-os">
                Filter
              </div>
              <div
                onClick={handleUncheckedAll}
                className="multiple-filters-tabs-heading-col-2-os"
              >
                Clear all
              </div>
            </div>
            <div className="multiple-filters-tabs-data-row-os">
              <div className="multiple-filters-tabs-data-col-1-os">
                <ul>
                  <li
                    onClick={() => handleSelectFilter("filter-1-os")}
                    className={
                      selectFilter === "filter-1-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    Start with
                  </li>
                  <li
                    onClick={() => handleSelectFilter("filter-2-os")}
                    className={
                      selectFilter === "filter-2-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    Price Range
                  </li>
                  <li
                    onClick={() => handleSelectFilter("filter-3-os")}
                    className={
                      selectFilter === "filter-3-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    Seller
                  </li>
                  <li
                    onClick={() => handleSelectFilter("filter-4-os")}
                    className={
                      selectFilter === "filter-4-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    Numerology
                  </li>
                  <li
                    onClick={() => handleSelectFilter("filter-5-os")}
                    className={
                      selectFilter === "filter-5-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    Sorting
                  </li>
                  <li
                    onClick={() => handleSelectFilter("filter-7-os")}
                    className={
                      selectFilter === "filter-7-os"
                        ? "filter-tab-os active"
                        : "filter-tab-os"
                    }
                  >
                    coming Soon
                  </li>
                </ul>
              </div>
              <div className="multiple-filters-tabs-data-col-2-os">
                <div
                  className={
                    selectFilter === "filter-1-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-checkbox-col-os">
                    <label className="multiple-filters-checkbox-os">
                      6
                      <input
                        type="checkbox"
                        value="6"
                        onChange={handleSelect}
                        checked={selectedNumbers.includes("6")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-os">
                    <label className="multiple-filters-checkbox-os">
                      7
                      <input
                        type="checkbox"
                        value="7"
                        onChange={handleSelect}
                        checked={selectedNumbers.includes("7")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-os">
                    <label className="multiple-filters-checkbox-os">
                      8
                      <input
                        type="checkbox"
                        value="8"
                        onChange={handleSelect}
                        checked={selectedNumbers.includes("8")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-os">
                    <label className="multiple-filters-checkbox-os">
                      9
                      <input
                        type="checkbox"
                        value="9"
                        onChange={handleSelect}
                        checked={selectedNumbers.includes("9")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div
                  className={
                    selectFilter === "filter-2-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-tabs-content-heading-os">
                    Price
                  </div>
                  {priceOptions.map((option, index) => (
                    <div
                      className="multiple-filters-checkbox-col-1-os"
                      key={index}
                    >
                      <label className="multiple-filters-checkbox-os">
                        <input
                          type="checkbox"
                          value={option.label}
                          onChange={() => handlePriceOptionChange(option.range)}
                          checked={selectedPriceRanges.some(
                            (range) =>
                              range[0] === option.range[0] &&
                              range[1] === option.range[1]
                          )}
                        />
                        <span className="checkmark"></span>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div
                  className={
                    selectFilter === "filter-3-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className={`multiple-filters-checkbox-os `}>
                      Premium
                      <input
                        type="checkbox"
                        name="premium"
                        checked={true}
                        onChange={handleCheckboxChange}
                        disabled
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label
                      className={`multiple-filters-checkbox-os
                       `}
                    >
                      Basic
                      <input
                        type="checkbox"
                        name="basic"
                        onChange={handleCheckboxChange}
                        checked={sellers?.includes("BASIC")}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div
                  className={
                    selectFilter === "filter-4-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-numerology-input-data-os">
                    <span>Total</span>
                    <input
                      type="text"
                      placeholder="e.g 23"
                      value={numurologyValues.Total || ""}
                      onChange={(e) => handleInputChange(e, "Total")}
                    />
                  </div>
                  <div className="multiple-filters-numerology-input-data-os">
                    <span>Sum</span>
                    <input
                      type="text"
                      placeholder="e.g 56"
                      value={numurologyValues.Sum || ""}
                      onChange={(e) => handleInputChange(e, "Sum")}
                    />
                  </div>

                  <div className="multiple-filters-numerology-input-data-os">
                    <span>End With</span>
                    <input
                      type="text"
                      placeholder="e.g 000"
                      value={numurologyValues.EndWith || ""}
                      onChange={(e) => handleInputChange(e, "EndWith")}
                    />
                  </div>
                  <div className="multiple-filters-numerology-input-data-os">
                    <span>Contains</span>
                    <input
                      type="text"
                      placeholder="e.g 2"
                      value={numurologyValues.Contains || ""}
                      onChange={(e) => handleInputChange(e, "Contains")}
                    />
                  </div>
                  <div className="multiple-filters-numerology-input-data-os">
                    <span>not-contain</span>
                    <input
                      type="text"
                      placeholder="e.g 6"
                      value={numurologyValues.notContain || ""}
                      onChange={(e) => handleInputChange(e, "notContain")}
                    />
                  </div>
                </div>

                <div
                  className={
                    selectFilter === "filter-5-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Price high to low
                      <input
                        type="checkbox"
                        name="price-sort"
                        value="desc"
                        onChange={handlePriceChange}
                        checked={selectedPriceOptions === "desc"}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Price low to high
                      <input
                        type="checkbox"
                        name="price-sort"
                        value="asc"
                        onChange={handlePriceChange}
                        checked={selectedPriceOptions === "asc"}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleClear()}
                  >
                    Clear
                  </button>
                </div>
                <div
                  className={
                    selectFilter === "filter-7-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      No
                      <input
                        type="radio"
                        // name="no"
                        // value="no"
                        checked={coming === "no"}
                        onChange={handleComingSoon}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="multiple-filters-footer-buttons-row-os">
              <button
                onClick={handleFilterHide}
                className="multiple-filters-footer-closeBtn-os"
                aria-label="Close"
              >
                Close
              </button>
              <button
                className="multiple-filters-footer-applyBtn-os"
                onClick={() => {
                  setCatFilter(true);
                  setActiveFilter(false);
                  setCategoryCurrentPage(1);
                }}
                aria-label="Apply"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default FilterTabsCat;
