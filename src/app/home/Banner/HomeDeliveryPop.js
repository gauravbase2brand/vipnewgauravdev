import React, { useEffect, useState } from "react";
import first from "../../../../public/assets/pop1.png";
import second from "../../../../public/assets/pop2.png";

const HomeDeliveryPop = () => {
  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Check if the modal should be opened on page load
  useEffect(() => {
    // Check localStorage to determine if modal was previously closed
    const modalStatus = localStorage.getItem("modalStatus");
    if (modalStatus !== "closed") {
      setIsOpen(true); // Open the modal if it's not marked as closed
    }
  }, []);

  // Handle modal close
  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem("modalStatus", "closed"); // Save status to localStorage
  };

  // Get the appropriate image based on screen size
  const imageSrc = window.innerWidth < 768 ? first : second;

  return (
    <div className="flex justify-center items-center min-h-screen absolute">
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-[350px] md:max-w-2xl max-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative md:bg-white bg-primary rounded-[25px] md:rounded-[50px] shadow-sm dark:bg-gray-700">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-2.5 md:text-red-600 text-white  bg-black md:bg-white hover:text-red-600 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div
                className="p-4 md:p-5 text-center object-cover rounded-[50px] md:h-[283px] h-[418px]"
                style={{
                  backgroundImage: `url(${imageSrc.src})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50px",
                  backgroundSize: "contain",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDeliveryPop;
