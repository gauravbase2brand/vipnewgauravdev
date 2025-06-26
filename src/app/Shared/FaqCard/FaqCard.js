// "use client";
// import React from "react";

// const FaqCard = ({ paragraph, heading, faqId, isExpanded, toggleExpand }) => {
//   const PlusIcon = (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 5V19"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M5 12H19"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );

//   const MinusIcon = (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M5 12H19"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );

//   return (
//     <div className="border-b-[1px] lg:p-4 p-2">
//       <div
//         className="cursor-pointer flex justify-between items-center"
//         onClick={() => toggleExpand(faqId)}
//       >
//         <h3 className="text-lg font-medium">{heading}</h3>
//         <span>{isExpanded ? MinusIcon : PlusIcon}</span>
//       </div>
//       {isExpanded && (
//         <div className="mt-2">
//           <p>{paragraph}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaqCard;

"use client";
import React, { useContext, useState } from "react";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const FaqCard = ({ paragraph, heading, faqId, isExpanded, toggleExpand }) => {
  const { skeleton } = useContext(AppStateContext);

  return (
    <>
      {skeleton ? (
        <div className="bg-transparent p-4 rounded-lg mb-2 border border-gray-300 m-auto">
          <div className="cursor-pointer flex justify-between items-center animate-pulse">
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="transition-all duration-300 overflow-hidden mt-2 animate-pulse">
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer mb-2 border border-primary  m-auto transition-transform duration-300">
          <div
            onClick={() => toggleExpand(faqId)}
            className="cursor-pointer flex justify-between items-center"
          >
            <h4 className="text-lg font-medium text-black">{heading}</h4>
            <span className="text-black">
              {isExpanded ? <RiSubtractFill /> : <IoMdAdd />}
            </span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isExpanded
                ? "max-h-[500px] opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-black">{paragraph}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqCard;
