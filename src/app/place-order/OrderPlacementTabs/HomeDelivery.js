import React from "react";

const HomeDelivery = ({
  isChecked,
  handleCheckboxChange,
  charge,
  setDeliveryIsOpen,
  filteredCartItems,
  comingSoonData,
}) => {
  const totalCharge = charge * filteredCartItems.length; // Calculate total
  const numbers = comingSoonData.map(item => item.number).join(', ');
  return (
    <div className="w-full md:p-4 p-3 border-[1px] border-[#e0e0e0] bg-gradient-to-r from-[#f0f4f8] to-[#e2eff7] rounded-[15px] my-3 shadow-lg">
      <h2 className="text-xl font-semibold text-[#2c3e50] mb-2">
        Home Delivery <span className="text-[#95a5a6]">(Pay on Delivery)</span>
      </h2>
      <p className="text-md text-[#34495e] mt-2">
        <span className="text-gray-700 italic cursor-pointer text-[11px] md:text-[13px]">
          Visiting & MNP Charges.
        </span>
        <span
          className="text-[#e74c3c] cursor-pointer text-[14px] underline"
          onClick={() => setDeliveryIsOpen(true)}
        >
          How it works?
        </span>
      </p>
      <div className="flex items-center space-x-3">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-1"
          htmlFor="ripple"
          data-ripple-dark="true"
        >
          <input
            id="ripple"
            type="checkbox"
            className="peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-[#bdc3c7] shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#bdc3c7] before:opacity-0 before:transition-opacity checked:border-[#27ae60] checked:bg-[#27ae60] checked:before:bg-white hover:before:opacity-10"
            checked={isChecked}
            onChange={() => handleCheckboxChange(charge)}
            disabled={numbers}
          />
          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        {comingSoonData.length === 0 ? (
          <label
            htmlFor="ripple-on"
            className="text-[#2c3e50] text-[14px] font-medium flex items-center space-x-2"
          >
            <span>
              I want home delivery, I will pay the charges for Home Delivery.
            </span>
            {filteredCartItems.length > 1 ? (
              <span className="text-[#e74c3c] font-bold">
                &#8377;{charge}*{filteredCartItems.length}={`${totalCharge}`}/-
              </span>
            ) : (
              <span className="text-[#e74c3c] font-bold">
                &#8377;{`${charge}`}/-
              </span>
            )}
          </label>
        ) : (
          <span className="italic cursor-pointer text-[11px] md:text-[13px] text-red-500">
            Home delivery is not possible for the numbers {numbers}, as they are pre-booking numbers.
          </span>
        )}
      </div>
    </div>
  );
};

export default HomeDelivery;
