import React from "react";
import Image from "next/image";

const InfluencerTermsConditions = () => {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <div className=" xl:py-10 md:px-4  xl:px-20 py-4">
      <div className="container-os  bg-white rounded-lg  p-3 lg:p-10 grid grid-cols-1 xl:grid-cols-2 gap-6 ">
        {/* Left Section - Image & Title */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            INFLUENCER PROGRAMME <br /> TERMS & CONDITIONS
          </h2>
          <p className="text-lightext mt-2 text-sm lg:text-base">
            Our Influencer Programme Terms & Conditions outline the guidelines
            for participation, collaboration expectations, and content usage
            rights. By joining, influencers agree to promote our brand
            authentically, adhere to ethical marketing standards, and comply
            with disclosure regulations.
          </p>
          <div className="mt-4">
            <Image
              className="rounded-md xl:h-[420px] h-auto object-cover"
              src={`${apiUrl}/assets/img/vip-images/model.jpg`}
              alt="Influencer Terms & Conditions"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Right Section - Terms Details */}
        <div className="bg-gray-50 md:p-6 p-3 rounded-lg  border-2 border-[#3634343f] ">
          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              UNIQUE REFERRAL LINK
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Each influencer will receive a unique URL to track referrals and
              monitor engagement, conversions, and commissions in real time.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              3% MARGIN ELIGIBILITY
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Commission is calculated only on successful purchases made via
              your referral link.{" "}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              PAYOUT SCHEDULE
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Payouts are processed on a daily basis upon successful purchase.{" "}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              PROHIBITED CONTENT
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Influencers must refrain from misleading claims, fraudulent
              activities, or offensive content.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              PROMOTIONAL METHODS
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Promoting via spammy or deceptive tactics is strictly prohibited
              and may result in disqualification.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="md:text-[22px] text-[20px] font-semibold text-primary">
              ACCOUNTABILITY
            </h3>
            <p className="text-lightext mt-1 text-sm lg:text-base">
              Influencers are responsible for ensuring all marketing activities
              adhere to local laws and platform guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerTermsConditions;
