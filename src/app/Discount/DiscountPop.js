import React, { useContext, useEffect, useState } from "react";
import "./couponDiscount.css";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { RotatingLines } from "react-loader-spinner";
import AddressPage from "./AddressPage";
const DiscountPop = () => {
  const { setDiscountPop } = useContext(AppStateContext);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loaderStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
  };
  const userData = localStorage.getItem("vipcre");
  const parsonData = JSON.parse(userData);
  const lead_page = localStorage.getItem("Lead-Page");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/discount/coupon/list`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCoupons(result.data);
        }
      })
      .catch((error) => console.error("Error fetching coupons:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCoupon = (coupon) => {
    navigator.clipboard.writeText(coupon);
    toast.info("Coupon copied");
    setDiscountPop(false);
  };
  return (
    <div className="discount_popup">
      <div className="container-os">
        <div className="discount_code-live">
          <>
            {parsonData.user.email !== "" && lead_page === "Get-Discount" ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-lg font-medium">Select Coupon</h1>
                  <button
                    className='cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-3 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-darktext "'
                    onClick={() => {
                      setDiscountPop(false);
                    }}
                    aria-label="Save for Later"
                  >
                    Close
                  </button>
                </div>
                <>
                  {isLoading ? (
                    <div style={loaderStyle}>
                      <RotatingLines
                        visible={true}
                        height="30"
                        width="30"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        aria-label="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <div className="all_coupons_rs">
                      <ul>
                        {coupons.map((coupon, index) => {
                          const daysLeft = getRemainingDays(
                            coupon.sales_end_date
                          );
                          let expirationText = "";

                          if (daysLeft === 0) {
                            expirationText = "Expiring Today";
                          } else if (daysLeft === 1) {
                            expirationText = "Expiring in 1 day";
                          } else {
                            expirationText = `Expiring in ${daysLeft} days`;
                          }

                          return (
                            <li
                              key={index}
                              className="coupon_copied"
                              onClick={() => handleCoupon(coupon.coupon_code)}
                            >
                              <div>
                                <div className="coupon_code_name">
                                  {coupon.coupon_code}
                                </div>
                                <div className="expiring_coupon_rs">
                                  {expirationText}
                                </div>
                                <div className="display_coupon">
                                  {coupon.discount_display}
                                </div>
                              </div>
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_538_280)">
                                    <path
                                      d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                                      stroke="black"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M4.16663 12.4998H3.33329C2.89127 12.4998 2.46734 12.3242 2.15478 12.0117C1.84222 11.6991 1.66663 11.2752 1.66663 10.8332V3.33317C1.66663 2.89114 1.84222 2.46722 2.15478 2.15466C2.46734 1.8421 2.89127 1.6665 3.33329 1.6665H10.8333C11.2753 1.6665 11.6992 1.8421 12.0118 2.15466C12.3244 2.46722 12.5 2.89114 12.5 3.33317V4.1665"
                                      stroke="black"
                                      strokeWidth="1.66667"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_538_280">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </>
              </div>
            ) : (
              <AddressPage setDiscountPop={setDiscountPop} />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default DiscountPop;
