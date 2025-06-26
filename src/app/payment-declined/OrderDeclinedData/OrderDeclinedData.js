import React, { useContext, useState, useEffect } from "react";
import "../OrderDeclined.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import OrderDeclinedOrderCard from "../OrderDeclinedOrderCard/OrderDeclinedOrderCard";
import Link from "next/link";
import Image from "next/image";
import Feedback from "@/app/feedback/Feedback";

const OrderDeclineddData = () => {
  const {
    cartItems,
    user,
    userProfile,
    starRating,
    setStarRating,
    openFeed,
    setOpenFeed,
  } = useContext(AppStateContext);
  const filteredCartItems = cartItems.filter((item) => item.tag === "new");
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { email, firstname, lastname, mobile } = user?.user || {};
  const [total, setTotal] = useState(0);
  // const { queryParams } = useGetQueryParams();
  // const Router = useRouter();
  // useEffect(() => {
  //   if (localStorage.getItem("vipDeclined")) {
  //     setTimeout(() => {
  //       localStorage.removeItem("vipDeclined");
  //     }, 3000);
  //   } else {
  //     Router.push("/");
  //   }
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

  // const alertUser = (e) => {
  //   localStorage.setItem("vipDeclined", true);
  // };

  useEffect(() => {
    let count = 0;
    filteredCartItems?.forEach((res) => {
      count = count + parseInt(res?.unit_price);
    });

    setTotal(count);
  }, [filteredCartItems]);

  const getName = () => {
    if (firstname || lastname) {
      return `${firstname || ""} ${lastname || ""}`;
    } else if (mobile || email) {
      return `${userProfile?.firstname || firstname} ${
        userProfile?.lastname || lastname
      }`;
    } else {
      return false;
    }
  };

  return (
    <>
      {filteredCartItems ? (
        <section className="OrderDeclined-section-os">
          <div className="container-os">
            <div className="OrderDeclined-main-row-os">
              {/* <div className="OrderDeclined-status-row-os">
                <div className="OrderDeclined-status-col-1-os">
                  <Image
                    src={`${panelImg}/assets/img/vip-images/payment-declined-icon_dhilaw.webp`}
                    alt="Payment Declined"
                    width={300} // Replace with actual image width
                    height={300} // Replace with actual image height
                    priority="true"
                  />
                </div>
                <div className="OrderDeclined-status-col-2-os">
                  <h5>Payment Declined</h5>
                  <p>
                    Your payment has failed. Please try again or contact support
                    for assistance.
                  </p>
                </div>
              </div> */}
              <div className="OrderDeclined-payment-row-os">
                <div className="OrderDeclined-payment-col-1-os">
                  <div className="OrderDeclined-payment-data-os">
                    <span className="heading-os">Name</span>
                    <span className="subHeading-os">{getName()}</span>
                  </div>
                  <div className="OrderDeclined-payment-data-os">
                    <span className="heading-os">Total</span>
                    <span className="subHeading-os">&#8377;{total}</span>
                  </div>
                </div>
                <div className="OrderDeclined-payment-col-2-os">
                  {/* Order Id {queryParams?.orderId} */}
                </div>
              </div>
              <div className="OrderDeclined-product-row-os">
                <h5>Payment Failed</h5>

                <div className="OrderDeclined-product-row-1-os">
                  <OrderDeclinedOrderCard total={total} />
                </div>

                <div className="WishListNumber-addtoCart-data-row-os">
                  <div className="WishListNumber-addtoCart-data-col-1-os underline">
                    <Link href="/details">Continue shopping</Link>
                  </div>
                  {!openFeed && (
                    <div>
                      <span className="font-medium">
                        Give Your Rating & Feedback
                      </span>
                      <div className="flex space-x-3">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            onClick={() => {
                              setStarRating(index + 1);
                              setOpenFeed(true);
                            }}
                            className={`h-8 w-8 cursor-pointer ${
                              index < starRating
                                ? "text-secondary"
                                : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="WishListNumber-addtoCart-data-col-2-os">
                    <Link href="/details">
                      Go to Cart
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
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {openFeed && <Feedback userProfile={userProfile} page="Failure" setOpenFeed={setOpenFeed} setStarRating={setStarRating}/>}
          </div>
        </section>
      ) : (
        <div className="loader-os">
          <Image
            src={`${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`}
            alt="loading..."
            width={300}
            height={100}
            priority="true"
          />
        </div>
      )}
    </>
  );
};

export default OrderDeclineddData;
