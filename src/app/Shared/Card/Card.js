import React, { useState, useEffect, useContext } from "react";
import "./Card.css";
import "../BuyNowButton/BuyNowButton.css";
import moment from "moment";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCrown,
  faHeart as faHeartRegular,
} from "@fortawesome/free-solid-svg-icons";
import { IoInformationCircleSharp } from "react-icons/io5";
import Info from "./Info";
// function getStarIcons(rating) {
//   const clampedRating = Math.max(1, Math.min(5, rating));
//   const fullStars = Math.floor(clampedRating);
//   const halfStar = clampedRating % 1 !== 0;
//   const stars = [];
//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<StarIcon key={i} sx={{ color: "gold" }} />);
//   }
//   if (halfStar) {
//     stars.push(<StarHalfIcon key="half" sx={{ color: "gold" }} />);
//   }
//   for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) {
//     stars.push(<StarBorderIcon key={`border-${i}`} sx={{ color: "gold" }} />);
//   }
//   return stars;
// }

const Card = (props) => {
  const { productname } = props;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
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
    setCartClick,
    cartClick,
    isProcessing,
  } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const router = useRouter();
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [showCompareAtPrice, setShowCompareAtPrice] = useState(false);
  const [rtpDate, setRtpDate] = useState();
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const Sponsored = props?.star_status === "Sponsored";
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []); // ✅ No dependency on timeLeft

  // // show coming date with Pre-Book number button
  useEffect(() => {
    const rtpDateStr = props?.comingsoon_date;
    // Check if rtpDateStr exists and is not empty
    if (rtpDateStr && rtpDateStr !== "") {
      // Split the date string into year, month, and day
      const [year, month, day] = rtpDateStr.split("-").map(Number);

      // Create a Date object using the parts
      const parsedDate = new Date(year, month - 1, day); // Month is 0-based in Date object

      const formattedDate = `${String(parsedDate.getDate()).padStart(
        2,
        "0"
      )}-${String(parsedDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${parsedDate.getFullYear()}`;

      setRtpDate(formattedDate);
    }
  }, [props?.comingsoon_date]);

  useEffect(() => {
    handleDiscountAndCompare();
  });

  const handleDiscountAndCompare = () => {
    if (props.compare_at_price && props.unit_price) {
      // discount price (Saved amount)
      const compareAtPrice = parseFloat(
        props.compare_at_price.replace(/,/g, "")
      );
      const unitPrice = parseFloat(props.unit_price.replace(/,/g, ""));

      const discountedPrice = compareAtPrice - unitPrice;
      setDiscount(discountedPrice.toFixed());

      const roundedCompareAtPrice = Math.round(compareAtPrice);
      setCompareAtPrice(roundedCompareAtPrice.toLocaleString("en-IN"));

      // compareAtPrice conditions to show comapareAtPrice
      if (props?.seller_type === "PREMIUM" && compareAtPrice > unitPrice) {
        setShowCompareAtPrice(true);
      } else {
        setShowCompareAtPrice(false);
      }
    }
  };

  // Username
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

  function calculateTimeLeft(rtp_date) {
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
  let timeLefts = calculateTimeLeft(props.rtp_date);

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

  // Handle book now os
  const handleBookNowClick = () => {
    setLoading(true);
    localStorage.setItem("Lead-Page", "Book-Now");
    // router.push("/place-order");
    if (
      props?.comingsoon === "NO" &&
      props?.seller_type === "PREMIUM" &&
      props.comingsoon_date
    ) {
      setShowModal(true);
      setLoading(false);
    } else {
      if (!checkUser() && !cartClick) {
        setActiveSignInWithOtp(true);
        const cartCacheSavedData = JSON.parse(
          localStorage.getItem("cartCacheSavedData")
        );

        const isItemAlreadyInCart = cartCacheSavedData?.some(
          (cartItem) => cartItem?.number === props?.number
        );

        if (!isItemAlreadyInCart) {
          const updatedCartCacheData = [...cartCacheSavedData, props];
          const items = updatedCartCacheData.map((product) => ({
            product_id: product?.productid
              ? product?.productid
              : product?.product_id,
            number: parseInt(product.number),
            item_loc: "cart",
          }));

          const updatedCartCache = {
            items,
            number: items.map((item) => item.number).join(),
            product_id: items.map((item) => item.product_id).join(),
          };
          // Update the localStorage with new data
          localStorage.setItem(
            "cartCacheSavedData",
            JSON.stringify(updatedCartCacheData)
          );
          localStorage.setItem(
            "cartCacheNumber",
            JSON.stringify(updatedCartCache)
          );
          setCartCacheData(updatedCartCacheData);
          setCartCache(updatedCartCache);
          toast.success("Item added to cart successfully!");
          setLoading(false);
          // router.push("/place-order");
          setRedirectTo("/details");
          // setRedirectTo("/place-order");
          setCartClick(false);
        } else {
          toast.success("Item already in cart!");
          setLoading(false);
        }
      } else {
        if (cartItems?.some((obj) => obj.number === props?.number)) {
          addToCart({ ...props, number: props?.number, tag: "new" });
          router.push("/details");
          // router.push("/place-order");
          setLoading(false);
        } else {
          if (!cartClick) {
            addToCart({ ...props, number: props?.number, tag: "new" }, () => {
              // router.push("/place-order");
              router.push("/details");
              setLoading(false);
            });
            setCartClick(true);
          }
        }
      }
    }
  };

  const handleBookNowThroughBookNowIcon = () => {
    localStorage.setItem("Lead-Page", "cart");
    if (
      props?.comingsoon === "NO" &&
      props?.seller_type === "PREMIUM" &&
      props.comingsoon_date
    ) {
      setShowModal(true);
    } else {
      if (!checkUser() && !cartClick) {
        setActiveSignInWithOtp(true);
        const cartCacheSavedData = JSON.parse(
          localStorage.getItem("cartCacheSavedData")
        );

        const isItemAlreadyInCart = cartCacheSavedData?.some(
          (cartItem) => cartItem?.number === props?.number
        );

        if (!isItemAlreadyInCart) {
          const updatedCartCacheData = [...cartCacheSavedData, props];

          const items = updatedCartCacheData.map((product) => ({
            product_id: product?.productid
              ? product?.productid
              : product?.product_id,
            number: parseInt(product.number),
            item_loc: "cart",
          }));

          const updatedCartCache = {
            items,
            number: items.map((item) => item.number).join(),
            product_id: items.map((item) => item.product_id).join(),
          };

          // Update the localStorage with new data
          localStorage.setItem(
            "cartCacheSavedData",
            JSON.stringify(updatedCartCacheData)
          );
          localStorage.setItem(
            "cartCacheNumber",
            JSON.stringify(updatedCartCache)
          );
          setCartCacheData(updatedCartCacheData);
          setCartCache(updatedCartCache);
          toast.success("Item added to cart successfully!");
          // router.push("/place-order");
          setRedirectTo("/details");
          setCartClick(false);
        } else {
          toast.success("Item already in cart!");
        }
      } else {
        if (cartItems?.some((obj) => obj.number === props?.number)) {
          addToCart({ ...props, number: props?.number, tag: "new" });
          router.push("/details");
        } else {
          if (!cartClick) {
            addToCart({ ...props, number: props?.number, tag: "new" }, () => {
              // router.push("/place-order");
            });
            setCartClick(true);
          }
        }
      }
    }
  };
  const handleYesClick = () => {
    setShowModal(false);
    // Perform the same logic as "Buy Now" flow
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
      const cartCacheSavedData = JSON.parse(
        localStorage.getItem("cartCacheSavedData")
      );

      const isItemAlreadyInCart = cartCacheSavedData?.some(
        (cartItem) => cartItem?.number === props?.number
      );

      if (!isItemAlreadyInCart) {
        const updatedCartCacheData = [...cartCacheSavedData, props];

        const items = updatedCartCacheData.map((product) => ({
          product_id: product?.productid
            ? product?.productid
            : product?.product_id,
          number: parseInt(product.number),
          item_loc: "cart",
        }));

        const updatedCartCache = {
          items,
          number: items.map((item) => item.number).join(),
          product_id: items.map((item) => item.product_id).join(),
        };

        // Update the localStorage with new data
        localStorage.setItem(
          "cartCacheSavedData",
          JSON.stringify(updatedCartCacheData)
        );
        localStorage.setItem(
          "cartCacheNumber",
          JSON.stringify(updatedCartCache)
        );
        setCartCacheData(updatedCartCacheData);
        setCartCache(updatedCartCache);
        toast.success("Item added to cart successfully!");
        // router.push("/place-order");
        setRedirectTo("/details");
      } else {
        toast.success("Item already in cart!");
      }
    } else {
      if (cartItems?.some((obj) => obj.number === props?.number)) {
        router.push("/details");
      } else {
        addToCart({ ...props, number: props?.number, tag: "new" }, () => {
          router.push("/details");
        });
      }
    }
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  const handleSimilar = (similar) => {
    router.push(`/pdp?number=${similar}`);
  };

  return (
    <div
      style={{
        paddingTop:
          showCompareAtPrice && props.rtp_date && timeLefts ? "0rem" : null,
        border: `2px solid ${
          Sponsored ? "var(--secondary)" : "var(--primary)"
        }`,
        // Add !important manually here
      }}
      className="number-card-os  md:transition md:transform md:duration-300 md:ease-in-out md:hover:scale-105 "
    >
      <div className="bg-white rounded-[17px] p-0 relative w-full flex flex-col justify-between ">
        <div
          className={`relative w-full ${
            Sponsored ? "bg-secondary" : "bg-primary"
          }  lg:p-[10px] p-[6px]  rounded-[10px_10px_0_0] flex justify-between items-center  gap-2`}
        >
          {showCompareAtPrice && props.rtp_date && timeLefts && (
            <div>
              <span
                className={`${
                  Sponsored ? "text-black" : "text-white "
                } font-medium md:text-lg md:leading-3  text-[12px] xs:text-[10px] leading-2 `}
              >{`Save ${discount}/-`}</span>
            </div>
          )}
          {/* gk-card-implement  */}
          <div
            className="number-card-crown-wishlist-data-os"
            style={{
              width: !timeLefts ? "100%" : "auto",
              flexDirection: !timeLefts ? "row-reverse" : "initial",
            }}
          >
            {props.seller_type === "PREMIUM" ? (
              <button
                type="button"
                className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer"
                aria-label="crown"
              >
                <FontAwesomeIcon
                  icon={faCrown}
                  fontSize={13}
                  style={{ color: "var(--secondary)" }}
                />
              </button>
            ) : null}
            <button
              type="button"
              className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer active:fill-primary"
              onClick={handleBookNowThroughBookNowIcon}
              aria-label="book now"
            >
              <FontAwesomeIcon
                fontSize={13}
                icon={faCartShopping}
                style={{ color: " var(--primary) " }}
              />
            </button>
            <button
              type="button"
              className={`bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px]  cursor-pointer active:fill-[ var(--primary) ] ${
                wishListItem?.some((item) => item.productname === productname)
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                if (!isProcessing) {
                  if (getName()) {
                    addToWishList({ ...props });
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
                fontSize={13}
                icon={faHeartRegular}
                className={`${
                  wishListItem?.some((item) => item.productname === productname)
                    ? "outlined-heart-fill"
                    : "outlined-heart"
                }`}
              />
            </button>
          </div>
        </div>
        {/* gk-cahnges timer */}
        {showCompareAtPrice && props.rtp_date && timeLefts && (
          <div
            className={`absolute lg:top-8 lg:left-5 left-[5px] top-[31px] ${
              Sponsored ? "bg-primary" : "bg-secondary"
            } text-darktext md:font-semibold font-semibold text-xs text-center rounded-full border-[1px] p-[0px_3px] border-white shadow-md md:px-4 md:py-1 transform -rotate-3 flex items-center gap-1 cursor-pointer`}
            onClick={() => setHovered(true)}
          >
            <span className={`${Sponsored && "text-white"}`}>
              {timeString} Left
            </span>
            <span>
              <IoInformationCircleSharp fontSize={18} className="blink-zoom" />
            </span>
          </div>
        )}
        <div className="flex items-center justify-between lg:p-[10px_15px] flex-wrap  md:p-[10px_15px] p-[5px] flex-row-reverse gap-[10px]">
          {/* gk-changes-card  */}

          <div className="flex flex-col lg:gap-[7px] gap-[0]">
            <div className="md:text-[16px] font-bold  text-[12px] ">
              Total-
              {props.total}
            </div>
            <div className="md:text-[16px] font-bold  text-[12px]">
              Sum-{props.sum}
            </div>
            <div
              className="number-card-total-cod-acknowledge-os"
              style={{ display: props.cod === "yes" ? "block" : "none" }}
            >
              <span>{props.cod}</span>
            </div>
          </div>

          <div className="gk-similar-numbers">
            {Sponsored ? (
              <span
                className={`${
                  Sponsored
                    ? "text-black bg-secondary p-1 rounded"
                    : "text-white bg-primary"
                } font-semibold border-b border-b-primary  cursor-pointer font-roboto lg:text-[16px]  text-[12px]  xs:text-[10px]`}
              >
                Sponsored
              </span>
            ) : (
              <span
                className="text-primary font-semibold border-b border-b-primary  cursor-pointer font-roboto lg:text-[16px]  text-[12px]  xs:text-[10px]"
                onClick={() => handleSimilar(props?.number)}
              >
                Similar Numbers
              </span>
            )}
          </div>
        </div>
        <div
          className={
            props?.productname?.length >= 15
              ? "lg:text-[30px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
              : props?.productname?.length >= 13
              ? "lg:text-[31px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
              : "lg:text-[34px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
          }
          onClick={() => {
            router.push(
              "/pdp?productid=" + props?.product_id + "&number=" + props?.number
            );
            const trackingData = {
              event: "view_item", // Custom event name for GTM
              items: props,
              page_location: window.location.href,
              page_referrer: "https://www.vipnumbershop.com/",
              page_title: document.title,
              currency: "INR",
              value: props.unit_price,
            };
            // Push the structured data to the dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(trackingData);
          }}
        >
          {props.productname}
        </div>
        {props.speciality && (
          <span className="speciality-text text-sm text-center flex justify-center text-blue-700 bg-secondary">
            {props.speciality || ""}
          </span>
        )}
        <div className="flex justify-between lg:p-[10px_15px] items-center flex-wrap  md:p-[10px_15px] p-[5px]">
          <div className="number-card-price-review-stars-os">
            <div className="number-card-price-data-os11">
              <div className="number-card-price-review-stars-os">
                <div className="md:text-lg font-extrabold text-primary text-sm xs:text-[12px]">
                  {props.unit_price} /-
                </div>
              </div>
            </div>
            {/* <div className="number-card-review-star-os">
              <span> {getStarIcons(Math.min(Math.max(rating, 1), 5))} </span>
            </div> */}
            {showCompareAtPrice && props.rtp_date && timeLefts && (
              <div className="md:text-lg font-bold line-through text-sm xs:text-[12px]">
                {compareAtPrice} /-
              </div>
            )}
          </div>
          <div className="number-card-buy-now-os">
            {props?.comingsoon === "NO" &&
            props?.seller_type === "PREMIUM" &&
            props.comingsoon_date ? (
              <>
                <div
                  onClick={handleBookNowClick}
                  className={`preBook-button-os`}
                >
                  {cartItems?.some((obj) => obj.number === props?.number)
                    ? "Already in Cart"
                    : "Pre-Book"}
                </div>

                <div className="pree-date">{`${rtpDate}`}</div>
              </>
            ) : (
              <div
                onClick={handleBookNowClick}
                className={`cursor-pointer text-center md:text-[16px] leading-5 ${
                  Sponsored
                    ? "bg-secondary text-black hover:bg-primary hover:text-white"
                    : "bg-primary text-white hover:bg-secondary hover:text-black"
                }  rounded-md  lg:p-3 lg:font-bold  p-1  text-[13px] font-medium flex items-center justify-center"`}
              >
                <span>
                  {cartItems?.some((obj) => obj.number === props?.number)
                    ? "Already in Cart"
                    : "Book Now"}
                </span>
                {loading && (
                  <span className="dot-loader ml-2 flex">
                    <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                    <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                    {/* <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span> */}
                  </span>
                )}
              </div>
            )}

            <Modal
              className="bookNow-modal-os LogoutModal-data-os"
              open={showModal}
              onCancel={handleNoClick}
              footer={[
                <button
                  key="no"
                  className="yes-logout"
                  onClick={handleNoClick}
                  aria-label="Cancel"
                >
                  {/* No */}
                  Cancel
                </button>,
                <button
                  key="yes"
                  className="yes-logout"
                  onClick={handleYesClick}
                  aria-label="Proceed"
                >
                  Proceed
                </button>,
              ]}
            >
              <div className="LogoutModal-content-os">
                <p>Are you sure you want to proceed with the purchase of</p>
                <h3>{props.productname}?</h3>
                <p>It will be available on</p>
                <div className="bookNow-modal-leftTime-os">{`(${rtpDate})`}</div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      {hovered && (
        <Info
          unitPrice={props.unit_price} // Pass unit_price as prop
          compareAtPrice={compareAtPrice} // Pass compareAtPrice as prop
          setHovered={setHovered}
          timeString={timeString}
        />
      )}
      <style jsx global>
        {`
          .featured-number-row-os .splide__track--draggable,
          .grid__category {
            padding: 10px !important;
          }

          @media (max-width: 576px) {
            .featured-number-row-os .splide__track--draggable,
            .featured-number-row-os {
              padding: unset !important;
            }
          }
        `}
      </style>
    </div>
  );
};
export default Card;
