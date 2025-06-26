import React, { useState } from "react";
import "../../Shared/VideoCard/VideoCard.css";
import "./ContactForm.css";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
const ContactFormUpload = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [videoVisible, setVideoVisible] = useState(false);
  const videoLink =
    "https://www.youtube.com/embed/ayi8tJSChIY?rel=0&autoplay=1&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1&disablekb=1";

  const handleValidation = () => {
    if (message.trim().split(/\s+/).length < 5) {
      setMessageError("Please enter at least 5 words in the message field.");
    } else {
      setMessageError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      if (name === "" || email === "" || mobile === "" || message === "") {
        toast.error("Please fill in all the fields.");
      } else if (message.trim().split(/\s+/).length < 5) {
        toast.error(
          "Please enter at least 5 words in the message field."
        );
      } else {
        setLoading(true);
        const response = await axios.post(`${apiUrl}/web/contact/us`, {
          name,
          email,
          mobile,
          message,
        });

        if (response.data.status === "success") {
          toast.success(
            response?.data?.message ||
              "Your message has been sent successfully!"
          );
          setName("");
          setEmail("");
          setMobile("");
          setMessage("");
        } else if (response.data.status === "error") {
          if (response?.data?.status) {
            toast.error(
              response.data.message || "enter valid data "
            );
            setMobile("");
          } else {
            toast.error(response?.data?.message || "error");
          }
        }
      }
    } catch (response) {
      if (response?.data?.message) {
        toast.error(response.data.data.message);
      }
      console.error(response);
    } finally {
      setLoading(false); // Re-enable form submission
    }
  };

  return (
    <section className="ContactForm-section-os">
      <div className="container-os">
        <div className="ContactForm-row-os">
          <div className="VideoCard-rs">
            <div className="VideoTestimonial-col-rs">
              <div
                className="videoThumbnail-rs"
                style={{ position: "relative", width: "100%", height: "auto" }}
              >
                <Image
                  src={`${panelImg}/assets/img/vip-images/bussiness-qrImg_vmywwg.webp`}
                  alt="Become a vip partner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "3px",
                  }}
                  width={1000}
                  height={300}
                  priority="true"
                />
                {videoVisible ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={videoLink}
                    allow="autoplay"
                    allowFullScreen
                    autoPlay // Add autoPlay attribute
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                ) : (
                  <div
                    className="playIcon-os"
                    onClick={() => setVideoVisible(true)}
                  >
                    <FontAwesomeIcon
                      icon={faYoutube}
                      style={{ color: "#ea0606", fontSize: "3rem" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="ContactForm-col-2-os">
            {/* <div className="ContactForm-input-field-os">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            <div className="flex flex-col lg:gap-6 gap-4">
              <div className="w-full">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease-in-out focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm text-[16px] leading-4"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      name
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter your full name
                  </label>
                </div>
              </div>

              {/* <div className="ContactForm-input-field-os">
              <label>Email Address:</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div> */}
              <div className="w-full">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full bg-transparent placeholder:text-slate-400 text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                  />
                  <label
                    htmlFor="email"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      email
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter your email address
                  </label>
                </div>
              </div>

              {/* 
            <div className="ContactForm-input-field-os">
              <label>Mobile no.:</label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
              />
            </div> */}
              <div className="w-full">
                <div className="relative">
                  <input
                    id="mobile"
                    type="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="peer w-full bg-transparent placeholder:text-slate-400 text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                  />
                  <label
                    htmlFor="mobile"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      mobile
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter your mobile number
                  </label>
                </div>
              </div>

              <div className="w-full">
                <div className="relative">
                  <textarea
                    id="message"
                    cols="30"
                    rows="5"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      handleValidation();
                    }}
                    className="peer w-full bg-transparent placeholder:text-slate-400 text-black border border-primary rounded-md px-3 py-4 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                    placeholder="Enter your message"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      message
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[20px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter your message
                  </label>
                  {messageError && (
                    <div className="error-message text-red-500 mt-1 text-sm">
                      {messageError}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className=" font-medium text-[15px] leading-[20px] text-center text-white bg-primary  rounded-[11px] flex justify-center items-center px-5 py-2.5 border-0"
                aria-label="Submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormUpload;
