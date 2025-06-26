"use client";
import React, { useEffect } from "react";

const VipMemberPackage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".grid-item");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          item.classList.add(item.dataset.animation);
          item.classList.remove("hidden");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to check initial positions

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const styles = {
    keyframes: `
      @keyframes slideInLeft {
        0% { transform: translateX(-100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInRight {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideInUp {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      @keyframes slideInDown {
        0% { transform: translateY(-100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      .animate-slideInLeft { animation: slideInLeft 1s ease-out forwards; }
      .animate-slideInRight { animation: slideInRight 1s ease-out forwards; }
      .animate-slideInUp { animation: slideInUp 1s ease-out forwards; }
      .animate-slideInDown { animation: slideInDown 1s ease-out forwards; }
      .hidden { opacity: 0; }
    `,
    section: {
      padding: "2rem 0",
    },
    gridItem: {
      backgroundColor: "#fff",
      padding: "1.5rem",
      borderRadius: "1rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "28px",
      color: "#2B2B2B",
    },
  };

  return (
    <section style={styles.section}>
      {/* Inject Keyframes */}
      <style>{styles.keyframes}</style>
      <div className="container-os mx-auto px-4">
        {/* Heading */}
        <h2 className="font-semibold text-[24px] leading-[30px] text-center py-2 md:text-[36px] md:leading-[42px] text-darktext">
              <span style={{ color: "var(--primary)" }}>Benefits </span> of Becoming a{" "}
              <span style={{ color: "var(--primary)" }}>VIP Partner</span>
            </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grid Item 1 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInLeft"
            style={{ ...styles.gridItem, backgroundColor: "#FFECE2" }}
          >
            Trusted Source of <br /> Lifetime Income
          </div>

          {/* Grid Item 2 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInRight"
            style={{ ...styles.gridItem, backgroundColor: "#ECECFF" }}
          >
            Quick and Hassle-free <br /> Joining Process
          </div>

          {/* Grid Item 3 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInUp"
            style={{ ...styles.gridItem, backgroundColor: "#FFE2E9" }}
          >
            Minimum Effort to <br /> Generate Passive Income
          </div>

          {/* Grid Item 4 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInDown"
            style={{ ...styles.gridItem, backgroundColor: "#E2F0FF" }}
          >
            100% Secure & <br /> Beneficial
          </div>

          {/* Grid Item 5 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInLeft"
            style={{ ...styles.gridItem, backgroundColor: "#E2FFE7" }}
          >
            Strengthen Your <br /> Future Economically
          </div>

          {/* Grid Item 6 */}
          <div
            className="grid-item hidden"
            data-animation="animate-slideInRight"
            style={{ ...styles.gridItem, backgroundColor: "#E2FFF9" }}
          >
            No Extra or Hidden <br /> Charges
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipMemberPackage;
