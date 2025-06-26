"use client"
import React from "react";
import ContactMap from "./ContactMap/ContactMap";
import ContactForm from "./ContactForm/ContactForm";
import ContactFormUpload from "./ContactForm/ContactFormUpload";
import OurAggregate from "./Aggregate/OurAggregate";
import { ResponsiveFooter } from "../ResponsiveModule";

const ContactUsPage  = () => {
  return (
    <div className="ContactUs-page-os">
      <ContactMap />
      <ContactFormUpload/>
      <ContactForm />
      <OurAggregate/>
    </div>
  );
};

export default ContactUsPage ;
