import React, { useContext } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import InfluncerLink from "./InfluncerLink";

const InfluncerHowItWorks = () => {
  const { setPopupModal } = useContext(AppStateContext);
  const handelclick = () => {
    setPopupModal(true);
  };
  const InfluncerHowItWorksdata = [
    {
      id: 1,
      title: "SIGN UP & GET YOUR REFERRAL LINK",
      description:
        "Register on VIPNumberShop.com (or contact our support) to get your unique referral URL. This URL tracks all visits and purchases originating from your posts or videos.",
    },
    {
      id: 2,
      title: "CREATE & POST YOUR CONTENT",
      description:
        "Make a short video or post about VIP Number Shop. Highlight the benefits, features, or share your experience of getting a VIP number. Add your referral link in the caption or bio to earn rewards! ",
    },
    {
      id: 3,
      title: "EARN 3% MARGIN",
      description:
        "Every time someone clicks on your link and buys a VIP number, you'll earn 3% of the successful sale for that order. The more sales you drive, the more you earn!",
    },
    {
      id: 4,
      title: "GET PAID",
      description:
        "Receive your earnings through your preferred payment method (bank transfer, PayPal, UPI, etc.) once the sale is confirmed. Payments are typically processed after a successful purchase",
    },
  ];
  return (
    <>
      <div className="md:py-7 py-4">
        <div className="container-os">
          <div className="text-center xl:mb-12 mb-2 md:mb-4">
            <h2 className="text-3xl font-bold">HOW IT WORKS</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-8 lg:gap-5 md:gap-3 gap-0 text-left">
            {InfluncerHowItWorksdata.map((item, index) => (
              <div
                key={item.id}
                className={`md:p-6 p-2 flex flex-col items-start gap-2 ${
                  index !== InfluncerHowItWorksdata.length - 1
                    ? "lg:border-r-2 lg:border-darktext"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-center w-full">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-center w-full">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Button Section */}
          </div>
          <div className="flex justify-center md:mt-8 mt-4">
            {/* <button onClick={()=>handelclick()} className=" ">
              JOIN NOW
            </button> */}
            <InfluncerLink
              title="JOIN NOW"
              buttonColor="bg-transparent border-2 border-primary text-primary hover:text-darktext hover:border-darktext py-2 px-6 rounded-full text-xl hover:bg-secondary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfluncerHowItWorks;
