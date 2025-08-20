"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import ImageUploadComponent from "./ImageUploadComponent";

const DigitalForm = () => {
  const { userProfile, user } = useContext(AppStateContext);
  const [uploadImg, setUploadImg] = useState(false);
  const myDataString = localStorage.getItem("vipcre");
  const myData = JSON.parse(myDataString);
  const userName = myData?.user?.firstname;

  if (userName === "") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-white shadow-xl p-6 rounded-lg text-center max-w-md">
          <p className="text-gray-800 font-semibold">
            To get your digital visiting card, you’ll need to buy a mobile
            number first.
          </p>
        </div>
      </div>
    );
  }
  const mobileNumber = userProfile?.mobile;
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const router = useRouter();
  const [formData, setFormData] = useState({
    mobile: "",
    primary_phone: "",
    email: "",
    whatsapp_mobile: "no",
    whatsapp_phone: "no",
    name: "",
    active: "",
    account_section: "",
    valid: "1",
    company: "",
    gst_number: "",
    payment_number: "",
    upi_id: "",
    bank_details: "",
    address: "",
    city: "",
    district: "",
    state: "",
    postal_code: "",
    youtube: "",
    instagram: "",
    facebook: "",
    snapchat: "",
    twitter: "",
    linkedin: "",
    location: "",
    id: "",
    bank_status: true,
    url_extension: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageType, setImageType] = useState("");
  const imageTypeOptions = [
    {
      value: "profile_image",
      label: "Profile Image",
      icon: "👤",
      description: "Personal profile photo",
    },
    {
      value: "company_logo",
      label: "Company Logo",
      icon: "🏢",
      description: "Business logo or brand image",
    },
    {
      value: "qr_code",
      label: "QR Code",
      icon: "📱",
      description: "QR code for quick access",
    },
  ];
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      bank_status: checked,
    }));
  };

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${apiUrl}/web/digital/visiting/card/${mobileNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`, // Add Bearer token here
            },
          }
        );

        if (response.data.status && response.data.data) {
          const apiData = response.data.data;

          // Map API response to form data
          setFormData({
            mobile: apiData.mobile || "",
            primary_phone: apiData.primary_phone || "",
            email: apiData.email || "",
            whatsapp_mobile: apiData.whatsapp_mobile || "",
            whatsapp_phone: apiData.whatsapp_phone || "",
            name: apiData.name || "",
            active: apiData.active === "Active" ? "yes" : "no",
            account_section: apiData.account_section || "",
            valid: apiData.valid || "1",
            company: apiData.company || "",
            gst_number: apiData.gst_number || "",
            payment_number: apiData.payment_number || "",
            upi_id: apiData.upi_id || "",
            bank_details: apiData.bank_details || "",
            address: apiData.address || "",
            city: apiData.city || "",
            district: apiData.district || "",
            state: apiData.state || "",
            postal_code: apiData.postal_code || "",
            youtube: apiData.youtube || "",
            instagram: apiData.instagram || "",
            facebook: apiData.facebook || "",
            snapchat: apiData.snapchat || "",
            twitter: apiData.twitter || "",
            linkedin: apiData.linkedin || "",
            location: apiData.location || "",
            id: apiData.id || "",
            bank_status: apiData.bank_status === "1" ? true : false,
            profile_image: apiData.profile_image || "",
            qr_code: apiData.qr_code || "",
            company_logo: apiData.company_logo || "",
            url_extension: apiData.url_extension || "",
          });

          // toast.success("Data loaded successfully!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(
          "Failed to load existing data. You can still create a new card."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (mobileNumber && !uploadImg) {
      fetchExistingData();
    } else {
      setIsLoading(false);
    }
  }, [mobileNumber, uploadImg]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    // Regex to allow only alphabets and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^(\+91-)?[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const validateGST = (gst) => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  const validateUPI = (upi) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upi);
  };

  // const validateURL = (url) => {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };

  const validatePostalCode = (code) => {
    const postalRegex = /^[1-9][0-9]{5}$/;
    return postalRegex.test(code);
  };

  const validateLocation = (location) => {
    const locationRegex =
      /^-?([1-8]?[0-9]\.{1}\d{1,6}|90\.{1}0{1,6}),-?((1[0-7][0-9])|([1-9]?[0-9]))\.{1}\d{1,6}$/;
    return locationRegex.test(location);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    // if (errors[name]) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: "",
    //   }));
    // }
    validateField(name, value);
  };
  const validateField = (name, value) => {
    const newErrors = { ...errors }; // Clone the existing errors state to avoid mutation

    // Field-specific validation
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors[name] = "Full name is required";
        } else if (!validateName(value)) {
          newErrors[name] = "Full name must only contain letters and spaces";
        } else {
          delete newErrors[name]; // Clear error if valid
        }
        break;
      case "mobile":
        if (!value.trim()) {
          newErrors.mobile = "Mobile number is required";
        } else if (!validateMobile(value)) {
          newErrors.mobile =
            "Please enter a valid mobile number (format: +91-9876543210 or 9876543210)";
        } else {
          delete newErrors.mobile; // Remove the error if valid
        }
        break;

      case "primary_phone":
        if (!value.trim()) {
          newErrors.primary_phone = "Mobile number is required";
        } else if (!validateMobile(value)) {
          newErrors.primary_phone =
            "Please enter a valid  number (format: +91-9876543210 or 9876543210)";
        } else {
          delete newErrors.primary_phone; // Remove the error if valid
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email; // Remove the error if valid
        }
        break;

      case "postal_code":
        if (!value.trim()) {
          newErrors.postal_code = "Postal code is required";
        } else if (!validatePostalCode(value)) {
          newErrors.postal_code = "Please enter a valid 6-digit postal code";
        } else {
          delete newErrors.postal_code; // Remove the error if valid
        }
        break;

      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name; // Remove the error if valid
        }
        break;

      // You can add cases for other fields similarly
      // Add more fields as needed

      default:
        break;
    }

    setErrors(newErrors); // Set errors to trigger UI re-render
  };
  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile =
        "Please enter a valid mobile number (format: +91-9876543210 or 9876543210)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // if (!formData.company.trim()) {
    //   newErrors.company = "Company name is required";
    // }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.url_extension.trim()) {
      newErrors.url_extension = `${formData.name} your Domain url is required`;
    }
    if (!formData.postal_code.trim()) {
      newErrors.postal_code = "Postal code is required";
    } else if (!validatePostalCode(formData.postal_code)) {
      newErrors.postal_code = "Please enter a valid 6-digit postal code";
    }

    // Optional field validations
    if (formData.primary_phone && !validateMobile(formData.primary_phone)) {
      newErrors.primary_phone = "Please enter a valid phone number";
    }

    if (formData.gst_number && !validateGST(formData.gst_number)) {
      newErrors.gst_number =
        "Please enter a valid GST number (format: 22AAAAA0000A1Z5)";
    }

    if (formData.upi_id && !validateUPI(formData.upi_id)) {
      newErrors.upi_id = "Please enter a valid UPI ID (format: user@upi)";
    }

    // if (formData.youtube && !validateURL(formData.youtube)) {
    //   newErrors.youtube = "Please enter a valid YouTube URL";
    // }

    // if (formData.instagram && !validateURL(formData.instagram)) {
    //   newErrors.instagram = "Please enter a valid Instagram URL";
    // }

    // if (formData.facebook && !validateURL(formData.facebook)) {
    //   newErrors.facebook = "Please enter a valid Facebook URL";
    // }

    // if (formData.snapchat && !validateURL(formData.snapchat)) {
    //   newErrors.snapchat = "Please enter a valid Snapchat URL";
    // }

    // if (formData.twitter && !validateURL(formData.twitter)) {
    //   newErrors.twitter = "Please enter a valid Twitter URL";
    // }

    // if (formData.linkedin && !validateURL(formData.linkedin)) {
    //   newErrors.linkedin = "Please enter a valid LinkedIn URL";
    // }

    if (formData.location && !validateLocation(formData.location)) {
      newErrors.location =
        "Please enter valid coordinates (format: 19.0760,72.8777)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async () => {
    if (!formData.id) {
      toast.error("Something went wrong?");
      return;
    }

    // Validate image type selection
    if (!imageType) {
      // toast.error("Please select an image type before uploading");
      return;
    }
    setUploadImg(true);
    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append("id", formData.id);
      uploadFormData.append("image", selectedImage);
      uploadFormData.append("type", imageType); // Add type to payload

      // Make API call to upload image
      const response = await axios.post(
        `${apiUrl}/web/digital/card/imageUpload`,
        uploadFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // const selectedTypeLabel = imageTypeOptions.find(
        //   (option) => option.value === imageType
        // )?.label;
        // toast.success(`${selectedTypeLabel} uploaded successfully!`);
        // Reset form after successful upload
        // clearImage();
        setSelectedImage(null);
        setImagePreview(null);
        setImageType("");
        setUploadImg(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadImg(false);
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please try again.");
        setUploadImg(false);
      } else if (error.response?.status === 413) {
        toast.error("Image file is too large. Please select a smaller image.");
        setUploadImg(false);
      } else {
        toast.error("Failed to upload image. Please try again.");
        setUploadImg(false);
      }
    }
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      const el = document.getElementById("form-data");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const response = await axios.post(
        `${apiUrl}/web/digital/visiting/card/${formData.id}`,
        {
          ...formData,
          bank_status: formData.bank_status ? 1 : 0,
          account_section: "Sales",
          valid: formattedDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Digital visiting card updated successfully!");
        handleImageUpload();
        router.push(`vip-${formData.url_extension}`);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Failed to update digital visiting card. Please try again.";

        // Check if the error is related to the url_extension field
        if (
          errorMessage.includes(
            "This URL extension is already taken by another user. Please choose a different one."
          )
        ) {
          setErrors((prev) => ({
            ...prev,
            url_extension: errorMessage, // Set the specific error message for url_extension
          }));
          document.getElementById("url_extension").focus();
        } else {
          toast.error(errorMessage); // Show other errors in the toast
        }
      } else {
        // If no response from API, it's a network error or other issue
        toast.error("Network error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <div className="flex items-center justify-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mr-4"></div>
  //       </div>
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (formData.mobile.length !== 10) {
      setFormData((prev) => ({
        ...prev,
        whatsapp_mobile: "no", // Reset WhatsApp checkbox if mobile is invalid
      }));
    } else if (formData.primary_phone.length !== 10) {
      setFormData((prev) => ({
        ...prev,
        whatsapp_phone: "no", // Reset WhatsApp checkbox if mobile is invalid
      }));
    }
  }, [formData.mobile, formData.primary_phone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-6 py-6 sm:px-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Digital Visiting Card
            </h1>
            <p className="text-blue-100 text-center mt-2">
              {formData.name
                ? `${formData.name} digital business card`
                : "Create your professional digital business card"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImageUploadComponent
                formData={formData}
                token={user?.token}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                imageType={imageType}
                setImageType={setImageType}
                imageTypeOptions={imageTypeOptions}
                handleImageUpload={handleImageUpload}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
              {/* Personal Information Section */}
              <div className="md:col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h2>
              </div>

              {/* Name */}
              <div id="form-data">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  {formData.mobile.length === 10 && (
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="whatsapp_mobile"
                        checked={formData.whatsapp_mobile === "yes"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            whatsapp_mobile: e.target.checked ? "yes" : "no",
                          }))
                        }
                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="whatsapp_mobile"
                        className="flex items-center text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        <span className="text-green-500 mr-1">
                          {" "}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
                              fill="currentColor"
                            />
                          </svg>
                        </span>{" "}
                        on WhatsApp
                      </label>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.mobile
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="+91-9876543210"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Primary Phone */}
              <div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="primary_phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Primary Phone
                  </label>
                  {formData.primary_phone.length === 10 && (
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="whatsapp_phone"
                        checked={formData.whatsapp_phone === "yes"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            whatsapp_phone: e.target.checked ? "yes" : "no",
                          }))
                        }
                        className="h-4 w-4 text-green-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="whatsapp_phone"
                        className="flex items-center text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        <span className="text-green-500 mr-1">
                          {" "}
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
                              fill="currentColor"
                            />
                          </svg>
                        </span>{" "}
                        on WhatsApp
                      </label>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  id="primary_phone"
                  name="primary_phone"
                  value={formData.primary_phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.primary_phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Primary phone number"
                />
                {errors.primary_phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.primary_phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="url_extension"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Domain Url <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="url_extension"
                  name="url_extension"
                  value={formData.url_extension}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Remove invalid characters (allow only letters, numbers, hyphen)
                    value = value.replace(/[^a-zA-Z0-9-]/g, "");
                    // Replace multiple hyphens with a single hyphen
                    value = value.replace(/-+/g, "-");
                    // Remove hyphen at the start
                    value = value.replace(/^-/, "");

                    handleInputChange({
                      target: { name: "url_extension", value },
                    });
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.url_extension
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="deepak97800"
                />
                {errors.url_extension && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.url_extension}
                  </p>
                )}
              </div>

              {/* Business Information Section */}
              <label className="inline-flex items-center cursor-pointer gap-4">
                <input
                  type="checkbox"
                  id="bank_status"
                  name="bank_status"
                  checked={formData.bank_status}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-xl font-semibold text-red-500 border-b border-gray-200">
                  Enable Bank Details
                </span>
              </label>
              {formData.bank_status && (
                <>
                  <div className="md:col-span-3 mt-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      Business Information
                    </h2>
                  </div>
                </>
              )}
              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 border-gray-300`}
                  placeholder="ABC Company Ltd"
                />
              </div>
              {formData.bank_status && (
                <>
                  {/* GST Number */}
                  <div>
                    <label
                      htmlFor="gst_number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gst_number"
                      name="gst_number"
                      value={formData.gst_number}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.gst_number
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="22AAAAA0000A1Z5"
                    />
                    {errors.gst_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gst_number}
                      </p>
                    )}
                  </div>

                  {/* Payment Number */}
                  <div>
                    <label
                      htmlFor="payment_number"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Payment Number
                    </label>
                    <input
                      type="text"
                      id="payment_number"
                      name="payment_number"
                      value={formData.payment_number}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Payment number"
                    />
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label
                      htmlFor="upi_id"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upi_id"
                      name="upi_id"
                      value={formData.upi_id}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.upi_id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="john@upi"
                    />
                    {errors.upi_id && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.upi_id}
                      </p>
                    )}
                  </div>

                  {/* Bank Details */}

                  <div className="md:col-span-3">
                    <div className="flex gap-3 mb-2 items-center">
                      <label
                        htmlFor="bank_details"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank Details
                      </label>
                    </div>

                    <textarea
                      id="bank_details"
                      name="bank_details"
                      value={formData.bank_details}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter bank details"
                    />
                  </div>
                </>
              )}
              {/* Address Information Section */}
              <div className="md:col-span-3 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Address Information
                </h2>
              </div>

              {/* Address */}
              <div className="md:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.address
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="123 Street Name"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.city ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  placeholder="Mumbai"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* District */}
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  District
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="District"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.state
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Maharashtra"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.postal_code
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="400001"
                />
                {errors.postal_code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postal_code}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location (Coordinates)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.location
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="19.0760,72.8777"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Social Media Section */}
              <div className="md:col-span-3 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Social Media Links
                </h2>
              </div>

              {/* YouTube */}
              <div>
                <label
                  htmlFor="youtube"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  YouTube
                </label>
                <input
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.youtube
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://youtube.com/abc"
                />
                {errors.youtube && (
                  <p className="text-red-500 text-sm mt-1">{errors.youtube}</p>
                )}
              </div>

              {/* Instagram */}
              <div>
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Instagram
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.instagram
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://instagram.com/abc"
                />
                {errors.instagram && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instagram}
                  </p>
                )}
              </div>

              {/* Facebook */}
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facebook
                </label>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.facebook
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://facebook.com/abc"
                />
                {errors.facebook && (
                  <p className="text-red-500 text-sm mt-1">{errors.facebook}</p>
                )}
              </div>

              {/* Snapchat */}
              <div>
                <label
                  htmlFor="snapchat"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Snapchat
                </label>
                <input
                  type="url"
                  id="snapchat"
                  name="snapchat"
                  value={formData.snapchat}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.snapchat
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://snapchat.com/abc"
                />
                {errors.snapchat && (
                  <p className="text-red-500 text-sm mt-1">{errors.snapchat}</p>
                )}
              </div>

              {/* Twitter */}
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.twitter
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://twitter.com/abc"
                />
                {errors.twitter && (
                  <p className="text-red-500 text-sm mt-1">{errors.twitter}</p>
                )}
              </div>

              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.linkedin
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="https://linkedin.com/in/abc"
                />
                {errors.linkedin && (
                  <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
                )}
              </div>

              {/* Additional Fields Section */}
              {/* <div className="md:col-span-3 mt-2">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Additional Information
                </h2>
              </div> */}

              {/* Account Section */}
              {/* <div>
                <label
                  htmlFor="account_section"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Account Section
                </label>
                <input
                  type="text"
                  id="account_section"
                  name="account_section"
                  value={formData.account_section}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Account section"
                />
              </div> */}

              {/* Status Fields */}
              {/* <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="active"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Active Status
                  </label>
                  <select
                    id="active"
                    name="active"
                    value={formData.active}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="valid"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Valid Status
                  </label>
                  <select
                    id="valid"
                    name="valid"
                    value={formData.valid}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="1">Valid</option>
                    <option value="0">Invalid</option>
                  </select>
                </div>
              </div> */}
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-black transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary transform hover:scale-[1.02] active:scale-[0.98]"
                } shadow-lg`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Digital Card...
                  </div>
                ) : (
                  "Update Digital Visiting Card"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DigitalForm;
