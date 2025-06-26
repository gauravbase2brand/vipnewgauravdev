import React, { useState, useContext, useRef } from "react";
import CountrySelector from "../CountrySelector/CountrySelector";
import axios from "axios";
import "./SignInForm/SignInForm.css";
import RegisterLoginInputField from "../RegisterLoginInputField/RegisterLoginInputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { toast } from "react-toastify";
import Country from "../../api/Country.json";

const SignInWithPassword = () => {
  const ref = useRef();
  const Router = useRouter();
  const { setUserDetails, redirectTo, setRedirectTo, cartCache, addToCart,resend, setResend } =
    useContext(AppStateContext);
  const {
    activeSignInWithPassword,
    setActiveSignInWithPassword,
    activeSignInWithOtp,
    setActiveSignInWithOtp,
  } = useContext(MyRegisterSignInContext);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeForgetField, setActiveForgetField] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [forgot, setForgot] = useState();
  const [selectedCountry, setSelectedCountry] = useState({
    value: "IN",
    label: "India",
  });
  const countryOptions = Country.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resend) return;
    if (mobile.toString() === "") {
      setMobileError("Mobile number is required");
    } else if (!/^[0-9+]+$/.test(mobile)) {
      setMobileError("Mobile number should only contain numbers");
    } else {
      setMobileError("");
    }
    if (password === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (mobile.toString() !== "" && password !== "") {
      try {
        let curr = "";
        if (mobile?.startsWith("+91")) {
          curr = mobile?.slice(3, 13);
        } else {
          curr = mobile;
        }
        setResend(true);
        const response = await axios.post(`${apiUrl}/web/login`, {
          countryValue: selectedCountry,
          mobile: curr,
          password,
        });
        if (response.data.status === "success") {
          setUserDetails(response?.data?.data);
          setActiveSignInWithPassword(false);
          localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
          localStorage.setItem("mobileNumber", mobile);
          if (redirectTo) {
            if (cartCache) {
              const updatedCartCache = {
                ...cartCache,
                items: cartCache.items.map(item => ({
                  ...item,
                  tag: 'new', // Add the 'new' tag to each item
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

          // Create lead api after login
          const consoleData = localStorage.getItem("vipcre");
          const parsedData = JSON.parse(consoleData);
          // Extracting the token
          const token = parsedData.token;
          const storedReferId = localStorage.getItem("referId");
          const lead_page = localStorage.getItem("Lead-Page");
          // Logging the token
          await axios.post(
            `${apiUrl}/web/lead/create`,
            {
              mobile_number: mobile,
              first_name: `${parsedData?.user?.firstname}`,
              email: `${parsedData?.user?.email}`,
              ...(storedReferId && { refer_id: storedReferId === 'undefined' ? '' : storedReferId }),
              lead_page: lead_page,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (storedReferId) {
            await axios.post(
              `${apiUrl}/web/profile/update`,
              {
                refer_id: storedReferId === 'undefined' ? '' : storedReferId, // Assuming referId is available here
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
            response?.data?.message || "Incorrect password or mobile number"
          );
          setResend(false);
        }
      } catch (error) {
        toast.error("Login failed");
        setResend(false);
      }finally {
        setResend(false);
      }
    }
  };

  // Click on SignInWithOtp show otp popup
  const handleActiveOtp = () => {
    if (activeSignInWithPassword === true && activeSignInWithOtp === false) {
      setActiveSignInWithPassword(false);
      setActiveSignInWithOtp(true);
    } else {
    }
  };

  return (
    <>
      <section className="register-section-os signIn-page-os">
        <div className="container-os">
          <div className="register-row-os signIn-page-row-os">
            <button
              onClick={() => {
                setActiveSignInWithPassword(false);
              }}
              className="register-cross-button-os"
              aria-label="SignInWithPassword"
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
              {/* {props.mainHeading} */}Sign in or register to checkout
            </div>
            <div className="register-form-os">
              <div className="register-heading-os signIn-page-heading-os">
                {/* {props.subHeading} */}Please enter your information
              </div>
              <form
                className="register-form-data-os"
                onSubmit={(e) => {
                  if (!activeForgetField) {
                    handleSubmit(e);
                  } else {
                    e.preventDefault();
                    if (
                      forgot?.password &&
                      forgot?.confirmPassword &&
                      forgot?.password !== forgot?.confirmPassword
                    ) {
                      return;
                    }
                    axios
                      .post(`${apiUrl}/web/password/reset`, {
                        otp: forgot?.otp,
                        password: forgot?.password,
                        password_confirmation: forgot?.confirmPassword,
                        number: mobile,
                        session_id: forgot?.session_id,
                      })
                      .then((res) => {
                        toast.success("Password changed successfully!");
                        setActiveForgetField(false);
                      });
                  }
                }}
              >
                <div className="register-input-os signIn-page-country-selector-os">
                  <CountrySelector
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />
                </div>
                <div className="register-input-os signIn-page-country-selector-os">
                  <RegisterLoginInputField
                    id="mobile"
                    inputType="text"
                    inputPlaceholder="Mobile No.*"
                    value={mobile}
                    onChange={(e) => {
                      let filteredValue = e.target.value.replace(
                        /[^+0-9,]/g,
                        ""
                      );
                      setMobile(filteredValue || "");
                      if (filteredValue?.length < 10 && activeForgetField) {
                        return;
                      }
                      if (!activeForgetField) return;
                      axios
                        .post(`${apiUrl}/web/otp/send`, {
                          number: filteredValue,
                        })
                        .then((response) => {
                          if (response.data.status === "success") {
                            toast.success("OTP sent on mobile number");
                            setForgot({
                              ...forgot,
                              session_id: response?.data?.data?.Details,
                            });
                          } else {
                            toast.error(
                              response.data.message || "number not exits "
                            );
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                    ref={ref}
                  />
                  {mobileError && (
                    <div className="error-message">{mobileError}</div>
                  )}
                </div>
                {!activeForgetField && (
                  <div className="register-input-os">
                    <RegisterLoginInputField
                      id="password"
                      inputType="password"
                      inputPlaceholder="Password*"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
                  </div>
                )}
                <div className="resendOtp-loginWithPass-btn-os">
                  {/* <button
                    id="forgetPassword"
                    className="resendOtp-btn-os"
                    type="button"
                    onClick={() => {
                      setMobile("");
                      setForgot({});
                      setActiveForgetField(!activeForgetField);
                    }}
                    aria-label="Forget Password"
                  >
                    Forget Password
                  </button> */}
                  <div
                    className="loginWith-passwd-opt-os"
                    onClick={handleActiveOtp}
                  >
                    Login with OTP
                  </div>
                </div>

                {activeForgetField && (
                  <>
                    <div className="register-input-os">
                      <RegisterLoginInputField
                        id="otp"
                        inputType="number"
                        inputPlaceholder="OTP*"
                        value={forgot?.otp}
                        onChange={(e) => {
                          setForgot({ ...forgot, otp: e.target.value });
                        }}
                      />
                      {!forgot?.otp && (
                        <div className="error-message">Otp is required....</div>
                      )}
                    </div>
                    <div className="register-input-os">
                      <RegisterLoginInputField
                        id="newPassword"
                        inputType="password"
                        inputPlaceholder="Enter new Password*"
                        value={forgot?.password}
                        onChange={(e) => {
                          setForgot({
                            ...forgot,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="register-input-os">
                      <RegisterLoginInputField
                        id="confirmPassword"
                        inputType="password"
                        inputPlaceholder="Enter confirm password*"
                        value={forgot?.confirmPassword}
                        onChange={(e) => {
                          setForgot({
                            ...forgot,
                            confirmPassword: e.target.value,
                          });
                        }}
                      />
                    </div>
                    {forgot?.password &&
                      forgot?.confirmPassword &&
                      forgot?.password !== forgot?.confirmPassword && (
                        <div className="error-message">
                          {"Confirm password does not match"}
                        </div>
                      )}
                  </>
                )}

                <div className="signIn-submitBtn-os">
                  <SubmitButton buttonTitle="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInWithPassword;
