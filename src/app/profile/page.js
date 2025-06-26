"use client";
import { MdDelete } from "react-icons/md";

import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { getProfile, updateProfile } from "../Services/Services";
import LogoutModal from "../Shared/LogoutModal/LogoutModal";
import DeleteModal from "../Shared/DeleteModal/DeleteModal";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// Add these imports
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import en from "date-fns/locale/en-US";
import { FaAddressCard, FaRegUser } from "react-icons/fa";
import { TbPasswordMobilePhone } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
registerLocale("en-US", en);

const Profile = () => {
  //Address
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cities, setCities] = useState([]);
  //Changes Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useRouter();
  const { logout, user, setUserProfile,setProfileUpdate } = useContext(AppStateContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmationModalss, setShowConfirmationModalss] = useState(false);
  const [profileActive, setProfileActive] = useState("tab1");
  const [profile, setProfile] = useState({});
  const [useOtp, setUseOtp] = useState(false);
  const [otpDetails, setOtpDetails] = useState();
  const [mobile, setMobile] = useState();
  const [otp, setOtp] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [isAnniversaryFocused, setIsAnniversaryFocused] = useState(false);
  const [isBirthFocused, setIsBirthFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState(false);
  useEffect(() => {
    // Function to update the state based on the window size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Set true if the window width is <= 767px
    };

    // Set the initial state based on the window size
    handleResize();

    // Add event listener to update state on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAnniversaryFocus = () => {
    setIsAnniversaryFocused(true);
  };

  const handleAnniversaryBlur = () => {
    setIsAnniversaryFocused(false);
  };

  const handleBirthFocus = () => {
    setIsBirthFocused(true);
  };

  const handleBirthBlur = () => {
    setIsBirthFocused(false);
  };

  const handleProfile = (profileTab) => {
    setProfileActive(profileTab);
  };

  const sendOtp = (mob) => {
    axios
      .post(`${apiUrl}/web/otp/send`, {
        number: parseInt(mob),
      })
      .then((response) => {
        if (response.data.status === "success") {
          setOtpDetails(response.data.data.Details);
          toast.success("OTP sent on mobile number");
        }
      });
  };

  const handleZipCodeChange = async (event) => {
    const zipCode = event.target.value;
    if (zipCode.length === 6) {
      // Only try to look up location if pin code is complete
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${zipCode}`
        );
        const { PostOffice } = response.data[0];
        const { District, State, Name } = PostOffice[0];
        setCity(Name);
        setState(State);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    setZipCode(zipCode); // Always update zip code input value
  };

  useEffect(() => {
    const getCities = async () => {
      if (zipCode.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${zipCode}`
          );
          const { PostOffice } = response.data[0];
          const cityNames = PostOffice?.map((office) => office.Name);
          setCities(cityNames);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getCities();
  }, [zipCode]);

  //Address
  const handleSaveAddress = () => {
    if (addressData) return;
    setAddressData(true);
    const authToken = user.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`; // Set Authorization header with token
    axios
      .post(`${apiUrl}/web/address/update`, {
        zip_code: zipCode,
        address: address,
        city: city,
        state: state,
      })
      .then((response) => {
        // Handle successful response
        toast.success("Profile updated successfully.");
        setProfileUpdate(true);
      })
      .catch((error) => {
        toast.error("Failed to update profile.");
        console.error(error);
        setAddressData(false);
      })
      .finally(() => {
        setAddressData(false);
      });
  };

  useEffect(() => {
    if (user?.token) {
      const storedReferId = localStorage.getItem("referId");
      getProfile(user?.token)?.then((res) => {
        const fullName =
          `${res?.firstname.trim()} ${res?.lastname.trim()}`.trim(); // Remove leading/trailing spaces from firstname and lastname and trim the resulting full name
        setProfile({
          ...profile,
          full_name: fullName,
          mobile: res?.mobile || "",
          primary_number: res?.phone || "",
          email: res?.email || "",
          date_of_anniversary: res?.date_of_anniversary || "",
          date_of_birth: res?.contactsubdetails?.date_of_birth || "",
          bike_number: res?.contact_cf?.bike_number || "",
          car_number: res?.contact_cf?.car_number || "",
          house_number: res?.contact_cf?.house_number || "",
          lucky_number: res?.contact_cf?.lucky_number || "",
          zip_code: res?.address?.zipCode || "",
          address: res?.address?.address || "",
          city: res?.address?.city || "",
          state: res?.address?.state || "",
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
        });
        setZipCode(res?.address?.zip_code || "");
        setCity(res?.address?.city || "");
        setState(res?.address?.state || "");
        setAddress(res?.address?.address || "");
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
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

    const nameToCheck = profile?.full_name?.toLowerCase().trim();

    if (
      invalidNames.includes(nameToCheck) ||
      invalidCharPattern.test(profile?.full_name) ||
      !profile?.full_name.trim()
    ) {
      toast.error(`Enter Correct Name`);
      return;
    }
    try {
      setLoading(true);
      await updateProfile(profile, user?.token)?.then((res) => {
        if (res?.status === "error") {
          toast.error(Object.values(res?.data)?.[0]);
        } else {
          setUserProfile(res?.data?.user);
          const existingVipcre =
            JSON.parse(localStorage.getItem("vipcre")) || {};
          if (existingVipcre.user) {
            (existingVipcre.user.firstname = res?.data?.user?.firstname),
              (existingVipcre.user.lastname = res?.data?.user?.lastname);
          }
          localStorage.setItem("vipcre", JSON.stringify(existingVipcre));
          toast.success("Profile updated successfully.");
          setProfileUpdate(true);
        }
      });
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Remove the leading '+91', '00', or '0' from the mobile number.
      const cleanedValue = value.replace(/^(\+91|00|0)/, "");

      setProfile((prevState) => ({
        ...prevState,
        [name]: cleanedValue,
      }));
    } else {
      setProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  //Changes Password Api And Function
  const handleSubmitChangePassword = (e) => {
    e.preventDefault();
    if (useOtp) {
      if (otp === "") {
        toast.error("Otp is required....");
        return;
      }
      let curr = mobile;
      if (curr?.length >= 13 && curr?.startsWith("+91")) {
        curr = curr?.slice(3, 13);
      } else if (curr?.length >= 10 && !curr?.startsWith("+91")) {
        curr = curr;
      } else {
        return;
      }
      axios
        .post(`${apiUrl}/web/password/reset`, {
          otp: otp,
          password: newPassword,
          password_confirmation: confirmPassword,
          number: curr,
          session_id: otpDetails,
        })
        .then((res) => {
          if (res.data.status === "error") {
            toast.error(res.data?.data?.Details);
          } else {
            toast.success("Password changed successfully!");
          }
        });

      return;
    }
    if (
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast.error("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password fields do not match.");
      return;
    }
    // Make API call with currentPassword, newPassword, and confirmPassword
    const token = user.token;
    fetch(`${apiUrl}/web/password/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  //Logout Pop up menu
  const handleLogout = () => {
    setShowConfirmationModal(true);
  };
  const handleConfirmLogout = () => {
    logout();
    setShowConfirmationModal(false);
  };
  const handleCancelLogout = () => {
    setShowConfirmationModal(false);
  };

  //Delete Account and modal handle
  const handleDelete = () => {
    setShowConfirmationModalss(true);
  };
  const handleConfirmDelete = async () => {
    const token = user?.token;
    try {
      const response = await axios.post(`${apiUrl}/web/profile/delete`, [], {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.status) {
        if (response.data.status === "success") {
          toast.success(
            response.data.message ||
              "Your profile has been deleted successfully",
            "Success"
          );
          localStorage.clear();
          localStorage.setItem("cartCacheSavedData", JSON.stringify([])); // Save an empty array as JSON
          localStorage.setItem("cartCacheNumber", "");
          navigate.push("/");
        } else if (response.data.status === "error") {
          toast.error(
            response.data.message ||
              "An error occurred while deleting your profile",
            "Error"
          );
        }
      } else {
        toast.error("Invalid response from the server:", response);
      }
    } catch (error) {
      toast.error("Error deleting profile:");
    }
    setShowConfirmationModalss(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmationModalss(false);
  };

  return (
    <section className="profile-section-os lg:block">
      <div className="container-os">
        <span className=" logout modalopen">
          <LogoutModal
            showConfirmationModal={showConfirmationModal}
            handleCancelLogout={handleCancelLogout}
            handleConfirmLogout={handleConfirmLogout}
          />
        </span>
        <nav
          className="flex max-w-[300px] w-full m-auto pb-4 justify-center"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link
                  href="/my-account"
                  className="ml-1 text-sm font-medium text-primary hover:text-secondary md:ml-2"
                >
                  My Account
                </Link>
              </div>
            </li>
            <Link href="/profile">
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-primary hover:text-secondary md:ml-2">
                    Profile
                  </span>
                </div>
              </li>
            </Link>
          </ol>
        </nav>

        <div className="">
          <div>
            <div className="profile-col-1-os">
              <div className=" max-w-[500px] w-full m-auto justify-between items-center text-center flex bg-white bg-opacity-60 bg-backdrop-blur-md p-1.5 rounded-lg border-2 border-primary  ">
                <button
                  onClick={() => handleProfile("tab1")}
                  className={
                    profileActive === "tab1 flex items-center gap-[10px]"
                      ? "profile-tab-os active "
                      : "profile-tab-os flex items-center gap-[5px]  flex-col"
                  }
                  aria-label="Profile"
                >
                  <FaRegUser fontSize={25} color="var(--primary)" />
                  Profile
                </button>

                <button
                  onClick={() => handleProfile("tab3")}
                  className={
                    profileActive ===
                    "tab3 flex items-center gap-[10px]  flex-col"
                      ? "profile-tab-os active "
                      : "profile-tab-os flex items-center gap-[5px]  flex-col"
                  }
                  aria-label="Address"
                >
                  <FaAddressCard fontSize={25} color="var(--primary)" />
                  Address
                </button>
                <button
                  onClick={handleLogout}
                  className={
                    profileActive ===
                    "tab5 flex items-center gap-[10px]  flex-col"
                      ? "profile-tab-os active"
                      : "profile-tab-os flex items-center gap-[5px]  flex-col"
                  }
                  aria-label="Logout"
                >
                  <AiOutlineLogout fontSize={25} color="var(--primary)" />
                  Logout
                </button>

                {isMobile && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className={
                      profileActive ===
                      "tab6 flex items-center gap-[10px]  flex-col"
                        ? "profile-tab-os active"
                        : "profile-tab-os flex items-center gap-[5px]  flex-col"
                    }
                    aria-label="Delete"
                  >
                    <MdDelete fontSize={25} color="var(--primary)" />
                    Delete
                  </button>
                )}
              </div>
              <DeleteModal
                showConfirmationModalss={showConfirmationModalss}
                handleConfirmDelete={handleConfirmDelete}
                handleCancelDelete={handleCancelDelete}
              />

              <div
                className={`profile-col-2-os mt-3 lg:w-[50%] m-auto ${
                  profileActive === "tab1"
                    ? "profile-content-os active"
                    : "profile-content-os"
                }`}
              >
                <div className="profile-heading-os">Profile</div>

                <div className="profile-row-21-os">
                  <form className="grid gap-3 mt-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative profile-label-rs">
                        <input
                          id="fullName"
                          type="text"
                          placeholder=" "
                          name="full_name"
                          value={profile?.full_name || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="fullName"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.full_name
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
                        >
                          Your Full Name
                        </label>
                      </div>

                      <div className="relative profile-label-rs">
                        <input
                          id="mobileNo"
                          type="text"
                          placeholder=" "
                          name="mobile"
                          value={profile?.mobile || ""}
                          onChange={handleInputChange}
                          disabled={profile?.mobile !== ""}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                          autoFocus
                        />
                        <label
                          htmlFor="mobileNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.mobile
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
                        >
                          Mobile No.
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative profile-label-rs">
                        <input
                          id="primaryNo"
                          type="number"
                          placeholder=" "
                          name="primary_number"
                          value={profile?.primary_number || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="primaryNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.primary_number
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
                        >
                          Primary No.
                        </label>
                      </div>

                      <div className="relative profile-label-rs">
                        <input
                          id="emailInput"
                          type="email"
                          placeholder=" "
                          name="email"
                          value={profile?.email || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                          required
                        />
                        <label
                          htmlFor="emailInput"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.email
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
                      <div className="relative profile-label-rs">
                        <input
                          id="anniversaryDate"
                          type={
                            isAnniversaryFocused || profile?.date_of_anniversary
                              ? "date"
                              : "text"
                          }
                          placeholder=" "
                          name="date_of_anniversary"
                          onFocus={handleAnniversaryFocus}
                          onBlur={handleAnniversaryBlur}
                          value={profile?.date_of_anniversary || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-[#691ede]"
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "48px",
                            fontSize: "16px",
                            textAlign: "left",
                          }}
                        />
                        <label
                          htmlFor="anniversaryDate"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.date_of_anniversary
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
                        >
                          Date of Anniversary
                        </label>
                      </div>

                      <div className="relative profile-label-rs">
                        <input
                          id="birthDate"
                          type={
                            isBirthFocused || profile?.date_of_birth
                              ? "date"
                              : "text"
                          }
                          placeholder=" "
                          name="date_of_birth"
                          onFocus={handleBirthFocus}
                          onBlur={handleBirthBlur}
                          value={profile?.date_of_birth || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-[#691ede]"
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            height: "48px",
                            fontSize: "16px",
                            textAlign: "left",
                          }}
                        />
                        <label
                          htmlFor="birthDate"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.date_of_birth
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
                        >
                          Date of Birth
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative profile-label-rs">
                        <input
                          id="houseNo"
                          type="number"
                          placeholder=" "
                          name="house_number"
                          value={profile?.house_number || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="houseNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.house_number
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          House No.
                        </label>
                      </div>

                      <div className="relative profile-label-rs">
                        <input
                          id="bikeNo"
                          type="number"
                          placeholder=" "
                          name="bike_number"
                          value={profile?.bike_number || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="bikeNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.bike_number
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Bike No.
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative profile-label-rs">
                        <input
                          id="vehicleNo"
                          type="number"
                          placeholder=" "
                          name="car_number"
                          value={profile?.car_number || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="vehicleNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.car_number
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Vehicle No.
                        </label>
                      </div>

                      <div className="relative profile-label-rs">
                        <input
                          id="luckyNo"
                          type="number"
                          placeholder=" "
                          name="lucky_number"
                          value={profile?.lucky_number || ""}
                          onChange={handleInputChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="luckyNo"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            profile?.lucky_number
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Lucky No.
                        </label>
                      </div>
                    </div>

                    <div className="profile-input-submit-button-os">
                      <button type="submit" aria-label="Save">
                        {!loading ? (
                          "Save"
                        ) : (
                          <span className="dot-loader ml-2 flex">
                            <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                            <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                            <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/*  */}

              <div
                className={`profile-col-2-os mt-3 lg:w-[50%] m-auto ${
                  profileActive === "tab3"
                    ? "profile-content-os active"
                    : "profile-content-os"
                }`}
              >
                <div className="profile-heading-os">Address</div>
                <div className="profile-row-21-os mt-4">
                  <form className=" flex flex-col gap-3">
                    <div className="">
                      <div className="relative profile-label-rs">
                        <input
                          id="postalCode"
                          type="number"
                          placeholder=" "
                          value={zipCode}
                          onChange={handleZipCodeChange}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="postalCode"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            zipCode
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Postal Code
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <div className="relative profile-label-rs">
                        <input
                          id="address"
                          type="text"
                          placeholder=" "
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          className="peer w-full p-3 text-gray-800 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="address"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            address
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Address
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <div className="relative profile-label-rs">
                        <select
                          id="city"
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          className="peer w-full p-3 text-gray-800 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          style={{
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                            textAlign: "left",
                            paddingLeft: "12px",
                            width: "100%",
                            maxWidth: "100%",
                            height: "48px",
                            fontSize: "16px",
                          }}
                        >
                          <option value="">Select City</option>
                          {cities?.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="city"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            city
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Select City
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <div className="relative profile-label-rs">
                        <input
                          id="state"
                          type="text"
                          placeholder=" "
                          value={state}
                          onChange={(event) => setState(event.target.value)}
                          className="peer w-full p-3 text-gray-800 rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="state"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            state
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          State
                        </label>
                      </div>
                    </div>
                    <div className="profile-input-submit-button-os">
                      <button
                        type="button"
                        onClick={handleSaveAddress}
                        aria-label="Save"
                      >
                       {!addressData ? (
                          "Save"
                        ) : (
                          <span className="dot-loader ml-2 flex">
                            <span className="dot animate-bounce delay-0 bg-white h-2 w-2 rounded-full"></span>
                            <span className="dot animate-bounce delay-200 bg-white h-2 w-2 rounded-full mx-1"></span>
                            <span className="dot animate-bounce delay-400 bg-white h-2 w-2 rounded-full"></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`profile-col-2-os mt-3 ${
              profileActive === "tab2"
                ? "profile-content-os active"
                : "profile-content-os"
            }`}
          >
            <div className="profile-heading-os ">
              {useOtp ? "Set " : "Change "} Password
            </div>
            <div className="profile-row-21-os mt-4">
              <form
                className=" flex flex-col gap-3"
                onSubmit={handleSubmitChangePassword}
              >
                <div className="checkbox-mobile-input-os search-section-os-1">
                  <label className="multiple-filters-checkbox-os">
                    Change password by Mobile
                    <input
                      type="checkbox"
                      value={useOtp}
                      onChange={(e) => setUseOtp(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>

                {useOtp ? (
                  <>
                    <div className="relative">
                      <input
                        id="mobile"
                        type="text"
                        placeholder=""
                        value={mobile}
                        onChange={(e) => {
                          const filteredValue = e.target.value.replace(
                            /[^+0-9,]/g,
                            ""
                          );
                          setMobile(filteredValue || "");
                          if (
                            filteredValue?.length >= 13 &&
                            filteredValue?.startsWith("+91")
                          ) {
                            sendOtp(filteredValue?.slice(3, 13));
                          } else if (
                            filteredValue?.length >= 10 &&
                            !filteredValue?.startsWith("+91")
                          ) {
                            sendOtp(filteredValue);
                          } else {
                            setOtpDetails(); // reset otp details
                          }
                        }}
                        className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                      />
                      <label
                        htmlFor="mobile"
                        className={`absolute left-3 transition-all transform origin-left text-primary ${
                          mobile
                            ? "-top-2 text-sm text-primary scale-90 bg-white"
                            : "top-[14px] text-primary bg-white"
                        } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                      >
                        Mobile No
                      </label>
                    </div>

                    {otpDetails && (
                      <div className="relative">
                        <input
                          id="otp"
                          type="number"
                          placeholder=""
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                          }}
                          className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                        />
                        <label
                          htmlFor="otp"
                          className={`absolute left-3 transition-all transform origin-left text-primary ${
                            otp
                              ? "-top-2 text-sm text-primary scale-90 bg-white"
                              : "top-[14px] text-primary bg-white"
                          } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                        >
                          Enter OTP
                        </label>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative">
                    <input
                      id="oldPassword"
                      type="password"
                      placeholder=" "
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                    />
                    <label
                      htmlFor="oldPassword"
                      className={`absolute left-3 transition-all transform origin-left text-primary ${
                        oldPassword
                          ? "-top-2 text-sm text-primary scale-90 bg-white"
                          : "top-[12px] text-primary bg-white"
                      } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                    >
                      Current Password
                    </label>
                  </div>
                )}
                <div className="relative">
                  <input
                    id="newPassword"
                    type="password"
                    placeholder=" "
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                  />
                  <label
                    htmlFor="newPassword"
                    className={`absolute left-3 transition-all transform origin-left text-primary ${
                      newPassword
                        ? "-top-2 text-sm text-primary scale-90 bg-white"
                        : "top-[14px] text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                  >
                    New Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="peer w-full p-3 text-gray-800  rounded-md border border-primary focus:outline-none focus:ring-1 focus:ring-primary "
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-3 transition-all transform origin-left text-primary ${
                      confirmPassword
                        ? "-top-2 text-sm text-primary scale-90 bg-white"
                        : "top-[14px] text-primary bg-white"
                    } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1`}
                  >
                    Confirm Password
                  </label>
                </div>

                <div className="profile-input-submit-button-os">
                  <button type="submit" aria-label="Save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className={`profile-col-2-os mt-3 ${
              profileActive === "tab4"
                ? "profile-content-os active"
                : "profile-content-os"
            }`}
          >
            <div className="profile-heading-os">Address</div>
            <div className="profile-row-21-os">
              <form className="">
                <div className="profile-address-not-set-text-os">
                  You have not set up this type of address yet.
                </div>
                <div className="profile-input-submit-button-os">
                  <button type="password" aria-label="Add new address">
                    Add new address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
