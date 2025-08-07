import { FiArrowDownRight } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import React, { useState, useContext, useMemo } from "react";
import Image from "next/image";
import "./NetedCategory.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { ProductCard } from "./ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCrown,
  faHeart as faHeartRegular,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { GoArrowUpRight } from "react-icons/go";
export const NetedCategory = ({
  categories,
  productIndexes,
  setSelectedCategory,
  selectedCategory,
  setProductIndexes,
}) => {
  const {
    addToCart,
    checkUser,
    setCartCache,
    cartItems,
    setCartCacheData,
    setCartClick,
    setPdp,
    pdp,
    cartClick,
    setRedirectTo,
    wishListItem,
    addToWishList,
    isProcessing,
    userProfile,
    user,
  } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const router = useRouter();
  const [bannerVisibility, setBannerVisibility] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState("");
  const imgUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;

  // Assuming you want to store all the products in an array of arrays
  const categoryItems = useMemo(() => {
    return selectedCategory?.items || [];
  }, [selectedCategory]);
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
  const handleButtonClick = (id) => {
    setBannerVisibility((prevState) => ({
      ...prevState,
      [id]: false, // Hide the banner when the next button is clicked
    }));
  };
  const handleNoClick = () => {
    setShowModal(false);
  };
  const handleNext = (id) => {
    setProductIndexes((prevIndexes) => {
      const currentItem = categoryItems.find((item) => item.id === id);
      // calculateTimeLeft(rtp_date);
      // Set currentIndex to 0 if it's the first click (first time this item is being accessed)
      const currentIndex = prevIndexes[id] !== undefined ? prevIndexes[id] : 0;
      if (currentItem && currentItem.product_id[0].length > 0) {
        // Check if we are at the "View More" stage
        if (currentIndex >= currentItem.product_id[0].length) {
          return prevIndexes;
        }
        // Otherwise, proceed to the next stage (banner -> products -> View More)
        return {
          ...prevIndexes,
          [id]: currentIndex + 1, // Increment the index for the next product
        };
      }
      return prevIndexes;
    });
  };

  const handlePrev = (id) => {
    setProductIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[id] !== undefined ? prevIndexes[id] : 0;
      // If we're on the first product, go back to the banner view
      if (currentIndex === 0) {
        setBannerVisibility((prevState) => ({
          ...prevState,
          [id]: true, // Show the banner when moving back from the first product
        }));
        return prevIndexes; // Don't change the index if we're going back to the banner
      }
      // Otherwise, move back to the previous product
      return {
        ...prevIndexes,
        [id]: currentIndex - 1,
      };
    });
  };

  const handleViewMore = (link) => {
    router.push(link || "/");
  };

  // const handleBookNowClick = (item) => {
  //   localStorage.setItem("Lead-Page", "Book-Now");
  //   setLoading(true);
  //   if (
  //     item?.comingsoon === "NO" &&
  //     item?.seller_type === "PREMIUM" &&
  //     item.comingsoon_date
  //   ) {
  //     setSelectedProduct(item);
  //     setShowModal(true);
  //     setLoading(false);
  //   } else {
  //     setPdp(true);
  //     if (pdp === true) {
  //       return;
  //     }
  //     const cartCacheSavedData =
  //       JSON.parse(localStorage.getItem("cartCacheSavedData")) || [];
  //     const isItemAlreadyInCart = cartCacheSavedData.some(
  //       (cartItem) => cartItem?.number === item?.number
  //     );

  //     if (!checkUser() && !isItemAlreadyInCart) {
  //       const updatedCartCacheData = [...cartCacheSavedData, item];
  //       const items = updatedCartCacheData.map((product) => ({
  //         product_id: product?.productid
  //           ? product?.productid
  //           : product?.product_id,
  //         number: parseInt(product.number),
  //         item_loc: "cart",
  //       }));

  //       const updatedCartCache = {
  //         items,
  //         number: items.map((item) => item.number).join(),
  //         product_id: items.map((item) => item.product_id).join(),
  //       };

  //       localStorage.setItem(
  //         "cartCacheSavedData",
  //         JSON.stringify(updatedCartCacheData)
  //       );
  //       localStorage.setItem(
  //         "cartCacheNumber",
  //         JSON.stringify(updatedCartCache)
  //       );
  //       setCartCacheData(updatedCartCacheData);
  //       setCartCache(updatedCartCache);
  //       toast.success("Item added to cart successfully!");
  //       setCartClick(true);
  //       setLoading(false);
  //       router.push("/details");
  //     } else if (isItemAlreadyInCart) {
  //       setLoading(false);
  //       toast.success("Item already in cart!");
  //       router.push("/details");
  //     } else {
  //       if (cartItems.some((cartItem) => cartItem?.number === item?.number)) {
  //         setLoading(false);
  //         router.push("/details");
  //       } else {
  //         addToCart({
  //           ...item,
  //           number: item?.number,
  //           product_id: item?.productid,
  //           tag: "new",
  //         });
  //         setCartClick(true);
  //         setLoading(false);
  //         router.push("/details");
  //       }
  //     }
  //   }
  // };

  const handleBookNowClick = (item) => {
    setLoading(true);
    localStorage.setItem("Lead-Page", "Book-Now");
    if (
      item?.comingsoon === "NO" &&
      item?.seller_type === "PREMIUM" &&
      item.comingsoon_date
    ) {
      setSelectedProduct(item);
      setShowModal(true);
      setLoading(false);
    } else {
      if (!checkUser() && !cartClick) {
        setActiveSignInWithOtp(true);
        const cartCacheSavedData = JSON.parse(
          localStorage.getItem("cartCacheSavedData")
        );

        const isItemAlreadyInCart = cartCacheSavedData?.some(
          (cartItem) => cartItem?.number === item?.number
        );

        if (!isItemAlreadyInCart) {
          const updatedCartCacheData = [...cartCacheSavedData, item];
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
          setRedirectTo("/details");
          setCartClick(false);
        } else {
          toast.success("Item already in cart!");
          setLoading(false);
        }
      } else {
        if (cartItems?.some((obj) => obj.number === item?.number)) {
          addToCart({
            ...item,
            number: item?.number,
            product_id: item?.productid,
            tag: "new",
          });
          router.push("/details");
          setLoading(false);
        } else {
          if (!cartClick) {
            addToCart(
              {
                ...item,
                number: item?.number,
                product_id: item?.productid,
                tag: "new",
              },
              () => {
                router.push("/details");
                setLoading(false);
              }
            );
            setCartClick(true);
          }
        }
      }
    }
  };

  // const handleBookNowThroughBookNowIcon = (props) => {
  //   localStorage.setItem("Lead-Page", "cart");
  //   if (
  //     props?.comingsoon === "NO" &&
  //     props?.seller_type === "PREMIUM" &&
  //     props.comingsoon_date
  //   ) {
  //     setSelectedProduct(props);
  //     setShowModal(true);
  //   } else {
  //     if (!checkUser() && !cartClick) {
  //       const cartCacheSavedData = JSON.parse(
  //         localStorage.getItem("cartCacheSavedData")
  //       );

  //       const isItemAlreadyInCart = cartCacheSavedData?.some(
  //         (cartItem) => cartItem?.number === props?.number
  //       );

  //       if (!isItemAlreadyInCart) {
  //         const updatedCartCacheData = [...cartCacheSavedData, props];

  //         const items = updatedCartCacheData.map((product) => ({
  //           product_id: product?.productid
  //             ? product?.productid
  //             : product?.product_id,
  //           number: parseInt(product.number),
  //           item_loc: "cart",
  //         }));

  //         const updatedCartCache = {
  //           items,
  //           number: items.map((item) => item.number).join(),
  //           product_id: items.map((item) => item.product_id).join(),
  //         };

  //         // Update the localStorage with new data
  //         localStorage.setItem(
  //           "cartCacheSavedData",
  //           JSON.stringify(updatedCartCacheData)
  //         );
  //         localStorage.setItem(
  //           "cartCacheNumber",
  //           JSON.stringify(updatedCartCache)
  //         );
  //         setCartCacheData(updatedCartCacheData);
  //         setCartCache(updatedCartCache);
  //         toast.success("Item added to cart successfully!");
  //         router.push("/details");
  //         setRedirectTo("/details");
  //         setCartClick(true);
  //       } else {
  //         toast.success("Item already in cart!");
  //       }
  //     } else {
  //       if (cartItems?.some((obj) => obj.number === props?.number)) {
  //         router.push("/details");
  //       } else {
  //         if (!cartClick) {
  //           addToCart(
  //             {
  //               ...props,
  //               number: props?.number,
  //               product_id: props?.productid,
  //               tag: "new",
  //             },
  //             () => {
  //               // router.push("/details");
  //             }
  //           );
  //           setCartClick(true);
  //         }
  //       }
  //     }
  //   }
  // };

  const handleBookNowThroughBookNowIcon = (props) => {
    localStorage.setItem("Lead-Page", "cart");
    if (
      props?.comingsoon === "NO" &&
      props?.seller_type === "PREMIUM" &&
      props.comingsoon_date
    ) {
      setSelectedProduct(props);
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
          setRedirectTo("/details");
          setCartClick(false);
        } else {
          toast.success("Item already in cart!");
        }
      } else {
        if (cartItems?.some((obj) => obj.number === props?.number)) {
          addToCart({
            ...props,
            number: props?.number,
            product_id: props?.productid,
            tag: "new",
          });
          router.push("/details");
        } else {
          if (!cartClick) {
            addToCart(
              {
                ...props,
                number: props?.number,
                product_id: props?.productid,
                tag: "new",
              },
              () => {}
            );
            setCartClick(true);
          }
        }
      }
    }
  };
  const handleYesClick = (product) => {
    setShowModal(false);
    // Perform the same logic as "Buy Now" flow
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
      const cartCacheSavedData = JSON.parse(
        localStorage.getItem("cartCacheSavedData")
      );

      const isItemAlreadyInCart = cartCacheSavedData?.some(
        (cartItem) => cartItem?.number === product?.number
      );

      if (!isItemAlreadyInCart) {
        const updatedCartCacheData = [...cartCacheSavedData, product];

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
        setRedirectTo("/details");
      } else {
        toast.success("Item already in cart!");
      }
    } else {
      if (cartItems?.some((obj) => obj.number === product?.number)) {
        router.push("/details");
      } else {
        addToCart(
          {
            ...product,
            number: product?.number,
            product_id: product?.productid,
            tag: "new",
          },
          () => {
            router.push("/details");
          }
        );
      }
    }
  };
  return (
    <>
      <div className="container-os category-section">
        <div className="container-buttons">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`${
                selectedCategory.tabName === item.tabName
                  ? "highlighted"
                  : "category-button"
              }`}
              onClick={() => setSelectedCategory(item)}
            >
              <div className="button-content">
                <h2>{item.tabName}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="container-os main-back">
        <div className="container-os">
          <div className="grid xl:grid-cols-4 grid-cols-2 xl:gap-[60px] lg:gap-[40px] gap-[12px] ">
            {categoryItems?.map((item, index) => {
              // const currentIndex = productIndexes[item.id] || -1; // Default to -1 for the banner
              // const currentProduct = currentIndex >= 0 && currentIndex < item.product_id[0].length ? item.product_id[0][currentIndex] : null;
              const currentIndex = productIndexes[item.id] || 0; // Default to 0 if undefined
              const currentProduct = item.product_id[0][currentIndex];

              return (
                <div className="relative" key={item.id}>
                  {/* Previous Button */}
                  {bannerVisibility[item.id] === false && currentIndex >= 0 && (
                    <button
                      className="absolute lg:left-[-16px] left-[-4px] top-1/2 -translate-y-1/2 backdrop-blur-md md:p-[17px_8px] p-[5px_4px] rounded-md shadow-md z-10 flex items-center justify-center  transition bg-black"
                      onClick={() => handlePrev(item.id)}
                      aria-label="Prev"
                    >
                      <IoIosArrowBack color="white" />
                    </button>
                  )}

                  {/* Display Logic */}
                  <div className="">
                    {/* <div className="product-display"> */}
                    {bannerVisibility[item.id] !== false &&
                    currentIndex === 0 ? (
                      // Show Banner
                      <Image
                        src={`${imgUrl}${item.banner}`}
                        alt="sub Category"
                        height={300}
                        width={1000}
                        onClick={() => handleButtonClick(item.id)}
                        style={{ cursor: "pointer" }}
                        priority="true"
                        className="xl:h-[241px] md:h-[236px] h-[190px] rounded-[20px] w-full transition-transform duration-300 ease-in-out hover:scale-110 border-2 border-secondary"
                      />
                    ) : currentIndex < item.product_id[0].length ? (
                      // Show Number Details
                      <div className="nested-cat-card">
                        <div
                          className="number-card-os"
                          style={{
                            paddingTop: "0rem",
                          }}
                        >
                          <div className="bg-white rounded-[17px] p-0 relative w-full flex flex-col justify-between">
                            <div className="relative w-full bg-primary  lg:p-[10px] p-[6px]  rounded-[10px_10px_0_0] flex justify-between items-center  gap-2">
                              {/* {currentProduct.rtp_date && (
                              <div className="">
                                <span className="text-white font-medium md:text-lg md:leading-3  text-[12px] xs:text-[10px] leading-2 flex ">
                                  {`Save ${Math.round(
                                    (parseFloat(
                                      currentProduct?.compare_at_price?.replace(
                                        /,/g,
                                        ""
                                      )
                                    ) || 0) -
                                      (parseFloat(
                                        currentProduct?.unit_price?.replace(
                                          /,/g,
                                          ""
                                        )
                                      ) || 0)
                                  )}/-`}
                                </span>
                              </div>
                            )} */}

                              {currentProduct.rtp_date && (
                                <div className="w-full">
                                  <span className="text-white font-medium md:text-lg md:leading-3 text-[12px] xs:text-[10px] leading-2 inline-flex items-center whitespace-nowrap">
                                    {`Save ${Math.round(
                                      (parseFloat(
                                        currentProduct?.compare_at_price?.replace(
                                          /,/g,
                                          ""
                                        )
                                      ) || 0) -
                                        (parseFloat(
                                          currentProduct?.unit_price?.replace(
                                            /,/g,
                                            ""
                                          )
                                        ) || 0)
                                    )}/-`}
                                  </span>
                                </div>
                              )}

                              <div
                                className="flex flex-col gap-1"
                                style={{
                                  width: !timer ? "100%" : "auto",
                                  flexDirection: !timer
                                    ? "row-reverse"
                                    : "initial",
                                }}
                              >
                                <button
                                  type="button"
                                  className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer"
                                  aria-label="crown"
                                >
                                  <span>
                                    <FontAwesomeIcon
                                      icon={faCrown}
                                      fontSize={13}
                                      style={{ color: "#F16C19" }}
                                    />
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px] cursor-pointer active:fill-primary"
                                  onClick={() =>
                                    handleBookNowThroughBookNowIcon(
                                      currentProduct
                                    )
                                  }
                                  aria-label="card-crown"
                                >
                                  <span>
                                    <FontAwesomeIcon
                                      fontSize={13}
                                      icon={faCartShopping}
                                      style={{ color: " var(--primary) " }}
                                    />
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className={`bg-white rounded-[7px] md:p-[0px_5px] p-[0px_3px]  cursor-pointer active:fill-[ var(--primary) ] ${
                                    wishListItem?.some(
                                      (item) =>
                                        item.productname ===
                                        currentProduct?.productname
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    if (!isProcessing) {
                                      if (getName()) {
                                        addToWishList({
                                          ...currentProduct,
                                          product_id: currentProduct?.productid,
                                        });
                                      } else {
                                        setActiveSignInWithOtp(true);
                                        localStorage.setItem(
                                          "Lead-Page",
                                          "Wishlist"
                                        );
                                      }
                                    }
                                  }}
                                  disabled={isProcessing}
                                  aria-label="wishlist"
                                >
                                  <span>
                                    <FontAwesomeIcon
                                      fontSize={13}
                                      icon={faHeartRegular}
                                      className={`${
                                        wishListItem?.some(
                                          (item) =>
                                            item.productname ===
                                            currentProduct?.productname
                                        )
                                          ? "outlined-heart-fill"
                                          : "outlined-heart"
                                      }`}
                                    />
                                  </span>
                                </button>
                              </div>
                            </div>
                            {currentProduct.rtp_date && (
                              <ProductCard
                                key={currentProduct.productid}
                                product={currentProduct}
                                setTimer={setTimer}
                              />
                            )}
                            <div className="flex items-center justify-between lg:p-[10px_15px] flex-wrap  md:p-[10px_15px] p-[5px] flex-row-reverse gap-[10px]">
                              <div className="flex flex-col gap-2">
                                <div className="md:text-[16px] font-bold  text-sm">
                                  Total-{currentProduct?.total}
                                </div>
                                <div className="md:text-[16px] font-bold  text-sm">
                                  Sum-{currentProduct?.sum}
                                </div>
                              </div>
                              {/* <div className="gk-similar-numbers">
                              <span className="text-primary font-semibold border-b border-b-primary  cursor-pointer font-roboto lg:text-[16px]  text-[12px]">
                                Similar Numbers
                              </span>
                            </div> */}
                            </div>
                            <div
                              className={
                                currentProduct?.productname?.length > 15
                                  ? "lg:text-[33px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
                                  : currentProduct?.productname?.length > 13
                                  ? "lg:text-[31px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
                                  : "lg:text-[34px] text-lg lg:p-3 p-[5px] text-center font-extrabold cursor-pointer"
                              }
                            >
                              {currentProduct?.productname}
                            </div>
                            <span className="speciality-text"></span>
                            <div className="flex justify-between lg:p-[10px_15px] items-center flex-wrap  md:p-[10px_15px] p-[5px]">
                              <div className="number-card-price-review-stars-os">
                                <div className="number-card-price-data-os11">
                                  <div className="number-card-price-review-stars-os">
                                    <div className="number-card-price-os">
                                      {/* &#8377;{" "} */}
                                      {parseFloat(
                                        currentProduct?.unit_price
                                      ).toLocaleString("en-IN", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                      })}
                                      /-
                                    </div>
                                  </div>
                                </div>
                                <div className="number-card-review-star-os">
                                  <span>
                                    <svg
                                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1dtzujy-MuiSvgIcon-root"
                                      focusable="false"
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      data-testid="StarIcon"
                                    >
                                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1dtzujy-MuiSvgIcon-root"
                                      focusable="false"
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      data-testid="StarIcon"
                                    >
                                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1dtzujy-MuiSvgIcon-root"
                                      focusable="false"
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      data-testid="StarIcon"
                                    >
                                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1dtzujy-MuiSvgIcon-root"
                                      focusable="false"
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      data-testid="StarIcon"
                                    >
                                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>
                                    <svg
                                      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1dtzujy-MuiSvgIcon-root"
                                      focusable="false"
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      data-testid="StarIcon"
                                    >
                                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                    </svg>{" "}
                                  </span>
                                </div>
                                <div className="md:text-lg font-bold line-through text-sm xs:text-[12px]">
                                  {parseFloat(
                                    currentProduct?.compare_at_price
                                  ).toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                  /-
                                </div>
                              </div>
                              <div className="number-card-buy-now-os">
                                {currentProduct?.comingsoon === "NO" &&
                                currentProduct?.seller_type === "PREMIUM" &&
                                currentProduct.comingsoon_date ? (
                                  <>
                                    <div
                                      onClick={() =>
                                        handleBookNowClick(currentProduct)
                                      }
                                      className={`preBook-button-os`}
                                    >
                                      <span className="alreadyincart">
                                        {cartItems?.some(
                                          (obj) =>
                                            obj.number ===
                                            currentProduct?.number
                                        )
                                          ? "Already in Cart"
                                          : "Pre-Book"}
                                      </span>
                                    </div>

                                    <div className="pree-date">
                                      {(() => {
                                        const date = new Date(
                                          currentProduct.rtp_date
                                        );
                                        const day = String(
                                          date.getDate()
                                        ).padStart(2, "0");
                                        const month = String(
                                          date.getMonth() + 1
                                        ).padStart(2, "0"); // Months are 0-based
                                        const year = date.getFullYear();
                                        return `${day}-${month}-${year}`;
                                      })()}
                                    </div>
                                  </>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleBookNowClick(currentProduct)
                                    }
                                    className={`cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-3 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-white flex items-center justify-center"`}
                                  >
                                    <span>
                                      {cartItems?.some(
                                        (obj) =>
                                          obj.number === currentProduct?.number
                                      )
                                        ? "Already in Cart"
                                        : "Book Now"}
                                    </span>
                                    {loading && (
                                      <span className="dot-loader ml-2 flex">
                                        <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                                        <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
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
                                      Cancel
                                    </button>,
                                    <button
                                      key="yes"
                                      className="yes-logout"
                                      onClick={() =>
                                        handleYesClick(selectedProduct)
                                      }
                                      aria-label="Proceed"
                                    >
                                      Proceed
                                    </button>,
                                  ]}
                                >
                                  {selectedProduct && (
                                    <div className="LogoutModal-content-os">
                                      <p>
                                        Are you sure you want to proceed with
                                        the purchase of
                                      </p>
                                      <h3>{selectedProduct?.productname}?</h3>
                                      <p>It will be available on</p>
                                      <div className="bookNow-modal-leftTime-os">
                                        {(() => {
                                          const date = new Date(
                                            selectedProduct.rtp_date
                                          );
                                          const day = String(
                                            date.getDate()
                                          ).padStart(2, "0");
                                          const month = String(
                                            date.getMonth() + 1
                                          ).padStart(2, "0"); // Months are 0-based
                                          const year = date.getFullYear();
                                          return `${day}-${month}-${year}`;
                                        })()}
                                      </div>
                                    </div>
                                  )}
                                </Modal>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="nested-cat-header">
                        <h2>VIP MOBILE NUMBER</h2>
                      </div>
                      <div className="nested-cat-tag">
                        {currentProduct?.speciality || "PERFECT MATCH"}
                      </div>
                      <div className="nested-cat-number">
                        <span>{currentProduct?.productname}</span>
                      </div>
                      <div className="nested-cat-price">
                        <span>
                          &#8377;{" "}
                          {parseFloat(currentProduct?.unit_price).toLocaleString("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}/-
                        </span>
                      </div>
                      <ViewMoreButton
                        title={"Book Now"}
                        onClick={() => handleBookNowClick(currentProduct)}
                      />*/}
                      </div>
                    ) : (
                      <div
                        div
                        className="xl:h-[241px] md:h-[236px] h-[190px] rounded-[17px] object-cover w-full border-2 border-white "
                      >
                        {/* <Image
                        src={`${panelImg}/assets/img/vip-images/download_g3g7vd.png`}
                        alt="sub Category"
                        height={400}
                        width={1000}
                        style={{ cursor: "pointer" }}
                        priority="true"

                      /> */}
                        <div className=" flex justify-center gap-2 items-center flex-col h-full">
                          <h2 className="text-white md:text-lg text-[12px]">
                            {item.title}
                          </h2>
                          <button
                            className="flex text-white gap-2 items-center"
                            onClick={() => handleViewMore(item.link)}
                            aria-label="View More"
                          >
                            View More
                            {/* <svg
                            width="37"
                            height="11"
                            viewBox="0 0 37 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="white"
                          >
                            <path
                              d="M0.0420015 0.692574H4.10306L9.10482 5.83199L4.10306 10.9714H0.0420015L5.0667 5.83199L0.0420015 0.692574ZM13.5188 0.692574H17.5799L22.5816 5.83199L17.5799 10.9714H13.5188L18.5435 5.83199L13.5188 0.692574ZM26.9956 0.692574H31.0567L36.0584 5.83199L31.0567 10.9714H26.9956L32.0203 5.83199L26.9956 0.692574Z"
                              fill="white"
                            />
                          </svg> */}
                            <GoArrowUpRight />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Button */}
                  {bannerVisibility[item.id] !== false && currentIndex === 0 ? (
                    <button
                      className="absolute lg:right-[-16px] right-[-4px] top-1/2 -translate-y-1/2  backdrop-blur-md md:p-[17px_8px] p-[5px_4px] rounded-md shadow-md z-10 flex items-center justify-center  transition bg-black"
                      onClick={() => handleButtonClick(item.id)}
                      aria-label="right"
                    >
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="18"
                      viewBox="0 0 11 18"
                      fill="none"
                    >
                      <path
                        d="M2.40863 15.321L9.17084 8.55884L2.40863 1.79663"
                        stroke="#161616"
                        strokeWidth="3.60651"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                      <IoIosArrowForward color="white" />
                    </button>
                  ) : (
                    // Next Button (When Banner is Hidden)
                    currentIndex < item.product_id[0].length && (
                      <button
                        className="absolute lg:right-[-16px] right-[-4px] top-1/2 -translate-y-1/2 backdrop-blur-md md:p-[17px_8px] p-[5px_4px] rounded-md shadow-md z-10 flex items-center justify-center  transition bg-black"
                        onClick={() => handleNext(item.id)}
                        aria-label="Next btn"
                      >
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="18"
                        viewBox="0 0 11 18"
                        fill="none"
                      >
                        <path
                          d="M2.40863 15.321L9.17084 8.55884L2.40863 1.79663"
                          stroke="#161616"
                          strokeWidth="3.60651"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> */}
                        <IoIosArrowForward color="white" />
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
