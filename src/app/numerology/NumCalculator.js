"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Numerology.css";
import NumerologyBtn from "./NumerologyBtn";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getOrderNumId, getProfile } from "../Services/Services";
import { useGetQueryParams } from "../utils";

import Image from "next/image";
import Link from "next/link";
const NumCalculator = () => {
  const {
    user,
    setUserDetails,
    addToCart,
    cartCache,
    setCartCache,
    redirectTo,
    setRedirectTo,
    addToWishList,
    setNameUpdate,
    resend,
    setResend,
  } = useContext(AppStateContext);
  const { queryParams } = useGetQueryParams();
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [area, setArea] = useState([]);
  const [rawTime, setRawTime] = useState("");
  const [session, setSession] = useState("");
  const [isOtpSucess, setIsOtpSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const [data, setData] = useState({
    full_name: "",
    dob: "",
    mobileNumber: "",
    email: "",
    pin_code: "",
    area: "",
    lag_lat: "",
    state_name: "",
    time_of_birth: "",
    district: "",
    address: "",
  });
  const [otp, setOtp] = useState("");
  const reff = useRef(false);
  const otpRef = useRef();
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  // otp states ends
  const [profile, setProfile] = useState({
    first_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
    billing_address: "",
    city: "",
    district: "",
    state: "",
  });
  const [formData, setFormData] = useState({
    first_name: profile?.full_name?.split(" ")[0] || "",
    last_name: profile?.full_name?.split(" ")[1] || "",
    mobile_number: profile?.mobile || "",
    primary_email: profile?.email || "",
    postal_code: profile?.zip_code || "",
    amount: "",
    billing_address: profile?.address || "",
    original_amount: "",
    city: profile?.city || "",
    post_office: "",
    district: "",
    state: profile?.state || "",
    seller_id: "2",
    otp: "",
  });
  // const [orderIds, setOrderIds] = useState("");
  const today = new Date().toISOString().split("T")[0];

  //redirect to tab
  useEffect(() => {
    if (queryParams?.isRetry) {
      reff.current = true;
    }
  }, [queryParams]);

  //user profile code
  useEffect(() => {
    if (user?.token) {
      getProfile(user?.token)?.then((res) => {
        setProfile(res);
        const address = res?.address || {};
        const dateBirth = res?.contactsubdetails || {};
        const fullName = `${res?.firstname || ""} ${
          res?.lastname || ""
        }`.trim(); // Remove leading/trailing spaces from the full name
        setFormData((prevState) => ({
          ...prevState,
          first_name: `${res?.firstname} ${res.lastname}` || "",
          last_name: res?.lastname || "",
          mobile_number: res?.mobile || "",
          primary_email: res?.email || "",
          postal_code: address?.zip_code || "",
          billing_address: address?.address || "",
          city: address?.city || "",
          district: res?.contact_cf?.district || "",
          state: address?.state || "",
          seller_id: "2",
          full_name: fullName,
        }));
        setData((prevState) => ({
          ...prevState,
          full_name: `${res?.firstname} ${res.lastname}` || "",
          mobileNumber: res?.mobile || "",
          email: res?.email || "",
          pin_code: address?.zip_code || "",
          area: address?.city || "",
          district: res?.contact_cf?.district || "",
          state_name: address?.state || "",
          dob: dateBirth?.date_of_birth || "",
          address: address?.address,
          time_of_birth: res?.contact_cf?.time_of_birth,
        }));
        if (res?.contact_cf?.time_of_birth) {
          setRawTime(res.contact_cf.time_of_birth);
        }
      });
    }
  }, [user]);
  // }, [user, addToWishList]);

  // Payment Integration code
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = async () => {};
    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  // Payment Integration code
  const razarAmount = 1999;
  function handleRzpClick(e) {
    // if (e) {
    //     e.preventDefault();
    // }
    const token = user?.token; // get the user's token data
    const orderData = {
      amount: razarAmount,
      currency: "INR",
    };

    getOrderNumId(orderData, token).then((res) => {
      // Create Razorpay options for the payment form
      const options = {
        key: "rzp_live_mMfqxRhCpzrpog",
        name: "VIP NUMBER SHOP",
        description: "Payment for VIP Mobile Number",
        image: `${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`,
        order_id: res?.data?.data?.order_id,
        handler: function (response) {
          ajaxRequest(response, false);
        },
        prefill: {
          name: formData.first_name + " " + formData.last_name,
          email: formData.primary_email,
          contact: formData.mobile_number,
        },
        notes: {
          address: formData.billing_address,
        },
        theme: {
          color: "#3399cc",
        },
        method: "upi",
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        ajaxRequest(response, true);
      });
      rzp1 && rzp1.open();
    });
  }
  // Payment Integration code
  function ajaxRequest(response, orderdeclined) {
    let data;
    let leadPayload = {};
    if (response.error) {
      data = {
        payment_status: 0,
        amount: razarAmount,
        user_id: 613,
        razorpay_payment_id: response.error.metadata.payment_id,
        razorpay_order_id: response.error.metadata.order_id,
        error_code: response.error.code,
        error_description: response.error.description,
        error_source: response.error.source,
        error_step: response.error.step,
        error_reason: response.error.reason,
      };
      leadPayload.payment_status = "failed";
      leadPayload.payment_id = response.error.metadata.payment_id; // Add payment_id to leadPayload
    } else {
      data = {
        payment_status: 1,
        amount: razarAmount,
        user_id: 613,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      };
      leadPayload.payment_status = "success";
      leadPayload.payment_id = response.razorpay_payment_id; // Add payment_id to leadPayload
    }
    const token = user?.token; // get the user's token data
    const orderId =
      response.razorpay_order_id || response.error.metadata.order_id;
    fetch(`${apiUrl}/web/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // use the user's token data
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Response is successful
          response.json().then((data) => {
            if (orderdeclined) {
              localStorage.setItem("vipDeclined", true);
              Router.push("/payment-declined?orderId=" + orderId);
            } else {
              toast.success(
                "Thanks for your payment Please check your WhatsApp for Numerology report."
              );
              try {
                axios.post(
                  `${apiUrl}/web/profile/update`,
                  {
                    action: "Numerology Payment",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${user?.token}`,
                    },
                  }
                );
              } catch (error) {
                console.error("Error during second update:", error);
              }
            }
          });
        } else {
          // Response is not successful
          response.json().then((data) => {
            toast.error(data.message);
            localStorage.setItem("vipDeclined", true);
            Router.push("/payment-declined");
            console.error(data);
          });
        }
      })
      .catch((error) => console.error(error));
  }

  const handleInputOtp = async (e) => {
    const enteredOtpValue = e.target.value;
    let currMobile = data.mobileNumber;
    if (/^[0-9]*$/.test(enteredOtpValue)) {
      setOtp(enteredOtpValue);
      if (currMobile.length == 10 && session && enteredOtpValue.length == 6) {
        try {
          const response = await axios.post(`${apiUrl}/web/login`, {
            mobile: currMobile.toString(),
            otp: enteredOtpValue,
            countryValue: "India",
            session_id: session,
          });
          if (response?.data?.status === "success") {
            setUserDetails(response?.data?.data);
            localStorage.setItem(
              "vipcre",
              JSON.stringify(response?.data?.data)
            );
            localStorage.setItem("mobileNumber", currMobile);
            localStorage.setItem("userToken", response?.data?.data?.token);
            if (redirectTo) {
              if (cartCache) {
                const updatedCartCache = {
                  ...cartCache,
                  items: cartCache.items.map((item) => ({
                    ...item,
                    tag: "new", // Add the 'new' tag to each item
                  })),
                };
                addToCart(
                  updatedCartCache,
                  () => {
                    Router.push(redirectTo);
                    setRedirectTo(null);
                  },
                  response?.data?.data?.token
                );
              } else {
                Router.push(redirectTo);
                setRedirectTo(null);
              }
            }
            toast.success("Login successful");
            setIsOtpSucess(true);
            setCartCache("");
            const token = response?.data?.data?.token;
            const storedReferId = localStorage.getItem("referId");
            if (storedReferId) {
              await axios.post(
                `${apiUrl}/web/profile/update`,
                {
                  refer_id: storedReferId === "undefined" ? "" : storedReferId, // Assuming referId is available here
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }
            const consoleData = localStorage.getItem("vipcre");
            const parsedData = JSON.parse(consoleData);
            const userName = parsedData?.user?.firstname
              ? parsedData?.user?.firstname
              : "Loged-In";
            const lead_page = localStorage.getItem("Lead-Page");
            await axios.post(
              `${apiUrl}/web/lead/create`,
              {
                mobile_number: data.mobileNumber,
                first_name: userName,
                ...(storedReferId && {
                  refer_id: storedReferId === "undefined" ? "" : storedReferId,
                }),
                lead_page: lead_page,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            );
          } else if (response.data.status === "error") {
            toast.error(
              response?.data?.message || "Incorrect otp or mobile number"
            );
          }
        } catch (error) {
          toast.error("Login failed please try again.");
        }
      }
    }
  };

  useEffect(() => {
    let currMobile = data.mobileNumber;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }

    if (!user?.token) {
      if (currMobile?.length === 10) {
        handleVerifyNumber();
      } else {
      }
    } else {
    }
  }, [data.mobileNumber]);

  const handleResendOTP = () => {
    handleVerifyNumber();
  };

  const handleVerifyNumber = async (showTimer) => {
    if (resend) return;
    let currMobile = data.mobileNumber;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }
    try {
      let apiEndpoint = "";
      if (currMobile.length === 10 && !user?.token) {
        apiEndpoint = `${apiUrl}/web/otp/send`;
      }
      setResend(true);
      const response = await axios.post(apiEndpoint, {
        number: parseInt(currMobile),
      });

      if (response.data.status === "success") {
        setSession(response.data.data.Details);
        toast.success("OTP sent on mobile number");
        otpRef.current.focus();
      } else if (response.data.status === "error") {
        toast.error(
          response?.data?.message || "Incorrect otp or mobile number"
        );
        setResend(false);
      }
    } catch (error) {
      console.error(error);
      setResend(false);
    } finally {
      setResend(false);
    }
  };

  useEffect(() => {
    if (data.area && area.length > 0) {
      const selectedOffice = area.find((item) => item.area === data.area);
      if (selectedOffice) {
        const lag_lat = `${selectedOffice.lat},${selectedOffice.lng}`;
        setData((prevData) => ({
          ...prevData,
          lag_lat: lag_lat,
        }));
      }
    }
  }, [data.area, area]);

  const handleAreaChange = (e) => {
    const selectedOffice = area.find((item) => item.area === e.target.value);
    if (selectedOffice) {
      const lag_lat = `${selectedOffice.lat}, ${selectedOffice.lng}`;
      setData((prevData) => ({
        ...prevData,
        area: selectedOffice?.area,
        lag_lat: lag_lat,
        state_name: selectedOffice?.state,
        district: selectedOffice?.district,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "time_of_birth") {
      setRawTime(value);
      const [hours, minutes] = value.split(":");
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedValue = `${formattedHours}:${minutes} ${period}`;
      setData({ ...data, [name]: formattedValue });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    const emailInput = document.querySelector("input[name='email']");
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity(); // Show the browser's error message
      return;
    }
    if (user?.token) {
      const emptyFields = [];
      Object.keys(data).forEach((key) => {
        // Exclude 'district', 'address', and 'state_name' from validation
        if (
          data[key] === "" &&
          !["district", "address", "state_name", "lag_lat"].includes(key)
        ) {
          let fieldName;
          switch (key) {
            case "full_name":
              fieldName = "Full Name";
              break;
            case "mobileNumber":
              fieldName = "Mobile Number";
              break;
            case "email":
              fieldName = "Email";
              break;
            case "dob":
              fieldName = "Date of Birth";
              break;
            case "pin_code":
              fieldName = "Pin Code";
              break;
            case "area":
              fieldName = "Area";
              break;
            case "time_of_birth":
              fieldName = "Time of Birth";
              break;
            default:
              fieldName = key;
          }
          emptyFields.push(fieldName);
        }
      });

      if (emptyFields.length > 0) {
        toast.warn(
          `Please fill in the following fields: ${emptyFields.join(", ")}`
        );
        return;
      }
      const invalidNames = [
        "loged-in",
        "loged in",
        "missed call",
        "call me back",
        "vip",
        "undefined",
        "-",
      ];
      // This pattern disallows any special characters, quotes, and symbols, allowing only letters, spaces, and hyphens
      const invalidCharPattern = /[^a-zA-Z\s-]/;

      const nameToCheck = data?.full_name?.toLowerCase().trim();

      if (
        invalidNames.includes(nameToCheck) ||
        invalidCharPattern.test(data?.full_name) ||
        !data?.full_name.trim()
      ) {
        toast.error(`Enter Correct Name`);
        return;
      }
      try {
        setLoading(true);
        const storedReferId = localStorage.getItem("referId");
        const response = await axios.post(
          `${apiUrl}/web/profile/update`,
          {
            full_name: data.full_name,
            mobile: data.mobileNumber,
            // primary_number: data.mobileNumber,
            email: data.email,
            date_of_birth: data.dob,
            zip_code: data.pin_code,
            address: data.address,
            city: data.area,
            state: data.state_name,
            time_of_birth: data?.time_of_birth,
            lag_lat: data.lag_lat,
            time_zone: "GMT+5:30",
            district: data.district,
            ...(storedReferId && {
              refer_id: storedReferId === "undefined" ? "" : storedReferId,
            }),
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        setNameUpdate(true);
        handleRzpClick();
        await axios.post(
          `${apiUrl}/web/lead/create`,
          {
            mobile_number: data.mobileNumber,
            first_name: data.full_name,
            primary_email: data.email,
            postal_code: data.pin_code,
            billing_address: data.address,
            city: data.area,
            state: data.state_name,
            district: data.district,
            ...(storedReferId && {
              refer_id: storedReferId === "undefined" ? "" : storedReferId,
            }),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Enter your Number and otp..");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${data?.pin_code}`,
        headers: {
          // 'x-rapidapi-key': 'ee11a73520msh3bc2c5ff2b05944p1db01ajsnb7329a946610',
          "x-rapidapi-key":
            " 415e3ad969msha200b348b290cdfp12dcafjsn9e2296ee4904",
          "x-rapidapi-host":
            "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
        },
      };
      //rapidapi.com/vigowebs/api/india-pincode-with-latitude-and-longitude/playground/apiendpoint_15547456-819b-4f47-bcd7-61d21902bffb
      https: try {
        const response = await axios.request(options);
        setArea(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching country details:",
          error.response ? error.response.data : error.message
        );
        toast.error("please check your pin code");
      }
    };
    if (data.pin_code.length === 6) {
      fetchCountryDetails();
    }
  }, [data?.pin_code]);

  return (
    <section className="lg:py-10 py-6">
      <div className="container-os">
        <div className="grid lg:grid-cols-2 items-center gap-5 grid-cols-1 max-w-screen-xl m-auto ">
          <div className="">
            <div className="flex items-center lg:mb-6 mb-2 gap-3">
              <h2 className="font-semibold text-[26px] lg:leading-[40px] leading-[35px] text-HeadingText  md:text-[32px] lg:text-[35px]  tracking-wide ">
                {" "}
                <span
                  className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain 
                 text-primary font-bold px-2"
                >
                  Numerology
                </span>
                Calculator
              </h2>
            </div>

            <p className="font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext">
              In numerology, three numbers shape our destiny: the psychic
              number, destiny number, and name number. Our calculator simply
              needs your date of birth and name to reveal your lucky number.
              Once you know your lucky mobile number, dive into our VIP number
              collection. Explore a wide range of options to find the perfect
              match that aligns with your fortune and personal style.
            </p>
          </div>
          <div className="">
            <div className="flex flex-col gap-5 bg-[url('/assets/pnglight.webp')] bg-no-repeat bg-center bg-contain justify-center items-center  lg:p-7 md:p-5 p-2 rounded-2xl">
              {user?.token && (
                <div className="w-full">
                  <div className="relative">
                    <input
                      id="full_nameuser"
                      type="text"
                      value={data?.full_name}
                      name="full_name"
                      onChange={handleChange}
                      className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                    />
                    <label
                      htmlFor="full_nameuser"
                      className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                        data.full_name
                          ? "-top-2 left-2.5 text-xs text-primary scale-90"
                          : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                      }`}
                    >
                      Enter your full name
                    </label>
                  </div>
                </div>
              )}
              <div className="w-full">
                <div className="relative">
                  <input
                    id="mobileNumber"
                    type="number"
                    name="mobileNumber"
                    value={data.mobileNumber}
                    onChange={handleChange}
                    disabled={user?.token && data.mobileNumber !== ""}
                    className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                  />
                  <label
                    htmlFor="mobileNumber"
                    className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      data.mobileNumber
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter your mobile number
                  </label>
                </div>
              </div>

              {!user?.token && (
                <div className="">
                  <div className="relative">
                    <input
                      id="otpsms"
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={handleInputOtp}
                      ref={otpRef}
                      className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                    />
                    <label
                      htmlFor="otpsms"
                      className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                        otp
                          ? "-top-2 left-2.5 text-xs text-primary scale-90"
                          : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                      }`}
                    >
                      OTP
                    </label>

                    <button
                      type="button"
                      className="resendOtp-btn-os mt-3 mb-6"
                      onClick={handleResendOTP}
                      aria-label="Resend OTP"
                    >
                      Resend OTP
                    </button>
                    <h3 className="text-sm">
                      Get <span className="text-primary">1,500 Cashback</span>{" "}
                      with your Numerology Report. Cashback can be used only on{" "}
                      <Link href="/" className="text-primary">
                        www.vipnumbershop.com
                      </Link>
                    </h3>
                  </div>
                </div>
              )}
              {user?.token && (
                <>
                  <div className="w-full">
                    <div className="relative">
                      <input
                        id="email"
                        type="text"
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data.email
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Enter your email
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between w-full gap-3">
                    <div className="w-full">
                      <div className="relative">
                        <input
                          id="birthDate"
                          type="date"
                          name="dob"
                          value={data.dob}
                          onChange={handleChange}
                          className="iphone-field peer w-full bg-transparent text-black border border-primary  rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary hover:border-primary  shadow-sm text-[16px] leading-4"
                        />
                        <label
                          htmlFor="birthDate"
                          className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                            data.dob
                              ? "-top-2 left-2.5 text-xs text-primary scale-90"
                              : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                          }`}
                        >
                          Enter your DOB
                        </label>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          id="time_of_birth"
                          type="time"
                          name="time_of_birth"
                          value={rawTime}
                          onChange={handleChange}
                          className="iphone-field peer w-full bg-transparent text-black border border-primary  rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary hover:border-primary  shadow-sm text-[16px] leading-4"
                        />
                        <label
                          htmlFor="time_of_birth"
                          className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                            rawTime
                              ? "-top-2 left-2.5 text-xs text-primary scale-90"
                              : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                          }`}
                        >
                          Enter your Time Birth
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between w-full gap-3">
                    <div className="w-full">
                      <div className="relative">
                        <input
                          id="pin_code"
                          type="text"
                          name="pin_code"
                          value={data.pin_code}
                          onChange={handleChange}
                          maxLength={6}
                          placeholder=" "
                          className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                        />
                        <label
                          htmlFor="pin_code"
                          className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                            data.pin_code
                              ? "-top-2 left-2.5 text-xs text-primary scale-90"
                              : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                          }`}
                        >
                          Enter Pin Code (Birth Place)
                        </label>
                      </div>
                      <span className="text-red-600 text-sm block mt-1">{`${data.state_name} ${data.district}`}</span>
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <select
                          id="area"
                          onChange={handleAreaChange}
                          value={data?.area}
                          disabled={loading}
                          className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4 appearance-none"
                        >
                          <option value="" disabled>
                            Select Area
                          </option>
                          {area.map((item) => (
                            <option key={item.area} value={item.area}>
                              {item.area}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="area"
                          className={`absolute cursor-text bg-[#F9F9F9] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                            data.area
                              ? "-top-2 left-2.5 text-xs text-primary scale-90"
                              : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                          }`}
                        >
                          Select Area
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {user?.token && (
                <NumerologyBtn
                  title="Pay 1,999 For Numerology Report"
                  onClick={handleSubmit}
                />
              )}
            </div>
            <div className="text-center">
                <span className="mb-2 text-darktext text-center font-medium md:text-[18px] text-[15px]    w-full">
            Get <span className=" text-secondary"> 1,500</span> Cashback with your Numerology Report. <br/>

            Cashback valid for 30 days only.
          </span> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumCalculator;
