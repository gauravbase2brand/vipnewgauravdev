import React from "react";
import Image from "next/image";
import Link from "next/link";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";

export const FooterLink = ({
  blogsLoad,
  submitNewsletter,
  setEmail,
  email,
  openWhatsApp,
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <section className=" border-t-4 border-primary border-b-[1.04px] py-10">
      <div className="container-os mx-auto px-4">
        <div className="footer-links-row-os grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {/* Footer Brand and Social Media */}
          <div>
            <Link href="/">
              <Image
                src={`${panelImg}/assets/img/vip-images/desktop-footer-logo_x9njf3.webp`}
                alt="VIP Number Shop Logo"
                width={300}
                height={100}
                className="flex max-w-[80%]"
                priority="true"
              />
            </Link>

            <div className=" mt-6">
              <h3 className="font-extrabold text-[16.7px] leading-5 uppercase text-primary pb-3">
                Follow us on social media
              </h3>
              <div className="flex items-center justify-center relative">
                <ul className="flex justify-start list-none w-full ">
                  {/* Facebook */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.facebook.com/vipnumbershop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* SVG Icon */}
                      <svg
                        className="transition-all duration-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 72 72"
                        fill="none"
                      >
                        <path
                          d="M46.4927 38.6403L47.7973 30.3588H39.7611V24.9759C39.7611 22.7114 40.883 20.4987 44.4706 20.4987H48.1756V13.4465C46.018 13.1028 43.8378 12.9168 41.6527 12.8901C35.0385 12.8901 30.7204 16.8626 30.7204 24.0442V30.3588H23.3887V38.6403H30.7204V58.671H39.7611V38.6403H46.4927Z"
                          fill="#337FFF"
                        />
                      </svg>
                    </Link>
                  </li>
                  {/* Instagram */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.instagram.com/vip_number_shop_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}
                      <svg
                        className="transition-all duration-300 group-hover:scale-110"
                        width="28"
                        height="28"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                          fill="url(#paint0_radial_7092_54471)"
                        />
                        <path
                          d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                          fill="url(#paint1_radial_7092_54471)"
                        />
                        <defs>
                          <radialGradient
                            id="paint0_radial_7092_54471"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(17.4144 61.017) scale(65.31 65.2708)"
                          >
                            <stop offset="0.09" stopColor="#FA8F21" />
                            <stop offset="0.78" stopColor="#D82D7E" />
                          </radialGradient>
                          <radialGradient
                            id="paint1_radial_7092_54471"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(41.1086 63.257) scale(51.4733 51.4424)"
                          >
                            <stop
                              offset="0.64"
                              stopColor="#8C3AAA"
                              stopOpacity="0"
                            />
                            <stop offset="1" stopColor="#8C3AAA" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </Link>
                  </li>

                  {/* Twitter */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://twitter.com/vip_number_shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}

                      <svg
                        className="transition-all duration-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 72 72"
                        fill="none"
                      >
                        <path
                          d="M40.7568 32.1716L59.3704 11H54.9596L38.7974 29.383L25.8887 11H11L30.5205 38.7983L11 61H15.4111L32.4788 41.5869L46.1113 61H61L40.7557 32.1716H40.7568ZM34.7152 39.0433L32.7374 36.2752L17.0005 14.2492H23.7756L36.4755 32.0249L38.4533 34.7929L54.9617 57.8986H48.1865L34.7152 39.0443V39.0433Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                  </li>
                  {/* LinkedIn */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.linkedin.com/company/vip-number-shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}
                      <svg
                        className="rounded-md transition-all duration-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 72 72"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.6975 11C12.6561 11 11 12.6057 11 14.5838V57.4474C11 59.4257 12.6563 61.03 14.6975 61.03H57.3325C59.3747 61.03 61.03 59.4255 61.03 57.4468V14.5838C61.03 12.6057 59.3747 11 57.3325 11H14.6975ZM26.2032 30.345V52.8686H18.7167V30.345H26.2032ZM26.6967 23.3793C26.6967 25.5407 25.0717 27.2703 22.4615 27.2703L22.4609 27.2701H22.4124C19.8998 27.2701 18.2754 25.5405 18.2754 23.3791C18.2754 21.1686 19.9489 19.4873 22.5111 19.4873C25.0717 19.4873 26.6478 21.1686 26.6967 23.3793ZM37.833 52.8686H30.3471L30.3469 52.8694C30.3469 52.8694 30.4452 32.4588 30.3475 30.3458H37.8336V33.5339C38.8288 31.9995 40.6098 29.8169 44.5808 29.8169C49.5062 29.8169 53.1991 33.0363 53.1991 39.9543V52.8686H45.7133V40.8204C45.7133 37.7922 44.6293 35.7269 41.921 35.7269C39.8524 35.7269 38.6206 37.1198 38.0796 38.4653C37.8819 38.9455 37.833 39.6195 37.833 40.2918V52.8686Z"
                          fill="#006699"
                        />
                      </svg>
                    </Link>
                  </li>

                  {/* Pinterest */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://in.pinterest.com/vipnumbershopofficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <svg
                        className="transition-all duration-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 71 72"
                        fill="none"
                      >
                        <path
                          d="M33.3501 13.0437C25.9186 13.893 18.5132 20.0479 18.2075 28.84C18.0154 34.2083 19.5044 38.2356 24.4951 39.3664C26.6608 35.4553 23.7965 34.5927 23.3511 31.7633C21.5216 20.1686 36.4153 12.2615 44.2093 20.3563C49.6018 25.9615 46.0519 43.206 37.3541 41.4136C29.0231 39.7017 41.4323 25.9749 34.7823 23.2796C29.3767 21.0894 26.5037 29.9798 29.0667 34.396C27.5647 41.9902 24.3292 49.1464 25.6391 58.6715C29.8876 55.5158 31.3198 49.4727 32.4943 43.1702C34.6295 44.4978 35.7691 45.8789 38.4937 46.0935C48.5407 46.8891 54.1515 35.8263 52.7805 25.6218C51.5623 16.5749 42.7422 11.971 33.3501 13.0437Z"
                          fill="#FF0000"
                        />
                      </svg>
                    </Link>
                  </li>

                  {/* YouTube */}
                  <li className="relative bg-white rounded-full m-2 w-12 h-12 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <svg
                        className="rounded-md transition-all duration-300 group-hover:scale-110"
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 72 72"
                        fill="none"
                      >
                        <path
                          d="M61.1026 23.7185C60.5048 21.471 58.7363 19.6981 56.4863 19.0904C52.4181 18 36.0951 18 36.0951 18C36.0951 18 19.7805 18 15.7039 19.0904C13.4622 19.6897 11.6937 21.4627 11.0876 23.7185C10 27.7971 10 36.3124 10 36.3124C10 36.3124 10 44.8276 11.0876 48.9063C11.6854 51.1537 13.4539 52.9267 15.7039 53.5343C19.7805 54.6247 36.0951 54.6247 36.0951 54.6247C36.0951 54.6247 52.4181 54.6247 56.4863 53.5343C58.728 52.935 60.4965 51.162 61.1026 48.9063C62.1902 44.8276 62.1902 36.3124 62.1902 36.3124C62.1902 36.3124 62.1902 27.7971 61.1026 23.7185Z"
                          fill="#FF3000"
                        />
                        <path
                          d="M30.8811 44.1617L44.4392 36.3124L30.8811 28.463V44.1617Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <ul className="footer-quickLinks-list-os">
              <div className="font-extrabold text-[16.7px] leading-5 uppercase text-primary pb-3">
                Quick Links
              </div>
              <li className="group">
                <Link
                  href="/"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Home
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/business"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                  onClick={() => {
                    localStorage.setItem("Lead-Page", "Business");
                  }}
                >
                  Business With Us
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/sell-mobile-number"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Sell mobile Number
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/numerology"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                  onClick={() => {
                    localStorage.setItem("Lead-Page", "Numurology");
                  }}
                >
                  Numerology Report
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/family-pack"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                  // onClick={() => {
                  //   localStorage.setItem("Lead-Page", "family-pack");
                  // }}
                >
                  Family/Business pack 
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/about"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  About Us
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/why-choose-us"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Why Choose Us
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/faq"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  FAQs
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/contact"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Contact Us
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/press-news"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Press release
                </Link>
              </li>
              <li className="group">
                <Link
                  href="/influencer"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Influencer Program
                </Link>
              </li>
              <li onClick={blogsLoad} className="group">
                <Link
                  href="/blogs"
                  className="relative text-gray-800 uppercase no-underline transition-all"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div>
            <ul className="footer-termsPolicies-links-list-os">
              <div className="font-extrabold text-[16.7px] leading-5 uppercase text-primary pb-3">
                Terms & Policies
              </div>
              {["Terms and Conditions", "Privacy Policy", "Refund Policy"].map(
                (policy, index) => (
                  <li key={index} className="group">
                    <Link
                      href={`/${policy.toLowerCase().replace(/ /g, "-")}`}
                      className="relative text-gray-800 uppercase no-underline transition-all"
                    >
                      {policy}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary  transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                )
              )}
              <li>
                <div className="footer-links-heading-os footer-links-subHeading-os">
                  Working Days/Hours
                </div>
              </li>
              <li>10:00 AM to 6:00 PM</li>
              <li>(Mon-Sat)</li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <ul className="footer-getInTouch-list-os">
              <li>
                <div className="footer-links-heading-os">Get in touch</div>
              </li>
              <li
                onClick={openWhatsApp}
                style={{ alignItems: "center", gap: "6px" }}
              >
                  <DaynamicMobileno />
                <Link href="https://wa.me/917009170092" className="whats-app-icon-os">
                  <Image
                    src={`${panelImg}/assets/img/vip-images/whats-app-icon_ylcdqy.webp`}
                    alt="WhatsApp Image"
                    width={300}
                    height={100}
                    priority="true"
                  />
                </Link>
              </li>
              <li>
                <DaynamicEmail colorvariant="text-primary" />
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <div className="font-extrabold text-[16.7px] leading-5 uppercase text-primary pb-3">
                Subscribe Newsletter
              </div>
              {/* <form
                  className="flex items-center w-full p-2 bg-gray-200 border border-gray-300 rounded-md"
                  onSubmit={submitNewsletter}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex-grow p-3 text-gray-800 placeholder-black bg-gray-200 text-base leading-[18px] rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ml-2 px-4 py-2 text-white bg-primary  text-sm font-bold uppercase leading-5 rounded-md hover:opacity-80"
                  >
                    Submit
                  </button>
                </form> */}

              <form
                className="flex items-center w-full p-2   rounded-md"
                onSubmit={submitNewsletter}
              >
                <div className="relative flex-grow">
                  <input
                    id="searchft"
                    type="email"
                    name="search"
                    placeholder=" "
                    className="peer w-full bg-transparent placeholder:text-primary text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary text-[16px] leading-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="searchft"
                    className={`absolute cursor-text bg-white px-1 left-3 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      email
                        ? "-top-2 left-3 text-xs text-primary scale-90"
                        : "top-[18px] text-primary peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Email
                  </label>
                </div>
                <button
                  type="submit"
                  className="ml-2 px-3 py-4 text-white bg-primary  text-sm font-bold uppercase leading-5 rounded-md hover:opacity-80"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
