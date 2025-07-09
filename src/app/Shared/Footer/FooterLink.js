import React from "react";
import Image from "next/image";
import Link from "next/link";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";
import facebook from "../../../../public/assets/facebook.png";
import Instagram from "../../../../public/assets/Instagram.png";
import Twitter from "../../../../public/assets/Twitter.png";
import LinkedIn from "../../../../public/assets/LinkedIn.png";
import Pinterest from "../../../../public/assets/Pinterest.png";
import Youtube from "../../../../public/assets/Youtube.png";
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
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.facebook.com/vipnumbershop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* SVG Icon */}
                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={facebook} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </li>
                  {/* Instagram */}
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.instagram.com/vip_number_shop_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}
                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={Instagram} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </li>

                  {/* Twitter */}
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://twitter.com/vip_number_shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}

                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={Twitter} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </li>
                  {/* LinkedIn */}
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.linkedin.com/company/vip-number-shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      {/* Tooltip */}
                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={LinkedIn} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </li>

                  {/* Pinterest */}
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://in.pinterest.com/vipnumbershopofficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={Pinterest} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </li>

                  {/* YouTube */}
                  <li className="relative bg-white rounded-full m-2 w-5 h-5 text-lg flex justify-center items-center shadow-lg cursor-pointer transition-transform hover:scale-110 group">
                    <Link
                      href="https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Image
                        className="transition-all duration-300 group-hover:scale-110"
                        src={Youtube} // Replace with actual path to image
                        alt="Facebook"
                        width="20"
                        height="20"
                      />
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
                <Link
                  href="https://wa.me/917009170092"
                  className="whats-app-icon-os"
                >
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
