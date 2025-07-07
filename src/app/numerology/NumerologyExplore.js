"ue client";
import Image from "next/image";
import fillarrow from "../../../public/assets/fillarrow.svg";
import blankarrow from "../../../public/assets/blankarrow.svg";
import React, { useContext } from "react";
import para1 from "../../../public/assets/para1.svg";
import para12 from "../../../public/assets/para12.svg";
import para13 from "../../../public/assets/para13.svg";
import para14 from "../../../public/assets/para14.svg";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const data = [
  {
    id: 1,
    label: "100% Match – Complete Harmony",
    content: "Align with your perfect numerology numbers for success.",
    filledArrows: 10,
    emptyArrows: 0,
  },
  {
    id: 2,
    label: "75–85% Match – Balanced Potential",
    content: "Enhance your journey with balanced numerology insights.",
    filledArrows: 7,
    emptyArrows: 3,
  },
  {
    id: 3,
    label: "50–60% Match – Exploring Opportunities",
    content: "Open the door to new possibilities and opportunities.",
    filledArrows: 5,
    emptyArrows: 5,
  },
];

const NumerologyExplore = () => {
  const { setNumerologyPop, user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const handleOpen = () => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "Numurology");
    } else {
      setNumerologyPop(true);
      localStorage.setItem("Lead-Page", "Numurology");
    }
  };
  const text1 =
    "✶ We have partnered with India's leading Numerologists and Astrologers to provide you with a personalized report based ✶";
  const text2 =
    "✶ on your date of birth and zodiac sign, including your Lucky Number and Lucky Color ✶";

  const repeatedText1 = Array(500).fill(text1).join(" ");
  const repeatedText2 = Array(500).fill(text2).join(" ");
  return (
    <div>
      <div className="max-w-6xl mx-auto space-y-8 px-4 py-10">
        {data.map(
          ({ id, label, content, filledArrows, emptyArrows, topPosition }) => (
            <div
              key={id}
              className="rounded-xl shadow-md relative overflow-hidden p-6 text-center text-white"
              style={{
                background:
                  "radial-gradient(circle, #824deb 0%, rgba(88,68,127,1) 100%)",
              }}
            >
              {/* Top label */}
              <div
                className={`lg:text-lg inline-block bg-yellow-400 text-purple-900 font-semibold rounded-b-xl px-6 py-2 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm md:w-[48%] w-[90%] top-[18px]`}
              >
                {label}
              </div>

              {/* Content */}
              <p className="mt-10 mb-6  max-w-xl mx-auto text-xl">{content}</p>

              {/* Button & arrows */}
              <div className="flex items-center justify-center gap-4">
                <button
                  className="bg-white text-purple-700 px-5 py-1.5 rounded shadow-sm hover:bg-gray-200 transition"
                  onClick={handleOpen}
                >
                  Explore Now
                </button>
                <div className="flex space-x-1">
                  {[...Array(filledArrows)].map((_, i) => (
                    <Image
                      src={fillarrow}
                      key={`filled-${i}`}
                      className="w-4 h-4  inline-block"
                      alt="fill arrow"
                    />
                  ))}
                  {[...Array(emptyArrows)].map((_, i) => (
                    <Image
                      src={blankarrow}
                      key={`empty-${i}`}
                      className="w-4 h-4 inline-block"
                      alt="blank arrow"
                    />
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 opacity-70 rounded-xl filter blur-xl -z-10"></div>
            </div>
          )
        )}
      </div>
      <div className="relative">
        <div className="hidden md:block">
          <div>
            <Image
              src={para13}
              alt="para"
              className="w-36 absolute left-1/2  -translate-x-1/2 z-10"
            />
          </div>
          <div>
            <Image
              src={para12}
              alt="para"
              className="w-20 absolute right-[0rem] top-[5rem] z-10"
            />
          </div>
          <div>
            <Image
              src={para1}
              alt="para"
              className="w-20 absolute top-[10rem]  z-10 lg:left-80"
            />
          </div>
          <div>
            <Image src={para14} alt="para" className="w-20 z-10 absolute" />
          </div>
        </div>

        <div className="relative overflow-hidden flex justify-center items-center md:h-[150px] h-[150px]">
          <div className="relative">
            {/* Top Scrolling Banner */}
            <div className="bg-yellow-400 transform  py-2 w-full z-[3] relative">
              <h4 className="text-black text-2xl font-semibold text-nowrap animate-marquee">
                {repeatedText1}
              </h4>
            </div>

            {/* Bottom Static/Decorative Banner */}
            <div className=" h-[48px] text-white font-semibold text-center transform rotate-3 mt-2 z-1 absolute top-0 w-[100%]">
              <h4 className="text-white text-2xl font-semibold text-nowrap animate-marquee bg-primary  py-2">
                {repeatedText1}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-arrow {
          clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
          margin-right: 2px;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 5000s linear infinite;
          white-space: nowrap;
        }
        .bar_card_h {
          height: 18rem;
        }
        @media screen and (max-width: 1650px) {
          .bar_card_h {
            height: 15rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NumerologyExplore;
