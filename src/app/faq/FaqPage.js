"use client"
import React from "react";
import FaqBanner from "./FaqBanner/FaqBanner";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import LeaveAQuestion from "./LeaveAQuestion/LeaveAQuestion";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import { ResponsiveFooter } from "../ResponsiveModule";

const Faq = () => {
    return (
        <div className="faq-page-os">
            <FaqBanner />
            <OurCustomers />
            <VideoTestimonial />
            <LeaveAQuestion />
            <QRVipApp />
            
        </div>
    );
};

export default Faq;
