"use client";
import React from "react";
import MainHeading from "../Shared/MainHeading/MainHeading";
import PrivacyPolicyAccordion from "./PrivacyPolicyAccordion/PrivacyPolicyAccordion";
import "./PrivacyPolicy.css";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import Link from "next/link";
import { ResponsiveFooter } from "../ResponsiveModule";

const PrivacyPolicy = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className="PrivacyPolicy-page-os">
      <div className="container-os">
        <div className="PrivacyPolicy-heading">
          <MainHeading
            MainHeading="PRIVACY POLICY"
            rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
          />
          <p>
            It is VIP NUMBER SHOP&apos;s policy to respect your privacy
            regarding any information we may collect while operating our
            website. This Privacy Policy applies to
            <Link href="https://vipnumbershop.com" target="_blank">
              https://vipnumbershop.com
            </Link>
            (hereinafter, "us", "we", or "
            <Link href="https://vipnumbershop.com" target="_blank">
              https://vipnumbershop.com
            </Link>
            "). We respect your privacy and are committed to protecting
            personally identifiable information you may provide us through the
            Website. We have adopted this privacy policy ("Privacy Policy") to
            explain what information may be collected on our Website, how we use
            this information, and under what circumstances we may disclose the
            information to third parties. This Privacy Policy applies only to
            information we collect through the Website and does not apply to our
            collection of information from other sources. This Privacy Policy,
            together with the Terms and conditions posted on our Website, set
            forth the general rules and policies governing your use of our
            Website. Depending on your activities when visiting our Website, you
            may be required to agree to additional terms and conditions.
          </p>
        </div>
        <PrivacyPolicyAccordion />
      </div>
      <div className="container-os text-center">
        <span className="text-sm md:text-base leading-6 lg:text-left text-center">
          Our application uses YouTube API Services. By using our app, you are
          agreeing to be bound by the{" "}
          <Link
            href="https://www.youtube.com/t/terms"
            className="font-semibold underline"
          >
            YouTube Terms of Service
          </Link>
          . You can read more about how Google handles user data in its{" "}
          <Link
            href="https://policies.google.com/privacy"
            className="font-semibold underline"
          >
            Google Privacy Policy
          </Link>
          . If you want to manage your YouTube account and permissions, visit
          the Google security settings page.
        </span>
      </div>
      <QRVipApp />
    </div>
  );
};

export default PrivacyPolicy;
