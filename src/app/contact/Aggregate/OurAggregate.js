import React, { useContext, useEffect, useState } from "react";
import "./Aggregator.css";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import Image from "next/image";

const OurAggregate = () => {
  const [location, setLocation] = useState("");
  const [responseData, setResponseData] = useState(null);
  const { user } = useContext(AppStateContext);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/address/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: location }),
        }
      );
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  useEffect(() => {
    if (location === "") {
      handleSearchClick();
    }
  }, [location]);
  useEffect(() => {
    handleSearchClick();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary py-12">
        <div className="container-os mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div>
              <p className="text-white text-lg md:text-xl font-semibold">
                VIP NUMBER SHOP offers effortless services—enabling you to
                purchase premium fancy mobile numbers with ease, security, and
                seamless transactions.
              </p>
            </div>
            <div className="w-full">
              <h2 className="text-white text-2xl font-bold mb-4">
                City / State / Postal Code
              </h2>
              <div className="relative">
                <input
                  id="pincodedata"
                  type="text"
                  value={location}
                  onChange={handleInputChange}
                  placeholder="Enter your city, state, postal code"
                  onKeyDown={handleKeyDown}
                  className="peer w-full bg-white text-gray-900 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg transition-all duration-300 ease-in-out"
                />
                <label
                  htmlFor="pincodedata"
                  className={`absolute bg-white left-5 transition-all transform origin-left text-gray-500  ${
                    location ? "-top-3 text-xs" : "top-3 p-[3px] rounded-xl"
                  } peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[black] `}
                >
                  Enter your city, state, postal code
                </label>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary text-white rounded-full p-3 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                  onClick={handleSearchClick}
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {responseData?.result?.length > 0 ? (
        <div className="aggregate-box container-os mx-auto px-4 py-8 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
          {responseData.result.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-2xl transform transition hover:-translate-y-2 hover:shadow-purple-500"
            >
              <section className="p-6 animated-border h-[240px] overflow-auto">
                <article className="mb-2">
                  <p className="text-gray-800 font-semibold text-lg">
                    {item?.trusteeaddress_tks_businessnam}
                  </p>
                </article>
                <article className="mb-2">
                  <p className="text-gray-600">
                    {item?.trusteeaddress_tks_personname}
                  </p>
                </article>
                <article className="mb-2">
                  <p className="text-gray-600">{item?.cf_2849}</p>
                </article>
                <article className="mb-2">
                  <p className="text-gray-600">{item?.cf_2853}</p>
                </article>
                <article className="mb-2">
                  <p className="text-gray-600 breaking-word">
                    {item?.cf_2861} ,{item?.cf_2855}, {item?.cf_2857}
                  </p>
                </article>
                {/* <article className="mb-2">
                  <p className="text-gray-600">{item?.cf_2855}</p>
                </article>
                <article>
                  <p className="text-gray-600">{item?.cf_2857}</p>
                </article> */}
              </section>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <h3 className="text-2xl text-purple-500 font-bold">
            Data Not Found...
          </h3>
        </div>
      )}
    </div>
  );
};

export default OurAggregate;
