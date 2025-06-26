import React from "react";
import Link from "next/link";
import "./ContactForm.css";
import Image from "next/image";
import DaynamicEmail from "@/app/DaynamicEmail/DaynamicEmail";
import DaynamicMobileno from "@/app/DaynamicMobileno/DaynamicMobileno";
import { IoCall, IoMailOpenOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";

const ContactForm = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  // whats app redirect
  const openWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=917009170092");
  };

  return (
    <section className="ContactForm-section-os">
      <div className="container-os">
        <div className="ContactForm-row-os">
          <div className="ContactForm-col-1-os">
            <div className="ContactForm-col-11-os">
              <div
                className="flex md:g
              ap-12 gap-6 pb-3"
              >
                <div className="w-8 h-8 p-2 bg-primary flex justify-center items-center rounded-full">
                  <IoCall fontSize={30} color="white" />
                </div>

                <div
                  className="footer-getInTouch-phone-whats-app-os"
                  onClick={openWhatsApp}
                >
                  <DaynamicMobileno />
                </div>
              </div>

              <div className="flex md:gap-12 gap-6 pb-3">
                <div className="w-8 h-8 p-2 bg-primary flex justify-center items-center rounded-full">
                  <IoMailOpenOutline fontSize={30} color="white" />
                </div>

                <DaynamicEmail />
              </div>
              <div className="flex md:gap-12 gap-6 pb-3">
                <div className="w-8 h-8 p-2 bg-primary flex justify-center items-center rounded-full">
                  <FaLocationArrow fontSize={30} color="white" />
                </div>
                <Link
                  href={"https://goo.gl/maps/L7n5FXuYXQyx9BdQ6"}
                  target="_blank"
                >
                  VIP NUMBER SHOP & 99AID CommunicationSCO. No. 62, Shivalik
                  Enclave Opp. Geeta Mandir, Nr. Post Office Garha Road, Urban
                  Estate 1Jalandhar 144022
                </Link>
              </div>
            </div>
          </div>
          <div className="ContactMap-row-rs">
            <div className="ContactMap-row-os">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54548.75512094758!2d75.594849!3d31.295530000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a674b8cea7769%3A0xb4467e5eb7d0264b!2sVIP%20Number%20Shop%20-%20Vip%20Number%2C%20Vip%20Mobile%20Number!5e0!3m2!1sen!2sin!4v1680075099097!5m2!1sen!2sin"
                title="Location Map"
                allowFullScreen=""
                priority="true"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
