"use client";
import { FaShareAlt, FaPlus, FaMinus } from "react-icons/fa";
import { CiSaveUp2 } from "react-icons/ci";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";

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
          <span className="text-sm font-medium text-gray-700">{title}</span>
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
  const [showCrackers, setShowCrackers] = useState(true);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  useEffect(() => {
    // Hide crackers after 4 seconds
    const timer = setTimeout(() => {
      setShowCrackers(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);
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
      <div className="bg-secondary rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm animate-[slideUp_0.6s_ease-out]">
        {/* Profile Section */}
        <div className="bg-white text-center p-2 rounded-2xl mb-3 relative">
          <div className="w-28 h-28 mx-auto mb-5 rounded-full border-4 border-purple-600 overflow-hidden">
            <img
              src="/assets/crawn-user.png"
              alt="Ramnish Thakur"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ramnish Thakur
          </h2>
          <p className="text-gray-600 font-medium">Chamba</p>
          <span className="absolute top-[10%] right-[25px]">
            <CiSaveUp2 fontSize={25} />
          </span>
        </div>

        {/* Contact Information */}
        <div className="px-5">
          {/* Phone */}
          <Link
            href="tel:+917009170092"
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
            <Link href="https://wa.me/917009170092">
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
            <span className="text-sm font-medium text-gray-700">
              +91-70091-70092
            </span>
          </Link>
          {/* Email */}
          <Link
            href="mailto:info@vipnumbershop.com"
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
            <span className="text-sm font-medium text-gray-700">
              info@vipnumbershop.com
            </span>
          </Link>

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
            <span className="text-sm font-medium text-gray-700">
              www.vipnumbershop.com
            </span>
          </Link>

          {/* Address */}
          <Link
            href="https://maps.google.com/?q=VIP+Number+Shop,+SCO+62,+Garha+Rd,+opp.+Geeta+Mandir,+nr.+Post+Office,+Phase+1,+Urban+Estate,+Jalandhar,+Punjab+144022"
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
                VIP Number Shop, SCO #62, Garha
              </span>
              <span className="text-sm text-gray-700 mb-0.5">
                Rd, opp. Geeta Mandir, nr. Post Office,
              </span>
              <span className="text-sm text-gray-700 mb-0.5">
                Phase 1, Urban Estate, Jalandhar,
              </span>
              <span className="text-sm text-gray-700">Punjab 144022</span>
            </div>
          </Link>
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
                  Bank Details
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium text-gray-800">
                      VIP Number Shop
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium text-gray-800">
                      1234567890123456
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IFSC Code:</span>
                    <span className="font-medium text-gray-800">
                      HDFC0001234
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium text-gray-800">HDFC Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Branch:</span>
                    <span className="font-medium text-gray-800">
                      Jalandhar Urban Estate
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  Scan to Pay
                </h4>
                <div className="flex justify-center">
                  <img
                    src="/assets/qr-code.png"
                    alt="Payment QR Code"
                    className="w-24 h-24 border border-gray-200 rounded-lg"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Scan this QR code with any UPI app to make payment
                </p>
              </div>
            </div>
          </Accordion>
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-2xl p-3 mx-5 mb-5 text-center shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-700 mb-4">
            Follow Us:
          </h3>
          <div className="flex justify-center gap-4">
            {/* Instagram */}
            <Link
              href="https://instagram.com/vipnumbershop"
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

            {/* Facebook */}
            <Link
              href="https://facebook.com/vipnumbershop"
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

            {/* Snapchat */}
            <Link
              href="https://snapchat.com/add/vipnumbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-yellow-400 rounded-xl flex items-center justify-center text-black hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:translate-y-0"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 14s1.5 2 4 2 4-2 4-2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="9"
                  x2="9.01"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="15.01"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>

            {/* YouTube */}
            <Link
              href="https://youtube.com/@vipnumbershop"
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
                  strokeWidth="2"
                />
                <polygon
                  points="9.75,15.02 15.5,11.75 9.75,8.48"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
          <div className="mt-5">
            <RWebShare
              data={{
                text: "Check out Ramnish Thakur's contact card",
                url: currentUrl,
                title: "Ramnish Thakur - Project Manager",
              }}
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 mx-auto hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
                <FaShareAlt />
                <span className="text-sm font-medium">Share Contact</span>
              </button>
            </RWebShare>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-5 px-5">
          <span className="text-xs text-gray-500">
            Powered by{" "}
            <span className="font-semibold text-gray-700">VIP Number Shop</span>
          </span>
        </div>
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
