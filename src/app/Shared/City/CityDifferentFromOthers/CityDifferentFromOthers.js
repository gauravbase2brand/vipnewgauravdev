import React, { useContext } from "react";
import CityHeading from "../CityHeading/CityHeading";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";

const CityDifferentFromOthers = ({
  heading,
  heading1,
  text11,
  text12,
  heading2,
  text21,
  text22,
  heading3,
  text31,
  text32,
  heading4,
  text41,
  text42,
  heading5,
  text51,
  text52,
}) => {
  const { skeleton } = useContext(AppStateContext);
  return (
    <section className="default-section-os">
      {skeleton ? (
        <section className="bg-white mt-8">
          <div className="container-os mx-auto px-4">
            <div className="text-center pb-4">
              <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 my-5">
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
              <div className="bg-gray-200 p-4 rounded-3xl animate-pulse">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container-os mx-auto px-4">
          <div className="text-center pb-4">
            <CityHeading title={heading} />
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 my-5 ">
            <div className="bg-purple-100  p-4 rounded-3xl">
              {heading1 && (
                <h3 className="font-semibold text-2xl text-primary mb-4">
                  {heading1}
                </h3>
              )}
              {text11 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text11}
                </p>
              )}
              {text12 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text12}
                </p>
              )}
            </div>

            <div className="bg-red-100  p-4 rounded-3xl">
              {heading2 && (
                <h3 className="font-semibold text-2xl text-red-600 mb-4">
                  {heading2}
                </h3>
              )}
              {text21 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text21}
                </p>
              )}
              {text22 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text22}
                </p>
              )}
            </div>

            <div className="bg-blue-100  p-4 rounded-3xl">
              {heading3 && (
                <h3 className="font-semibold text-2xl text-primary mb-4">
                  {heading3}
                </h3>
              )}
              {text31 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text31}
                </p>
              )}
              {text32 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text32}
                </p>
              )}
            </div>

            <div className="bg-cyan-100  p-4 rounded-3xl">
              {heading4 && (
                <h3 className="font-semibold text-2xl text-cyan-600 mb-4">
                  {heading4}
                </h3>
              )}
              {text41 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text41}
                </p>
              )}
              {text42 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text42}
                </p>
              )}
            </div>

            <div className="bg-purple-100  p-4 rounded-3xl">
              {heading5 && (
                <h3 className="font-semibold text-2xl text-primary mb-4">
                  {heading5}
                </h3>
              )}
              {text51 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text51}
                </p>
              )}
              {text52 && (
                <p className="font-normal text-lg leading-7 text-gray-800 pb-3">
                  {text52}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CityDifferentFromOthers;
