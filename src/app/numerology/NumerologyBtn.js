// import React from "react";
// import "./Numerology.css";

// const NumerologyBtn = ({ onClick, title, working }) => {
//   return (
//     <>
//       <span className="flex justify-start items-center  gap-2 mt-2">
//         <button
//           className={`${
//             working
//               ? "text-[16px] leading-[20px] text-center text-white font-normal bg-primary rounded-[9px] gap-3 no-underline lg:px-6 lg:py-4 px-4 py-3 border-[2px] border-primary "
//               : "text-[16px] leading-[20px] text-center text-white font-normal bg-primary rounded-[9px] gap-3 no-underline lg:px-6 lg:py-4 px-4 py-3 border-[2px] border-primary "
//           }`}
//           type="button"
//           onClick={onClick}
//           aria-label="submit"
//         >
//           {title}
//         </button>
//         {/* <span className=" flex flex-col">
//           <p className="mb-2 text-center font-medium md:text-[18px] text-[15px]">
//             Get <span className=" text-secondary">1,500 </span>
//             Cashback with your Numerology Report.
//           </p>
//           <p className=" mb-2 text-center font-medium md:text-[18px] text-[15px]">  Cashback valid for 30 days only.</p>
//           <p className="mb-2 text-center font-medium md:text-[18px] text-[15px]">
//             Cashback can be used only on www.vip
//             <span className=" text-secondary">number</span>
//             shop.com
//           </p>
//         </span> */}
//       </span>
//     </>
//   );
// };

// export default NumerologyBtn;




import React from "react";
import "./Numerology.css";

const NumerologyBtn = ({ onClick, title, secondary }) => {
  return (
    <span className="flex justify-start items-center gap-2 mt-2">
      <button
        className={`text-[16px] leading-[20px] text-center  font-normal rounded-[9px] gap-3 no-underline lg:px-6 lg:py-4 px-4 py-3 border-[2px] ${
          secondary
            ? "bg-secondary border-secondary text-darktext"
            : "bg-primary border-primary text-white"
        }`}
        type="button"
        onClick={onClick}
        aria-label="submit"
      >
        {title}
      </button>
    </span>
  );
};

export default NumerologyBtn;
