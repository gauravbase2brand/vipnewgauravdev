import { RiShoppingCart2Line } from "react-icons/ri";
import React, { useContext, useEffect, useRef } from "react";
import "./PdpProduct.css";
import { usePathname, useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useState } from "react";
import { useGetQueryParams } from "../../utils";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft } from "react-icons/fa";

const PdpProduct = (props) => {
  const [product, setProduct] = useState({});
  const [productNumber, setProductNumber] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [compareAtPrice, setCompareAtPrice] = useState(0);
  const [showCompareAtPrice, setShowCompareAtPrice] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { queryParams } = useGetQueryParams();
  const [rtpDate, setRtpDate] = useState();
  const Router = useRouter();
  const Pathname = usePathname();
  const isFetching = useRef(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const {
    addToCart,
    checkUser,
    addToWishList,
    wishListItem,
    cartItems,
    setRedirectTo,
    user,
    userProfile,
    pdp,
    setPdp,
  } = useContext(AppStateContext);

  useEffect(() => {
    const rtpDateStr = product?.comingsoon_date;
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
  }, [product?.comingsoon_date]);
  useEffect(() => {
    const fetchProductData = async () => {
      const productId = queryParams?.productid;
      const number = queryParams?.number;
      if ((productId || number) && !isFetching.current) {
        isFetching.current = true;
        try {
          const url = productId
            ? `${apiUrl}/web/product?productid=${productId}`
            : `${apiUrl}/web/product?number=${number}`;
          const response = await axios.get(url, {
            params: {
              number: number,
            },
          });
          const newProductNumber = response?.data?.data?.number;
          setProduct(response?.data?.data);
          setProductNumber(newProductNumber);
        } catch (error) {
        } finally {
          isFetching.current = false;
        }
      }
    };

    fetchProductData();
  }, [queryParams]);

  useEffect(() => {
    if (productNumber) {
      const searchParams = new URLSearchParams(Pathname.search);
      searchParams.set("number", productNumber);
      searchParams.delete("productid");
      // const updatedSearch = searchParams.toString();
      // Replace the current history entry instead of adding a new one
      // window.history.replaceState(null, "", `?${updatedSearch}`);
    }
  }, [productNumber, Pathname]);

  // discount price
  const handleDiscount = () => {
    if (product.compare_at_price && product.unit_price) {
      // Parse the strings to numbers and remove commas
      const compareAtPrice = parseFloat(
        product.compare_at_price.replace(/,/g, "")
      );
      const unitPrice = parseFloat(product.unit_price.replace(/,/g, ""));

      // Calculate the discount
      const discountedPrice = compareAtPrice - unitPrice;
      setDiscount(discountedPrice.toFixed());

      // Round off compareAtPriceNumber to nearest whole number
      const roundedCompareAtPrice = Math.round(compareAtPrice);
      setCompareAtPrice(roundedCompareAtPrice.toLocaleString("en-IN"));
    }
  };

  // compareAtPrice conditions to show comapareAtPrice
  const discountCompare = () => {
    if (
      product?.seller_type === "PREMIUM" &&
      product?.compare_at_price > product?.unit_price
    ) {
      setShowCompareAtPrice(true);
      // console.log("discountCompare if");
    } else {
      setShowCompareAtPrice(false);
      // console.log("discountCompare else");
    }
  };

  useEffect(() => {
    handleDiscount();
    discountCompare();
  }, [product]);

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
  let timeLefts = calculateTimeLeft(product.rtp_date);
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

  // timer code
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const { email, firstname, lastname, mobile } = user?.user || {};
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

  const handleAddToCart = () => {
    if (!checkUser()) {
      setActiveSignInWithOtp(true);
    } else {
      if (!cartItems?.some((obj) => obj.number === product?.number)) {
        addToCart({ ...product, product_id: product?.productid, tag: "new" });
      } else {
        toast.info("Already moved to cart!", "Warning");
      }
    }
  };

  // Ensure data is loaded before rendering
  // if (Object.keys(product).length === 0) {
  //   return (
  //     <div className="container-os">
  //       <div className="loader-os">
  //         <Image
  //           src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
  //           alt="VIP Number Shop (VNS)"
  //           width={300}
  //           height={100}
  //           priority="true"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section className="xl:pt-8 py-4">
        <div className="container-os">
          <button
            className="font-bold md:hidden block p-2"
            onClick={() => {
              window.history.back();
            }}
          >
            <FaArrowLeft />
          </button>
          {!product?.productname ? (
            <>
              <div className="grid grid-cols-1  lg:grid-cols-[3fr_5fr] xl:gap-[5%]  md:gap-[2%]  gap-0  bg-gray-200  rounded-[15px] xl:p-[3rem_6rem] lg:p-[3rem_3rem] p-[1rem_1rem]">
                <div>
                  <div className="bg-gray-00 rounded-[11px] xl:p-9 p-4 border-[6px] border-gray-100">
                    <div className="animate-pulse  rounded-[11px] mb-4">
                      <div className="h-8 bg-gray-300 rounded-md w-20 mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded-md mb-2"></div>

                      <div className="border-t-[1.36362px] border-b-[1.36362px] border-dashed border-[#898989] flex justify-center py-[1rem] xl:mt-[1.5rem] mt-4">
                        <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* second code */}
                <div className="hello-gk">
                  <div className="animate-pulse flex items-center justify-between flex-wrap my-1">
                    <div className="h-8 bg-gray-300 rounded-md w-1/4 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded-md w-8 mb-2"></div>
                  </div>

                  <div className="flex items-center gap-[8px]">
                    <div className="h-8 bg-gray-300 rounded-md w-1/12 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded-md w-1/12 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded-md w-1/12 mb-2"></div>
                  </div>

                  <div className="animate-pulse border-t-[0.589404px] border-b-[0.589404px] border-solid border-[#8989896a] py-[1.5rem] mt-[1rem] mb-[1.5rem]">
                    <div className="bg-gray-200 border-[1.17881px] border-dashed border-[#898989] rounded-md mb-[1rem]">
                      <div className="h-6 bg-gray-300 rounded-md w-full mb-2 p-4"></div>
                      <div className="flex items-center justify-center py-[12px] gap-3">
                        <div className="h-4 bg-gray-300 rounded-md w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded-md w-1/4 mb-2"></div>
                      </div>
                    </div>
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-300 rounded-md w-1/4 mb-2"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-300 rounded-md w-1/12 mb-2"></div>
                      </div>
                    </div>
                  </div>

                  <div className="animate-pulse flex items-center gap-4 mt-4">
                    <div className="h-10 bg-gray-300 rounded-md w-1/4"></div>
                    <div className="h-10 bg-gray-300 rounded-md w-1/4"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1  lg:grid-cols-[3fr_5fr] xl:gap-[5%]  md:gap-[2%]  gap-0  bg-secondary rounded-[15px] xl:p-[3rem_6rem] lg:p-[3rem_3rem] p-[1rem_1rem]">
              <div className="">
                <div className="bg-white rounded-[11px] xl:p-9 p-4 border-[6px] border-primary">
                  {showCompareAtPrice && product?.rtp_date && timeLefts && (
                    <div className="text-white">
                      <div className="number-card-timer-rs">
                        <span>{timeString} Left</span>
                      </div>
                      <div className="number-card-timer-discount-os">
                        <span className="text-sm p-2 bg-[#82bc29] mb-2 rounded-md">
                          {`Save ${discount}/-`}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="font-medium text-white rounded-lg md:text-[21px] leading-[25px] text-[var(--whitetext)] text-center justify-center bg-primary  mx-auto py-[0.5rem] px-[0.8rem] flex items-center gap-[6px] flex-wrap">
                    Category:
                    <span>{product?.category}</span>
                  </div>
                  <div className="border-t-[1.36362px] border-b-[1.36362px] border-dashed border-[#898989] flex justify-center py-[1rem] xl:mt-[1.5rem] mt-4 ">
                    <span className=" text-white flex justify-center md:py-[1rem] py-3  w-full font-semibold bg-primary md:text-[40px] text-[24px] rounded-lg ">
                      {product?.productname}
                    </span>
                  </div>
                </div>
              </div>

              <div className=" hello-gk">
                <div key={product?.number}>
                  <div className="font-semibold text-[15.9139px] leading-[24px] text-[#d80027]">
                    {product?.coming_soon === "Coming Soon"
                      ? "Coming Soon"
                      : ""}
                  </div>
                  <div className="flex items-center justify-between flex-wrap my-1">
                    <h1 className="font-semibold md:text-2xl text-xl text-[var(--darktext)]">
                      {product?.productname}
                    </h1>
                    {product?.seller_status === "ACTIVE" &&
                      product?.product_status === "Active" && (
                        <button
                          onClick={() => {
                            if (getName()) {
                              addToWishList({
                                ...product,
                                product_id: product?.productid,
                              });
                            } else {
                              setActiveSignInWithOtp(true);
                            }
                          }}
                          className={
                            product?.product_status === "sold"
                              ? "PDP-product-wishlist-button-os disabled"
                              : wishListItem?.some(
                                  (item) =>
                                    item.productname === product?.productname
                                )
                              ? "PDP-product-wishlist-button-os active"
                              : "PDP-product-wishlist-button-os"
                          }
                          disabled={product?.product_status === "sold"}
                          aria-label="wishlist"
                        >
                          <FontAwesomeIcon
                            icon={faHeartRegular}
                            className="outlined-heart"
                          />
                        </button>
                      )}
                  </div>
                </div>
                {product?.seller_status === "ACTIVE" &&
                product?.product_status === "Active" ? (
                  <div className="flex items-center justify-between flex-wrap gap-y-[4px] gap-x-0">
                    <>
                      <div className="flex items-center gap-[8px]">
                        <span className="font-semibold md:text-[23px] text-[20px] md:leading-[41px] leading-[30px] text-[var(--darktext)]">
                          {`Rs.${parseFloat(product?.unit_price).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}`}
                        </span>
                        <span className="font-medium text-[14px] leading-[47px] text-[var(--darktext)] line-through">
                          Rs. {compareAtPrice}
                        </span>
                        <span className="font-normal text-[11.7881px] leading-[18px] text-white bg-primary rounded-[20px] py-[4px] px-[16px]">
                          Discount
                        </span>
                      </div>
                      {/* <div className="PDP-product-price-data-col-2-os">
                   <span>{getStarIcons(product?.rating)}</span>
                   <div className="PDP-product-review-text-os">
                     123 Reviews
                   </div>
                 </div> */}
                    </>
                  </div>
                ) : (
                  <span className="font-semibold md:text-[23px] text-[20px] md:leading-[41px] leading-[30px] text-red-600">
                    Sold
                  </span>
                )}
                <div className="border-t-[0.589404px] border-b-[0.589404px] border-solid border-[var(--darktext)] py-[1.5rem] mt-[1rem] mb-[1.5rem]">
                  <div className="bg-white border-[1.17881px] border-dashed border-[var(--primary)] rounded-[9.43046px] mb-[1rem]">
                    <div className="font-semibold md:text-[17px] text-[14px] md:leading-[24px] text-[#333] py-[8px] px-[1rem] border-b-[1.17881px] border-dashed border-[var(--primary)] flex justify-around">
                      <span> Features</span>
                      {rtpDate && (
                        <span className="text-red-500 text-[12px] sm:text-[14px] md:text-[16px] blink-zoom">
                          It will be available on ({rtpDate})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center flex-wrap py-[12px]">
                      <div className="w-[33.33%] flex items-center justify-between flex-wrap px-[1rem] border-r-[1.17881px] border-dashed border-[var(--primary)]">
                        <span className="">Total</span>
                        <span className="">{product?.total}</span>
                      </div>
                      <div className="w-[33.33%] flex items-center justify-between flex-wrap px-[1rem]">
                        <span className="">Sum</span>
                        <span className="">{product?.sum}</span>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <p className="font-semibold text-[20px] pb-1  text-[var(--darktext)]">
                      Tags
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product?.sub_category?.split(" ")?.map((ele, index) => (
                        <span
                          className="p-2 border-[1px] rounded-md mt-2 border-black"
                          key={index}
                        >
                          <span>{ele}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center  xl:gap-[2rem] gap-2 ">
                  {product?.seller_status === "ACTIVE" &&
                  product?.product_status === "Active" ? (
                    <>
                      {product?.product_status === "sold" ? (
                        <button
                          className="PDP-product-buyNow-btn-os sold"
                          disabled={product?.product_status === "sold"}
                          aria-label="Sold"
                        >
                          Sold
                        </button>
                      ) : (
                        <button
                          className="font-medium text-[17px] leading-[27px] flex items-center justify-center md:p-3 p-2 gap-[1rem] rounded-[5px] text-[var(--primary)] bg-white border-[2px] border-[var(--primary)] transition-all duration-[300ms] hover:bg-primary hover:text-white"
                          onClick={() => {
                            setPdp(true);
                            if (!checkUser()) {
                              setActiveSignInWithOtp(true);
                              setRedirectTo("/details");
                              setPdp(false);
                            } else {
                              if (
                                cartItems?.some(
                                  (obj) => obj.number === props?.number
                                )
                              ) {
                                setPdp(false);
                                Router.push("/details");
                              } else {
                                addToCart(
                                  {
                                    ...product,
                                    number: product?.number,
                                    product_id: product?.productid,
                                    tag: "new",
                                  },
                                  () => {
                                    Router.push("/details");
                                  }
                                );
                              }
                            }
                          }}
                          disabled={pdp}
                          aria-label="Buy Now"
                        >
                          Buy Now
                          <RiShoppingCart2Line />
                        </button>
                      )}
                      <button
                        className={
                          product?.product_status === "sold"
                            ? "PDP-product-addTocart-btn-os disabled"
                            : "font-medium text-[17px] leading-[27px] flex items-center justify-center md:p-3 p-2 gap-[1rem] rounded-[5px] text-white bg-primary border-[2px] border-[var(--primary)] transition-all duration-[300ms] hover:bg-white hover:text-primary"
                        }
                        onClick={() => {
                          handleAddToCart();
                        }}
                        disabled={product?.product_status === "sold"}
                        aria-label="addTocart"
                      >
                        {product?.product_status === "sold"
                          ? "Add to Cart"
                          : cartItems?.some(
                              (obj) => obj.number === product?.number
                            )
                          ? "Moved to Cart"
                          : "Add to Cart"}
                        <RiShoppingCart2Line />
                      </button>
                    </>
                  ) : null}
                  {product?.product_status === "sold" && (
                    <button
                      className="PDP-product-sold-button"
                      onClick={() => {
                        Router.push("/");
                      }}
                      aria-label="continue shopping"
                    >
                      continue shopping
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PdpProduct;
