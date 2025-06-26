import React from "react";
import PrivacyPolicy from "./PrivacyPolicy";
export const metadata = {
  title: "Privacy Policy | VIP Number Shop",
  description:
    "Learn about how VIP Number Shop protects your privacy. Our privacy policy outlines how we collect, use, and safeguard your personal information.",
};
const page = () => {
  return (
    <div>
      <PrivacyPolicy />
    </div>
  );
};

export default page;
