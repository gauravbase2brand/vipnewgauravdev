"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./business.css";
import { useGetQueryParams } from "../utils";
import { getOrderBussiness, getProfile } from "../Services/Services";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const ScannerComponents = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { user, setNameUpdate } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { queryParams } = useGetQueryParams();
  const [area, setArea] = useState([]);
  const [isSucess, setIsSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const [data, setData] = useState({
    full_name: "",
    mobileNumber: "",
    pin_code: "",
    area: "",
    lag_lat: "",
    state_name: "",
    district: "",
    address: "",
    business_name: "",
    email: "",
  });
  const reff = useRef(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  // otp states ends
  const [profile, setProfile] = useState({
    first_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
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
    original_amount: "",
    city: profile?.city || "",
    post_office: "",
    district: "",
    state: profile?.state || "",
    seller_id: "2",
    otp: "",
  });
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
        const fullName = `${res?.firstname || ""} ${
          res?.lastname || ""
        }`.trim(); // Remove leading/trailing spaces from the full name
        setFormData((prevState) => ({
          ...prevState,
          first_name: res?.firstname || "",
          last_name: res?.lastname || "",
          mobile_number: res?.mobile || "",
          primary_email: res?.email || "",
          postal_code: address?.zip_code || "",
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
          pin_code: address?.zip_code || "",
          area: address?.city || "",
          district: res?.contact_cf?.district || "",
          state_name: address?.state || "",
          // dob: dateBirth?.date_of_birth || "",
          address: address?.address,
          business_name: res?.contact_cf?.business_name,
          email: res.email,
        }));
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
  const razarAmount = 149;
  function handleRzpClick() {
    const token = user?.token; // get the user's token data
    const orderData = {
      amount: razarAmount,
      currency: "INR",
    };

    getOrderBussiness(orderData, token).then((res) => {
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
          response.json().then(() => {
            if (orderdeclined) {
              localStorage.setItem("vipDeclined", true);
              Router.push("/payment-declined?orderId=" + orderId);
            } else {
              toast.success(
                "Thanks for your payment Please check your WhatsApp for QR Payment report."
              );
              try {
                axios.post(
                  `${apiUrl}/web/profile/update`,
                  {
                    action: "QR Payment",
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
    const selectedValue = e.target.value;

    if (selectedValue === "") {
      setData((prevData) => ({
        ...prevData,
        area: "",
        lag_lat: "",
        state_name: "",
        district: "",
      }));
      return;
    }

    const selectedOffice = area.find((item) => item.area === selectedValue);
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
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    const emailInput = document.querySelector("input[name='email']");
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity(); // Show the browser's error message
      return;
    }
    setIsSucess(true);
    if (user?.token) {
      const emptyFields = [];
      Object.keys(data).forEach((key) => {
        // Exclude 'district', 'address', and 'state_name' from validation
        if (
          data[key] === "" &&
          !["district", "state_name", "lag_lat"].includes(key)
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
            case "pin_code":
              fieldName = "Pin Code";
              break;
            case "area":
              fieldName = "Area";
              break;
            case "business_name":
              fieldName = "Business Name";
              break;
            case "address":
              fieldName = "Business Address";
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
        setIsSucess(false);
        return;
      }
      const invalidNames = [
        "loged-in",
        "loged in",
        "missed call",
        "call me back",
        "vip",
        "undefined",
        "null",
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
        setIsSucess(false);
        return;
      }
      try {
        const storedReferId = localStorage.getItem("referId");
        const response = await axios.post(
          `${apiUrl}/web/profile/update`,
          {
            full_name: data.full_name,
            mobile: data.mobileNumber,
            // primary_number: data.mobileNumber,
            email: data.email,
            // date_of_birth: data.dob,
            zip_code: data.pin_code,
            address: data.address,
            city: data.area,
            state: data.state_name,
            lag_lat: data.lag_lat,
            time_zone: "GMT+5:30",
            district: data.district,
            business_name: data.business_name,
            // refer_id: storedReferId === 'undefined' ? '' : storedReferId
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
        setIsSucess(false);
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
        setIsSucess(false);
      }
    } else {
      toast.warn("Enter your Number and otp..");
      setIsSucess(false);
    }
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${data?.pin_code}`,
        // params: { pincode: data?.pin_code },
        headers: {
          // 'x-rapidapi-key': 'ee11a73520msh3bc2c5ff2b05944p1db01ajsnb7329a946610',
          "x-rapidapi-key":
            "415e3ad969msha200b348b290cdfp12dcafjsn9e2296ee4904",
          "x-rapidapi-host":
            "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
        },
      };
      //rapidapi.com/vigowebs/api/india-pincode-with-latitude-and-longitude/playground/apiendpoint_15547456-819b-4f47-bcd7-61d21902bffb
      try {
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
    <div style={{ background: "#F9F5FF" }} id="bussiness-form">
      <div className="container-os">
        <div className="p-section">
          <div className="grid lg:grid-cols-[2fr_3fr] grir-col-1 lg:py-5 items-center">
            <div className="lg:w-[50%] w-full ">
              <Image
                src={`${panelImg}/assets/img/vip-images/Scanner_eflbzn.webp`}
                alt="Business Kit image"
                width={300}
                height={100}
                priority="true"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="pb-30">
                <h2 className="font-semibold text-[24px] leading-[30px] py-1 md:text-[36px] md:leading-[42px] text-center">
                  Fill Out the Form to Buy the
                  <span className="text-primary"> Business Kit </span>
                </h2>
              </div>
              <div className="main-3-first">
                {user?.token && (
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="text"
                        name="full_name"
                        id="fullName"
                        value={data?.full_name}
                        onChange={handleChange}
                        // placeholder={!data?.full_name ? "Name.." : ""}
                        className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                      />
                      <label
                        htmlFor="fullName"
                        className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data?.full_name
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Full Name
                      </label>
                    </div>
                  </div>
                )}
                {user?.token && (
                  // <div className="form-cont">
                  //   <label for="name">Business Name</label>
                  //   <input
                  //     type="text"
                  //     name="business_name"
                  //     value={data.business_name}
                  //     placeholder="Business Name"
                  //     onChange={handleChange}
                  //   />
                  // </div>
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="text"
                        id="businessName"
                        name="business_name"
                        value={data.business_name}
                        onChange={handleChange}
                        // placeholder="Name.."
                        className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                      />
                      <label
                        htmlFor="businessName"
                        className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data?.business_name
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Business Name
                      </label>
                    </div>
                  </div>
                )}
                {user?.token && (
                  <div className="w-full">
                    <div className="relative">
                      <input
                        type="text"
                        name="mobileNumber"
                        value={data.mobileNumber}
                        onChange={handleChange}
                        disabled={user?.token && data.mobileNumber !== ""}
                        className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                      />
                      <label
                        className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data.mobileNumber
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Business Number
                      </label>
                    </div>
                  </div>
                )}
              </div>
              {!user?.token && (
                <div className="partner-vip flex justify-center">
                  <button
                    className="button-gk"
                    type="button"
                    onClick={() => setActiveSignInWithOtp(true)}
                    disabled={isSucess}
                    aria-label="VIP Partner"
                  >
                    Become VIP Partner: ₹149 Only{" "}
                    {isSucess && (
                      <span className="dot-loader ml-2 flex">
                        <span className=" animate-bounce delay-0 bg-white h-[10px] w-[10px] rounded-full"></span>
                        <span className=" animate-bounce delay-200 bg-white h-[10px] w-[10px] rounded-full mx-1"></span>
                        <span className=" animate-bounce delay-400 bg-white h-[10px] w-[10px] rounded-full"></span>
                      </span>
                    )}
                  </button>
                </div>
              )}
              {user?.token && (
                <div className="main-3-last">
                  {/* <div className="form-cont">
                    <label for="name">Enter Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={data?.email}
                      placeholder="Enter your email"
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="w-full">
                    <div className="relative">
                      <input
                        id="email"
                        type="text"
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data?.email
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Enter your email
                      </label>
                    </div>
                  </div>

                  {/* <div className="form-cont">
                    <label for="name">Postcode</label>
                    <input
                      type="text"
                      name="pin_code"
                      value={data.pin_code}
                      placeholder="Pin Code"
                      onChange={handleChange}
                      maxLength={6}
                    />
                    <span
                      style={{ color: "red" }}
                    >{`${data.state_name} ${data.district}`}</span>
                  </div> */}
                  <div className="w-full">
                    <div className="relative">
                      <input
                        id="pinCode"
                        type="text"
                        name="pin_code"
                        value={data.pin_code}
                        onChange={handleChange}
                        maxLength={6}
                        className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                      />
                      <label
                        htmlFor="pinCode"
                        className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                          data?.pin_code
                            ? "-top-2 left-2.5 text-xs text-primary scale-90"
                            : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                        }`}
                      >
                        Postcode
                      </label>
                    </div>
                    <span
                      style={{ color: "red" }}
                    >{`${data.state_name} ${data.district}`}</span>
                  </div>

                  {/* <div className="form-cont">
                    <label for="name">City</label>
                    <select
                      className="select_area"
                      onChange={handleAreaChange}
                      value={data?.area}
                      disabled={loading}
                    >
                      <option value="">Select</option>
                      {area.map((item) => (
                        <option key={item.area} value={item.area}>
                          {item.area}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div className="w-full">
                    <div className="relative">
                      <label
                        className="absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 -top-2 text-xs text-primary scale-90 transition-all transform origin-left capitalize"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <select
                        id="city"
                        className={`peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4 ${
                          loading ? "cursor-not-allowed opacity-70" : ""
                        }`}
                        onChange={handleAreaChange}
                        value={data?.area}
                        disabled={loading}
                      >
                        <option value="" className="text-gray-500">
                          Select
                        </option>
                        {area.map((item) => (
                          <option key={item.area} value={item.area}>
                            {item.area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              {user?.token && (
                // <div className="Business-Address-full">
                //   <div className="form-cont-Business ">
                //     <label for="name">Business Address</label>
                //     <input
                //       type="text"
                //       name="address"
                //       value={data.address}
                //       placeholder="Business Address"
                //       onChange={handleChange}
                //     />
                //   </div>
                // </div>

                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      id="business"
                      name="address"
                      value={data.address}
                      //  placeholder=" "
                      onChange={handleChange}
                      className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                    />
                    <label
                      htmlFor="business"
                      className={`absolute cursor-text bg-[#f9f5ff] px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                        data.address
                          ? "-top-2 left-2.5 text-xs text-primary scale-90"
                          : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                      }`}
                    >
                      Business Address
                    </label>
                  </div>
                </div>
              )}
              {user?.token && (
                <div className="">
                  <button
                    className="button-gk"
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSucess}
                    aria-label="VIP Partner"
                  >
                    Become VIP Partner: ₹149 Only{" "}
                    {isSucess && (
                      <span className="dot-loader ml-2 flex">
                        <span className=" animate-bounce delay-0 bg-white h-[10px] w-[10px] rounded-full"></span>
                        <span className=" animate-bounce delay-200 bg-white h-[10px] w-[10px] rounded-full mx-1"></span>
                        <span className=" animate-bounce delay-400 bg-white h-[10px] w-[10px] rounded-full"></span>
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerComponents;
