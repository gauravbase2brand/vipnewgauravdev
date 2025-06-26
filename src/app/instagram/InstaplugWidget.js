"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function InstaplugWidget() {
  useEffect(() => {
    const renderApp = () => {
      if (window.renderApp) {
        window.renderApp({
          containerId: "4484341a-cd2f-4d5f-b4c5-f5bae5a91870",
          domain: "https://app.instaplug.app/",
          widgetClass: "",
          fontFamily: "",
          color: "",
          colorLink: "",
          colorLinkActive: "",
          colorLinkHover: "",
        });
      }
    };

    if (window.renderApp) {
      renderApp();
    } else {
      window.addEventListener("load", renderApp);
      return () => window.removeEventListener("load", renderApp);
    }
  }, []);

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Comfortaa:wght@300..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Lexend:wght@100..900&family=Lobster&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Oswald:wght@200..700&family=Pacifico&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <Script
        src="https://app.instaplug.app/platform/instaplug.js"
        // strategy="lazyOnload"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.renderApp) {
            window.renderApp({
              containerId: "4484341a-cd2f-4d5f-b4c5-f5bae5a91870",
              domain: "https://app.instaplug.app/",
              widgetClass: "",
              fontFamily: "",
              color: "",
              colorLink: "",
              colorLinkActive: "",
              colorLinkHover: "",
            });
          }
        }}
      />
      <div id="4484341a-cd2f-4d5f-b4c5-f5bae5a91870"></div>
    </>
  );
}
