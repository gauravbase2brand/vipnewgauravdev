import { useState, useEffect, useContext } from "react";
import "./FilterTabs.css";
import OutsideClickHandler from "react-outside-click-handler";
import { useGetQueryParams } from "../../utils";
import { usePathname, useRouter } from "next/navigation";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const FilterTabs = ({ selectedFilter, id }) => {
  const { queryParams } = useGetQueryParams();
  const { selectedNumbers, setSelectedNumbers, dataLoading } =
    useContext(AppStateContext);
  const pathname = usePathname();
  const Router = useRouter();
  const [appliedFiltersCounts, setAppliedFiltersCounts] = useState(0);
  const [priceRange, setPriceRange] = useState({
    under1500: false,
    under2500: false,
    between1500and4000: false,
    between3000and7500: false,
    between5000and12500: false,
    between8000and25000: false,
    between18000and50000: false,
    over35000: false,
  });

  const [checkedItems, setCheckedItems] = useState({
    premium: queryParams?.seller?.includes("PREMIUM") || false,
    basic: queryParams?.seller?.includes("BASIC") || false,
  });
  const [selectFilter, setSelectFilter] = useState("filter-1-os");
  const [activeFilter, setActiveFilter] = useState(false);
  const [comingOrder, setComingOrder] = useState("");
  const [total, setTotal] = useState("");
  const [endWith, setEndWith] = useState("");
  const [contains, setContains] = useState("");
  const [notContain, setNotContain] = useState("");
  const [sum, setSum] = useState("");
  const [sortingOrder, setSortingOrder] = useState("");

  const updateAppliedFiltersCount = () => {
    let count = 0;
    if (selectedNumbers?.length) count++;
    if (checkedItems.basic) count++;
    if (total) count++;
    if (sortingOrder === "low-to-high" || sortingOrder === "high-to-low") {
      count++;
    }
    if (comingOrder === "yes" || comingOrder === "no") {
      count++;
    }
    if (Object.values(priceRange).some((value) => value === true)) count++;
    setAppliedFiltersCounts(count);
  };

  useEffect(() => {
    selectedFilter && selectedFilter?.length;
  }, [selectedFilter]);

  useEffect(() => {
    if (
      queryParams?.type === "advanced" ||
      queryParams?.searchBy === "price" ||
      queryParams?.type === "global" ||
      queryParams?.type === "basic" ||
      queryParams?.type === "exactPlacement" ||
      queryParams?.type === "mostContained"
    ) {
      setCheckedItems({
        ...checkedItems,
        premium: true,
      });
    }
  }, [queryParams?.type, queryParams?.searchBy]);

  // Load initial state from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Set price range
    const minPrice = parseInt(urlParams.get("min_price"), 10);
    const maxPrice = parseInt(urlParams.get("max_price"), 10);
    // Update the priceRange state based on the min_price and max_price query params
    setPriceRange((prevState) => ({
      under1500: maxPrice === 1500,
      under2500: maxPrice === 2500,
      between1500and4000: maxPrice === 4000,
      between3000and7500: maxPrice === 7500,
      between5000and12500: maxPrice === 12500,
      between8000and25000: maxPrice === 25000,
      between18000and50000: maxPrice === 50000,
      over35000: minPrice === 35000,
    }));

    // Set selected numbers
    // if (urlParams.get("start_with")) {
    //   setSelectedNumbers(urlParams.get("start_with").split(","));
    // }

    const sw = (urlParams.get("start_with") || "").trim();
    if (sw) {
      setSelectedNumbers(sw.split(",").filter(Boolean));
    } else {
      setSelectedNumbers([]); // << IMPORTANT
    }
    // Set checked items for premium and basic sellers
    setCheckedItems({
      premium: urlParams.get("seller")?.includes("PREMIUM"),
      basic: urlParams.get("seller")?.includes("BASIC"),
    });

    // Set total and sum
    setTotal(urlParams.get("total") || "");
    setSum(urlParams.get("sum") || "");
    // Set sorting order
    const sorting = urlParams.get("sort") || "";
    if (sorting === "desc") {
      setSortingOrder("high-to-low");
    } else if (sorting === "asc") {
      setSortingOrder("low-to-high");
    }
    setComingOrder(urlParams.get("comingsoon") || "");
    updateAppliedFiltersCount();
  }, [queryParams]);

  // const handleCheckboxChange = (event) => {
  //   setCheckedItems((prevState) => ({
  //     ...prevState,
  //     [event.target.name]: event.target.checked,
  //   }));
  //   updateAppliedFiltersCount();
  // };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckedItems((prevState) => {
      const updated = {
        ...prevState,
        [name]: checked,
        premium: true, // always ensure premium is selected
      };
      return updated;
    });

    updateAppliedFiltersCount();
  };

  const handleSelectFilter = (activeFilter) => {
    setSelectFilter(activeFilter);
    updateAppliedFiltersCount();
  };

  const handleFilterShow = () => {
    setActiveFilter(true);
  };

  const handleFilterHide = () => {
    setActiveFilter(false);
    setTotal("");
    setSum("");
    setNotContain("");
    setContains("");
    setEndWith("");
  };

  const handleUncheckedAll = () => {
    setSelectedNumbers([]);
    setPriceRange({
      under1500: false,
      under2500: false,
      between1500and4000: false,
      between3000and7500: false,
      between5000and12500: false,
      between8000and25000: false,
      between18000and50000: false,
      over35000: false,
    });
    const route = {
      ...queryParams,
      callCount: 1,
    };

    if (
      (route?.start_with && queryParams?.type === "basic") ||
      queryParams?.type === "advanced"
    ) {
      route.start_with = route.start_with.split(",")[0];
    } else {
      delete route?.start_with;
    }
    delete route?.min_price;
    delete route?.max_price;
    delete route?.sum;
    delete route?.total;
    delete route?.priceRange;
    delete route?.seller;
    delete route?.sort;
    delete route?.comingsoon;
    delete route?.end_with;
    delete route?.contains;
    delete route?.not_contain;
    setTotal("");
    setSum("");
    setNotContain("");
    setContains("");
    setEndWith("");
    setAppliedFiltersCounts(0);
    setSortingOrder("");
    setComingOrder("");
    const queryString = new URLSearchParams(route).toString();
    Router.push(`${pathname}?${queryString}`);
    setActiveFilter(false);
  };

  const handleSortingOrderChange = (event) => {
    setSortingOrder(event.target.value);
    updateAppliedFiltersCount();
  };
  const handleComingSoon = (event) => {
    setComingOrder(event.target.value);
    updateAppliedFiltersCount();
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
  };
  const clearForm = () => {
    const route = {
      ...queryParams,
      callCount: 1,
    };
    delete route?.sort;
    setSortingOrder("");
    const queryString = new URLSearchParams(route).toString();
    Router.push(`${pathname}?${queryString}`);
  };
  const applyFilters = () => {
    const values = total.split(",").map((val) => val.trim());
    // Filter single digits (1-9) and double digits (10 and above)
    const singleDigits = values.filter((val) => /^[1-9]$/.test(val));
    const doubleOrMoreDigits = values.filter((val) => /^\d{2,}$/.test(val));

    // Update the total and sum states based on filtering
    setTotal(doubleOrMoreDigits.join(","));
    setSum(singleDigits.join(","));
    const filterObj = {
      callCount: parseInt(queryParams?.callCount) || 0 + 1,
      id: id,
    };

    if (!queryParams.start_with) {
      if (selectedNumbers?.length) {
        if (queryParams?.type === "basic") {
          filterObj["start_with"] = selectedNumbers?.join();
        } else {
          filterObj["start_with"] = selectedNumbers?.join();
        }
      }
    } else if (queryParams?.type === "basic") {
      const existingStartWith = queryParams.start_with.split(",");
      const newSelectedNumbers = selectedNumbers.filter(
        (num) => !existingStartWith.includes(num)
      );
      filterObj["start_with"] = [
        ...existingStartWith.filter((n) => selectedNumbers.includes(n)),
        ...newSelectedNumbers,
      ].join(",");
    } else {
      filterObj["start_with"] = selectedNumbers?.join();
    }
    if (endWith) {
      filterObj["end_with"] = endWith;
    }
    // Add contains filter
    if (contains) {
      filterObj["contains"] = contains;
    }

    // Add not_contain filter
    if (notContain) {
      filterObj["not_contain"] = notContain;
    }
    if (comingOrder === "yes") {
      filterObj["comingsoon"] = comingOrder;
    }
    if (comingOrder === "no") {
      filterObj["comingsoon"] = comingOrder;
    }
    if (queryParams?.type === "advanced") {
      // Similar logic for type "advanced"
      const existingStartWith = queryParams.start_with?.split(",") || [];
      const newSelectedNumbers = selectedNumbers.filter(
        (num) => !existingStartWith.includes(num)
      );
      filterObj["start_with"] = [
        ...existingStartWith.filter((n) => selectedNumbers.includes(n)),
        ...newSelectedNumbers,
      ].join(",");
    }
    if (checkedItems) {
      if (checkedItems?.basic && checkedItems?.premium)
        filterObj["seller"] = "BASIC,PREMIUM";
      else if (checkedItems?.premium) filterObj["seller"] = "PREMIUM";
      else if (checkedItems?.basic) filterObj["seller"] = "BASIC";
    }

    if (total) {
      filterObj["total"] = total
        .split(",")
        .map((value) => parseFloat(value.trim()))
        .join(",");
    }

    if (sum) {
      filterObj["sum"] = sum
        .split(",")
        .map((value) => parseFloat(value.trim()))
        .join(",");
    }
    if (sortingOrder)
      filterObj["sort"] = sortingOrder === "low-to-high" ? "asc" : "desc";

    if (priceRange.under1500) {
      filterObj["min_price"] = "0";
      filterObj["max_price"] = "1500";
    }
    if (priceRange.under2500) {
      filterObj["min_price"] = "0";
      filterObj["max_price"] = "2500";
    }
    if (priceRange.between1500and4000) {
      filterObj["min_price"] = "1500";
      filterObj["max_price"] = "4000";
    }
    if (priceRange.between3000and7500) {
      filterObj["min_price"] = "3000";
      filterObj["max_price"] = "7500";
    }
    if (priceRange.between5000and12500) {
      filterObj["min_price"] = "5000";
      filterObj["max_price"] = "12500";
    }
    if (priceRange.between8000and25000) {
      filterObj["min_price"] = "8000";
      filterObj["max_price"] = "25000";
    }
    if (priceRange.between18000and50000) {
      filterObj["min_price"] = "18000";
      filterObj["max_price"] = "50000";
    }
    if (priceRange.over35000) {
      filterObj["min_price"] = "35000";
    }

    const selectedPriceRanges = [];

    if (priceRange.under1500) selectedPriceRanges.push({ min: 0, max: 1500 });
    if (priceRange.under2500) selectedPriceRanges.push({ min: 0, max: 2500 });
    if (priceRange.between1500and4000)
      selectedPriceRanges.push({ min: 1500, max: 4000 });
    if (priceRange.between3000and7500)
      selectedPriceRanges.push({ min: 3000, max: 7500 });
    if (priceRange.between5000and12500)
      selectedPriceRanges.push({ min: 5000, max: 12500 });
    if (priceRange.between8000and25000)
      selectedPriceRanges.push({ min: 8000, max: 25000 });
    if (priceRange.between18000and50000)
      selectedPriceRanges.push({ min: 18000, max: 50000 });
    if (priceRange.over35000)
      selectedPriceRanges.push({ min: 35000, max: 100000000 });

    let overallMinPrice = Number.MAX_SAFE_INTEGER;
    let overallMaxPrice = Number.MIN_SAFE_INTEGER;

    for (const priceRange of selectedPriceRanges) {
      overallMinPrice = Math.min(overallMinPrice, priceRange.min);
      overallMaxPrice = Math.max(overallMaxPrice, priceRange.max);
    }

    if (overallMinPrice !== Number.MAX_SAFE_INTEGER) {
      filterObj["min_price"] = overallMinPrice.toString();
    }
    if (overallMaxPrice !== Number.MIN_SAFE_INTEGER) {
      filterObj["max_price"] = overallMaxPrice.toString();
    }

    const route = {
      ...queryParams,
      ...filterObj,
    };
    const queryString = new URLSearchParams(route).toString();
    Router.push(`${pathname}?${queryString}`);

    updateAppliedFiltersCount();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or button trigger
      applyFilters();
      setActiveFilter(false);
    }
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setActiveFilter(false);
      }}
    >
      <div
        className={`multiple-filters-row-os ${
          dataLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="multiple-filters-col-os" onClick={handleFilterShow}>
          {/* <div className="multiple-filters-count-os">
            {appliedFiltersCounts}
          </div> */}
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
                  {queryParams?.type !== "family_pack" && (
                    <>
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
                    </>
                  )}
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
                  {queryParams?.type !== "family_pack" && (
                    <>
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
                    </>
                  )}
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
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Under ₹1,500
                      <input
                        type="checkbox"
                        checked={priceRange.under1500}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            under1500: !priceRange.under1500,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Under ₹2,500
                      <input
                        type="checkbox"
                        checked={priceRange.under2500}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            under2500: !priceRange.under2500,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      ₹1,500 - ₹4,000
                      <input
                        type="checkbox"
                        checked={priceRange.between1500and4000}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            between1500and4000: !priceRange.between1500and4000,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      ₹3,000 - ₹7,500
                      <input
                        type="checkbox"
                        checked={priceRange.between3000and7500}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            between3000and7500: !priceRange.between3000and7500,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      ₹5,000 - ₹12,500
                      <input
                        type="checkbox"
                        checked={priceRange.between5000and12500}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            between5000and12500:
                              !priceRange.between5000and12500,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      ₹8,000 - ₹25,000
                      <input
                        type="checkbox"
                        checked={priceRange.between8000and25000}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            between8000and25000:
                              !priceRange.between8000and25000,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      ₹18,000 - ₹50,000
                      <input
                        type="checkbox"
                        checked={priceRange.between18000and50000}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            between18000and50000:
                              !priceRange.between18000and50000,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Over ₹35,000
                      <input
                        type="checkbox"
                        checked={priceRange.over35000}
                        onChange={() =>
                          setPriceRange({
                            ...priceRange,
                            over35000: !priceRange.over35000,
                          })
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>

                <div
                  className={
                    selectFilter === "filter-3-os"
                      ? "multiple-filters-tabs-content-data-os active"
                      : "multiple-filters-tabs-content-data-os"
                  }
                >
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label
                      className={`multiple-filters-checkbox-os ${
                        queryParams?.type === "advanced" ||
                        queryParams?.searchBy === "price" ||
                        queryParams?.type === "global" ||
                        queryParams?.type === "basic" ||
                        queryParams?.type === "exactPlacement" ||
                        queryParams?.type === "mostContained"
                          ? ""
                          : ""
                      }`}
                    >
                      Premium
                      <input
                        type="checkbox"
                        name="premium"
                        defaultChecked={true}
                        onChange={handleCheckboxChange}
                        disabled
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="multiple-filters-checkbox-col-1-os">
                    <label
                      className={`multiple-filters-checkbox-os ${
                        queryParams?.type === "advanced" ||
                        queryParams?.searchBy !== "price" ||
                        queryParams?.type === "global" ||
                        queryParams?.type === "basic" ||
                        queryParams?.type === "exactPlacement" ||
                        queryParams?.type === "mostContained"
                          ? true
                          : checkedItems.basic
                      }`}
                    >
                      Basic
                      <input
                        type="checkbox"
                        name="basic"
                        defaultChecked={
                          checkedItems["basic"] ||
                          checkedItems["advanced"] ||
                          checkedItems["global"] ||
                          checkedItems["exactPlacement"] ||
                          checkedItems["price"] ||
                          checkedItems["mostContained"] ||
                          checkedItems.basic
                        }
                        onChange={handleCheckboxChange}
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
                  {queryParams?.type !== "family_pack" && (
                    <>
                      <div className="multiple-filters-numerology-input-data-os">
                        <span>Total</span>
                        <input
                          type="text"
                          placeholder="e.g 23"
                          value={total}
                          onChange={(e) => setTotal(e.target.value)}
                        />
                      </div>
                      <div className="multiple-filters-numerology-input-data-os">
                        <span>Sum</span>
                        <input
                          type="text"
                          placeholder="e.g 56"
                          value={sum}
                          onChange={(e) => setSum(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {queryParams?.type === "family_pack" && (
                    <>
                      <div className="multiple-filters-numerology-input-data-os">
                        <span>End With</span>
                        <input
                          type="text"
                          placeholder="e.g 000"
                          value={endWith}
                          onChange={(e) => setEndWith(e.target.value)}
                        />
                      </div>
                      <div className="multiple-filters-numerology-input-data-os">
                        <span>Contains</span>
                        <input
                          type="text"
                          placeholder="e.g 2"
                          value={contains}
                          onChange={(e) => setContains(e.target.value)}
                        />
                      </div>
                      <div className="multiple-filters-numerology-input-data-os">
                        <span>not-contain</span>
                        <input
                          type="text"
                          placeholder="e.g 6"
                          value={notContain}
                          onChange={(e) => setNotContain(e.target.value)}
                        />
                      </div>
                    </>
                  )}
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
                        type="radio"
                        name="price-sort"
                        value="high-to-low"
                        checked={sortingOrder === "high-to-low"}
                        onClick={handleSortingOrderChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      Price low to high
                      <input
                        type="radio"
                        name="price-sort"
                        value="low-to-high"
                        checked={sortingOrder === "low-to-high"}
                        onClick={handleSortingOrderChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <button
                    onClick={() => clearForm()}
                    className="sorting-remove"
                    aria-label="Clear"
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
                      Yes
                      <input
                        type="radio"
                        name="yes"
                        value="yes"
                        checked={comingOrder === "yes"}
                        onClick={handleComingSoon}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="multiple-filters-checkbox-col-1-os">
                    <label className="multiple-filters-checkbox-os">
                      No
                      <input
                        type="radio"
                        name="no"
                        value="no"
                        checked={comingOrder === "no"}
                        onClick={handleComingSoon}
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
                  applyFilters();
                  setActiveFilter(false);
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

export default FilterTabs;
