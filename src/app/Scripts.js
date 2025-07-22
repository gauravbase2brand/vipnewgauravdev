import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number",
  url: "https://vipnumbershop.com/",
  telephone: "06009160092",
  description:
    "Choose your lucky VIP mobile number from India’s trusted provider. 18 years of service and 2 Lakhs+ happy customers. Get your VIP number today at VIP Number Shop.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SCO #62, ITI College Rd",
    addressLocality: "Jalandhar",
    addressRegion: "Punjab",
    postalCode: "144022",
    addressCountry: "India",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "31.2956718",
    longitude: "75.553801",
  },
  image:
    "https://www.vipnumbershop.com/_next/static/media/VIP-logo-1.1b6160e3.svg",
  priceRange: "₹1500 - ₹50000000",
  openingHours: "Mo-Su",
  sameAs: [
    "https://www.facebook.com/vipnumbershop",
    "https://www.instagram.com/vip_number_shop_official",
    "https://twitter.com/vipnumbersshop",
    "https://www.youtube.com/channel/UCSpG3ZF4j93nw5LmGIbbM4Q",
    "https://play.google.com/store/apps/details?id=com.wVipnumbershop.five921843",
  ],
};

const jsonLd2 = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number",
  url: "https://www.vipnumbershop.com/",
  description:
    "Choose your lucky VIP mobile number from India’s trusted provider. 18 years of service and 2 Lakhs+ happy customers. Get your VIP number today at VIP Number Shop.",
  image:
    "https://www.vipnumbershop.com/_next/static/media/VIP-logo-1.1b6160e3.svg",
};

const jsonLd3 = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "LocalBusiness",
    name: "VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number",
    image:
      "https://www.vipnumbershop.com/_next/static/media/VIP-logo-1.1b6160e3.svg",
    url: "https://www.vipnumbershop.com/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Punjab",
    },
  },
  author: {
    "@type": "Person",
    name: "Users",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "0.5",
  },
};

const jsonLd4 = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "VIP Number Shop | Buy VIP Mobile Numbers | Buy VIP Number",
  image: "https://www.vipnumbershop.com/path/to/product-image.svg",
  description:
    "Choose your lucky VIP mobile number from India’s trusted provider. 18 years of service and 2 Lakhs+ happy customers. Get your VIP number today at VIP Number Shop.",
  brand: {
    "@type": "Brand",
    name: "VIP Number Shop",
  },
  offers: {
    "@type": "Offer",
    url: "https://www.vipnumbershop.com/",
    priceCurrency: "INR",
    price: "4999",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "25769896",
  },
};

const jsonLd5 = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://www.vipnumbershop.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.vipnumbershop.com/search?query={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Scripts() {
  return (
    <>
      {/* Meta Pixel */}
      <Script id="Metapixel-script" strategy="lazyOnload">
      {/* <Script id="Metapixel-script" strategy="afterInteractive"> */}
        {`
          !function(f,b,e,v,n,t,s) {
            if(f.fbq) return; n=f.fbq=function(){
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
            n.queue=[]; t=b.createElement(e); t.async=!0;
            t.src=v; s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1359805480707253');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N3Q92W6R');
          `,
        }}
      />

      {/* Google Tag */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11121351930"
        // strategy="lazyOnload"
        strategy="afterInteractive"
      />
      <Script id="gtag-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11121351930');
        `}
      </Script>

      {/* Google Conversion Tag (for Purchase Page) */}
      <Script
        id="google-script"
         strategy="lazyOnload"
        // strategy="afterInteractive"
      >
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-11121351930/08GCCN3ipb8ZEPq5ibcp',
            'value': 1.0,
            'currency': 'INR',
            'transaction_id': ''
          });
        `}
      </Script>

      {/* Snap Pixel Code */}
      <Script type="text/javascript" id="snapchat-pixel">
        {`
          (function(e,t,n){
            if(e.snaptr) return; var a=e.snaptr=function(){
              a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)
            };
            a.queue=[]; var s='script'; r=t.createElement(s); r.async=!0;
            r.src=n; var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);
          })(window,document,'https://sc-static.net/scevent.min.js');
          snaptr('init', 'a8f2b739-2680-4145-8e8f-9cda1782ac54', {});
          snaptr('track', 'PAGE_VIEW');
        `}
      </Script>

      {/* Orufy Connect Script */}
      <Script
        id="orufy-connect-script"
        // strategy="lazyOnload"
        strategy="afterInteractive"
      >
        {`
          ;(function(_, m) {
            const orufyConnectSettings = { appId: 'MRFN8siyBcxH8O2n0SFdCNxlbtpkTGlq' };
            const s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = 'https://widget.connect.orufy.com/widget.js';
            const head = document.getElementsByTagName("head")[0];
            head?.appendChild(s);
            window.orufy_connect = m;
            m._globals = orufyConnectSettings;
          })(document, window.orufy_connect || {});
        `}
      </Script>

      {/* JSON-LD (Structured Data) */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [jsonLd, jsonLd2, jsonLd3, jsonLd4, jsonLd5],
          }),
        }}
      />

      <Script src="https://mercury.phonepe.com/web/bundle/checkout.js"></Script>
    </>
  );
}
