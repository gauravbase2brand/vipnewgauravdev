import React, { useState, useContext } from "react";
import axios from "axios";
import "./SignInForm.css";
import RegisterLoginInputField from "../../RegisterLoginInputField/RegisterLoginInputField";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { useRouter } from "next/navigation";
import { AppStateContext } from "../../../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../../../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const SignInForm = (props) => {
  const navigate = useRouter();
  const { setUserDetails,resend, setResend } = useContext(AppStateContext);
  const { setActiveSignInWithPassword } = useContext(MyRegisterSignInContext);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resend) return;
    if (mobile === "") {
      setMobileError("Mobile number is required");
    } else if (!/^[0-9]+$/.test(mobile)) {
      setMobileError("Mobile number should only contain numbers");
    } else {
      setMobileError("");
    }
    if (password === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
    if (mobile !== "" && password !== "") {
      try {
        setResend(true);
        const response = await axios.post(`${apiUrl}/web/login`, {
          mobile,
          password,
        });
        setUserDetails(response?.data?.data);
        setActiveSignInWithPassword(false);
        localStorage.setItem("vipcre", JSON.stringify(response?.data?.data));
        navigate.push("/");
      } catch (error) {
        setResend(false);
      }finally {
        setResend(false);
      }
    }
  };

  return (
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
            {props.mainHeading}
          </div>
          <div className="register-form-os">
            <div className="register-heading-os signIn-page-heading-os">
              {props.subHeading}
            </div>
            <form className="register-form-data-os" onSubmit={handleSubmit}>
              <div className="register-input-os signIn-page-country-selector-os">
                <RegisterLoginInputField
                  id="mobile"
                  inputType="number"
                  inputPlaceholder="Mobile No.*"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                {mobileError && (
                  <div className="error-message">{mobileError}</div>
                )}
              </div>
              <div className="register-input-os">
                <RegisterLoginInputField
                  id="password"
                  inputType={props.signInInputType}
                  inputPlaceholder={`${props.inputPlaceholder}*`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
              </div>
              <div className="signIn-submitBtn-os">
                <SubmitButton buttonTitle="Submit" />
              </div>
            </form>
            <div className="already-have-account-os signIn-new-customer-register-os">
              New Customer?
              <div>Register!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
