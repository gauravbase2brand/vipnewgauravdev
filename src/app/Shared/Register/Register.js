"use client";
import React, { useState, useContext, useEffect } from "react";
import "./Register.css";
import RegisterLoginInputField from "../RegisterLoginInputField/RegisterLoginInputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import axios from "axios";
import { MyRegisterSignInContext } from "../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { toast } from "react-toastify";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";

const Register = () => {
  const [firstName, setFitstName] = useState("");
  const [firstNameError, setFitstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [session, setSession] = useState("");
  const navigate = useRouter();
  // Gmail and Yahoo suggestion
  const [suggestionEmail, setSuggestionEmail] = useState("");
  // register data usecontext
  const { setUserDetails, redirectTo, setRedirectTo, addToCart, cartCache } =
    useContext(AppStateContext);
  const {
    activeRegisterForm,
    setActiveRegisterForm,
    activeSignInWithPassword,
    setActiveSignInWithPassword,
  } = useContext(MyRegisterSignInContext);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;

  const handleHideRegister = () => {
    if (activeRegisterForm) {
      setActiveRegisterForm(false);
    }
  };

  const handleSignInPopup = () => {
    if (activeRegisterForm === true && activeSignInWithPassword === false) {
      setActiveRegisterForm(false);
      setActiveSignInWithPassword(true);
    }
  };

  const validateForm = () => {
    let valid = true;
    if (firstName === "") {
      setFitstNameError("First Name is required");
      valid = false;
    } else if (firstName.length < 3) {
      setFitstNameError("First Name should be at least 3 characters long");
      valid = false;
    } else {
      setFitstNameError("");
    }
    if (lastName === "") {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
    }
    if (mobile === "") {
      valid = false;
    } else if (mobile.length < 10) {
      valid = false;
    }
    if (otp === "") {
      setOtpError("Otp is required....");
      valid = false;
    } else if (otp.length < 4) {
      setOtpError("otp should be at least 4 characters long");
      valid = false;
    } else {
      setOtpError("");
    }
    if (email === "") {
      setEmailError("Email is required");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (passwordConfirmation === "") {
      setPasswordConfirmationError("Password confirmation is required");
      valid = false;
    } else {
      setPasswordConfirmationError("");
    }
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match");
      valid = false;
    } else {
      setPasswordConfirmationError("");
    }
    return valid;
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleVerifyNumber = () => {
    if (password === passwordConfirmation) {
      let currMobile = mobile;
      if (mobile?.startsWith("+91")) {
        currMobile = mobile.slice(3, 13);
      }
      axios
        .post(`${apiUrl}/web/otp/send`, {
          number: currMobile,
        })
        .then((response) => {
          if (response.data.status === "success") {
            toast.success("Success message", "OTP Sent!");
            setOtpSent(response.data.data.Details);
            setSession(response.data.data.Details);
          } else {
            toast.error(
              response.data.message || "number not exits "
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleResendOTP = () => {
    handleVerifyNumber();
  };

  const handleConfirmPassword = (e) => {
    if (password === passwordConfirmation && password.length > 0) {
      let currMobile = mobile;
      if (mobile?.startsWith("+91")) {
        currMobile = mobile.slice(3, 13);
      }
      if (mobile?.startsWith("00")) {
        currMobile = mobile.slice(2, 12);
      }
      if (mobile?.startsWith("0")) {
        currMobile = mobile.slice(1, 11);
      }
      if (currMobile?.length < 10) {
        toast?.warning("", "Please enter mobile");
        return;
      }
      handleVerifyNumber();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError(
        "Confirm password is not matched with password"
      );
      return;
    } else {
      setPasswordConfirmationError();
    }
    if (!isChecked) {
      toast.warn("Please accept the terms and conditions");
      return;
    }
    if (!validateForm()) {
      return;
    }
    let currMobile = mobile;
    if (mobile?.startsWith("+91")) {
      currMobile = mobile.slice(3, 13);
    }
    const userData = {
      mobile: currMobile,
      otp,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      session_id: session,
      password_confirmation: passwordConfirmation,
    };
    try {
      axios.post(`${apiUrl}/web/register`, userData).then((response) => {
        if (response?.data?.status === "error") {
          toast.error(
            "Error message",
            response?.data?.message || "Something went wrong!"
          );
        } else {
          setStatusMessage("Registration successful!");
          toast.success(
            response?.data?.message,
            "Success message",
            { timeOut: 3000 }
          );

          setActiveRegisterForm(false);
          setUserDetails(response?.data?.data);
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
                  navigate.push(redirectTo);
                  setRedirectTo(null);
                },
                response?.data?.data?.token
              );
            } else {
              navigate.push(redirectTo);
              setRedirectTo(null);
            }
          }
        }
      });
    } catch (error) {
      setStatusMessage("Registration failed. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    handleConfirmPassword();
  }, [passwordConfirmation]);

  return (
    <section className="register-section-os">
      <div className="container-os">
        <div className="register-row-os">
          <button
            onClick={handleHideRegister}
            className="register-cross-button-os"
            aria-label="cross"
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
          <div className="register-main-heading-os">Register</div>
          <div className="register-heading-os signIn-page-heading-os">
            Fill out the form given below
          </div>
          <form className="register-form-os" onSubmit={handleSubmit}>
            <div className="register-form-data-os">
              <div className="register-input-os">
                <RegisterLoginInputField
                  inputType="text"
                  inputPlaceholder="First-Name"
                  value={firstName}
                  onChange={(event) => setFitstName(event.target.value)}
                  id="firstName"
                />
                {firstNameError && (
                  <p className="error-message">{firstNameError}</p>
                )}
              </div>
              <div className="register-input-os">
                <RegisterLoginInputField
                  id="lastName"
                  inputType="text"
                  inputPlaceholder="Last-Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
                {lastNameError && (
                  <p className="error-message">{lastNameError}</p>
                )}
              </div>
              <div className="register-input-os">
                <div className="register-input-email-with-postFix-os">
                  <RegisterLoginInputField
                    id="email"
                    inputType="text"
                    inputPlaceholder="Email"
                    value={email + suggestionEmail}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSuggestionEmail("");
                    }}
                  />
                  <div className="gmail-yahoo-postFix-os">
                    <span
                      onClick={() => {
                        setSuggestionEmail("@gmail.com");
                      }}
                    >
                      @gmail.com
                    </span>
                    <span
                      onClick={() => {
                        setSuggestionEmail("@yahoo.com");
                      }}
                    >
                      @yahoo.com
                    </span>
                  </div>
                </div>
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="register-input-os">
                <RegisterLoginInputField
                  id="mobile"
                  inputType="text"
                  inputPlaceholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => {
                    let filteredValue = e.target.value.replace(/[^+0-9,]/g, "");
                    setMobile(filteredValue || "");
                  }}
                  onBlur={(e) => {
                    if (
                      e.target.value?.length === 10 &&
                      password === passwordConfirmation &&
                      password.length > 8
                    ) {
                      handleVerifyNumber();
                    }
                  }}
                />
              </div>

              <div className="register-input-os">
                <RegisterLoginInputField
                  id="password"
                  inputType="password"
                  inputPlaceholder="Create Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>
              <div className="register-input-os">
                <RegisterLoginInputField
                  id="passwordConfirmation"
                  inputType="password"
                  inputPlaceholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                />
                {passwordConfirmationError && (
                  <p className="error-message">{passwordConfirmationError}</p>
                )}
              </div>
              {otpSent && (
                <>
                  <div className="register-input-os">
                    <RegisterLoginInputField
                      id="otp"
                      inputType="text"
                      inputPlaceholder="OTP"
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="resendOtp-btn-os"
                    onClick={handleResendOTP}
                    aria-label="Resend OTP"
                  >
                    Resend OTP
                  </button>
                </>
              )}
              <div className="register-input-os">
                <RegisterLoginInputField
                  id="session"
                  inputType="hidden"
                  value={session}
                  onChange={(event) => setSession(event.target.value)}
                />
              </div>
            </div>
            <div className="register-checkbox-os">
              <label className="container_checkbox-os ">
                By creating your account, you agree to VIP NUMBER SHOP&apos;s
                Privacy Policy and Terms of Use.
                <input type="checkbox" onChange={handleCheckboxChange} />
                <span className="checkmark"></span>
              </label>
            </div>

            <div className="register-signup-submitBtn-os">
              <SubmitButton buttonTitle="Submit" />
            </div>
            <p>{statusMessage}</p>
            <div className="already-have-account-os">
              Already have an Account?
              <div onClick={handleSignInPopup}>Sign in</div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Register;
