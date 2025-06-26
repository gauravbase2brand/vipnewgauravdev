import Image from "next/image";
import React from "react";
import InfluncerLink from "./InfluncerLink";

const InfluncerReadyToJoin = () => {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <>
      <section className="bg-primary  relative md:mt-40 mt-3 ">
        <div className=" container-os">
          <div className=" md:py-20 pt-5  grid md:grid-cols-[5fr_2fr] grid-cols-1 gap-8 items-center rounded-[40px]">
            <div className="text-white ">
              <h2 className="text-2xl md:text-3xl font-bold uppercase">
                Ready to Join or Have More Questions?
              </h2>
              <p className="mt-4 text-sm md:text-base">
                We're here to help! Reach out to our team for more details on
                how to get started. Whether you need clarification or guidance,
                we’ll ensure you have all the information to make the best
                decision.
              </p>
             
              <InfluncerLink
                title=" Sign Up Now"
                buttonColor="mt-6 px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-primary transition"
                border="border-secondary border-2"
              />
            </div>

            <div className="relative mt-8 md:mt-0 md:ml-8">
              <div className="relative w-full md:w-[250px] lg:w-[300px]">
                {/* <div className="absolute inset-0 bg-black rounded-[40px]"></div> */}
                <Image
                  src={`${apiUrl}/assets/img/vip-images/sdsd 1.png`} // Replace with your actual image path
                  alt="Person with stylish outfit"
                  width={300}
                  height={500}
                  className="md:absolute md:top-[-17px] md:translate-x-[18%] md:-translate-y-[60%] relative  top-[0px] translate-x-0 translate-y-0 hover:scale-105 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfluncerReadyToJoin;
