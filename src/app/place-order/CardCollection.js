"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "../home/FeaturedNumber/FeaturedNumber.css";
import "../Shared/TabNumbers/TabNumberData/TabNumberData.css";
import debounce from "lodash/debounce";
import { MdOutlineDriveFileMoveRtl } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaMinusCircle, FaPlusCircle, FaRegEdit } from "react-icons/fa";

const CardCollection = ({
  cardCollectionTitle,
  currentItems,
  handleAddToCart,
  formatDate,
  setWishList,
  removeFromWishList,
  wishList,
  cardCount,
  cardEdit,
  addToWishList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 767
  );
  const Router = useRouter();

  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth <= 767); // Detect if sc
    // reen width is <= 767px
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    window.addEventListener("resize", handleResize); // Attach event listener
    handleResize(); // Call once to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
      handleResize.cancel(); // Cancel pending debounce calls
    };
  }, []);
  const handleDeleteButtonClick = (item) => {
    setItemToDelete(item); // Store the item to be deleted
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setItemToDelete(null); // Reset itemToDelete when closing modal
    addToWishList(itemToDelete);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      removeFromWishList(itemToDelete.id); // Pass the item's id to remove
      setIsModalOpen(false);
      setItemToDelete(null); // Clear the item after deletion
    }
  };
  return (
    <>
      {isMobile ? (
        <>
          {/* <MainHeading MainHeading={cardCollectionTitle} /> */}
          <div className="w-full md:p-2 p-2  border-[1px] border-[#58447f99] rounded-[10px] my-1 mobile">
            <div className="flex items-center gap-3 justify-between mb-1">
              <h2 className="lg:text-[18px] text-primary font-semibold cursor-pointer text-left ">
                {cardCollectionTitle}
              </h2>
              {cardEdit && (
                <div
                  onClick={() => {
                    Router.push("/details");
                    localStorage.removeItem("cartCacheSavedData");
                    localStorage.removeItem("cartCacheNumber");
                  }}
                  className="  cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                >
                  <FaRegEdit />
                </div>
              )}
            </div>
            <div className="featured-number-row-os">
              <div className="scroll__slider">
                {currentItems?.map((items, index) => (
                  <div className="slide__flex__data" key={index}>
                    <div
                      key={index}
                      className="flex items-center justify-between flex-wrap  p-[5px] bg-white rounded-[11.57px] border-primary border-2   "
                    >
                      <div className=" flex justify-between w-full">
                        <h2 className="lg:text-[20px] text-[14px] font-medium text-left cursor-pointer">
                          {items.productname}
                        </h2>
                        <div className="flex items-center md:gap-3 gap-[5px]">
                          {(cardCollectionTitle === "WishList" ||
                            cardCollectionTitle === "New cart") && (
                            <button
                              type="button"
                              onClick={() => {
                                removeFromWishList(items?.id);
                                if (cardCollectionTitle === "WishList") {
                                  setWishList(true);
                                }
                              }}
                              className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                              disabled={wishList}
                              aria-label="Delete"
                            >
                              <FaMinusCircle fontSize={16} />
                            </button>
                          )}
                          {cardCollectionTitle === "Cart" && (
                            <button
                              type="button"
                              onClick={() => handleDeleteButtonClick(items)}
                              className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                              aria-label="Delete"
                            >
                              <FaMinusCircle fontSize={16} />
                            </button>
                          )}

                          {cardCollectionTitle !== "Cart details" &&
                            cardCollectionTitle !== "New cart" && (
                              <button
                                type="button"
                                className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                                onClick={() => {
                                  handleAddToCart(items, index);
                                  if (cardCollectionTitle === "WishList") {
                                    removeFromWishList(items?.id);
                                    setWishList(true);
                                  }
                                }}
                                aria-label="Moved to Cart"
                              >
                                {items.alreadyInCart ? (
                                  <MdOutlineDriveFileMoveRtl fontSize={16} />
                                ) : (
                                  <FaPlusCircle fontSize={16}/>
                                )}
                              </button>
                            )}
                        </div>
                      </div>

                      {/* <span className="text-sm text-darktext">
                    {items.comingsoon === "NO"
                      ? formatDate(items.comingsoon_date)
                      : ""}
                  </span> */}

                      <div className="flex w-full justify-between items-center md:pt-3 pt-1 ">
                        <span className=" md:text-lg font-medium text-[#242424b6] line-through text-sm xs:text-[12px]">
                          {Math.round(parseFloat(items.compare_at_price)) >
                            Math.round(parseFloat(items.unit_price)) &&
                            `₹ ${Math.round(
                              parseFloat(items.compare_at_price)
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}`}
                        </span>
                        <span className="md:text-lg font-extrabold text-primary text-sm xs:text-[12px]">
                          {`₹ ${parseFloat(items.unit_price).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <section>
          <div className="">
            <div className="flex">
              {/* <MainHeading MainHeading={cardCollectionTitle} /> */}
              <div className="flex items-center gap-3">
                <h2 className="lg:text-[20px] text-primary text-lg lg:p-1 p-[5px]  font-semibold cursor-pointer text-left ">
                  {" "}
                  {cardCollectionTitle}
                </h2>
                {cardEdit && (
                  <div
                    onClick={() => {
                      Router.push("/details");
                      localStorage.removeItem("cartCacheSavedData");
                      localStorage.removeItem("cartCacheNumber");
                    }}
                    className="cursor-pointer text-center md:text-[16px] leading-5 bg-secondary  rounded-md text-darktext lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                  >
                    <FaRegEdit />
                  </div>
                )}
              </div>
              {/* {cardCollectionTitle=="Cart" && <h2 onClick={()=>router.push("/details")} className="lg:text-[20px] text-primary text-lg lg:p-1 p-[5px]  font-semibold cursor-pointer text-left ">
                {" "}
            edit
              </h2>} */}
            </div>
            {currentItems.length !== 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                // autoplay={{
                //   delay: 2500,
                //   disableOnInteraction: false,
                // }}
                pagination={{
                  type: "bullets",
                }}
                // loop
                // slidesPerView={slideitem}
                breakpoints={{
                  320: { slidesPerView: 1 }, // Mobile
                  768: { slidesPerView: 2 }, // Tablets
                  1024: { slidesPerView: 2 }, // Tablets
                  1200: { slidesPerView: cardCount ? 3 : 3 }, // Laptops & Desktops
                }}
              >
                <div>
                  {currentItems?.map((items, index) => (
                    <SwiperSlide key={index}>
                      <div
                        key={index}
                        className="p-2 bg-white rounded-[11.57px] mb-1 border-primary border-2 "
                      >
                        <div className="flex justify-between">
                          <h2 className="lg:text-[20px] text-lg  text-center font-extrabold cursor-pointer">
                            {items.productname}
                          </h2>
                          <div className="flex items-center gap-3 justify-between">
                            {(cardCollectionTitle === "WishList" ||
                              cardCollectionTitle === "Cart details" ||
                              cardCollectionTitle === "New cart") && (
                              <button
                                type="button"
                                onClick={() => {
                                  removeFromWishList(items?.id);
                                  setWishList(true);
                                }}
                                className="cursor-pointer text-center md:text-[16px] leading-5 bg-secondary  rounded-md text-darktext lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                                disabled={wishList}
                                aria-label="Delete"
                              >
                                <FaMinusCircle />
                              </button>
                            )}
                            {cardCollectionTitle === "Cart" && (
                              <button
                                type="button"
                                onClick={() => handleDeleteButtonClick(items)}
                                className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                                aria-label="Delete"
                              >
                                <FaMinusCircle fontSize={16} />
                              </button>
                            )}
                            {cardCollectionTitle !== "Cart details" &&
                              cardCollectionTitle !== "New cart" && (
                                <button
                                  type="button"
                                  className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-2 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext flex items-center justify-center"
                                  onClick={() => {
                                    handleAddToCart(items, index);
                                    if (cardCollectionTitle === "WishList") {
                                      removeFromWishList(items?.id);
                                      setWishList(true);
                                    }
                                  }}
                                  aria-label="Moved to Cart"
                                >
                                  {items.alreadyInCart ? (
                                    <MdOutlineDriveFileMoveRtl />
                                  ) : (
                                    <FaPlusCircle />
                                  )}
                                </button>
                              )}
                          </div>
                        </div>
                        {/* <span className="text-sm text-darktext">
                          {items.comingsoon === "NO"
                            ? formatDate(items.comingsoon_date)
                            : ""}
                        </span> */}
                        <div className="flex w-full justify-between items-center pt-3">
                          <span className=" md:text-lg font-bold line-through text-sm xs:text-[12px]">
                            {Math.round(parseFloat(items.compare_at_price)) >
                              Math.round(parseFloat(items.unit_price)) &&
                              `₹${Math.round(
                                parseFloat(items.compare_at_price)
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              })}`}
                          </span>
                          <span className="md:text-lg font-extrabold text-primary text-sm xs:text-[12px]">
                            {`₹ ${parseFloat(items.unit_price).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              }
                            )}`}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
                <style jsx>{`
                  /* Hide navigation buttons */
                  :global(.swiper-button-prev),
                  :global(.swiper-button-next) {
                    display: none !important;
                  }

                  /* Adjust pagination position */
                  :global(.swiper-pagination) {
                    position: relative !important;
                    text-align: center;
                    transition: 300ms opacity;
                    transform: translate3d(0, 0, 0);
                    z-index: 10;
                    bottom: -5px !important;
                  }

                  /* Fix pagination bullet styling */
                  :global(.swiper-pagination-bullet) {
                    background: #ccc !important;
                    width: 10px !important;
                    height: 10px !important;
                    border-radius: 50% !important;
                    transition: all 0.3s ease-in-out;
                  }

                  :global(.swiper-pagination-bullet-active) {
                    background: var(--primary) !important;
                    width: 20px !important;
                    height: 5px !important;
                    border-radius: 0 !important;
                  }

                  :global(.swiper-pagination-bullet) {
                    width: 20px !important;
                    border-radius: unset !important;
                    height: 5px !important;
                  }
                `}</style>
              </Swiper>
            ) : null}
          </div>
        </section>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleModalClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center border border-grey-700 rounded">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={handleDeleteConfirm}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={handleModalClose}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardCollection;
