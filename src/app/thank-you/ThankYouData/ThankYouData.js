import React, { useContext, useEffect } from "react";
import "./ThankYouData.css";
import Link from "next/link";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useGetQueryParams } from "../../utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Feedback from "@/app/feedback/Feedback";

const OrderSubmitData = () => {
  const {
    addToCart,
    checkUser,
    relatedNumbers,
    setRelatedNumbers,
    user,
    cartItems,
    userProfile,
    openFeed,
    setOpenFeed,
    starRating,
    setStarRating,
  } = useContext(AppStateContext);
  const { queryParams } = useGetQueryParams();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { search } = usePathname();
  const params = new URLSearchParams(search);
  const queryParam = Object.fromEntries(params);
  const totalValue = cartItems?.length
    ? cartItems
        .reduce(
          (sum, item) =>
            sum + (parseFloat(item.unit_price?.replace(/,/g, "")) || 0),
          0
        )
        .toString()
    : "0";
  useEffect(() => {
    snaptr("track", "PURCHASE", {
      currency: "INR",
      success: "purchased",
    });
    // facebook purchase event....
    const eventId = crypto.randomUUID();
    const eventData = {
      eventName: "Purchase",
      eventId,
      emails: user?.user?.email || "",
      phones: user?.user?.mobile || "",
      firstName: user?.user?.firstname || "",
      lastName: user?.user?.lastname || "",
      country: "IND",
      userAgent: navigator.userAgent,
      sourceUrl: window.location.href,
      products: cartItems.map((item) => ({
        sku: item.productid.toString(), // correct productid as SKU
        quantity: item.sum || "", // dynamically use item quantity
        item_price: parseFloat(item.unit_price.replace(/,/g, "")) || 0,
      })),
      value: totalValue.toString(),
      currency: "INR",
    };

    try {
      const response = axios.post("/api/facebook-event", eventData);
    } catch (error) {
      console.error("Error sending Facebook Event:", error);
    }
    // if (localStorage.getItem("vipthankyou")) {
    // setTimeout(() => {
    //   localStorage.removeItem("vipthankyou");
    // }, 3000);
    // }
    //  else {
    //   Router.push("/");
    // }
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    localStorage.setItem("vipthankyou", true);
  };

  // render message functon
  const renderMessage = () => {
    if (queryParam?.status === "success") {
      return "Thanks, Your payment will be checked and order will be processed shortly";
    } else {
      return "Order Submitted Successfully!";
    }
  };

  const handleAddToCart = (item, index) => {
    if (!checkUser()) {
      // Router.push("/signinwithpassword");
    } else {
      if (!item.alreadyInCart) {
        addToCart({ ...item, product_id: item?.productid, tag: "new" });
        const updatedItem = { ...item, alreadyInCart: true };
        const updatedNumbers = [...relatedNumbers];
        updatedNumbers[index] = updatedItem;
        setRelatedNumbers(updatedNumbers);
      } else {
        // toast.warn("Already moved to cart!", "Warning");
      }
    }
  };
  return (
    <section className="OrderSubmitData-section-os">
      <div className="container-os">
        <div className="OrderSubmitData-row-os">
          <div className="OrderSubmitData-heading-os">Checkout</div>
          <div className="OrderSubmitData-submitted-row-os">
            <div className="OrderSubmitData-submitted-col-1-os">
              {renderMessage()}
            </div>
            <div className="OrderSubmitData-submitted-col-2-os">
              <Image
                src={`${panelImg}/assets/img/vip-images/download_mblksn.png`}
                alt="order completed"
                width={300}
                height={100}
                priority="true"
              />
            </div>
          </div>

          {/* Related nnumbers */}
          {relatedNumbers.length !== 0 ? (
            <div className="OrderSubmitData-addOn-number-row-os">
              {relatedNumbers?.map((items, index) => (
                <div
                  key={index}
                  className="OrderPlacement-add-on-number-row-os"
                >
                  <div className="OrderPlacement-add-on-number-col-1-os">
                    <div>
                      <span></span>
                    </div>
                    {items.productname}
                  </div>

                  <button
                    type="button"
                    className="OrderPlacement-add-on-number-cart-btn"
                    onClick={() => handleAddToCart(items, index)}
                    aria-label="Add to Cart"
                  >
                    {items.alreadyInCart ? "moved to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="block md:flex items-center">
            <div className="OrderSubmitData-submitted-message-row-os">
              <p>
                Thank you for Shopping with us for VIP Numbers.<span></span>
              </p>
              <p>You bought {queryParams?.count} VIP numbers today!</p>
              <p>
                Share your Shopping experience on social media and help us make
                our service faster and more reliable.
              </p>
              <div className="OrderSubmitData-submitted-social-link-row-os">
                <Link
                  href="https://www.facebook.com/vipnumbershop"
                  target="_blank"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 20.6911C0 30.9209 7.42973 39.4274 17.1468 41.1524V26.2913H12.0028V20.5762H17.1468V16.0031C17.1468 10.8591 20.4613 8.00243 25.1493 8.00243C26.6342 8.00243 28.2357 8.23048 29.7206 8.45854V13.7175H27.092C24.5766 13.7175 24.0056 14.9743 24.0056 16.5759V20.5762H29.4926L28.5786 26.2913H24.0056V41.1524C33.7227 39.4274 41.1524 30.9226 41.1524 20.6911C41.1524 9.31074 31.8931 0 20.5762 0C9.25929 0 0 9.31074 0 20.6911Z"
                      fill=" var(--primary) "
                    />
                  </svg>
                </Link>
                <Link href="https://twitter.com/vipnumbersshop" target="_blank">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5762 0C9.21337 0 0 9.21337 0 20.5762C0 31.9391 9.21337 41.1524 20.5762 41.1524C31.9391 41.1524 41.1524 31.9391 41.1524 20.5762C41.1524 9.21337 31.9391 0 20.5762 0ZM30.4647 15.5102C30.4785 15.7261 30.4785 15.9512 30.4785 16.1716C30.4785 22.914 25.3436 30.6806 15.9603 30.6806C13.0668 30.6806 10.3846 29.8401 8.12485 28.3933C8.53821 28.4393 8.9332 28.4576 9.35575 28.4576C11.7441 28.4576 13.9395 27.6493 15.6894 26.2806C13.448 26.2347 11.5649 24.7649 10.9219 22.7441C11.7073 22.8589 12.4146 22.8589 13.223 22.6522C12.0689 22.4177 11.0316 21.791 10.2873 20.8783C9.54294 19.9657 9.13752 18.8236 9.13988 17.6459V17.5816C9.81504 17.9628 10.6096 18.1971 11.4409 18.2292C10.7421 17.7635 10.169 17.1325 9.77237 16.3922C9.37579 15.6519 9.168 14.8252 9.16744 13.9854C9.16744 13.0347 9.41545 12.1666 9.86097 11.4134C11.1419 12.9903 12.7404 14.28 14.5525 15.1987C16.3645 16.1174 18.3496 16.6445 20.3787 16.7457C19.6576 13.2781 22.248 10.4718 25.362 10.4718C26.8317 10.4718 28.1545 11.0873 29.0869 12.0793C30.2397 11.8635 31.342 11.4317 32.3249 10.853C31.9436 12.0334 31.1445 13.0301 30.0835 13.6593C31.1123 13.5491 32.1044 13.2643 33.023 12.8647C32.3295 13.8843 31.4614 14.7892 30.4647 15.5102Z"
                      fill=" var(--primary) "
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/vip-number-shop/"
                  target="_blank"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5762 0C9.21214 0 0 9.21214 0 20.5762C0 31.9403 9.21214 41.1524 20.5762 41.1524C31.9403 41.1524 41.1524 31.9403 41.1524 20.5762C41.1524 9.21214 31.9403 0 20.5762 0ZM15.5393 29.1046H11.3726V15.6958H15.5393V29.1046ZM13.4303 14.0497C12.1142 14.0497 11.2633 13.1173 11.2633 11.9642C11.2633 10.7875 12.14 9.88301 13.4838 9.88301C14.8277 9.88301 15.6508 10.7875 15.6765 11.9642C15.6765 13.1173 14.8277 14.0497 13.4303 14.0497ZM30.7571 29.1046H26.5905V21.6736C26.5905 19.9439 25.986 18.7694 24.4793 18.7694C23.3283 18.7694 22.6445 19.5645 22.3423 20.3297C22.2309 20.6019 22.203 20.9877 22.203 21.3714V29.1025H18.0342V19.9718C18.0342 18.2978 17.9806 16.8982 17.9249 15.6936H21.545L21.7358 17.5562H21.8194C22.3681 16.6817 23.7119 15.3914 25.9603 15.3914C28.7017 15.3914 30.7571 17.2283 30.7571 21.1763V29.1046V29.1046Z"
                      fill=" var(--primary) "
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
                  target="_blank"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6477 20.2183L19.8338 17.972C19.4137 17.777 19.0686 17.9956 19.0686 18.4607V22.6917C19.0686 23.1568 19.4137 23.3754 19.8338 23.1804L24.6456 20.9342C25.0678 20.737 25.0678 20.4155 24.6477 20.2183ZM21.212 0C9.84788 0 0.635742 9.21214 0.635742 20.5762C0.635742 31.9403 9.84788 41.1524 21.212 41.1524C32.576 41.1524 41.7882 31.9403 41.7882 20.5762C41.7882 9.21214 32.576 0 21.212 0ZM21.212 28.9353C10.6795 28.9353 10.4952 27.9858 10.4952 20.5762C10.4952 13.1666 10.6795 12.2171 21.212 12.2171C31.7444 12.2171 31.9287 13.1666 31.9287 20.5762C31.9287 27.9858 31.7444 28.9353 21.212 28.9353Z"
                      fill=" var(--primary) "
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/vip_number_shop_official/"
                  target="_blank"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.5762 41.1524C31.9401 41.1524 41.1524 31.9401 41.1524 20.5762C41.1524 9.21228 31.9401 0 20.5762 0C9.21228 0 0 9.21228 0 20.5762C0 31.9401 9.21228 41.1524 20.5762 41.1524ZM21.0782 7.02478C17.2611 7.02478 16.7833 7.04011 15.2849 7.1091H15.2836C13.789 7.17808 12.767 7.41569 11.8728 7.76188C10.9357 8.11502 10.0869 8.66824 9.38557 9.38297C8.67035 10.0847 8.1167 10.9339 7.7632 11.8715C7.41701 12.7657 7.17812 13.7877 7.11042 15.2848C7.04271 16.782 7.02611 17.2598 7.02611 21.0768C7.02611 24.8926 7.04144 25.3704 7.11042 26.8714C7.1794 28.366 7.41701 29.388 7.7632 30.2822C8.11618 31.2197 8.6694 32.0689 9.3843 32.7707C10.0867 33.4851 10.9363 34.0379 11.8741 34.3905C12.7683 34.738 13.7903 34.9769 15.2849 35.0446C16.7833 35.1123 17.2611 35.1289 21.0782 35.1289C24.8952 35.1289 25.373 35.1135 26.8727 35.0446C28.3673 34.9756 29.3893 34.738 30.2835 34.3905C31.2199 34.0379 32.0694 33.4861 32.772 32.7707C33.4865 32.0683 34.0392 31.2187 34.3918 30.2809C34.7393 29.3867 34.9782 28.3647 35.0459 26.8701C35.1136 25.3716 35.1302 24.8939 35.1302 21.0768C35.1302 17.2611 35.1149 16.7833 35.0459 15.2823C34.9769 13.7877 34.7393 12.7657 34.3918 11.8715C34.0392 10.9338 33.4874 10.0856 32.772 9.38425C32.0694 8.66887 31.2199 8.11573 30.2835 7.76188C29.3893 7.41569 28.3673 7.1768 26.8701 7.1091C25.373 7.04139 24.8952 7.02478 21.0782 7.02478ZM21.0782 9.55671C24.83 9.55671 25.2746 9.57076 26.7565 9.63846C28.1272 9.70106 28.8707 9.92972 29.3663 10.1226C29.9766 10.3477 30.5287 10.7065 30.9823 11.1727C31.4741 11.6645 31.7769 12.1333 32.0324 12.7887C32.2253 13.2843 32.4539 14.0278 32.5165 15.3985C32.5842 16.8804 32.5983 17.3249 32.5983 21.0768C32.5983 24.8287 32.5842 25.2733 32.5165 26.7551C32.4539 28.1258 32.2253 28.8693 32.0324 29.365C31.8075 29.9743 31.4486 30.5275 30.9823 30.981C30.4905 31.4728 30.0216 31.7755 29.3663 32.031C28.8707 32.2239 28.1272 32.4526 26.7565 32.5152C25.2746 32.5829 24.8313 32.597 21.0782 32.597C17.325 32.597 16.8817 32.5829 15.3998 32.5152C14.0291 32.4526 13.2857 32.2239 12.79 32.031C12.1807 31.8062 11.6275 31.4472 11.174 30.981C10.7077 30.5275 10.3488 29.9743 10.1239 29.365C9.93105 28.8693 9.70238 28.1258 9.63979 26.7551C9.57208 25.2733 9.55803 24.8287 9.55803 21.0768C9.55803 17.3249 9.57208 16.8804 9.63979 15.3985C9.70238 14.0278 9.93105 13.2843 10.1239 12.7887C10.349 12.1784 10.7078 11.6263 11.174 11.1727C11.6658 10.6809 12.1347 10.3781 12.79 10.1226C13.2857 9.92972 14.0291 9.70106 15.3998 9.63846C16.8817 9.57076 17.3263 9.55671 21.0782 9.55671ZM22.4411 25.568C21.4018 25.8823 20.2857 25.8259 19.2833 25.4087C18.6431 25.1432 18.0697 24.7391 17.6044 24.2254C17.1391 23.7117 16.7935 23.1013 16.5924 22.438C16.3913 21.7747 16.3399 21.0751 16.4416 20.3895C16.5434 19.7039 16.7959 19.0494 17.181 18.4732C17.5661 17.8969 18.0742 17.4132 18.6686 17.0568C19.2631 16.7005 19.9292 16.4804 20.6189 16.4123C21.3086 16.3443 22.0049 16.43 22.6575 16.6634C23.3101 16.8967 23.9029 17.2719 24.3932 17.7618C25.1622 18.5283 25.6413 19.5379 25.7486 20.6184C25.8559 21.6988 25.5848 22.783 24.9816 23.6857C24.3783 24.5885 23.4804 25.2538 22.4411 25.568ZM18.3141 14.4038C17.4378 14.7668 16.6416 15.2989 15.9709 15.9695C14.6163 17.3241 13.8554 19.1612 13.8554 21.0768C13.8554 22.9924 14.6163 24.8296 15.9709 26.1841C17.3254 27.5386 19.1625 28.2996 21.0782 28.2996C22.9938 28.2996 24.8309 27.5386 26.1854 26.1841C26.8561 25.5134 27.3882 24.7172 27.7511 23.8409C28.1141 22.9646 28.3009 22.0253 28.3009 21.0768C28.3009 20.1283 28.1141 19.1891 27.7511 18.3128C27.3882 17.4365 26.8561 16.6402 26.1854 15.9695C25.5147 15.2989 24.7185 14.7668 23.8422 14.4038C22.9659 14.0409 22.0267 13.854 21.0782 13.854C20.1296 13.854 19.1904 14.0409 18.3141 14.4038ZM30.2941 14.3752C30.2021 14.5844 30.069 14.7729 29.9028 14.9297C29.5796 15.2346 29.1503 15.4016 28.7059 15.3951C28.2616 15.3886 27.8373 15.2092 27.5231 14.895C27.2089 14.5808 27.0295 14.1565 27.0231 13.7122C27.0166 13.2679 27.1835 12.8385 27.4884 12.5153C27.6452 12.3491 27.8338 12.216 28.0429 12.124C28.252 12.032 28.4775 11.9828 28.7059 11.9795C28.9344 11.9762 29.1612 12.0187 29.3729 12.1046C29.5847 12.1905 29.777 12.318 29.9386 12.4796C30.1001 12.6411 30.2276 12.8335 30.3135 13.0452C30.3994 13.2569 30.442 13.4837 30.4386 13.7122C30.4353 13.9406 30.3862 14.1661 30.2941 14.3752Z"
                      fill=" var(--primary) "
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.pinterest.com/VIP_NUMBER_SHOP/"
                  target="_blank"
                >
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9999 0C4.92481 0 0 4.92496 0 10.9999C0 15.6602 2.89931 19.644 6.9913 21.2468C6.89505 20.3764 6.80821 19.0379 7.0295 18.0878C7.22931 17.2293 8.31934 12.6201 8.31934 12.6201C8.31934 12.6201 7.99024 11.9612 7.99024 10.9869C7.99024 9.4574 8.87677 8.3155 9.98068 8.3155C10.9191 8.3155 11.3725 9.02015 11.3725 9.865C11.3725 10.8089 10.7716 12.2198 10.4614 13.5274C10.2023 14.6224 11.0105 15.5152 12.0903 15.5152C14.0455 15.5152 15.5483 13.4538 15.5483 10.478C15.5483 7.84435 13.6557 6.00287 10.9536 6.00287C7.82369 6.00287 5.98652 8.35043 5.98652 10.7765C5.98652 11.722 6.35068 12.7357 6.80516 13.2868C6.89497 13.3957 6.9082 13.4912 6.88148 13.6023C6.7979 13.9498 6.61241 14.6969 6.57592 14.8498C6.52793 15.0511 6.41647 15.0939 6.20807 14.9969C4.83419 14.3573 3.97529 12.3489 3.97529 10.7355C3.97529 7.26556 6.49635 4.07899 11.2434 4.07899C15.0592 4.07899 18.0247 6.79801 18.0247 10.4319C18.0247 14.223 15.6344 17.2739 12.3167 17.2739C11.2021 17.2739 10.1541 16.6949 9.79552 16.0109C9.79552 16.0109 9.24389 18.1111 9.11017 18.6258C8.86173 19.5813 8.19142 20.779 7.743 21.5095C8.77231 21.8282 9.86604 22 10.9999 22C17.0752 22 22 17.0753 22 10.9999C22 4.92496 17.0752 0 10.9999 0Z"
                      fill=" var(--primary) "
                    ></path>
                  </svg>
                </Link>
              </div>
              {!openFeed && (
                <div className="text-center p-3">
                  <span className="font-medium text-center">
                    Give Your Rating & Feedback
                  </span>
                  <div className="flex space-x-3 justify-center">
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
              <Link href="/" className="OrderSubmitData-continue-shopping-os">
                Continue Shopping
              </Link>
            </div>
            {openFeed && <Feedback userProfile={userProfile} page="Success" setOpenFeed={setOpenFeed} setStarRating={setStarRating}/>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSubmitData;
