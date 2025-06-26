"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Notification = () => {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [notification, setNotification] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(0); // Store the index of the current notification
  const [currentText, setCurrentText] = useState(""); // Store the current text

  const notificationTexts = [
    "🔥 {{Number_for_Display}} Sold Out!",
    "⏳ Sold Out! {{Number_for_Display}} is Gone!",
    "💥 {{Number_for_Display}} has Sold Out!",
    "❌ Sold Out! {{Number_for_Display}} Found a New Owner!",
    "💨 You Blinked! {{Number_for_Display}} Sold Out!",
  ];

  useEffect(() => {
    axios
      .get(`${apiUrl}/web/lead/confirmed`)
      .then((response) => {
        setNotification(response.data); // Set notifications data from API
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl]);

  useEffect(() => {
    if (notification.length === 0) return; // Ensure we have notifications loaded

    let displayTimeout;
    let intervalTimeout;

    // const updateNotificationText = (index) => {
    //     const notificationText = notificationTexts[index % notificationTexts.length];
    //     setCurrentText(notificationText.replace("{{Number_for_Display}}", notification[index]?.productname || "Unknown"));
    // };
    const updateNotificationText = (index) => {
      const notificationText =
        notificationTexts[index % notificationTexts.length];
      const productName = notification[index]?.productname || "Unknown";
      const styledProductName = `<span style="color: yellow; font-weight:800">${productName}</span>`; // Wrap in span with red color
      setCurrentText(
        notificationText.replace("{{Number_for_Display}}", styledProductName)
      );
    };

    const startNotificationCycle = (index) => {
      // Display the current notification for 5 seconds
      updateNotificationText(index);
      displayTimeout = setTimeout(() => {
        setCurrentText(""); // Clear the notification text after 5 seconds

        // Wait for 10 seconds before showing the next notification
        intervalTimeout = setTimeout(() => {
          const nextIndex = (index + 1) % notification.length;
          startNotificationCycle(nextIndex);
        }, 20000); // 20-second wait
      }, 5000); // Show notification for 5 seconds
    };

    // Start the notification cycle from the current notification index
    startNotificationCycle(currentNotification);

    return () => {
      clearTimeout(displayTimeout); // Cleanup display timeout
      clearTimeout(intervalTimeout); // Cleanup interval timeout
    };
  }, [notification, currentNotification]);

  return (
    <>
      {/* {notification.length > 0 && currentText && (
                <div className='footer-notification'>
                    <div>
                        {currentText}
                    </div>
                </div>
            )} */}
      {notification.length > 0 && currentText && (
        <div className="footer-notification">
          <div dangerouslySetInnerHTML={{ __html: currentText }} />
        </div>
      )}
    </>
  );
};

export default Notification;
