import React from "react";
import SearchFilterInput from "../SearchFilterInput/SearchFilterInput";
import { BsInfoCircleFill } from "react-icons/bs";
import Information from "../Search/Information";

const MobileSearchFilters = ({
  handleSubmit,
  filters,
  handleFiltersResults,
  priceWarning,
  mobileSearchBasic,
  selectedOption,
  setFirstDigitValidation,
  handlePreFilters,
  firstDigitValidation,
  handleOptionChange,
  showCheckboxWarning,
  hmobileAdvanceSearch,
  errorMustContain,
  errorNotContain,
  showAdvancedWarning,
  mustContainedWarning,
  mobilePlacementDigit,
  setFilters,
  handleExactChange,
  mobileMostContainSearch,
  showError,
  mobilePriceSunmit,
  setPriceWarning,
  familyPackSubmit,
  handleChangefamilySelect,
  familyPackValue,
  dataLoading,
  pathname,
  deliveryIsOpen,
  setDeliveryIsOpen,
  deliveryCloseModal,
}) => {
  return (
    <div className="MobileSearch-filter-search-by-digits-filter-content-1-os">
      <form
        onSubmit={handleSubmit}
        className={
          filters?.type === "global"
            ? "MobileSearch-filter-search-by-digits-filter-1-os active"
            : "MobileSearch-filter-search-by-digits-filter-1-os"
        }
      >
        {/* <span className="gk-filter-name flex justify-center"><span className="bg-[#E7DEFA] p-1 rounded">Global Search</span></span> */}
        <div className="MobileSearch-global-search-input-os">
          <SearchFilterInput
            id="global-input"
            inputLabel="Enter Digits Here"
            inputType="text"
            placeHolder="e.g: 0000"
            inputValue={filters?.number}
            inputOnChange={(e) => {
              const regex = /^[0-9,\*]*$/;
              if (regex.test(e.target.value)) {
                handleFiltersResults("number", e.target.value);
              }
            }}
          />
          {priceWarning && (
            <p className="warning-message" style={{ color: "red" }}>
              Please enter maximum 10 digit number.
            </p>
          )}
        </div>
      </form>
      {filters?.type === "basic" ? (
        <form
          onSubmit={mobileSearchBasic}
          className={
            filters?.type === "basic"
              ? "MobileSearch-filter-search-by-digits-filter-1-os active"
              : "MobileSearch-filter-search-by-digits-filter-1-os"
          }
        >
          <div className="MobileSearch-basic-search-input-os">
            {selectedOption === "start_with" && (
              <>
                <SearchFilterInput
                  inputLabel="Start With"
                  inputType="text"
                  placeHolder="e.g: 0000"
                  inputValue={filters?.start_with}
                  inputOnChange={(e) => {
                    const regex = /^[0-9,\*]*$/; // regex to allow only numbers and commas
                    if (regex.test(e.target.value)) {
                      // check if the input matches the regex
                      if (
                        !["9", "8", "7", "6","*"]?.includes(
                          e.target.value?.charAt(0)
                        ) &&
                        e.target.value?.length
                      ) {
                        setFirstDigitValidation(true);
                      } else {
                        setFirstDigitValidation(false);
                      }
                      handlePreFilters("start_with", e.target.value);
                    }
                  }}
                  id="premium_id"
                />
              </>
            )}
            {selectedOption === "any_where" && (
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
                  handlePreFilters("any_where", filteredValue);
                }}
                id="premium_id"
              />
            )}
            {selectedOption === "end_with" && (
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
                  handlePreFilters("end_with", filteredValue);
                }}
                id="premium_id"
              />
            )}
          </div>
          {firstDigitValidation && (
            <p style={{ color: "red" }}>
              Only *,9, 8, 7, and 6 are allowed to start with.
            </p>
          )}
          <div className="flex justify-center gap-4 my-3 items-center">
            <label className="flex gap-2">
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
            <label className="flex gap-2">
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
            <label className="flex gap-2">
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
            <p style={{ color: "red" }}>Please select a checkbox option.</p>
          )}
        </form>
      ) : (
        <></>
      )}

      {filters?.type === "advanced" ? (
        <form
          onSubmit={hmobileAdvanceSearch}
          className={
            filters?.type === "advanced"
              ? "MobileSearch-filter-search-by-digits-filter-1-os active"
              : "MobileSearch-filter-search-by-digits-filter-1-os"
          }
        >
          <div
            className={`text-center flex items-center justify-center gap-2 ${
              pathname === "/numerology"
                ? "font-bold text-[26px] lg:text-[32px] text-HeadingText leading-[35px] lg:leading-[40px] tracking-wide mb-4"
                : "search-filter-advance-search-heading-os"
            }`}
          >
            <span className="text-xl">
              {pathname === "/numerology" ? (
                <span>
                  Advance <span className="text-yellow-500">Numerology</span>{" "}
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
            <div className="mb-2">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="w-full ">
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
                          !["9", "8", "7", "6","*"]?.includes(
                            e.target.value?.charAt(0)
                          ) &&
                          e.target.value?.length
                        ) {
                          setFirstDigitValidation(true);
                        } else {
                          setFirstDigitValidation(false);
                        }
                        handleFiltersResults("start_with", e.target.value);
                      }
                    }}
                    id="advanced-id"
                  />
                </div>
                <div className="w-full">
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
                      handleFiltersResults("any_where", filteredValue);
                    }}
                  />
                </div>
                <div className="w-full">
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
                      handleFiltersResults("end_with", filteredValue);
                    }}
                  />
                </div>
              </div>
              {firstDigitValidation && (
                <p className="text-red-600 text-sm">
                  Only *,9,8,7 and 6 are allowed to start with.
                </p>
              )}
            </div>
            <div className="mb-1">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="w-full">
                  <SearchFilterInput
                    inputLabel="Must Contain"
                    inputType="text"
                    placeHolder="e.g:14,18"
                    inputValue={filters?.contains}
                    inputOnChange={(e) => {
                      const filteredValue = e.target.value.replace(
                        /[^0-9,\*]/g,
                        ""
                      );
                      // if (
                      //   checkForDuplicates(filteredValue, filters?.not_contain)
                      // ) {
                      handleFiltersResults("contains", filteredValue);
                      //   setErrorMustContain("");
                      // } else {
                      //   setErrorMustContain(
                      //     "Please do not enter the same number in both fields."
                      //   );
                      // }
                    }}
                  />
                  {errorMustContain && (
                    <div className="error-message">{errorMustContain}</div>
                  )}
                </div>
                <div className="w-full">
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
                      // if (checkForDuplicates(filters?.contains, filteredValue)) {
                      handleFiltersResults("not_contain", filteredValue);
                      //   setErrorNotContain("");
                      // } else {
                      //   setErrorNotContain(
                      //     "Please do not enter the same number in both fields."
                      //   );
                      // }
                    }}
                  />
                </div>
                {errorNotContain && (
                  <div className="error-message">{errorNotContain}</div>
                )}
              </div>
              <div className="text-red-600 text-sm">
                For multiple values use comma (s) e.g 14,18
              </div>
            </div>
          </div>
          <span className="search-filter-advance-search-heading-os">
            Total/Sum
          </span>

          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="w-full">
              <SearchFilterInput
                inputLabel="Total"
                inputType="text"
                placeHolder="e.g: 88"
                inputValue={filters?.total}
                inputOnChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                  handleFiltersResults("total", filteredValue);
                }}
              />
            </div>
            <div className="w-full">
              <SearchFilterInput
                inputLabel="Sum"
                inputType="text"
                placeHolder="e.g: 9"
                inputValue={filters?.sum}
                inputOnChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^0-9,]/g, "");
                  handleFiltersResults("sum", filteredValue);
                }}
              />
            </div>
            <div className="w-full">
              <SearchFilterInput
                inputLabel="Max-Contain"
                inputType="text"
                placeHolder="e.g: 9"
                inputValue={filters?.max_contain}
                inputOnChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^0-9,=/]/g, "");
                  handleFiltersResults("max_contain", filteredValue);
                }}
              />
            </div>
            <div className="search-filter-advance-search-col-8-os">
              {showAdvancedWarning && (
                <p style={{ color: "red" }}>Please fill atleast one field.</p>
              )}
              {mustContainedWarning && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Please make sure none of the values match the "Not Contain"
                  field to continue.
                </p>
              )}
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}

      {filters?.type === "exactPlacement" ? (
        <form
          onSubmit={mobilePlacementDigit}
          className={
            filters?.type === "exactPlacement"
              ? "MobileSearch-filter-search-by-digits-filter-1-os active"
              : "MobileSearch-filter-search-by-digits-filter-1-os"
          }
        >
          <div className="text-prima">
            <span className="text-sm capitalize">
              Fil Digital at exact placement where you want that and left others
              box empty Search
            </span>
            <span>
              <button
                className="exact-digit-btn"
                onClick={() => {
                  // Reset all fields in the filters state to empty strings
                  setFilters({
                    type: "", // Or any default value you prefer
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
                }}
                aria-label="Clear All"
              >
                Clear All
              </button>
            </span>
          </div>
          <form
            className="search-by-exact-digits-row-os"
            id="exact-digits-inputs-m"
          >
            <div className="search-by-exact-digits-input-os">
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[0]}
                inputtype="numeric"
                id="otc-2"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    handleFiltersResults("0", "");
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "0");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[1]}
                inputtype="numeric"
                id="otc-3"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1]?.focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "1");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[2]}
                inputtype="numeric"
                id="otc-4"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "2");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[3]}
                inputtype="numeric"
                id="otc-5"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "3");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[4]}
                inputtype="numeric"
                id="otc-6"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "4");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[5]}
                inputtype="numeric"
                id="otc-7"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "5");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[6]}
                inputtype="numeric"
                id="otc-8"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "6");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[7]}
                inputtype="numeric"
                id="otc-9"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "7");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[8]}
                inputtype="numeric"
                id="otc-10"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "8");
                }}
              />
              <input
                type="number"
                pattern="[0-9]*"
                min="0"
                max="9"
                maxLength="1"
                value={filters?.[9]}
                inputtype="numeric"
                id="otc-11"
                onKeyDown={(e) => {
                  if (e?.code === "Backspace") {
                    const form = e.target.form;
                    const index = [...form].indexOf(e.target);
                    form[index - 1].focus();
                    handleFiltersResults(index, "");

                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleExactChange(e, "9");
                }}
              />
            </div>
          </form>
          {priceWarning && (
            <p className="warning-message" style={{ color: "red" }}>
              Please at least one digit.
            </p>
          )}
        </form>
      ) : (
        <></>
      )}

      {filters?.type === "mostContained" ? (
        <form
          onSubmit={mobileMostContainSearch}
          className={
            filters?.type === "mostContained"
              ? "MobileSearch-filter-search-by-digits-filter-1-os active"
              : "MobileSearch-filter-search-by-digits-filter-1-os"
          }
        >
          <div className="search-by-most-contains-col-1-os">
            <SearchFilterInput
              inputLabel="Enter Single or two digits that you want in your VIP Mobile Number"
              inputType="text"
              placeHolder="e.g: 00"
              inputValue={filters?.search_string}
              inputOnChange={(e) => {
                const filteredValue = e.target.value.replace(/[^0-9,\*]/g, "");
                handleFiltersResults("search_string", filteredValue);
              }}
              maxLength="2"
              id="mostContain-input"
            />

            {showError && (
              <p style={{ color: "red" }}>
                Please enter a one or two-digit number.
              </p>
            )}
          </div>
        </form>
      ) : (
        <></>
      )}
      {filters?.type === "price" ? (
        <form
          onSubmit={mobilePriceSunmit}
          className="search-filter-input-data-os"
        >
          {/* Search by Price */}
          <div className="search-filter-input-data-row-os">
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
                    handleFiltersResults("min_price", parseInt(inputValue));
                  } else {
                    setPriceWarning(true);
                  }
                }}
                inputValue={filters?.min_price}
                id="min-price_id"
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
                    handleFiltersResults(
                      "max_price",
                      parseInt(inputValue || 0)
                    );
                  } else {
                    setPriceWarning(true);
                  }
                }}
                inputValue={filters?.max_price}
              />
            </div>
          </div>
          {priceWarning && (
            <p
              className="price-warning-message"
              style={{ color: "red", fontSize: "14px" }}
            >
              Please enter a valid range of minimum and maximum prices.
            </p>
          )}
          <div className="search-by-price-filter-col-3-os">
            <button
              type="button"
              onClick={() => mobilePriceSunmit({})}
              className={`search-filter-search-number-btn-os-1 ${
                dataLoading ? "loading-padding" : ""
              }`}
              aria-label="Search Number"
            >
              {!dataLoading ? (
                <span>Search Number</span>
              ) : (
                <span className="dot-loader ml-2 flex">
                  <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                  <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                  <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                </span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}

      {filters?.type === "family_pack" ? (
        <div
          className={
            filters?.type === "family_pack"
              ? "MobileSearch-filter-content-data-os active"
              : "MobileSearch-filter-content-data-os"
          }
        >
          {/* Family Pack */}
          <div className="search-family-pack-heading-text-os">
            How much Similar Numbers do you want for your family or Business?
          </div>
          <form className="MobileSearch-filter-familyPack-content-row-os">
            <div className="MobileSearch-filter-familyPack-content-col-1-os">
              <span>I Want</span>
              <div>
                <select
                  onChange={(e) => {
                    handleChangefamilySelect(e);
                    familyPackSubmit(e); // Trigger the submit function
                  }}
                  value={familyPackValue}
                  style={{
                    WebkitAppearance: "none", // Removes iOS native date picker
                    MozAppearance: "none", // Firefox support
                    appearance: "none", // General browsers
                    textAlign: "left", // Align the date to the left
                    paddingLeft: "12px", // Add space on the left side
                    width: "100%", // Full width
                    height: "40px", // Set height for consistency
                    fontSize: "16px", // Adjust font size
                  }}
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
              <span>SIMILAR VIP MOBILE NUMBER</span>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      {deliveryIsOpen && (
        <Information deliveryCloseModal={deliveryCloseModal} />
      )}
    </div>
  );
};

export default MobileSearchFilters;
