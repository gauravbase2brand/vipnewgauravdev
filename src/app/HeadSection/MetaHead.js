import React from "react";
import Canonical from "./Canonical";

const MetaHead = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  return (
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <link
        rel="icon"
        href="https://www.vipnumbershop.com/favicon.ico"
        sizes="any"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number"
      />
      <meta
        property="og:description"
        content="Choose your lucky VIP mobile number from India’s trusted provider. 18 years of service and 2 Lakhs+ happy customers. Get your VIP number today at VIP Number Shop."
      />
      <meta property="og:url" content="https://www.vipnumbershop.com" />
      <meta property="og:site_name" content="VIP Number Shop" />
      <meta property="og:image" content={`${panelImg}/assets/img/vip-images/ShareIcon_lhw2ww.webp`} />
      <meta
        property="og:image:secure_url"
        content={`${panelImg}/assets/img/vip-images/ShareIcon_lhw2ww.webp`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="VIP Number Shop Logo" />
      <meta property="og:image:type" content="image/x-icon" />
      <meta name="twitter:site" content="https://www.vipnumbershop.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number"
      />
      <meta
        name="twitter:description"
        content="Choose your lucky VIP mobile number from India’s trusted provider. 18 years of service and 2 Lakhs+ happy customers. Get your VIP number today at VIP Number Shop."
      />
      <meta
        name="twitter:image"
        content={`${panelImg}/assets/img/vip-images/ShareIcon_lhw2ww.webp`}
      />
      <meta name="twitter:url" content="https://www.vipnumbershop.com/" />
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
      {isProduction && (
        <meta
          name="p:domain_verify"
          content="e58bb6b1c0d91155906f31ee721a335a"
        />
      )}
      <Canonical />
    </head>
  );
};

export default MetaHead;
