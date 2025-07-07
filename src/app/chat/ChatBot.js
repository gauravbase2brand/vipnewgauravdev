"use client";
import "./chatbot.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";

const ChatBot = ({ setIsModalVis }) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check screen size on initial render
      setIsMobile(window.innerWidth <= 768);

      // Listen for window resize events
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.orufyWidget) {
      window.orufyWidget.isIntializationDone();
    }
  }, []);

  const toggleWidget = () => {
    if (typeof window !== "undefined" && window.orufyWidget) {
      if (isWidgetOpen) {
        const success = window.orufyWidget.hideWidget();
        if (success) setIsWidgetOpen(false);
      } else {
        window.orufyWidget.openWidget();
        setIsWidgetOpen(true);
      }
    }
  };

  useEffect(() => {
    if (isWidgetOpen) {
      // Find the Orufy chat iframe and make it visible
      const chatIframe = document.querySelector(
        "iframe[src*='widget.connect.orufy.com']"
      );
      if (chatIframe) {
        chatIframe.style.right = "75px";
        chatIframe.style.left = "unset";
        chatIframe.style.display = "block";
        chatIframe.style.opacity = "1";
        chatIframe.style.visibility = "visible";
      }
    } else {
      // Hide the iframe when the chat is closed
      const chatIframe = document.querySelector(
        "iframe[src*='widget.connect.orufy.com']"
      );
      if (chatIframe) {
        chatIframe.style.display = "none";
        chatIframe.style.opacity = "0";
        chatIframe.style.visibility = "hidden";
      }
    }
  }, [isWidgetOpen]);

  return (
    <>
      {isMobile ? (
        // <PiChatCircleDotsFill onClick={toggleWidget} style={{ color: "#691EDE", fontSize: "30px" }}/>
        // <span className="widget-icon" onClick={toggleWidget} style={{padding:'4px'}}>
        //   <Image
        //     src="https://assets.orufy.com/live_Chat_68d5be723f_79778dac51.svg"
        //     height="20"
        //     width="20"
        //     alt="widget"
        //   />
        // </span>
        <div
          className="menu-Bar-rs mb-[7px]"
          onClick={() => {
            toggleWidget();
            setIsModalVis(false);
          }}
        >
          <span>
            <ChatIcon />
          </span>
          <span>
            <p>Chat</p>
          </span>
        </div>
      ) : (
        <footer className="chat-button">
          <button onClick={toggleWidget} className="widget-icon">
            {/* <PiChatCircleDotsFill style={{ color: "#691EDE", fontSize: "35px" }}/> */}
            <Image
              src="https://assets.orufy.com/live_Chat_68d5be723f_79778dac51.svg"
              height="20"
              width="20"
              alt="widget"
            />
          </button>
        </footer>
      )}
    </>
  );
};

export default ChatBot;
