"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./seller.css";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import axios from "axios";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Image from "next/image";

export const SellNumber = () => {
  const { user, setContactData } = useContext(AppStateContext);
  const [sellers, setSellers] = useState([{ mobile_number: "", price: "" }]);
  const mobileRefs = useRef([]);
  const priceRefs = useRef([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [show, setShow] = useState(false);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const [wantCash, setWantCash] = useState("0");
  const [wantExchange, setWantExchange] = useState("0");
  const [thinkLater, setThinkLater] = useState("0");
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  useEffect(() => {
    if (mobileRefs.current[sellers.length - 1]) {
      mobileRefs.current[sellers.length - 1].focus(); // Focus the last mobile_number field
    }
  }, [sellers.length]);

  //for handle mobile Number and price..
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    // Validate while typing
    if (name === "mobile_number" && /[a-zA-Z]/g.test(value)) {
      return;
    }
    if (name === "price" && !/^\d*$/.test(value)) {
      return;
    }

    const newSellers = [...sellers];
    newSellers[index][name] = value;
    const newErrors = [...errors];
    if (!newErrors[index]) {
      newErrors[index] = {};
    }

    switch (name) {
      case "mobile_number":
        if (value[0] === "0") {
          newErrors[index].mobile_number =
            "Mobile number cannot start with zero";
        } else {
          newErrors[index].mobile_number = ""; // Clear error if valid
        }
        break;

      case "price":
        newErrors[index].price = ""; // Clear error if valid
        break;

      default:
        break;
    }

    setSellers(newSellers);
    setErrors(newErrors);
  };

  // here we duplicating the fields for add more numbers and with prices..
  const handleAddMore = () => {
    setSellers([...sellers, { mobile_number: "", price: "" }]);
    setErrors([...errors, { mobile_number: "", price: "" }]);
  };
  //here we remove the perticular row
  const handleRemove = (index) => {
    const newSellers = [...sellers];
    newSellers.splice(index, 1);
    setSellers(newSellers);
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };
  // whole data submitting one time with numbers and price..
  const handleSubmit = async () => {
    if (loading) return;
    // Prepare the payload for API request
    const payload = {
      name: user?.user?.firstname,
      mobile_number: user?.user?.mobile,
      primary_email: user?.user?.email,
      sell_number_details: sellers.map((seller) => ({
        sellnumber: seller.mobile_number.replace(/\D/g, ""), // Clean the number before sending
        amount: Number(seller.price),
      })),
      want_exchang: wantExchange,
      want_cash: wantCash,
      think_later: thinkLater,
    };

    // Send the request to the API
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/web/sellyournumber/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.data.status === "success") {
        setSellers([{ mobile_number: "", price: "" }]);
        setErrors([]);
        toast.success("Thanks, Our team will manually review it.");
        setShow(false);
      } else {
        console.error("Failed to submit form:", response.statusText);
        setLoading(false);
        toast.error("Failed..");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    } finally {
      setLoading(false); // Re-enable form submission
    }
  };
  // here i check the validation error and with focus also whose field have error and after error resolved
  // open the popup and user can edit the price also and in popup through user directly posted the data..
  const OpenPopup = () => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      setContactData(true);
      return;
    }
    const newErrors = sellers.map((seller) => {
      const error = {};
      const cleanedNumber = seller.mobile_number.replace(/\D/g, ""); // Remove non-digit characters
      // Mobile number validation
      if (!cleanedNumber) {
        error.mobile_number = "Mobile number is required";
      } else if (cleanedNumber.length !== 10) {
        error.mobile_number = "Mobile number must be exactly 10 digits";
      } else if (!/^[6-9]/.test(cleanedNumber)) {
        error.mobile_number = "Mobile number must start with 6, 7, 8, or 9";
      }
      // Price validation
      if (!seller.price) {
        error.price = "Price is required";
      } else if (seller.price[0] === "0" && seller.price.length > 1) {
        seller.price = String(Number(seller.price)); // Remove leading zeros
      } else if (seller.price[0] === "0") {
        error.price = "Price cannot start with zero";
      }
      return error;
    });

    setErrors(newErrors);

    // Check if there are no errors before submitting
    const isValid = newErrors.every((err) => Object.keys(err).length === 0);
    if (!isValid) {
      // Focus on the first field with an error
      for (let i = 0; i < newErrors.length; i++) {
        if (newErrors[i].mobile_number && mobileRefs.current[i]) {
          mobileRefs.current[i].focus();
          break;
        }
        if (newErrors[i].price && priceRefs.current[i]) {
          priceRefs.current[i].focus();
          break;
        }
      }
      return;
    }
    const allFieldsFilled = sellers.every(
      (seller) => seller.mobile_number && seller.price
    );
    if (allFieldsFilled) {
      setShow(true);
    } else {
      setShow(false); // Hide if any seller has empty fields
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedValue = checked ? "1" : "0";
    switch (value) {
      case "I want Cash":
        setWantCash(updatedValue);
        break;
      case "I want exchange (Better Value)":
        setWantExchange(updatedValue);
        break;
      case "I will think Later":
        setThinkLater(updatedValue);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="numerology-section-os main_pt">
        <div className="container-os">
          <div className="sell-page-bg">
            <h1>Earn money by Selling Your Phone Numbers </h1>
            <h2>KEEP NOTED</h2>
            <div className="text-white">
              <p>
                {" "}
                If your price is acceptable, you’ll get a reply or call. 📞{" "}
              </p>
              <p>
                {" "}
                If your price or Number is not acceptable, there will be no
                response.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5 items-center my-5">
            <div className="">
              <Image
                src={`${panelImg}/assets/img/vip-images/Saller-girl.webp`}
                alt="sellgirl"
                width={1000}
                height={100}
                priority="true"
              />
            </div>
            <div className="">
              <div className="">
                <h4 className="font-bold text-2xl md:text-3xl text-gray-800 capitalize">
                  Sell your Number
                </h4>
                <p className="mb-3">
                  Fill out the form below Secure a deal and make the most out of
                  your number today!
                </p>
              </div>
              {sellers.map((seller, index) => (
                <div key={index} className="flex flex-col  gap-4">
                  <>
                    <div className="flex gap-4 lg:flex-row flex-col ">
                      {/* <div className="gk-sell">
                          <span>
                            <label htmlFor={`mobile_number_${index}`}>
                              Mobile Number <span className="astrick">*</span>
                            </label>
                          </span>
                          <input
                            type="text"
                            name="mobile_number"
                            placeholder="Enter your Mobile Number"
                            value={seller.mobile_number}
                            onChange={(e) => handleChange(index, e)}
                            ref={(el) => (mobileRefs.current[index] = el)}
                          />
                          {errors[index]?.mobile_number && (
                            <p className="error-saller-rs">
                              {errors[index].mobile_number}
                            </p>
                          )}
                        </div> */}

                      <div className="w-full">
                        <div className="relative">
                          <input
                            id={`mobile_number ${index}`} // Ensure unique id based on index
                            type="text"
                            name="mobile_number"
                            value={seller.mobile_number}
                            onChange={(e) => handleChange(index, e)}
                            ref={(el) => (mobileRefs.current[index] = el)}
                            className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                          />
                          <label
                            htmlFor={`mobile_number ${index}`} // Match the label's htmlFor to input id
                            className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                              seller.mobile_number
                                ? "-top-2 left-2.5 text-xs text-primary scale-90"
                                : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                            }`}
                          >
                            Enter your Mobile Number{" "}
                            <span className="astrick">*</span>
                          </label>
                        </div>
                        {errors[index]?.mobile_number && (
                          <p className="error-saller-rs">
                            {errors[index].mobile_number}
                          </p>
                        )}
                      </div>

                      {/* <div className="gk-sell">
                          <span>
                            <label htmlFor={`price_${index}`}>
                              Price<span className="astrick">*</span>
                            </label>
                          </span>
                          <input
                            type="text"
                            name="price"
                            placeholder="Enter Price"
                            value={seller.price}
                            onChange={(e) => handleChange(index, e)}
                            ref={(el) => (priceRefs.current[index] = el)}
                            id="editPriceValue"
                          />
                          {errors[index]?.price && (
                            <p className="error-saller-rs">
                              {errors[index].price}
                            </p>
                          )}
                        </div> */}

                      <div className=" w-full">
                        <div className="relative">
                          <input
                            id={`editPriceValue ${index}`}
                            type="text"
                            name="price"
                            placeholder=" "
                            value={seller.price}
                            onChange={(e) => handleChange(index, e)}
                            ref={(el) => (priceRefs.current[index] = el)}
                            className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                          />
                          <label
                            htmlFor={`editPriceValue ${index}`}
                            className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                              seller.price
                                ? "-top-2 left-2.5 text-xs text-primary scale-90"
                                : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                            }`}
                          >
                            Enter Price <span className="astrick">*</span>
                          </label>
                        </div>
                        {errors[index]?.price && (
                          <p className="error-saller-rs">
                            {errors[index].price}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                  <div className="relative flex items-center justify-end gap-3 mb-[2px]">
                    {index > 0 && (
                      <button
                        onClick={() => handleRemove(index)}
                        aria-label="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="31"
                          viewBox="0 0 31 31"
                          fill="none"
                        >
                          <path
                            d="M15.5002 28.4166C22.6338 28.4166 28.4168 22.6337 28.4168 15.5C28.4168 8.3663 22.6338 2.58331 15.5002 2.58331C8.36649 2.58331 2.5835 8.3663 2.5835 15.5C2.5835 22.6337 8.36649 28.4166 15.5002 28.4166Z"
                            stroke=" var(--primary) "
                            strokeWidth="2.58333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10.3335 15.5H20.6668"
                            stroke=" var(--primary) "
                            strokeWidth="2.58333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                    {index === sellers.length - 1 && (
                      <button
                        className="add-more-form"
                        onClick={handleAddMore}
                        aria-label="Add more"
                      >
                        Add more
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="">
                <h4 className="border-b-[1px] border-primary  w-fit text-primary pb-[3px]">
                  KEEP NOTED
                </h4>
                <div className="flex items-center gap-3">
                  <p>
                    {" "}
                    If your price is acceptable, you’ll get a reply or call.{" "}
                  </p>
                  <span className="tot">
                    <svg
                      viewBox="0 0 128 128"
                      xmlns="http://www.w3.org/2000/svg"
                      id="fi_3351610"
                    >
                      <g fill="black">
                        <path d="m83.171 93.346-19.971-14.787a5.229 5.229 0 0 0 -7.714 1.719l-3.418 6.335a18.019 18.019 0 0 1 -13.656-23.655l5.994.173a6.271 6.271 0 0 0 6.411-6.981l-2.685-23.494c-.133-1.157-2.381-4.7-6.456-5.39a8.337 8.337 0 0 0 -6.876 1.925 45.535 45.535 0 0 0 44.705 77.43 8.35 8.35 0 0 0 5.1-4.988c1.422-3.797-.476-7.577-1.434-8.287zm-1.839 7.065a4.858 4.858 0 0 1 -2.97 2.9 42.035 42.035 0 0 1 -41.268-71.474 4.862 4.862 0 0 1 4-1.12 4.993 4.993 0 0 1 3.6 2.7l2.643 23.134a2.764 2.764 0 0 1 -.712 2.187 2.71 2.71 0 0 1 -2.12.9l-7.23-.208a1.725 1.725 0 0 0 -1.662 1.067 21.52 21.52 0 0 0 17.195 29.771 1.751 1.751 0 0 0 1.754-.906l4.005-7.422a1.729 1.729 0 0 1 2.552-.568l19.681 14.57a5.092 5.092 0 0 1 .532 4.469z"></path>
                        <path d="m57.528 53.506a18.23 18.23 0 0 1 12.286 21.277 5.25 5.25 0 0 0 10.257 2.247 28.734 28.734 0 0 0 -19.359-33.53 5.251 5.251 0 0 0 -3.184 10.007zm-.075-5.534a1.752 1.752 0 0 1 2.2-1.138 25.236 25.236 0 0 1 17 29.447 1.75 1.75 0 1 1 -3.419-.749 21.732 21.732 0 0 0 -14.644-25.362 1.753 1.753 0 0 1 -1.137-2.198z"></path>
                        <path d="m102.4 41.782a47.965 47.965 0 0 0 -30.19-22.735 5.25 5.25 0 1 0 -2.539 10.188 37.828 37.828 0 0 1 27.234 47.165 5.25 5.25 0 1 0 10.095 2.894 47.965 47.965 0 0 0 -4.6-37.512zm1.229 36.548a1.75 1.75 0 0 1 -3.364-.965 41.328 41.328 0 0 0 -29.744-51.526 1.75 1.75 0 0 1 .847-3.4 44.825 44.825 0 0 1 32.265 55.891z"></path>
                        <path d="m66.06 30.817a5.25 5.25 0 1 0 -2.746 10.135 28.726 28.726 0 0 1 20.263 35.1 5.25 5.25 0 0 0 10.151 2.687 39.226 39.226 0 0 0 -27.668-47.922zm24.285 47.025a1.751 1.751 0 0 1 -3.385-.895 32.224 32.224 0 0 0 -22.731-39.374 1.75 1.75 0 0 1 .916-3.378 35.726 35.726 0 0 1 25.2 43.647z"></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <p className="mb-2">
                  If your price or Number is not acceptable, there will be no
                  response.
                </p>
              </div>
              <button
                className="seller-button"
                onClick={() => OpenPopup()}
                aria-label="Submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div className="sell-modal-rs sell-display-block">
          <section className="sell-modal-main">
            <h2>Think Again!</h2>
            <h3>Is Your Price the Best and Investable?</h3>
            <div className="flex lg:flex-row justify-center gap-1 flex-col">
              <label>
                <input
                  type="checkbox"
                  value="I want Cash"
                  onChange={(e) => handleCheckboxChange(e)}
                  className="p-1"
                />
                I want Cash
              </label>
              <label>
                <input
                  type="checkbox"
                  value="I want exchange (Better Value)"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                I want exchange (Better Value)
              </label>
              <label>
                <input
                  type="checkbox"
                  value="I will think Later"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                I will think Later
              </label>
            </div>

            <p className="lg:text-lg text-sm lg:text-center">
              If your price is acceptable, you’ll get a reply or call. If your
              price or Number is not acceptable, there will be no response.
            </p>
            <div className="sell-pageButtons">
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                  document.getElementById(`editPriceValue ${0}`).focus();
                }}
                style={{ background: "red" }}
                aria-label="Edit Price"
              >
                Edit Price
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                aria-label="Submit"
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
