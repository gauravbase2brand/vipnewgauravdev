import React from "react";
import "../WhyChooseUs.css";

const WhyChooseBlueBgText = () => {
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
    <section className="">
      <div className="bg-primary lg:py-8 py-4">
        <div className="container-os ">
          <div className="font-bold text-2xl md:text-3xl text-white capitalize text-center">
            <h1>All India References Available To Build Trust With You</h1>
            <p className="font-normal lg:text-lg text-sm leading-[25px] lg:leading-[35px] text-center capitalize text-white lg:py-5 py-2">
            
                Your Nearest Locality/Pincode Based Existing Customer Experience
            
              And Service Verification As said, we have served VIP number
              services all over India in the last {yearsOfExperience} years.
              There is no single state or city we don&apos;t have our existing
              buyer located in. Furthermore, if you challenge us to provide you
              with one trusted factor that explains why we are the best, why you
              should trust, an why you should opt our Indian VIP phone number
              services, we are happy and proud to do so. Simply share your
              locality/are or Pincode, and we will share the contact details of
              our existing customer living within the same locality/area or
              Pincode as yours. You call them and confirm whether our services
              are genuine, they are satisfied with it, will they recommend us or
              whatever question you may want to ask them about us nd our
              services. Feel free to contact our customer support team and ask
              for the contact details of
              <b>our existing customers living in your area/Pincode.</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBlueBgText;
