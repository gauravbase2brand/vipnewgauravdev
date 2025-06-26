import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import "./WishlistNumberData.css";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";

const WishlistNumberData = (props) => {
  //  // State to track whether removeFromWishList has been called
  const [removedFromWishlist, setRemovedFromWishlist] = useState(false);
  const {
    addToCart,
    removeFromWishList,
    updateWishlist,
    wishList,
    setWishList,
  } = useContext(AppStateContext);
  const Router = useRouter();
  const { productname, total, sum } = props;

  // useEffect to call removeFromWishList when component mounts
  useEffect(() => {
    if (!props.productname && !removedFromWishlist) {
      removeFromWishList(props.id);
      setRemovedFromWishlist(true);
    }
  }, [props.productname, props.id, removedFromWishlist, removeFromWishList]);

  // Check if productname exists, if not, render nothing
  if (!props.productname) {
    return null;
  }
  const formatDate = (inputDate) => {
    if (!inputDate) return ""; // Return empty string if inputDate is empty or undefined

    const date = new Date(inputDate);
    if (isNaN(date)) return ""; // Return empty string if the date is invalid

    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  return (
    <div className="WishListNumber-list-row-os" key={props.id}>
      <div className="WishListNumber-premium-tag-os">{props?.seller_type}</div>
      <div className="WishListNumber-list-col-1-os">
        <div className="WishListNumber-price-os">
          {`Rs.${parseFloat(props.unit_price).toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}`}
        </div>

        <div className="WishListNumber-row-1-os">
          <div className="WishListNumber-col-1-os">
            <div className="WishListNumber-col-1-total-sum-data-os">
              <span>Total-{total}</span>
              <span>Sum-{sum}</span>
            </div>
            <div className="WishListNumber-col-1-list-number-os">
              {productname}
            </div>
            <span className="lg:text-lg text-sm text-[red]">
              {props.comingsoon === "NO"
                ? `Book for - ${formatDate(props.comingsoon_date)}`
                : ""}
            </span>
          </div>
          <div className="WishListNumber-col-2-os">
            <button
              className=""
              onClick={() => {
                updateWishlist();
                addToCart(
                  { ...props, number: props?.number, tag: "new" },
                  () => {
                    Router.push("/details");
                  }
                );
                removeFromWishList(props?.id);
                setWishList(true);
              }}
              disabled={wishList}
              aria-label="Buy Now"
            >
              Buy Now
              <span>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
            <div className="WishListNumber-addToCart-delete-btn-os">
              <button
                type="button"
                onClick={() => {
                  addToCart({ ...props, tag: "stay" });
                  removeFromWishList(props?.id);
                  setWishList(true);
                }}
                className="WishListNumber-addToCart-btn-os"
                disabled={wishList}
                aria-label="Add To Cart"
              >
                Add To Cart
                {/* <span>
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
                      fill="white"
                    />
                  </svg>
                </span> */}
                <HiOutlineShoppingCart fontSize={20} />
              </button>
              <button
                type="button"
                onClick={() => {
                  removeFromWishList(props?.id);
                  setWishList(true);
                }}
                className="WishListNumber-addToCart-btn-os"
                disabled={wishList}
                aria-label="Delete"
              >
                Delete
                {/* <span>
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
                      fill="white"
                    />
                  </svg>
                </span> */}
                <MdOutlineDelete fontSize={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistNumberData;
