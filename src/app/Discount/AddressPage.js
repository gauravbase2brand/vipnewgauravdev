import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./couponDiscount.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

const AddressPage = ({ setDiscountPop }) => {
  const { user, userProfile, setNameUpdate } = useContext(AppStateContext);
  const [nameActive, setNameActive] = useState(false);
  const [area, setArea] = useState([]);
  const [emailActive, setEmailActive] = useState(false);
  const [postalActive, setPostalActive] = useState(false);
  const [addressActive, setAddressActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [instagramActive, setInstagramActive] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const lead_page = localStorage.getItem("Lead-Page");
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
  const [data, setData] = useState({
    full_name: "",
    mobileNumber: "",
    pin_code: "",
    area: "",
    state_name: "",
    district: "",
    address: "",
    email: "",
    instagramLink: "",
  });

  useEffect(() => {
    const fetchCountryDetails = async () => {
      const options = {
        method: "GET",
        url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${data.pin_code}`,
        headers: {
          "x-rapidapi-key":
            "415e3ad969msha200b348b290cdfp12dcafjsn9e2296ee4904",
          "x-rapidapi-host":
            "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        setArea(response.data);
      } catch (error) {
        console.error(
          "Error fetching country details:",
          error.response ? error.response.data : error.message
        );
        toast.error("Please check your pin code");
      }
    };

    if (data.pin_code.length === 6) {
      fetchCountryDetails();
    }
  }, [data.pin_code]);

  useEffect(() => {
    setData(() => ({
      full_name: `${userProfile?.firstname || ""} ${
        userProfile?.lastname || ""
      }`.trim(),
      mobileNumber: userProfile?.mobile || "",
      pin_code: userProfile?.address?.zip_code || "",
      area: userProfile?.address?.city || "",
      district: userProfile?.contact_cf?.district || "",
      state_name: userProfile?.address?.state || "",
      address: userProfile?.address?.address || "",
      email: userProfile?.email || "",
      instagramLink: userProfile?.instagramLink || "",
    }));
    setNameActive(!!(userProfile?.firstname || userProfile?.lastname));
    setEmailActive(!!userProfile?.email);
    setPostalActive(!!userProfile?.address?.zip_code);
    setAddressActive(!!userProfile?.address?.address);
    setDropdownActive(!!userProfile?.address?.city);
    setInstagramActive(!!userProfile?.instagramLink);
  }, [userProfile]);

  const isValidInstagramLink = (link) => {
    const regex = /^(https?:\/\/)?(www\.)?(instagram\.com)\/([a-zA-Z0-9_\.]+)\/?(\?[\w=&]+)?$/;
    return regex.test(link);
  };
  
    

  const handleFocus = (setActive) => {
    setActive(true);
  };

  const handleBlur = (value, setActive) => {
    setActive(value !== "");
  };

  const handleAreaChange = (e) => {
    const selectedOffice = area.find((item) => item.area === e.target.value);
    if (selectedOffice) {
      setData((prevData) => ({
        ...prevData,
        area: selectedOffice.area,
        state_name: selectedOffice.state,
        district: selectedOffice.district,
      }));
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        area: false, // Clear the error for the area field
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setFormErrors({ ...formErrors, [name]: false }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return; // Prevent multiple submissions
    }
    const errors = {};
    const isInfluencerPage = pathname === "/influencer";
    // Validate Instagram link if it's an influencer page
    if (isInfluencerPage && !isValidInstagramLink(data.instagramLink)) {
      errors.instagramLink = true;
      // toast.error("Please enter a valid Instagram link.");
    }
    // Validate all fields except mobileNumber
    Object.keys(data).forEach((key) => {
      if (
        !isInfluencerPage && // If not influencer page, validate all fields except mobileNumber and instagramLink
        key !== "mobileNumber" &&
        key !== "instagramLink" && // Exclude instagramLink from validation when not on influencer page
        !data[key].trim()
      ) {
        errors[key] = true;
      }
      if (isInfluencerPage && key !== "mobileNumber" && !data[key].trim()) {
        errors[key] = true; // Add instagramLink validation only if on influencer page
      }
    });

    // Additional validation for full_name
    const fullName = data.full_name.toLowerCase();
    if (
      invalidNames.includes(fullName) || // Check for invalid names
      /\d/.test(fullName) // Check if full_name contains a number
    ) {
      errors.full_name = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please Fill Required Fields with Correct Details");
      return; // Stop further execution when there are errors
    }
    setIsSubmitting(true);
    try {
      let storedReferId = localStorage.getItem("referId");
      let myReferId = localStorage.getItem("my_refer_id");
      let generatedReferId = myReferId;
      // Check pathname and generate random referId if path matches and no stored referId is found
      if (
        pathname === "/influencer" &&
        generatedReferId === "" &&
        lead_page !== "Get-Discount"
      ) {
        // Generate a 6-digit ID like vns160812
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        generatedReferId = randomNumber;
        localStorage.setItem("my_refer_id", generatedReferId);
      }

      await axios.post(
        `${apiUrl}/web/profile/update`,
        {
          full_name: data.full_name,
          mobile: data.mobileNumber,
          email: data.email,
          zip_code: data.pin_code,
          address: data.address,
          city: data.area,
          state: data.state_name,
          district: data.district,
          instagramLink: data.instagramLink,
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
          ...(generatedReferId && { my_refer_id: generatedReferId }),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setNameUpdate(true);
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
    } finally {
      setIsSubmitting(false); // Reset submitting state
      if (lead_page === "Influencer") {
        setDiscountPop(false);
      }
    }
  };

  return (
    <>
      <div className="" style={{ position: "relative" }}>
        <div className="flex items-center justify-between">
          <h2 className="text-center mb-2 font-semibold">{`${
            pathname === "/influencer"
              ? "Join Our Influencer Program"
              : "Fill Your Address"
          }`}</h2>
          <span className="close_address" onClick={() => setDiscountPop(false)}>
            Close
          </span>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className={`field ${nameActive ? "active" : ""}`}>
            <div className="relative w-full">
              <input
                id="name-input"
                type="text"
                name="full_name"
                value={
                  invalidNames.includes(data.full_name.toLowerCase())
                    ? ""
                    : data.full_name
                }
                onChange={handleChange}
                onFocus={() => handleFocus(setNameActive)}
                onBlur={(e) => handleBlur(e.target.value, setNameActive)}
                onInput={(e) => setNameActive(e.target.value !== "")}
                placeholder=" "
                className={`peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                  formErrors.full_name ? "border-red-500" : ""
                }`}
              />
              <label
                htmlFor="name-input"
                className={`absolute left-2.5 px-1 transition-all transform origin-left text-[16px] text-primary bg-white ${
                  data.full_name || nameActive
                    ? "-top-2 left-2.5 text-xs scale-90"
                    : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                }`}
              >
                Name
              </label>
            </div>
          </div>

          {/* <div className="field">
            <input
              type="number"
              id="number-input"
              value={data.mobileNumber}
              disabled
            />
          </div> */}
          <div className="relative w-full">
            <input
              type="number"
              id="number-input"
              value={data.mobileNumber}
              disabled
              placeholder=" "
              className="peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm"
            />
            <label
              htmlFor="number-input"
              className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                data.mobileNumber
                  ? "-top-2 left-2.5 text-xs scale-90"
                  : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
              }`}
            >
              Mobile No
            </label>
          </div>

          <div className={`field ${emailActive ? "active" : ""}`}>
            {/* <label htmlFor="email-input">Email</label>
            <input
              type="email"
              id="email-input"
              name="email"
              onFocus={() => handleFocus(setEmailActive)}
              onBlur={(e) => handleBlur(e.target.value, setEmailActive)}
              onInput={(e) => setEmailActive(e.target.value !== "")}
              value={data.email}
              onChange={handleChange}
              className={formErrors.email ? "error" : ""}
            /> */}
            <div className="relative w-full">
              <input
                type="email"
                id="email-input"
                name="email"
                onFocus={() => handleFocus(setEmailActive)}
                onBlur={(e) => handleBlur(e.target.value, setEmailActive)}
                onInput={(e) => setEmailActive(e.target.value !== "")}
                value={data.email}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              <label
                htmlFor="email-input"
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                  data.email
                    ? "-top-2 left-2.5 text-xs scale-90"
                    : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                }`}
              >
                Email
              </label>
            </div>
          </div>

          <div className={`field ${postalActive ? "active" : ""}`}>
            <div className="relative">
              <input
                type="number"
                id="postal-input"
                name="pin_code"
                onFocus={() => handleFocus(setPostalActive)}
                onBlur={(e) => handleBlur(e.target.value, setPostalActive)}
                onInput={(e) => setPostalActive(e.target.value !== "")}
                value={data.pin_code}
                onChange={handleChange}
                className={`peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                  formErrors.pin_code ? "border-red-500" : ""
                }`}

                // className={formErrors.pin_code ? "error" : ""}
              />
              <label
                htmlFor="postal-input"
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                  data.pin_code
                    ? "-top-2 left-2.5 text-xs scale-90"
                    : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                }`}
              >
                pin code
              </label>
            </div>
          </div>

          <div className={`field ${addressActive ? "active" : ""}`}>
            {/* <label htmlFor="address-input">Address</label>
            <input
              type="text"
              id="address-input"
              name="address"
              onFocus={() => handleFocus(setAddressActive)}
              onBlur={(e) => handleBlur(e.target.value, setAddressActive)}
              onInput={(e) => setAddressActive(e.target.value !== "")}
              value={data.address}
              onChange={handleChange}
              className={formErrors.address ? "error" : ""}
            /> */}

            <div className="relative w-full">
              <input
                type="text"
                id="address-input"
                name="address"
                onFocus={() => handleFocus(setAddressActive)}
                onBlur={(e) => handleBlur(e.target.value, setAddressActive)}
                onInput={(e) => setAddressActive(e.target.value !== "")}
                value={data.address}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                  formErrors.address ? "border-red-500" : ""
                }`}
              />
              <label
                htmlFor="address-input"
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                  data.address
                    ? "-top-2 left-2.5 text-xs scale-90"
                    : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                }`}
              >
                Address
              </label>
            </div>
          </div>

          <div className={`field ${dropdownActive ? "active" : ""}`}>
            {/* <label htmlFor="dropdown">Select a city</label>
            <select
              id="dropdown"
              name="area"
              onFocus={() => handleFocus(setDropdownActive)}
              onBlur={(e) => handleBlur(e.target.value, setDropdownActive)}
              onInput={(e) => setDropdownActive(e.target.value !== "")}
              onChange={handleAreaChange}
              value={data.area}
              className={formErrors.area ? "error" : ""}
            >
              <option value="" disabled>
                Select a city
              </option>
              {area.map((item) => (
                <option key={item.area} value={item.area}>
                  {item.area}
                </option>
              ))}
            </select> */}
            <div className="relative w-full">
              <select
                id="dropdown"
                name="area"
                onFocus={() => handleFocus(setDropdownActive)}
                onBlur={(e) => handleBlur(e.target.value, setDropdownActive)}
                onInput={(e) => setDropdownActive(e.target.value !== "")}
                onChange={handleAreaChange}
                value={data.area}
                className={`peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                  formErrors.area ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a city</option>
                {area.map((item) => (
                  <option key={item.area} value={item.area}>
                    {item.area}
                  </option>
                ))}
              </select>
              <label
                htmlFor="dropdown"
                className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                  data.area
                    ? "-top-2 left-2.5 text-xs scale-90"
                    : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                }`}
              >
                Select a city
              </label>
            </div>
          </div>

          {pathname === "/influencer" && (
            <>
              <div className={`field ${instagramActive ? "active" : ""}`}>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="instagramLink-input"
                    name="instagramLink"
                    value={data.instagramLink}
                    onChange={handleChange}
                    onFocus={() => handleFocus(setInstagramActive)}
                    onBlur={(e) =>
                      handleBlur(e.target.value, setInstagramActive)
                    }
                    placeholder=" "
                    className={`peer w-full bg-transparent placeholder-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary hover:border-primary shadow-sm ${
                      formErrors.instagramLink ? "border-red-500" : ""
                    }`}
                  />
                  <label
                    htmlFor="instagramLink-input"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 text-primary ${
                      data.instagramLink
                        ? "-top-2 left-2.5 text-xs scale-90"
                        : "top-[17px] peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90"
                    }`}
                  >
                    Instagram Handle 
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                  />
                  <span className="ml-2 text-[13px]">
                    Keep me up to date on news and offers
                  </span>
                </label>
              </div>
            </>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !isCheckboxChecked} // Disable button while submitting
          >
            {pathname ? "Submit" : "Check Offers"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddressPage;
