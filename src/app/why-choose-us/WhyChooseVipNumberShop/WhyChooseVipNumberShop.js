import React from "react";
import "./WhyChooseVipNumberShop.css";
import WhyChooseHeading from "../WhyChooseHeading/WhyChooseHeading";
import WhyChooseVipNumberShopCard from "./WhyChooseVipNumberShopCard/WhyChooseVipNumberShopCard";

const WhyChooseVipNumberShop = () => {
  const startYear = 2007;
  const startMonth = 3; // January is 0, so April is 3
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let yearsOfExperience;
  if (currentMonth >= startMonth) {
    yearsOfExperience = currentYear - startYear;
  } else {
    yearsOfExperience = currentYear - startYear - 1;
  }

  return (
<section
  className="bg-cover bg-no-repeat py-5 mb-2"
  style={{
    backgroundImage: `url("https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/faq-bg_zvwyoi.webp")`,
  }}
>
      <div className="container-os">
        <div className="WhyChooseVipNumberShop-heading-os">
          <WhyChooseHeading
            heading="VIP Number Shop"
            subHeading="VIP Number Shop (VNS): Registered, Verified And Trusted"
          />
          <h4>“Be Genuine, Be Remarkable. Be Worth Connecting With”</h4>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-3">
          <WhyChooseVipNumberShopCard
            heading="No More Fear And Risk!!"
            subHeading={`We, at VIP Number Shop, are fighting continuously against fraudulent and spam websites/shops/stores for the last ${yearsOfExperience} years and helping customers in getting honest VIP number services with no scam and fooling.`}
       
          />
          <WhyChooseVipNumberShopCard
            heading="You Can Trust Upon Us And Our VIP Phone Number Services!!"
            subHeading={`We have been providing the VIP Number Services all over India since 2007. buyers, and sellers in the last ${yearsOfExperience} Years. Furthermore, VIP Number Shop is a verified and registered VIP Number provider (Reg. No. 5217) having head office in Jalandhar.`}
          />
          <WhyChooseVipNumberShopCard
            heading="Want To Buy A VIP Phone Number"
            subHeading="Beware that about 80 to 90% of shops and stores selling VIP numbers are fake and your money could be at risk. That's one of the reasons why people are afraid of buying VIP phone numbers online in India."
          />
          <WhyChooseVipNumberShopCard
            heading="There’s No Risk At All” with “Trusted Since 2007"
            subHeading={`No negative feedback and reviews anywhere, including Google And Facebook, in the last ${yearsOfExperience} years of our business journey. We always go the extra mile to make our customers happy and satisfied, and that's one of the main factors customers love and trust VIP Number Shop's services.`}
          />
          <WhyChooseVipNumberShopCard
            heading="There's No Risk At All When You Shop Vip Numbers At VNS!!"
            subHeading={`In the last ${yearsOfExperience} years, we have delivered VIP phone numbers to almost every city and states in India. With over 70K happy customers, we feel proud to say that we are the only authentic, verified, and reliable VIP Phone Number provider in India.`}
          />
          <WhyChooseVipNumberShopCard
            heading="No Fake Claims Or Promises - Verify Credibility Of Our Services Yourself!"
            subHeading="With existing customers over 1 Lakh, we have served VIP numbers to almost every state and city in India. If you still have doubts about VNS's honesty and service credibility, get in touch with us and share your location or postal code."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseVipNumberShop;
