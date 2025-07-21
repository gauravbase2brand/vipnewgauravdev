import React, { useState, useEffect, useRef } from "react";

const PaymentGate = ({
  paySelected,
  setPaySelected,
  setGatewayName,
  payment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { id: "wallet", name: "Wallet" },
    { id: "upi", name: "UPI" },
    { id: "credit-card", name: "Credit Card" },
    { id: "debit-card", name: "Debit Card" },
    { id: "emi", name: "EMI" },
    { id: "international", name: "International Card" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  // 🔄 Get total number of days in the current month
  const getTotalDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  // 📦 Logic to determine gateway
  const getGateway = (option) => {
    const now = new Date();
    const currentDay = now.getDate();
    const totalDays = getTotalDaysInMonth();

    // if (option === "UPI") {
    //   return payment >= 5000 ? "PhonePe" : "RazorPay";
    // }
    if (option === "UPI") {
      return "PhonePe";
    }

    if (["Wallet", "Credit Card", "Debit Card"].includes(option)) {
      return "PhonePe";
    }

    if (["EMI", "International Card"].includes(option)) {
      return "RazorPay";
    }

    return "";
  };

  const handleSelect = (option) => {
    setPaySelected(option);
    localStorage.setItem("selectPayment", option);

    const gateway = getGateway(option);
    setGatewayName(gateway);
    setIsOpen(false);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("selectPayment");
    if (storedOption) {
      setPaySelected(storedOption);
      setGatewayName(getGateway(storedOption));
    }
  }, [setPaySelected, setGatewayName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full max-w-sm mx-auto font-sans"
    >
      <div
        onClick={toggleDropdown}
        className="bg-white border border-gray-300 rounded-xl px-5 py-3 w-full shadow-sm flex justify-between items-center text-gray-700 hover:shadow-md transition duration-200 cursor-pointer bg-gradient-to-r from-[#f0f4f8] to-[#e2eff7]"
      >
        <span className="font-medium truncate">
          {paySelected || "Select Payment Method"}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute bottom-full mb-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg z-20 overflow-hidden transition-all duration-300">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option.name)}
              className={`px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-blue-100 
                ${
                  paySelected === option.name
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentGate;
