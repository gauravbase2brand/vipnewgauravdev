import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import '../../wishlist/WishListNumber/WishListNumber.css';
import '../../Shared/WishlistNumberData/WishlistNumberData.css'

const OrderDeclinedOrderCard = ({ total }) => {
  const { cartItems } = useContext(AppStateContext);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    router.push("/place-order"); // Change the URL
    setTimeout(() => {
      window.dispatchEvent(new Event("openRazorPay")); // Dispatch the custom event
    }, 3000);
  };
  const filteredCartItems = cartItems.filter((item) => item.tag === "new");
  return (
    <section className="OrderDeclinedOrderCard-section-os">
      {filteredCartItems.map((item) => (
        <div key={item.productId} className="WishListNumber-list-row-os">
          <div className="WishListNumber-premium-tag-os">
            {item.seller_type}
          </div>
          <div className="WishListNumber-list-col-1-os">
            <div className="WishListNumber-price-os">
              {`Rs.${parseFloat(item.unit_price).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}`}
            </div>
            <div className="WishListNumber-row-1-os">
              <div className="WishListNumber-col-1-os">
                <div className="WishListNumber-col-1-list-number-os">
                  {item.productname}
                </div>
              </div>
              <div className="OrderDeclinedOrderCard-col-2-os">
                <button className="Retry-payment-btn" onClick={handleClick}>
                  Retry{" "}
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default OrderDeclinedOrderCard;
