import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Info = ({ unitPrice, compareAtPrice, setHovered, timeString }) => {
  const pathName = usePathname();
  const categoryTab = pathName.split("/category")[0] + "/category";
  const subCatTab = pathName === "/subcategory";

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setHovered(false);
  //     }, 7000);
  //   }, []);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setHovered(false);
      }}
    >
      <div
        id="popup-modal"
        tabIndex="-1"
        className="flex overflow-y-auto overflow-x-hidden md:fixed absolute top-0 right-0 md:left-0 z-50 justify-center items-center w-full md:inset-0 md:h-[calc(100%-1rem)] h-full max-h-full"
      >
        <div className="relative md:p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-0 end-2.5 text-red-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-4 h-[20px] md:h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setHovered(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-[18px_3px] md:p-5 text-center border border-grey-700 rounded">
              <span className="text-gray-700 italic cursor-pointer text-[11px] md:text-[13px]">
                {"Currently, the price is "}
                <span className="text-red-500">₹{unitPrice}</span>
                {". After the time "}
                <span className="text-red-500">{timeString}</span>
                {" expires, you will have to pay "}
                <span className="text-red-500">₹{compareAtPrice}</span>
                {". So, buy now and take advantage before it’s too late."}
              </span>

              {/* <button
              onClick={handleDeleteConfirm}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={handleModalClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Add to Wishlist
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Info;
