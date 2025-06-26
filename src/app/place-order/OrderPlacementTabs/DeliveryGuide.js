import React from "react";

const DeliveryGuide = ({ deliveryCloseModal,amount,district,filteredCartItems }) => {
  const totalCharge = amount * filteredCartItems.length; // Calculate total
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-auto`}>
      <div className={`relative w-full max-w-3xl bg-white rounded-2xl shadow-xl dark:bg-gray-800 m-4`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700`}>
          <h2 className={`text-[18px] font-bold text-gray-800 dark:text-white`}>
            🚀 How It Works
          </h2>
          <button
            onClick={deliveryCloseModal}
            className={`text-gray-400 hover:text-red-500`}
          >
            <svg
              className={`w-6 h-6`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className={`px-6 py-2 space-y-2 text-gray-700 dark:text-gray-300`}>
          <div>
            <h3 className={`text-[16px] font-semibold flex items-center gap-2`}>
              <span className={`bg-blue-500 text-white rounded-full px-2 py-0.5 text-sm`}>1</span> Book It
            </h3>
            <p className={`text-sm mt-1`}>
              {`Pay delivery charges ${totalCharge}/- and instantly book the number for yourself.`}
            </p>
          </div>

          <div>
            <h3 className={`text-[16px] font-semibold flex items-center gap-2`}>
              <span className={`bg-blue-500 text-white rounded-full px-2 py-0.5 text-sm`}>2</span> Quick Confirmation
            </h3>
            <p className={`text-sm mt-1`}>
              {`Our team will call you within 2–3 working hours to confirm your booking.`}
            </p>
          </div>

          <div>
            <h3 className={`text-[16px] font-semibold flex items-center gap-2`}>
              <span className={`bg-blue-500 text-white rounded-full px-2 py-0.5 text-sm`}>3</span> Seller Coordination
            </h3>
            <p className={`text-sm mt-1`}>
              {`We’ll confirm the number’s availability with the seller within 24 working hours.`}
            </p>
          </div>

          <div>
            <h3 className={`text-[16px] font-semibold flex items-center gap-2`}>
              <span className={`bg-blue-500 text-white rounded-full px-2 py-0.5 text-sm`}>4</span> Assignment & Delivery
            </h3>
            <p className={`text-sm mt-1`}>
              {`A local delivery agent (aggregator) in `}
              <strong className={`text-blue-600`}>{`${district}`}</strong>
              {` will be assigned for home/office delivery and MNP process.`}
            </p>
          </div>

          <div>
            <h3 className={`text-[16px] font-semibold flex items-center gap-2`}>
              <span className={`bg-blue-500 text-white rounded-full px-2 py-0.5 text-sm`}>5</span> UPC & MNP Process
            </h3>
            <p className={`text-sm mt-1`}>
              {`Once payment is completed, we’ll provide your UPC code. The aggregator will initiate the MNP process and hand over the SIM. Activation takes approx. 5 days.`}
            </p>
          </div>

          <div className={`bg-green-100 border border-green-300 rounded-lg p-4`}>
            <h4 className={`text-lg font-semibold text-green-700`}>
              ✅ Satisfaction Guaranteed
            </h4>
            <p className={`text-sm mt-1 text-green-800`}>
              {`The delivery agent will show you a snapshot of your successful MNP request. You can track the status directly via Jio/Airtel, and the agent will assist you with everything you need.`}
            </p>
            <span className="text-red-700 italic cursor-pointer text-[13px]">Recharge amount extra.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryGuide;
