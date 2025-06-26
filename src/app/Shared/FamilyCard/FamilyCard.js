import React, { useState, useEffect, useContext } from "react";
import "./FamilyCard.css";
import { useRouter } from "next/navigation";
import { AppStateContext } from "./../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import moment from "moment";
import { Modal } from "antd";
import "../../Shared/Search/Search.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCrown,
  faHeart as faHeartRegular,
} from "@fortawesome/free-solid-svg-icons";

const FamilyCard = ({ count, apiData }) => {
  const {
    addToCart,
    checkUser,
    addToWishList,
    wishListItem,
    setRedirectTo,
    setCartCache,
    cartItems,
    user,
    userProfile,
    setCartCacheData,
    cartCacheData,
    setCartClick,
    cartClick,
    isProcessing,
  } = useContext(AppStateContext);
  const navigate = useRouter();

  const [selectAll, setSelectAll] = useState(true);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    apiData
      .filter((item) =>
        wishListItem.some((wishItem) => wishItem?.number === item?.number)
      )
      .map((item) => item?.productid)
  );
  const { email, firstname, lastname, mobile } = user?.user || {};
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  //map all number of apiData
  const mappedData = apiData.map((item) => item.number);
  const mappedDataRtpDate = apiData.map((item) => item.rtp_date);

  useEffect(() => {
    const matchingItems = apiData
      .filter((item) =>
        wishListItem.some((wishItem) => wishItem.number === item.number)
      )
      .map((item) => item.productid);

    if (selectAll) {
      setSelectedItems(apiData.slice(0, count).map((item) => item.productid));
    } else if (matchingItems.length > 0) {
      setSelectedItems(matchingItems);
    } else {
      setSelectedItems([apiData[0]?.productid]);
    }
  }, [apiData, selectAll, wishListItem, count]);

  const handleCheckboxChange = (id) => {
    const index = selectedItems.indexOf(id);
    let newSelectedItems = [];
    if (index === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, index),
        ...selectedItems.slice(index + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    apiData.forEach((item) => {
      if (selectedItems.includes(item.productid)) {
        totalPrice += parseFloat(item.unit_price);
      }
    });
    return totalPrice.toFixed(2); // rounds the total to 2 decimal places
  };

  const selectedCount = selectedItems.length;
  const totalLength = apiData?.length;

  //check if user logged in
  const getName = () => {
    if (!user) {
      return false;
    }
    if (
      firstname ||
      lastname ||
      userProfile?.firstname ||
      userProfile?.lastname
    ) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else if (mobile || email) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else {
      return false;
    }
  };

  //Timer function to buy now flow
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  function calculateTimeLeft(rtp_date) {
    if (!rtp_date) return null;
    const targetDate = moment(rtp_date, "YYYY-MM-DDTHH:mm:ss").toISOString(); // Parse and format to ISO format
    const now = moment();
    const diff = moment(targetDate).diff(now);

    if (diff < 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    const duration = moment.duration(diff);
    if (duration.asSeconds() <= 0) {
      return null; // Return null to indicate that timer should not be displayed
    }
    const days = Math.floor(duration.asDays());
    const hours = String(duration.hours()).padStart(2, "0");
    const minutes = String(duration.minutes()).padStart(2, "0");
    const seconds = String(duration.seconds()).padStart(2, "0");
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  let timeLefts = calculateTimeLeft(apiData[0]?.rtp_date);
  if (
    timeLefts &&
    timeLefts.days === "00" &&
    timeLefts.hours === "00" &&
    timeLefts.minutes === "00" &&
    timeLefts.seconds === "00"
  ) {
    timeLefts = null; // Set timeLefts to null to indicate that timer should not be displayed
  }
  let timeString = "";
  if (timeLefts) {
    // Check if timeLefts is not null
    if (timeLefts.days > 1) {
      timeString += `${timeLefts.days} days `;
    } else if (timeLefts.days === 1) {
      timeString += `${timeLefts.days} day `;
    }
    timeString += `${timeLefts.hours}:${timeLefts.minutes}:${timeLefts.seconds}`;
  }

  const handleBookNowClick = () => {
    localStorage.setItem("Lead-Page", "Book-Now");
    if (!checkUser() && !cartClick) {
      setActiveSignInWithOtp(true);
      const selectedProducts = apiData.filter((item) =>
        selectedItems.includes(item.productid)
      );
      const combineData = [...cartCacheData, ...selectedProducts];

      const items = combineData.map((product) => ({
        product_id: product.productid ? product.productid : product.product_id,
        number: parseInt(product.number),
        item_loc: "cart",
      }));

      const updatedCartCache = {
        items,
        number: items.map((item) => item.number).join(),
        product_id: items.map((item) => item.product_id).join(),
      };
      localStorage.setItem("cartCacheNumber", JSON.stringify(updatedCartCache));
      localStorage.setItem("cartCacheSavedData", JSON.stringify(combineData));

      setCartCache(updatedCartCache);
      setCartCacheData(combineData);

      // navigate.push("/place-order");
      setRedirectTo("/details");
      toast.success("Item added to cart successfully!");
      setCartClick(true);
    } else {
      if (!cartClick) {
        const selectedProducts = apiData.filter((item) =>
          selectedItems.includes(item.productid)
        );

        const items = selectedProducts.map((product) => ({
          product_id: product.productid
            ? product.productid
            : product.product_id,
          number: parseInt(product.number),
          item_loc: "cart",
          tag: "new",
        }));

        addToCart({ items }, () => {
          navigate.push("/details");
        });
        setCartCache("");
        setCartCacheData([]);
        setCartClick(true);
      }
    }
  };

  const handleBookNowThroughBookNowIcon = () => {
    localStorage.setItem("Lead-Page", "cart");
    if (!checkUser() && !cartClick) {
      setActiveSignInWithOtp(true);
      const selectedProducts = apiData.filter((item) =>
        selectedItems.includes(item.productid)
      );
      const combineData = [...cartCacheData, ...selectedProducts];

      const items = combineData.map((product) => ({
        product_id: product.productid ? product.productid : product.product_id,
        number: parseInt(product.number),
        item_loc: "cart",
      }));

      const updatedCartCache = {
        items,
        number: items.map((item) => item.number).join(),
        product_id: items.map((item) => item.product_id).join(),
      };

      localStorage.setItem("cartCacheNumber", JSON.stringify(updatedCartCache));
      localStorage.setItem("cartCacheSavedData", JSON.stringify(combineData));
      setCartCache(updatedCartCache);
      setCartCacheData(combineData);
      // navigate.push("/place-order");
      setRedirectTo("/details");
      toast.success("Item added to cart successfully!");
      setCartClick(true);
    } else {
      if (!cartClick) {
        const selectedProducts = apiData.filter((item) =>
          selectedItems.includes(item.productid)
        );

        const items = selectedProducts.map((product) => ({
          product_id: product.productid
            ? product.productid
            : product.product_id,
          number: parseInt(product.number),
          item_loc: "cart",
          tag: "new",
        }));

        addToCart({ items }, () => {
          // navigate.push("/place-order");
        });
        setCartCache("");
        setCartCacheData([]);
        setCartClick(true);
      }
    }
  };
  const handleYesClick = () => {
    setShowModal(false);
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
      const selectedProducts = apiData.filter((item) =>
        selectedItems.includes(item.productid)
      );
      const combineData = [...cartCacheData, ...selectedProducts];

      const items = combineData.map((product) => ({
        product_id: product.productid ? product.productid : product.product_id,
        number: parseInt(product.number),
        item_loc: "cart",
      }));

      const updatedCartCache = {
        items,
        number: items.map((item) => item.number).join(),
        product_id: items.map((item) => item.product_id).join(),
      };

      localStorage.setItem("cartCacheNumber", JSON.stringify(updatedCartCache));
      localStorage.setItem("cartCacheSavedData", JSON.stringify(combineData));

      setCartCache(updatedCartCache);
      setCartCacheData(combineData);

      // navigate.push("/place-order");
      setRedirectTo("/details");
      toast.success("Item added to cart successfully!");
    } else {
      const selectedProducts = apiData.filter((item) =>
        selectedItems.includes(item.productid)
      );

      const items = selectedProducts.map((product) => ({
        product_id: product.productid ? product.productid : product.product_id,
        number: parseInt(product.number),
        item_loc: "cart",
        tag: "new",
      }));

      addToCart({ items }, () => {
        navigate.push("/details");
      });
      setCartCache("");
      setCartCacheData([]);
    }
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  const groupedData = apiData.reduce((groups, item) => {
    const key = item.seller_type;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});

  const itemsNumber = apiData.map((item) => ({
    number: item.number,
  }));
  const updatedCartCache = itemsNumber.map((item) => item.number).join();

  return (
    <div
      className="number-card-os family-card-os "
      style={{
        height: "unset !important",
      }}
    >
      <div className="bg-white rounded-[17px] p-0 relative w-full flex flex-col  justify-between">
        {mappedDataRtpDate && timeLefts && (
          <div className="number-card-timer-data-os">
            <div className="number-card-timer">
              <span>{timeString} Left</span>
            </div>

            <div className="number-card-timer-discount-os">
              <span style={{ background: "red", color: "#fff" }}>
                {mappedDataRtpDate && timeLefts ? "Coming Soon" : null}
              </span>
            </div>
          </div>
        )}
        <div className="relative w-full bg-primary  lg:p-[10px] p-[5px]  lg:rounded-[13px_13px_0_0] rounded-[4px_4px_0_0] flex justify-between items-center  gap-2 flex-row-reverse">
          {/* <div className="number-card-crown-wishlist-data-os"> */}
          {Object.keys(groupedData).map((sellerType) => {
            // Render the seller_type and wish list icon for each group
            const groupItems = groupedData[sellerType];
            return (
              <div
                key={sellerType}
                className="number-card-crown-wishlist-data-os"
              >
                {sellerType === "PREMIUM" ? (
                  <>
                    <button
                      type="button"
                      className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer"
                      aria-label="crown"
                    >
                      <FontAwesomeIcon
                        icon={faCrown}
                        style={{ color: "var(--secondary)" }}
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer"
                      onClick={handleBookNowThroughBookNowIcon}
                      disabled={selectedItems.length === 0}
                      aria-label="book now"
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        style={{ color: " var(--primary) " }}
                      />
                    </button>
                    <button
                      type="button"
                      className={`bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer ${
                        wishListItem?.some((wishItem) =>
                          groupItems.some(
                            (groupItem) =>
                              groupItem.productname === wishItem.productname
                          )
                        )
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        if (!isProcessing) {
                          if (getName()) {
                            const selectedProducts = apiData.filter((item) =>
                              selectedItems.includes(item.productid)
                            );
                            const itemsToAdd = selectedProducts.map((it) => ({
                              product_id: it?.productid,
                              number: it?.number,
                              item_loc: "wishlist",
                            }));
                            addToWishList(itemsToAdd, true);
                          } else {
                            setActiveSignInWithOtp(true);
                            localStorage.setItem("Lead-Page", "Wishlist");
                          }
                        }
                      }}
                      disabled={isProcessing}
                      aria-label="wishlist"
                    >
                      <FontAwesomeIcon
                        icon={faHeartRegular}
                        className={`${
                          wishListItem?.some((wishItem) =>
                            groupItems.some(
                              (groupItem) =>
                                groupItem.productname === wishItem.productname
                            )
                          )
                            ? "outlined-heart-fill"
                            : "outlined-heart"
                        }`}
                      />
                    </button>
                  </>
                ) : null}
              </div>
            );
          })}

          {/* <div className="familyPack-seclect-all-checkbox-os all-div">
            <label className="container_checkbox-os ">
              All
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <span className="checkmark"></span>
            </label>
          </div> */}

          <div className="inline-flex items-center gap-2">
            <label
              htmlFor="select-all-checkbox"
              className="relative flex cursor-pointer items-center rounded-full "
              data-ripple-dark="true"
            >
              <input
                // id="ripple-on"
                id="select-all-checkbox"
                type="checkbox"
                className="peer relative h-[25px] w-[25px] cursor-pointer appearance-none rounded-full border border-whitetext shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-secondary checked:before:bg-secondary hover:before:opacity-10"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />

              <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-darktext opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>

            <label className="cursor-pointer text-whitetext lg:text-lg text-sm">
              All
            </label>
          </div>
        </div>
        <ul className="">
          {apiData
            // .sort((a, b) => a.productname.localeCompare(b.productname))
            .map(
              (item, index) =>
                count >= index + 1 && (
                  <div className="btn-low" key={item.productid}>
                    <li className="flex items-center justify-between lg:p-[10px_10px] flex-wrap  md:p-[10px_10px] p-[5px] md:gap-[10px] md:flex-row flex-row-reverse my-1 ">
                      <div>
                        <label
                          className="relative flex cursor-pointer items-center rounded-full "
                          htmlFor="ripple-value"
                          data-ripple-dark="true"
                        >
                          <input
                            id="ripple-value"
                            className="peer relative h-[25px] w-[25px] cursor-pointer appearance-none rounded-full border border-primary shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-secondary checked:bg-secondary checked:before:bg-secondary hover:before:opacity-10"
                            type="checkbox"
                            checked={selectedItems.includes(item.productid)}
                            onChange={() =>
                              handleCheckboxChange(item.productid)
                            }
                          />
                          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-darktext opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <div
                        className={
                          item.productname.length >= 10
                            ? "md:text-[20px] font-semibold md:flex md:items-center gap-2"
                            : "familyPack-selected-checkbox-col-os-1"
                        }
                      >
                        {item.productname}

                        <div className=" text-sm">
                          {`${parseFloat(item.unit_price).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}/-`}
                        </div>
                      </div>
                    </li>
                  </div>
                )
            )}
        </ul>

        <div className="family-card-plan-buyNow-btn-os">
          <div className="">
            <div className="">
              <span className="md:text-xl font-extrabold text-primary text-sm xs:text-[12px]">
                ₹
                {parseFloat(getTotalPrice()).toLocaleString("en-IN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="family-card-plan-by-selector-os">
              Selected
              <span>
                {selectedCount}/{totalLength}
              </span>
            </div>
          </div>
          <button
            onClick={handleBookNowClick}
            type="button"
            disabled={selectedItems.length === 0}
            style={{
              cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
            }}
            aria-label="select"
          >
            {cartItems?.some((obj) => {
              const isNumberMatch = updatedCartCache.includes(obj.number);
              return isNumberMatch;
            })
              ? "Already in Cart"
              : timeString && mappedDataRtpDate
              ? "Book Now"
              : "Buy Now"}
          </button>
          <Modal
            className="bookNow-modal-os LogoutModal-data-os"
            open={showModal}
            onCancel={handleNoClick}
            footer={[
              <button
                key="no"
                className="yes-logout"
                onClick={handleNoClick}
                aria-label="no"
              >
                No
              </button>,
              <button
                key="yes"
                className="yes-logout"
                onClick={handleYesClick}
                aria-label="yes"
              >
                Yes
              </button>,
            ]}
          >
            <div className="LogoutModal-content-os">
              <p>Are you sure you want to proceed with the purchase of</p>
              <h3>{apiData.productname}?</h3>
              <p>It will be available after</p>
              <div className="bookNow-modal-leftTime-os">{timeString}</div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FamilyCard;
