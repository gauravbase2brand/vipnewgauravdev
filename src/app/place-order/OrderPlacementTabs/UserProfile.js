import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserProfile = ({
  activeOrderTab,
  user,
  unwantedNames,
  formData,
  handleChange,
  handleBlur,
  ref,
  error,
  setFormData,
  optimizedFn,
  setError,
  showOtherCityInput,
  postOffices,
  handleCityChange,
  handleOtherCityChange,
  setDisplayProfile,
  setNameUpdate,
  checkValidations,
  setLeadUpdate,
  userProfile,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleProfile = async () => {
    if (loading) return;
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

    const nameToCheck = formData?.full_name?.toLowerCase().trim();

    if (
      !nameToCheck ||
      invalidNames.includes(nameToCheck) ||
      invalidCharPattern.test(formData?.full_name)
    ) {
      toast.error(`Enter Correct Name`);
      setDisplayProfile(true);
      document
        .getElementById("auto-focus")
        .scrollIntoView({ behavior: "smooth" });
      document.getElementById("auto-focus-name")?.focus();
      return;
    }
    const { isValid } = checkValidations();

    const element = document.querySelector(".OrderPlacement-section-os");
    if (!isValid) {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setDisplayProfile(true);
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${apiUrl}/web/profile/update`,
        {
          full_name: formData.full_name,
          mobile: formData.mobile_number,
          email: formData.primary_email,
          zip_code: formData.postal_code,
          address: formData.billing_address,
          city: formData.city,
          district: formData.district,
          state: formData.state,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setNameUpdate(true);
      router.push("/place-order");
    } catch (error) {
      console.error("Error during API request:", error);
      setLoading(false);
    } finally {
      setLoading(false);
      setDisplayProfile(false);
      setLeadUpdate(true);
    }
  };

  return (
    <div
      className={`OrderPlacement-ShippingAddress-content-main-row-os ${
        activeOrderTab === "order-tab-1"
          ? "OrderPlacement-content-os active"
          : "OrderPlacement-content-os"
      }`}
    >
      <p className=" text-center text-xl text-primary pn-5 font-bold mb-2">
        {user?.token ? "Fill Your Address" : "Login"}
      </p>
      {/* <button >Close</button> */}
      <div className="flex flex-row-reverse absolute top-[-19px] right-[-8px]">
        <button
          onClick={() => setDisplayProfile(false)}
          type="button"
          className="profile "
          aria-label="SignIn"
        >
          <svg
            width="40"
            height="40"
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
      </div>

      <div className="grid lg:grid-cols-1 gap-3 grid-cols-1 mb-3">
        {user?.token && (
          <div className="relative ">
            <input
              id="auto-focus-name"
              type="text"
              placeholder=" "
              name="full_name"
              value={
                unwantedNames.includes(formData.full_name?.toLowerCase().trim())
                  ? ""
                  : formData.full_name
              }
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer w-full p-3 text-gray-800  rounded-md border ${
                !formData.full_name && error.first_name
                  ? "border-red-500"
                  : "border-primary"
              } focus:outline-none focus:ring-1 focus:ring-primary `}
            />
            <label
              htmlFor="auto-focus-name"
              className={`absolute left-3 transition-all transform origin-left text-primary ${
                formData.full_name
                  ? "-top-2 text-sm text-primary scale-90 bg-white"
                  : "top-[14px] text-primary bg-white"
              } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
            >
              Full Name
            </label>
          </div>
        )}
        <div className="relative ">
          <input
            id="user_number_focus"
            type="text"
            placeholder=" "
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            disabled={user?.token && formData.mobile_number !== ""}
            ref={ref}
            pattern="[0-9]*"
            className={`peer w-full p-3 text-gray-800  rounded-md border ${
              error.mobile_number ? "border-red-500" : "border-primary"
            } focus:outline-none focus:ring-1 focus:ring-primary `}
          />
          <label
            htmlFor="user_number_focus"
            className={`absolute left-3 transition-all transform origin-left text-primary ${
              formData.mobile_number
                ? "-top-2 text-sm text-primary scale-90 bg-white"
                : "top-[14px] text-primary bg-white"
            } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
          >
            Phone Number
          </label>
          {error.mobile_number && (
            <div className="error-message text-red-500 text-sm mt-1">
              {error.mobile_number}
            </div>
          )}
        </div>
        <>
          {/* {!user?.token && (
            <div className="relative ">
              <input
                id="otpInput"
                type="text"
                placeholder=" "
                name="otp"
                value={otp}
                onChange={handleInputOtp}
                ref={otpRef}
                className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
              />
              <label
                htmlFor="otpInput"
                className={`absolute left-3 transition-all transform origin-left text-primary ${
                  otp
                    ? "-top-2 text-sm text-primary scale-90 bg-white"
                    : "top-[14px] text-primary bg-white"
                } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
              >
                OTP
              </label>
              <button
                type="button"
                className="absolute right-3 top-[10px] text-sm text-primary hover:underline"
                onClick={handleResendOTP}
                aria-label="Resend OTP"
              >
                Resend OTP
              </button>
            </div>
          )} */}
          {user?.token && (
            <div className="relative ">
              <input
                id="email"
                type="email"
                placeholder=" "
                name="primary_email"
                value={formData.primary_email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full p-3 text-gray-800  rounded-md border ${
                  !formData.primary_email && error.primary_email
                    ? "border-red-500"
                    : "border-primary"
                } focus:outline-none focus:ring-1 focus:ring-primary `}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 transition-all transform origin-left text-primary ${
                  formData.primary_email
                    ? "-top-2 text-sm text-primary scale-90 bg-white"
                    : "top-[14px] text-primary bg-white"
                } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
              >
                Email Id
              </label>
              {error.primary_email && (
                <div className="error-message text-red-500 text-sm mt-1">
                  {error.primary_email}
                </div>
              )}
              <p className="text-gray-700 italic cursor-pointer text-[14px] mt-[2px]">
                <span className="text-red-500"> Note:</span> This information is
                used solely for the VIP database and not for SIM registration
              </p>
            </div>
          )}
          {user?.token && (
            <div className="relative ">
              <input
                id="postalCode"
                type="text"
                placeholder=" "
                name="postal_code"
                value={formData.postal_code}
                onBlur={handleBlur}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const numbersOnly = /^[0-9]{0,6}$/;

                  if (value === "" || numbersOnly.test(value)) {
                    setFormData((prevState) => ({
                      ...prevState,
                      city: "",
                      district: "",
                      state: "",
                      postal_code: value,
                    }));

                    optimizedFn(value);
                    setError((prevState) => ({
                      ...prevState,
                      [name]: "",
                    }));
                  }
                }}
                className={`peer w-full p-3 text-gray-800  rounded-md border ${
                  (!formData.postal_code || formData.postal_code.length < 6) &&
                  error.postal_code
                    ? "border-red-500"
                    : "border-primary"
                } focus:outline-none focus:ring-1 focus:ring-primary `}
              />
              <label
                htmlFor="postalCode"
                className={`absolute left-3 transition-all transform origin-left text-primary ${
                  formData.postal_code
                    ? "-top-2 text-sm text-primary scale-90 bg-white"
                    : "top-[14px] text-primary bg-white"
                } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
              >
                Postal Code
              </label>

              {(!formData.postal_code || formData.postal_code.length < 6) &&
                error.postal_code && (
                  <div className="error-message text-red-500 text-sm mt-1">
                    {error.postal_code}
                  </div>
                )}
            </div>
          )}
          {formData.district && formData.state && (
            <p className="text-red-500">{`${formData.district}, ${formData.state}`}</p>
          )}
          {user?.token && (
            <div className="relative ">
              <input
                id="billingAddress"
                type="text"
                placeholder=" "
                name="billing_address"
                value={formData.billing_address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`peer w-full p-3 text-gray-800  rounded-md border ${
                  !formData.billing_address.trim() && error.billing_address
                    ? "border-red-500"
                    : "border-primary"
                } focus:outline-none focus:ring-1 focus:ring-primary `}
              />
              <label
                htmlFor="billingAddress"
                className={`absolute left-3 transition-all transform origin-left text-primary ${
                  formData.billing_address.trim()
                    ? "-top-2 text-sm text-primary scale-90 bg-white"
                    : "top-[14px] text-primary bg-white"
                } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
              >
                Address
              </label>

              {!formData.billing_address.trim() && error.billing_address && (
                <div className="error-message text-red-500 text-sm mt-1">
                  {error.billing_address}
                </div>
              )}
            </div>
          )}
          {formData.postal_code && (
            <>
              {user?.token && (
                <div className="relative ">
                  {!showOtherCityInput &&
                  postOffices.includes(formData?.city) ? (
                    <div className="relative">
                      <select
                        id="citySelect"
                        name="city"
                        value={formData.city}
                        onChange={handleCityChange}
                        onBlur={handleBlur}
                        className={`iphone-field peer w-full p-3 text-gray-800  rounded-md border ${
                          !formData.city && error.city
                            ? "border-red-500"
                            : "border-primary"
                        } focus:outline-none focus:ring-1 focus:ring-primary `}
                      >
                        {postOffices.map((postOffice, index) => (
                          <option key={index} value={postOffice}>
                            {postOffice}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      <label
                        htmlFor="citySelect"
                        className={`absolute left-3 transition-all transform origin-left text-primary ${
                          formData.city
                            ? "-top-2 text-sm text-primary scale-90 bg-white"
                            : "top-[14px] text-primary bg-white"
                        } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
                      >
                        City
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        id="cityInput"
                        type="text"
                        placeholder=" "
                        value={formData.city}
                        onChange={handleOtherCityChange}
                        onBlur={handleBlur}
                        className={`peer w-full p-3 text-gray-800  rounded-md border ${
                          !formData.city.trim() && error.city
                            ? "border-red-500"
                            : "border-primary"
                        } focus:outline-none focus:ring-1 focus:ring-primary `}
                      />
                      <label
                        htmlFor="cityInput"
                        className={`absolute left-3 transition-all transform origin-left text-primary ${
                          formData.city.trim()
                            ? "-top-2 text-sm text-primary scale-90 bg-white"
                            : "top-[14px] text-primary bg-white"
                        } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
                      >
                        Enter City
                      </label>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {postOffices.length === 0 &&
            !userProfile?.contact_cf?.district.trim() &&
            !userProfile?.address?.state.trim() && (
              <>
                <div className="relative ">
                  <input
                    id="districtInput"
                    type="text"
                    placeholder=" "
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full p-3 text-gray-800  rounded-md border ${
                      !formData.district.trim() && error.district
                        ? "border-red-500"
                        : "border-primary"
                    } focus:outline-none focus:ring-1 focus:ring-primary `}
                  />
                  <label
                    htmlFor="districtInput"
                    className={`absolute left-3 transition-all transform origin-left text-primary ${
                      formData.district.trim()
                        ? "-top-2 text-sm text-primary scale-90 bg-white"
                        : "top-[14px] text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
                  >
                    District
                  </label>

                  {!formData.district.trim() && error.district && (
                    <div className="error-message text-red-500 text-sm mt-1">
                      {error.district}
                    </div>
                  )}
                </div>
                <div className="relative ">
                  <input
                    id="stateInput"
                    type="text"
                    placeholder=" "
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`peer w-full p-3 text-gray-800  rounded-md border ${
                      !formData.state.trim() && error.state
                        ? "border-red-500"
                        : "border-primary"
                    } focus:outline-none focus:ring-1 focus:ring-primary `}
                  />
                  <label
                    htmlFor="stateInput"
                    className={`absolute left-3 transition-all transform origin-left text-primary ${
                      formData.state.trim()
                        ? "-top-2 text-sm text-primary scale-90 bg-white"
                        : "top-[14px] text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-[4px] `}
                  >
                    State
                  </label>
                  {!formData.state.trim() && error.state && (
                    <div className="error-message text-red-500 text-sm mt-1">
                      {error.state}
                    </div>
                  )}
                </div>
              </>
            )}
        </>
      </div>
      <button
        className="bg-primary rounded-md flex items-center justify-center gap-4 p-3 w-full  font-bold text-lg leading-5 text-whitetext cursor-pointer "
        type="button"
        onClick={handleProfile}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </div>
  );
};

export default UserProfile;
