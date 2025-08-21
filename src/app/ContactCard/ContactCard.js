"use client";
import { FaShareAlt, FaPlus, FaMinus } from "react-icons/fa";
import { CiSaveUp2 } from "react-icons/ci";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RWebShare } from "react-web-share";
import axios from "axios";
import { useParams } from "next/navigation";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";
const Accordion = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-2xl mb-3 shadow-sm border border-gray-100 overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-2 text-left hover:shadow-md  transition-all duration-300 active:shadow-sm cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            {icon}
          </div>
          <span className="text-sm font-bold text-gray-700">{title}</span>
        </div>
        <div className="mr-4">
          {isOpen ? (
            <FaMinus className="text-gray-500" />
          ) : (
            <FaPlus className="text-gray-500" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-2 pb-4 border-t border-gray-100 bg-gray-50 transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

const ContactCard = () => {
  const params = useParams();
  const mobileNumber = params.slug;
  const [showCrackers, setShowCrackers] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
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
    bank_status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AppStateContext);

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
            profile_image: apiData.profile_image || "",
            qr_code: apiData.qr_code || "",
            company_logo: apiData.company_logo || "",
            bank_status: apiData.bank_status || "",
          });
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

  useEffect(() => {
    // Hide crackers after 4 seconds
    const timer = setTimeout(() => {
      setShowCrackers(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mr-4"></div>
        </div>
      </div>
    );
  }

  // Function to generate vCard format

  const generateVCard = (contact) => {
    const formatPhoneNumber = (phone) => {
      if (!phone) return "";
      const cleaned = phone.replace(/\D/g, "");
      if (cleaned.length === 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      }
      return phone;
    };

    const vCardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0", // Sticking to 3.0 for broader Android compatibility
      `FN:${contact.name || ""}`,
      `N:${contact.name || ""};;;;`, // N field is crucial for Android
    ];

    if (contact.mobile) {
      vCardLines.push(`TEL;TYPE=CELL:${formatPhoneNumber(contact.mobile)}`);
    }
    if (contact.primary_phone) {
      vCardLines.push(
        `TEL;TYPE=WORK:${formatPhoneNumber(contact.primary_phone)}`
      );
    }
    if (contact.email) {
      vCardLines.push(`EMAIL;TYPE=INTERNET:${contact.email}`);
    }
    if (contact.company) {
      vCardLines.push(`ORG:${contact.company}`);
    }

    // Address field: Ensure all parts are present, even if empty, and use correct delimiters
    const addressParts = [
      contact.address || "",
      contact.city || "",
      contact.state || "",
      contact.postal_code || "",
    ];
    // Join with semicolons, ensuring empty parts are still represented
    vCardLines.push(`ADR;TYPE=HOME:;;${addressParts.join(";")}`);

    vCardLines.push("END:VCARD");

    // Join with CRLF for strict vCard compliance
    return vCardLines.join("\r\n");
  };

  const downloadVCard = (formData) => {
    // Use actual formData from the component
    const contact = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      primary_phone: formData.primary_phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal_code,
      company: formData.company,
    };

    // Generate vCard data
    const vCardData = generateVCard(contact);

    // Create a Blob object for the vCard content
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });

    // Use file-saver to download the vCard
    saveAs(blob, `${contact.name || "contact"}.vcf`);
  };
const downloadQrCode = () => {
    const qrCodeUrl = formData.qr_code ? formData.qr_code : "/assets/qr-code.png";

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = qrCodeUrl;  // Set the href to the image URL
    link.download = "QRCode.png";  // Specify the download filename
    document.body.appendChild(link);
    link.click();  // Trigger the download
    document.body.removeChild(link);  // Clean up the link element
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center font-sans">
      {showCrackers && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Multiple crackers with different positions and delays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[crackerBurst_4s_ease-out_forwards]"
              style={{
                left: `${20 + i * 7}%`,
                top: `${15 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              <div className="relative">
                {/* Main cracker burst */}
                <div
                  className="w-4 h-4 bg-red-500 rounded-full animate-[explode_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>

                {/* Particles */}
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-2 h-2 rounded-full animate-[particle_2s_ease-out_forwards]"
                    style={{
                      backgroundColor: [
                        "#FF6B6B",
                        "#4ECDC4",
                        "#45B7D1",
                        "#96CEB4",
                        "#FFEAA7",
                        "#DDA0DD",
                        "#98D8C8",
                        "#F7DC6F",
                      ][j],
                      left: "50%",
                      top: "50%",
                      animationDelay: `${i * 0.1 + j * 0.05}s`,
                      transform: `rotate(${j * 45}deg)`,
                    }}
                  />
                ))}

                {/* Sparkles */}
                {[...Array(6)].map((_, k) => (
                  <div
                    key={`sparkle-${k}`}
                    className="absolute w-1 h-1 bg-yellow-300 animate-[sparkle_1.5s_ease-out_forwards]"
                    style={{
                      left: `${Math.random() * 40 - 20}px`,
                      top: `${Math.random() * 40 - 20}px`,
                      animationDelay: `${i * 0.1 + k * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Confetti pieces */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute animate-[confetti_3s_ease-out_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 30}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-3 h-6 animate-[rotate_1s_linear_infinite]"
                style={{
                  backgroundColor: [
                    "#FF6B6B",
                    "#4ECDC4",
                    "#45B7D1",
                    "#96CEB4",
                    "#FFEAA7",
                    "#DDA0DD",
                  ][i % 6],
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="bg-secondary rounded-xl shadow-2xl overflow-hidden w-full max-w-sm animate-[slideUp_0.6s_ease-out]">
        {/* Profile Section */}
        <div className="bg-white text-center p-2 rounded-2xl mb-3 relative">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-60 pointer-events-none"
            style={{
              backgroundImage: `url(${formData.company_logo})`,
            }}
            aria-hidden="true"
          />
          <div className="w-28 h-28 mx-auto mb-5 rounded-full border-4 border-purple-600 overflow-hidden relative">
            <img
              src={
                formData.profile_image
                  ? formData.profile_image
                  : "/assets/crawn-user.png"
              }
              alt="Ramnish Thakur"
              className="w-full h-full object-cover"
            />
          </div>
          {formData.name && (
            <h2 className="text-2xl font-bold text-gray-800 mb-2 relative">
              {formData.name}
            </h2>
          )}
          {formData.company && (
            <p className="font-bold text-gray-800  relative">
              {formData.company}
            </p>
          )}
          <span className="absolute top-[10%] right-[25px] sm:hidden">
            <CiSaveUp2 fontSize={25} onClick={() => downloadVCard(formData)} />
          </span>
        </div>

        {/* Contact Information */}
        <div className="px-5">
          {/* Phone */}
          <Link
            href={`tel:+${formData.mobile}`}
            className="bg-white rounded-2xl p-2 mb-3 flex items-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  fill="currentColor"
                />
              </svg>
            </div>
            {formData.whatsapp_mobile === "yes" ? (
              <>
                <Link href={`https://wa.me/${formData.mobile}`}>
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
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
                  </div>
                </Link>
                <span className="text-sm font-bold text-gray-700">
                  {`${formData.mobile}`}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-800">
                {`${formData.mobile}`}
              </span>
            )}
          </Link>
          {formData.primary_phone && (
            <Link
              href={`tel:+${formData.primary_phone}`}
              className="bg-white rounded-2xl p-2 mb-3 flex items-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-sm cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              {formData.whatsapp_phone === "yes" ? (
                <>
                  <Link href={`https://wa.me/${formData.primary_phone}`}>
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
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
                    </div>
                  </Link>
                  <span className="text-sm font-bold text-gray-700">
                    {`${formData.primary_phone}`}
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-gray-800">
                  {`${formData.primary_phone}`}
                </span>
              )}
            </Link>
          )}
          {/* Email */}
          {formData.email && (
            <Link
              href={`mailto:${formData.email}`}
              className="bg-white rounded-2xl p-2 mb-3 flex items-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-sm cursor-pointer"
            >
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-700">
                {formData.email}
              </span>
            </Link>
          )}
          {/* Website */}
          <Link
            href="/"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-2 mb-3 flex items-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-700">
              www.vipnumbershop.com
            </span>
          </Link>

          {/* Address */}
          {(formData.address ||
            formData.city ||
            formData.state ||
            formData.postal_code) && (
            <Link
              href={`https://maps.google.com/?q=VIP+Number+Shop,+SCO+62,+Garha+Rd,+opp.+Geeta+Mandir,+nr.+Post+Office,+Phase+1,+Urban+Estate,+Jalandhar,+Punjab+144022`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-2 mb-3 flex items-start shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-sm cursor-pointer"
            >
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-relaxed">
                <span className="text-sm text-gray-700 mb-0.5">
                  {formData.address}
                </span>
                <span className="text-sm text-gray-700 mb-0.5">
                  {formData.city}
                </span>
                <span className="text-sm text-gray-700 mb-0.5">
                  {formData.state}
                </span>
                <span className="text-sm text-gray-700">
                  {formData.postal_code}
                </span>
              </div>
            </Link>
          )}
          {(formData.bank_details ||
            formData.upi_id ||
            formData.payment_number) &&
            formData.bank_status !== "0" && (
              <Accordion
                title="Account Details"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 8H12C13.1046 8 14 8.89543 14 10V11.1429C14 12.2474 13.1046 13.1429 12 13.1429H9.33333L13.3333 17"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 8L16 8"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 10.5718L16 10.5718"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              >
                <div className="pt-3 space-y-4">
                  {/* Bank Details */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                      Bank Details :-
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-800">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formData.bank_details.replace(
                                /\n/g,
                                "<br />"
                              ),
                            }}
                          />
                        </span>
                      </div>
                      {formData.upi_id && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">UPI:</span>
                          <span className="font-bold text-gray-800">
                            {formData.upi_id}
                          </span>
                        </div>
                      )}
                      {formData.payment_number && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Number:</span>
                          <span className="font-bold text-gray-800">
                            {formData.payment_number}
                          </span>
                        </div>
                      )}
                      {formData.gst_number && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">GST No:</span>
                          <span className="font-bold text-gray-800">
                            {formData.gst_number}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* QR Code */}
                  {formData.qr_code && (
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                        Scan to Pay
                      </h4>
                      <div className="relative  flex justify-center">
                        <img
                          src={
                            formData.qr_code
                              ? formData.qr_code
                              : "/assets/qr-code.png"
                          }
                          alt="Payment QR Code"
                          className="w-full h-full border border-gray-200 rounded-lg"
                        />
                        <button 
                      onClick={downloadQrCode} 
                      className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 text-white p-2 rounded-full shadow-md hover:bg-gray-700 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                      title="Download QR Code"
                    >
                      <FiDownload fontSize={18} />
                    </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Scan this QR code with any UPI app to make payment
                      </p>
                    </div>
                  )}
                </div>
              </Accordion>
            )}
        </div>
        {/* Social Media Section */}
        <div className="bg-white rounded-2xl p-3 mx-5 mb-5 text-center shadow-sm border border-gray-100">
          {(formData.instagram ||
            formData.facebook ||
            formData.twitter ||
            formData.linkedin ||
            formData.snapchat ||
            formData.youtube) && (
            <h3 className="text-base font-semibold text-gray-700 mb-4">
              Follow Us:
            </h3>
          )}
          <div className="flex justify-center gap-4">
            {/* Instagram */}
            {formData.instagram && (
              <Link
                href={formData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            )}
            {/* Facebook */}
            {formData.facebook && (
              <Link
                href={formData.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            )}
            {/* Twitter (X) */}
            {formData.twitter && (
              <Link
                href={formData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 3a10.92 10.92 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4 2.3a9.02 9.02 0 0 1-2.83 1.08A4.47 4.47 0 0 0 16.9 2c-2.53 0-4.58 2.07-4.58 4.63 0 .36.04.72.1 1.07C7.72 7.88 4.16 6.18 2.48 3.17a4.59 4.59 0 0 0-.62 2.33c0 1.61.8 3.03 2.02 3.88A4.55 4.55 0 0 1 .99 8.7v.05a4.46 4.46 0 0 0 3.6 4.37c-1.03.28-2.12.36-3.24.13a4.47 4.47 0 0 0 4.15 3.1A8.93 8.93 0 0 1 0 19.3a12.78 12.78 0 0 0 6.84 1.98c8.21 0 12.72-7.01 12.72-13.05 0-.2 0-.39-.02-.59A9.26 9.26 0 0 0 23 3z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            )}

            {/* LinkedIn */}
            {formData.linkedin && (
              <Link
                href={formData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-blue-800 rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.25 0h-20.5C.28 0 0 .28 0 .62v22.75c0 .34.28.62.62.62h20.5c.34 0 .62-.28.62-.62V.62c0-.34-.28-.62-.62-.62zM7.53 20H3.77v-8.8H7.53v8.8zm-1.87-10.12c-1.26 0-2.13-.9-2.13-2.02s.88-2.02 2.13-2.02c1.25 0 2.12.9 2.12 2.02s-.87 2.02-2.12 2.02zm14.38 10.12h-3.75v-4.8c0-1.15-.41-1.94-1.43-1.94-.78 0-1.24.53-1.45 1.04-.07.16-.09.39-.09.62v4.8h-3.75V9.57h3.75V11.5c.53-.81 1.48-1.3 2.46-1.3 1.9 0 3.29 1.27 3.29 3.17v6.62z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            )}

            {/* Snapchat */}
            {formData.snapchat && (
              <Link
                href={formData.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-yellow-400 rounded-xl flex items-center justify-center text-black hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="60px"
                  height="60px"
                  viewBox="147.353 39.286 514.631 514.631"
                  version="1.1"
                  id="Layer_1"
                  xmlSpace="preserve"
                >
                  <path
                    style={{ fill: "#FFFC00" }}
                    d="M147.553,423.021v0.023c0.308,11.424,0.403,22.914,2.33,34.268 c2.042,12.012,4.961,23.725,10.53,34.627c7.529,14.756,17.869,27.217,30.921,37.396c9.371,7.309,19.608,13.111,30.94,16.771 c16.524,5.33,33.571,7.373,50.867,7.473c10.791,0.068,21.575,0.338,32.37,0.293c78.395-0.33,156.792,0.566,235.189-0.484 c10.403-0.141,20.636-1.41,30.846-3.277c19.569-3.582,36.864-11.932,51.661-25.133c17.245-15.381,28.88-34.205,34.132-56.924 c3.437-14.85,4.297-29.916,4.444-45.035v-3.016c0-1.17-0.445-256.892-0.486-260.272c-0.115-9.285-0.799-18.5-2.54-27.636 c-2.117-11.133-5.108-21.981-10.439-32.053c-5.629-10.641-12.68-20.209-21.401-28.57c-13.359-12.81-28.775-21.869-46.722-26.661 c-16.21-4.327-32.747-5.285-49.405-5.27c-0.027-0.004-0.09-0.173-0.094-0.255H278.56c-0.005,0.086-0.008,0.172-0.014,0.255 c-9.454,0.173-18.922,0.102-28.328,1.268c-10.304,1.281-20.509,3.21-30.262,6.812c-15.362,5.682-28.709,14.532-40.11,26.347 c-12.917,13.386-22.022,28.867-26.853,46.894c-4.31,16.084-5.248,32.488-5.271,49.008"
                  />
                  <path
                    style={{ fill: "#FFFFFF" }}
                    d="M407.001,473.488c-1.068,0-2.087-0.039-2.862-0.076c-0.615,0.053-1.25,0.076-1.886,0.076 c-22.437,0-37.439-10.607-50.678-19.973c-9.489-6.703-18.438-13.031-28.922-14.775c-5.149-0.854-10.271-1.287-15.22-1.287 c-8.917,0-15.964,1.383-21.109,2.389c-3.166,0.617-5.896,1.148-8.006,1.148c-2.21,0-4.895-0.49-6.014-4.311 c-0.887-3.014-1.523-5.934-2.137-8.746c-1.536-7.027-2.65-11.316-5.281-11.723c-28.141-4.342-44.768-10.738-48.08-18.484 c-0.347-0.814-0.541-1.633-0.584-2.443c-0.129-2.309,1.501-4.334,3.777-4.711c22.348-3.68,42.219-15.492,59.064-35.119 c13.049-15.195,19.457-29.713,20.145-31.316c0.03-0.072,0.065-0.148,
      0.101-0.217c3.247-6.588,3.893-12.281,1.926-16.916 c-3.626-8.551-15.635-12.361-23.58-14.882c-1.976-0.625-3.845-1.217-5.334-1.808c-7.043-2.782-18.626-8.66-17.083-16.773 c1.124-5.916,8.949-10.036,15.273-10.036c1.756,0,3.312,0.308,4.622,0.923c7.146,3.348,13.575,5.045,19.104,5.045 c6.876,0,10.197-2.618,11-3.362c-0.198-3.668-0.44-7.546-0.674-11.214c0-0.004-0.005-0.048-0.005-0.048 c-1.614-25.675-3.627-57.627,4.546-75.95c24.462-54.847,76.339-59.112,91.651-59.112c0.408,0,6.674-0.062,6.674-0.062 c0.283-0.005,0.59-0.009,0.908-0.009c15.354,0,67.339,4.27,91.816,59.15c8.173,18.335,6.158,50.314,4.539,76.016l-0.076,
      1.23 c-0.222,3.49-0.427,6.793-0.6,9.995c0.756,0.696,3.795,3.096,9.978,3.339c5.271-0.202,11.328-1.891,17.998-5.014 c2.062-0.968,4.345-1.169,5.895-1.169c2.343,0,4.727,0.456,6.714,1.285l0.106,0.041c5.66,2.009,9.367,6.024,9.447,10.242 c0.071,3.932-2.851,9.809-17.223,15.485c-1.472,0.583-3.039,1.179-5.334,1.7 c-8.736,2.774-21.934,6.96-26.376,17.427c-2.501,5.896-1.816,12.854,2.034,20.678c1.584,3.697,26.52,59.865,82.631,69.111 c-0.011,0.266-0.079,0.557-0.229,0.9c-0.951,2.24-6.996,9.979-44.612,15.783c-5.886,0.902-7.328,7.5-9,15.17 c-0.604,2.746-1.218,5.518-2.062,8.381c-0.258,0.865-0.306,0.914-1.233,0.914c-0.128,0-0.278,0-0.442,0 c-1.668,0-4.2-0.346-7.135-0.922c-5.345-1.041-12.647-2.318-21.109-2.318c-4.702,0-9.575,0.414-14.48,1.229c-9.455,1.574-17.606,7.332-27.037,14 c13.804,9.758,29.429,20.803,53.302,20.803c0.651,0,1.304-0.021,1.949-0.066c0.789,0.037,1.767,0.066,2.799,0.066 c23.88,0,39.501-11.049,53.29-20.799l0.022-0.02c9.433-6.66,17.575-12.41,27.027-13.984c4.903-0.814,9.775-1.229,14.479-1.229 c8.102,0,14.517,1.033,20.245,2.15c3.738,0.736,6.643,1.09,8.872,1.09l0.218,0.004h0.226c4.917,0,8.53-2.699,9.909-7.422 c0.916-3.109,1.57-6.029,2.215-8.986c0.562-2.564,1.46-6.674"
                  />
                </svg>
              </Link>
            )}

            {/* YouTube */}
            {formData.youtube && (
              <Link
                href={formData.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                    stroke="currentColor"
                  />
                  <polygon
                    points="9.75,15.02 15.5,11.75 9.75,8.48"
                    stroke="currentColor"
                  />
                </svg>
              </Link>
            )}
          </div>
          <div className="mt-5">
            <RWebShare
              data={{
                // text: "Check out Ramnish Thakur's contact card",
                url: currentUrl,
                // title: "Ramnish Thakur - Project Manager",
              }}
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
                <FaShareAlt />
                <span className="text-sm font-bold">Share Contact</span>
              </button>
            </RWebShare>
          </div>
        </div>

        {/* Footer */}
        <Link href="/">
          <div className="text-center pb-5 px-5">
            <span className="text-xs text-gray-500">
              Powered by{" "}
              <span className="font-semibold text-gray-700">
                VIP Number Shop
              </span>
            </span>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes crackerBurst {
          0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(360deg);
          }
        }

        @keyframes explode {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        @keyframes particle {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(40px, -40px) scale(0);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactCard;
