"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import "../SignInWithPassword/SignInForm/SignInForm.css";
import RegisterLoginInputField from "../RegisterLoginInputField/RegisterLoginInputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { toast } from "react-toastify";
import Country from "../../api/Country.json";
import CountrySelector from "../CountrySelector/CountrySelector";

const SignInWithOtp = () => {
  const ref = useRef();
  const otpRef = useRef();
  const Router = useRouter();
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const {
    setUserDetails,
    redirectTo,
    setRedirectTo,
    cartCache,
    addToCart,
    contactData,
    setContactData,
    resend,
    setResend,
    setDiscountPop,
    setNumerologyPop,
  } = useContext(AppStateContext);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [session, setSession] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [useWhatsAppOtp, setUseWhatsAppOtp] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "India",
    label: "India",
  });
  const lead_page_route = localStorage.getItem("Lead-Page");
  const [resendWhatsapp, setWhatsappResend] = useState(false);
  const countryOptions = Country.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const isIndiaSelected = selectedCountry.value === "India";

  const handleVerifyNumber = async (showTimer) => {
    if (resend) return;
    if (!isIndiaSelected) {
      return false;
    }
    let currMobile = mobile;
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
      if (currMobile.toString()?.length < 10) {
        toast.error("Mobile number should be 10 digits");
        return;
      }
      setResend(true);
      let apiEndpoint = "";
      if (isIndiaSelected) {
        apiEndpoint = `${apiUrl}/web/otp/send`;
      }

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

  const handleResendOTP = () => {
    handleVerifyNumber();
    setUseWhatsAppOtp(false);
  };

  // Function to send OTP via WhatsApp
  const sendOtpToWhatsApp = (mobile) => {
    if (resendWhatsapp) return;
    const countryCode = Country.find(
      (country) => country.name === selectedCountry.value
    )?.code;
    toast.success("Please wait for a moment");
    setUseWhatsAppOtp(true);
    setWhatsappResend(true);
    fetch(`${apiUrl}/web/otpwapp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: mobile,
        countryCode: countryCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("OTP sent to WhatsApp");
        sessionStorage.setItem("vip-coolent", data.data.verification_token);
        setWhatsappResend(false);
      })
      .catch((error) => {
        toast.error("Failed to send OTP via WhatsApp");
        setWhatsappResend(false);
      });
  };

  useEffect(() => {
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }

    if (currMobile?.length === 10 && isIndiaSelected) {
      // sendOtpToWhatsApp(mobile);
      handleResendOTP();
    }
  }, [mobile, isIndiaSelected]);

  // counry handle change
  const handleCountrySelect = (val) => {
    setSelectedCountry({
      value: val.value,
      label: val.label,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resend) return;
    let currMobile = mobile;
    if (currMobile?.startsWith("+91")) {
      currMobile = currMobile.slice(3, 13);
    }
    if (currMobile?.startsWith("00")) {
      currMobile = currMobile.slice(2, 12);
    }
    if (currMobile?.startsWith("0")) {
      currMobile = currMobile.slice(1, 11);
    }
    if (currMobile === "") {
      setMobileError("Mobile number is required");
    } else if (!/^[0-9]+$/.test(currMobile)) {
    } else {
      setMobileError("");
    }

    if (otp === "") {
      setPasswordError("Otp is required....");
    } else {
      setPasswordError("");
    }

    if (currMobile !== "" && otp !== "" && !useWhatsAppOtp) {
      try {
        setResend(true);
        const response = await axios.post(`${apiUrl}/web/login`, {
          mobile: currMobile.toString(),
          otp,
          countryValue: selectedCountry,
          session_id: session,
        });

        if (response.data.status === "success") {
          setUserDetails(response?.data?.data);
          setActiveSignInWithOtp(false);
          localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
          localStorage.setItem("mobileNumber", currMobile);
          if (redirectTo) {
            if (cartCache) {
              Router.push(redirectTo);
              const updatedCartCache = {
                ...cartCache,
                items: cartCache.items.map((item) => ({
                  ...item,
                  tag: "new", // Add the 'new' tag to each item
                })),
              };
              setRedirectTo(null);
              addToCart(
                updatedCartCache,
                () => {},
                response?.data?.data?.token
              );
            } else {
              Router.push(redirectTo);
              setRedirectTo(null);
            }
          }
          toast.success("Login successful");
          // Create lead api after login
          const consoleData = localStorage.getItem("vipcre");
          const parsedData = JSON.parse(consoleData);
          // Extracting the token
          const token = parsedData.token;
          // Logging the token
          const userName = parsedData?.user?.firstname
            ? parsedData?.user?.firstname
            : "Loged-In";
          const storedReferId = localStorage.getItem("referId");
          const lead_page = localStorage.getItem("Lead-Page");
          if (lead_page !== "Book-Now") {
            await axios.post(
              `${apiUrl}/web/lead/create`,
              {
                mobile_number: mobile,
                first_name: userName,
                ...(storedReferId && {
                  refer_id: storedReferId === "undefined" ? "" : storedReferId,
                }),
                lead_page: lead_page,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
          if (lead_page === "Influencer" || lead_page === "Get-Discount") {
            setDiscountPop(true);
          } else if (lead_page === "Numurology") {
            setNumerologyPop(true);
          }
          setUseWhatsAppOtp(true);
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
        } else if (response.data.status === "error") {
          toast.error(
            response?.data?.message || "Incorrect otp or mobile number"
          );
          setResend(false);
        }
      } catch (error) {
        toast.error("Login failed please try again.");
        setResend(false);
      } finally {
        setResend(false);
      }
    }

    // except india and without otp login
    // if (currMobile !== "" && selectedCountry?.value !== "India") {
    //   try {
    //     const response = await axios.post(`${apiUrl}/web/login`, {
    //       mobile: currMobile.toString(),
    //       countryValue: selectedCountry,
    //       // session_id: session,
    //     });

    //     if (response.data.status === "success") {
    //       setUserDetails(response?.data?.data);
    //       setActiveSignInWithOtp(false);
    //       localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
    //       localStorage.setItem("mobileNumber", currMobile);
    //       if (redirectTo) {
    //         if (cartCache) {
    //           Router.push(redirectTo);
    //           setRedirectTo(null);
    //           const updatedCartCache = {
    //             ...cartCache,
    //             items: cartCache.items.map((item) => ({
    //               ...item,
    //               tag: "new", // Add the 'new' tag to each item
    //             })),
    //           };
    //           addToCart(
    //             updatedCartCache,
    //             () => {},
    //             response?.data?.data?.token
    //           );
    //         } else {
    //           Router.push(redirectTo);
    //           setRedirectTo(null);
    //         }
    //       }
    //       toast.success("Login successful");

    //       // Create lead api after login
    //       const consoleData = localStorage.getItem("vipcre");
    //       const parsedData = JSON.parse(consoleData);
    //       // Extracting the token
    //       const token = parsedData.token;
    //       // Logging the token
    //       const userName = parsedData?.user?.firstname
    //         ? parsedData?.user?.firstname
    //         : "Loged-In";
    //       const storedReferId = localStorage.getItem("referId");
    //       const lead_page = localStorage.getItem("Lead-Page");
    //       if (lead_page !== "Book-Now") {
    //         axios.post(
    //           `${apiUrl}/web/lead/create`,
    //           {
    //             mobile_number: mobile,
    //             first_name: userName,
    //             ...(storedReferId && {
    //               refer_id: storedReferId === "undefined" ? "" : storedReferId,
    //             }),
    //             lead_page: lead_page,
    //           },
    //           {
    //             headers: {
    //               "Content-Type": "application/json",
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );
    //       }
    //       if (lead_page === "Influencer" || lead_page === "Get-Discount") {
    //         setDiscountPop(true);
    //       } else if (lead_page === "Numurology") {
    //         setNumerologyPop(true);
    //       }
    //     } else if (response.data.status === "error") {
    //       toast.error(
    //         response?.data?.message || "Incorrect otp or mobile number"
    //       );
    //     }
    //   } catch (error) {
    //     toast.error("Login failed please try again.");
    //   }
    // }

    //whatsapp otp
    if (
      currMobile !== "" &&
      (selectedCountry?.value === "India" ||
        selectedCountry?.value !== "India") &&
      otp.length === 6 &&
      useWhatsAppOtp
    ) {
      const storedOtp = sessionStorage.getItem("vip-coolent");
      try {
        const response = await axios.post(`${apiUrl}/web/whatsapp-login`, {
          mobile: currMobile.toString(),
          otp,
          countryValue: selectedCountry,
          verification_token: storedOtp,
        });
        if (response.data.status === "success") {
          setUserDetails(response?.data?.data);
          setActiveSignInWithOtp(false);
          localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
          localStorage.setItem("mobileNumber", currMobile);
          if (redirectTo) {
            if (cartCache) {
              Router.push(redirectTo);
              setRedirectTo(null);
              const updatedCartCache = {
                ...cartCache,
                items: cartCache.items.map((item) => ({
                  ...item,
                  tag: "new", // Add the 'new' tag to each item
                })),
              };
              addToCart(
                updatedCartCache,
                () => {},
                response?.data?.data?.token
              );
            } else {
              Router.push(redirectTo);
              setRedirectTo(null);
            }
          }
          toast.success("Login successful");

          // Create lead api after login
          const consoleData = localStorage.getItem("vipcre");
          const parsedData = JSON.parse(consoleData);
          // Extracting the token
          const token = parsedData.token;
          // Logging the token
          const userName = parsedData?.user?.firstname
            ? parsedData?.user?.firstname
            : "Loged-In";
          const storedReferId = localStorage.getItem("referId");
          const lead_page = localStorage.getItem("Lead-Page");
          if (lead_page !== "Book-Now") {
            axios.post(
              `${apiUrl}/web/lead/create`,
              {
                mobile_number: mobile,
                first_name: userName,
                ...(storedReferId && {
                  refer_id: storedReferId === "undefined" ? "" : storedReferId,
                }),
                lead_page: lead_page,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          }
          if (lead_page === "Influencer" || lead_page === "Get-Discount") {
            setDiscountPop(true);
          } else if (lead_page === "Numurology") {
            setNumerologyPop(true);
          }
        } else if (response.data.status === "error") {
          toast.error(
            response?.data?.data?.mobile[0] || "Incorrect otp or mobile number"
          );
        }
      } catch (error) {
        toast.error("Login failed please try again.");
      }
    }
  };
  return (
    <>
      <section className="register-section-os signIn-page-os signInWithOtp-os">
        <div className="container-os">
          <div className="register-row-os signIn-page-row-os">
            <button
              type="button"
              onClick={() => {
                setActiveSignInWithOtp(false);
                setContactData(false);
              }}
              className="register-cross-button-os"
              aria-label="SignIn"
            >
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027"></circle>
                <path
                  d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                  fill="#EFEFEF"
                ></path>
              </svg>
            </button>
            <div className="register-main-heading-os signIn-page-main-heading-os">
              {lead_page_route === "Numurology"
                ? "Numerology Calculator"
                : lead_page_route === "Get-Discount"
                ? "Log in to get"
                : "Sign in or register to checkout"}
            </div>
            <div className="register-form-os">
              <div className="register-heading-os signIn-page-heading-os">
                {lead_page_route === "Get-Discount"
                  ? "Discount Now!"
                  : "Please enter your information"}
              </div>
              <form className="register-form-data-os" onSubmit={handleSubmit}>
                <div className="register-input-os signIn-page-country-selector-os">
                  <CountrySelector
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={handleCountrySelect}
                  />
                </div>

                <div className="register-input-os signIn-page-country-selector-os">
                  <RegisterLoginInputField
                    id="mobile"
                    inputType="text"
                    inputPlaceholder={
                      contactData ? "Enter Your Contact Number*" : "Mobile No*"
                    }
                    value={mobile}
                    onChange={(e) => {
                      const filteredValue = e.target.value.replace(
                        /[^0-9,]/g,
                        ""
                      );
                      setMobile(filteredValue || "");
                    }}
                    ref={ref}
                  />

                  {mobileError && (
                    <div className="error-message">{mobileError}</div>
                  )}
                </div>

                <div className="register-input-os">
                  <RegisterLoginInputField
                    id="otp"
                    inputType="text"
                    inputPlaceholder="OTP*"
                    value={otp}
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      if (/^[0-9]*$/.test(enteredValue)) {
                        setOtp(enteredValue);
                      }
                    }}
                    ref={otpRef}
                  />
                  {passwordError && (
                    <div className="error-message">{passwordError}</div>
                  )}
                </div>

                <div>
                  <RegisterLoginInputField
                    id="session"
                    inputType="hidden"
                    value={session}
                    onChange={(event) => setSession(event.target.value)}
                  />
                </div>
                {mobile.length === 10 && (
                  <>
                    <div className="resendOtp-loginWithPass-btn-os">
                      <button
                        type="button"
                        className="resendOtp-btn-os"
                        onClick={() => sendOtpToWhatsApp(mobile)}
                        aria-label="resendOtp"
                      >
                          Send whatsapp otp
                      </button>
                      {selectedCountry?.value === "India" && (
                        <button
                          type="button"
                          className="resendOtp-btn-os"
                          onClick={handleResendOTP}
                          aria-label="resendOtp"
                        >
                          Resend sms
                        </button>
                      )}
                    </div>
                  </>
                )}
                {/* {!isIndiaSelected && (
                  <div
                    className="loginWith-passwd-opt-os"
                    onClick={handleActivePassword}
                  >
                    Login with Password
                  </div>
                )} */}

                <div className="signIn-submitBtn-os">
                  <SubmitButton buttonTitle="Login" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInWithOtp;
