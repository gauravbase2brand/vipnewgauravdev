"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";

const DigitalForm = () => {
  const { userProfile } = useContext(AppStateContext);
  const mobileNumber = userProfile?.mobile;
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const router = useRouter();
  const [formData, setFormData] = useState({
    mobile: "",
    primary_phone: "",
    email: "",
    whatsapp_mobile: "",
    whatsapp_phone: "",
    name: "",
    active: "1",
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
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${apiUrl}/web/digital/visiting/card/${mobileNumber}`
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
            active: apiData.active === "Active" ? "1" : "0",
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

    if (mobileNumber) {
      fetchExistingData();
    } else {
      setIsLoading(false);
    }
  }, [mobileNumber]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
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

    if (formData.whatsapp_mobile && !validateMobile(formData.whatsapp_mobile)) {
      newErrors.whatsapp_mobile = "Please enter a valid WhatsApp mobile number";
    }

    if (formData.whatsapp_phone && !validateMobile(formData.whatsapp_phone)) {
      newErrors.whatsapp_phone = "Please enter a valid WhatsApp phone number";
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
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
          account_section: "Sales",
          valid: formattedDate,
          active: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Digital visiting card updated successfully!");
        router.push(formData.mobile);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to update digital visiting card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mr-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
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
          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h2>
              </div>

              {/* Name */}
              <div>
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
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
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
                  disabled={formData.mobile.length === 10}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Primary Phone */}
              <div>
                <label
                  htmlFor="primary_phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Primary Phone
                </label>
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

              {/* WhatsApp Mobile */}
              <div>
                <label
                  htmlFor="whatsapp_mobile"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  WhatsApp Mobile
                </label>
                <input
                  type="text"
                  id="whatsapp_mobile"
                  name="whatsapp_mobile"
                  value={formData.whatsapp_mobile}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.whatsapp_mobile
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="WhatsApp mobile number"
                />
                {errors.whatsapp_mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsapp_mobile}
                  </p>
                )}
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label
                  htmlFor="whatsapp_phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  WhatsApp Phone
                </label>
                <input
                  type="text"
                  id="whatsapp_phone"
                  name="whatsapp_phone"
                  value={formData.whatsapp_phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.whatsapp_phone
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="WhatsApp phone number"
                />
                {errors.whatsapp_phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whatsapp_phone}
                  </p>
                )}
              </div>

              {/* Business Information Section */}
              <div className="md:col-span-2 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Business Information
                </h2>
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.company
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="ABC Company Ltd"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

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
                  <p className="text-red-500 text-sm mt-1">{errors.upi_id}</p>
                )}
              </div>

              {/* Bank Details */}
              <div className="md:col-span-2">
                <label
                  htmlFor="bank_details"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Bank Details
                </label>
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

              {/* Address Information Section */}
              <div className="md:col-span-2 mt-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Address Information
                </h2>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
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
              <div className="md:col-span-2 mt-8">
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
              {/* <div className="md:col-span-2 mt-8">
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
