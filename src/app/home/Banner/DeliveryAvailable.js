import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import React, { useContext, useEffect, useState } from "react";

const DeliveryAvailable = () => {
  const { userProfile, user } = useContext(AppStateContext);
  const zipCode = userProfile?.address?.zip_code;
  const [charges, setCharges] = useState(null);
  // Fetch delivery data
  const handleSearchClick = async (location) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/address/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: location, delivery: "yes" }),
        }
      );
      const data = await response.json();
      if (data.result) {
        setCharges(data.result[0]); // Set charges if available
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch delivery data when zip code changes
  useEffect(() => {
    if (zipCode) {
      handleSearchClick(zipCode);
    }
  }, [zipCode]);

  return (
    <>
      {charges?.cf_2913 && (
        <div className="container-os h-[25px] sm:h-[15px]">
          <section
            className={`overflow-hidden relative p-3 bg-secondary bottom-[0.9rem] lg:bottom-[2rem]`}
          >
            <div className="w-full overflow-hidden">
              <div
                className="flex w-max whitespace-nowrap"
                style={{
                  animation: "smoothMarquee 100s linear infinite",
                  display: "flex",
                }}
              >
                {Array(30)
                  .fill(`Home Delivery is Available in `)
                  .map((text, index) => (
                    <h4
                      key={index}
                      className="text-sm text-darktext px-2 text-[16px] font-black"
                    >
                      {text}
                      <span className="text-red-500">{charges?.cf_2861}.</span>
                      {" \u00A0\u00A0\u00A0"} {/* This will add the spacing */}
                    </h4>
                  ))}
              </div>
            </div>

            <style jsx>{`
              @keyframes smoothMarquee {
                from {
                  transform: translateX(0%);
                }
                to {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </section>
        </div>
      )}
    </>
  );
};

export default DeliveryAvailable;
