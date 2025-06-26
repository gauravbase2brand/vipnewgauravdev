import React from "react";
const AllCoupons = ({
  handleAccordion,
  setCouponCode,
  coupons,
  getRemainingDays,
  setIsApplyingCoupon,
  handleApplyCoupon,
  isApplyingCoupon,
  setShowCoupon,
  setIsChecked,
  setDeliveryCharges,
  couponCode={couponCode}
}) => {
  return (
    <div>
      <div className="OrderPlacement-order-summary-heading-os">
        <span>Apply Coupon Code</span>
        <span onClick={() => setShowCoupon(false)} className="cursor-pointer">
          Close
        </span>
      </div>
      <div className="apply-coupon-accordion">
        <div className="custom-accordion-container-rs">
          <div className="custom-accordion-item-rs">
            {/* <div
              onClick={() => handleAccordion("custom-link-1")}
              className={
                activeAccordion === "custom-link-1"
                  ? "custom-accordion-header-rs active"
                  : "custom-accordion-header-rs"
              }
            >
              {couponCode ? `${couponCode}` : ""}
              <input
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="coupon-code-input-rs"
              />
              <span className="custom-accordion-icon-rs">
                <svg
                  className={
                    activeAccordion === "custom-link-1" ? "icon-rotate-rs" : ""
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 5.854a.5.5 0 0 1 .708 0L8 11.5l5.646-5.646a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </div> */}
            <div>
              <ul className="custom-accordion-body-list-rs">
                {coupons.map((coupon, index) => {
                  const daysLeft = getRemainingDays(coupon.sales_end_date);
                  let expirationText = "";

                  if (daysLeft === 0) {
                    expirationText = "Expiring Today";
                  } else if (daysLeft === 1) {
                    expirationText = "Expiring in 1 day";
                  } else {
                    expirationText = `Expiring in ${daysLeft} days`;
                  }

                  return (
                    <div className="flex justify-between items-center cursor-pointer py-2">
                      <li
                        className="cursor-pointer rounded-sm border-[#c1b5b5] "
                        key={index}
                        onClick={() => {
                          if (!isApplyingCoupon) {
                            setCouponCode(coupon.coupon_code);
                            handleAccordion("custom-link-1");
                            setIsApplyingCoupon(false);
                            handleApplyCoupon(coupon.coupon_code);
                            setShowCoupon(false);
                            setDeliveryCharges(0);
                            setIsChecked(false);
                          }
                        }}
                        disabled={isApplyingCoupon}
                      >
                        <h2 className="md:text-lg text-sm">
                          {coupon.coupon_code}
                        </h2>
                        <div className="expiring-rs">{expirationText}</div>
                        <div>{coupon.discount_display}</div>
                      </li>
                      <button
                        className="  cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                        type="button"
                        onClick={() => {
                          setIsApplyingCoupon(false);
                          handleApplyCoupon(coupon.coupon_code);
                          // setCouponCode(coupon.coupon_code);
                          setShowCoupon(false);
                          setDeliveryCharges(0);
                          setIsChecked(false);
                        }}
                        disabled={couponCode===coupon.coupon_code}
                      >
                        {couponCode===coupon.coupon_code ? "Already applied" : "Apply"}
                      </button>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* {couponCode && (
          <button
            className="coupon-btn-rs"
            type="button"
            onClick={handleApplyCoupon}
            disabled={isApplyingCoupon}
            aria-label="Apply"
          >
            Apply
          </button>
        )} */}
      </div>
    </div>
  );
};

export default AllCoupons;
