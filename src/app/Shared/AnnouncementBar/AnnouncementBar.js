import React, { useContext, useEffect, useState } from "react";
import "./AnnouncementBar.css";
import Image from "next/image";
import axios from "axios";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const AnnouncementBar = () => {
  const [banner, setBanner] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const { skeleton } = useContext(AppStateContext);
  // useEffect(() => {
  //   const bannerApi = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/web/banner`);
  //       setBanner(response?.data?.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   bannerApi();
  // }, []);

  useEffect(() => {
    const storedBanner = sessionStorage.getItem("bannerData");
    if (storedBanner) {
      // If data exists in sessionStorage, use it
      setBanner(JSON.parse(storedBanner));
    } else {
      // Otherwise, fetch from the API
      const bannerApi = async () => {
        try {
          const response = await axios.get(`${apiUrl}/web/banner`);
          const bannerData = response?.data?.data || [];
          setBanner(bannerData);
          // Store the fetched banner data in sessionStorage
          sessionStorage.setItem("bannerData", JSON.stringify(bannerData));
        } catch (error) {
          console.error(error);
        }
      };
      bannerApi();
    }
  }, [apiUrl]);

  return (
    <>
      {/* {skeleton ? (
        <section className="bg-white">
          <div className="bg-gray-200">
            <div className="container-os">
              <div className="flex items-center justify-between text-center text-white animate-pulse ">
                <div className="w-[80px] lg:h-[90px] h-[80px] bg-gray-100 rounded"></div>
                <div className="flex flex-col">
                  <div className="w-24 h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-24 h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-24 h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="w-[100px] h-[90px] bg-gray-100 rounded lg:block hidden"></div>
              </div>
            </div>
          </div>
        </section>
      ) : ( */}
      <>
        <section className="AnnouncementBar-section-os">
          <div className=" bg-primary">
            <div className="container-os">
              <div className="flex items-center justify-between text-center text-white">
                {banner?.icon && (
                  <Image
                    className="w-[80px] lg:h-[90px] h-[80px] object-cover "
                    src={`${apiUrl}${banner?.icon}`}
                    alt="instagram icon image"
                    width={100}
                    height={100}
                    priority="true"
                  />
                )}
                <div>
                  <span className="text-[14px]">{banner?.heading}</span>
                  <p className="text-[12px]">{banner?.title}</p>
                  <p className="text-[12px]">{banner?.subtitle}</p>
                </div>
                {banner?.image && (
                  <Image
                    className=" w-[100px] h-[90px] object-contain lg:block hidden"
                    src={`${apiUrl}${banner?.image}`}
                    alt="gift box"
                    width={100}
                    height={100}
                    priority="true"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </>
      {/* )} */}
    </>
  );
};

export default AnnouncementBar;
