// app/api/sitemap/route.js

export async function GET() {
  // Static URLs
  const staticUrls = [
    "https://www.vipnumbershop.com/",
    "https://www.vipnumbershop.com/about",
    "https://www.vipnumbershop.com/why-choose-us",
    "https://www.vipnumbershop.com/faq",
    "https://www.vipnumbershop.com/contact",
    "https://www.vipnumbershop.com/numerology",
    "https://www.vipnumbershop.com/terms-and-conditions",
    "https://www.vipnumbershop.com/privacy-policy",
    "https://www.vipnumbershop.com/refund-policy",
    "https://www.vipnumbershop.com/business",
    "https://www.vipnumbershop.com/sell-mobile-number",
    "https://www.vipnumbershop.com/vip-mobile-number-in-punjab",
    "https://www.vipnumbershop.com/vip-mobile-number-in-maharashtra",
    "https://www.vipnumbershop.com/fancy-mobile-numbers-in-karnataka",
    "https://www.vipnumbershop.com/fancy-mobile-number-in-kerala",
    "https://www.vipnumbershop.com/vip-mobile-number-in-gujarat",
    "https://www.vipnumbershop.com/vip-mobile-number-in-mumbai",
    "https://www.vipnumbershop.com/vip-mobile-number-in-haryana",
    "https://www.vipnumbershop.com/fancy-mobile-numbers-in-bangalore",
    "https://www.vipnumbershop.com/fancy-mobile-numbers-in-chennai",
    "https://www.vipnumbershop.com/fancy-mobile-number-in-tamil-nadu",
    "https://www.vipnumbershop.com/vip-mobile-number-in-himachal-pradesh",
    "https://www.vipnumbershop.com/vip-mobile-number-in-lucknow",
    "https://www.vipnumbershop.com/vip-mobile-number-in-ahmedabad",
    "https://www.vipnumbershop.com/vip-mobile-number-in-surat",
    "https://www.vipnumbershop.com/vip-mobile-number-in-delhi",
    "https://www.vipnumbershop.com/vip-mobile-number-in-rajasthan",
    "https://www.vipnumbershop.com/fancy-mobile-number-in-hyderabad",
    "https://www.vipnumbershop.com/vip-mobile-number-in-bihar",
    "https://www.vipnumbershop.com/fancy-mobile-number-in-odisha",
    "https://www.vipnumbershop.com/fancy-mobile-number-in-pune",
    "https://www.vipnumbershop.com/vip-mobile-number-in-uttarakhand",
    "https://www.vipnumbershop.com/vip-mobile-number-in-uttar-pradesh",
    "https://www.vipnumbershop.com/vip-mobile-number-in-madhya-pradesh",
    "https://www.vipnumbershop.com/vip-mobile-number-in-chhattisgarh",
    "https://www.vipnumbershop.com/vip-mobile-number-in-chandigarh",
    "https://www.vipnumbershop.com/airtel-fancy-numbers",
    "https://www.vipnumbershop.com/jio-fancy-numbers",
    "https://www.vipnumbershop.com/bsnl-fancy-numbers",
    "https://www.vipnumbershop.com/vi-fancy-number",
    "https://www.vipnumbershop.com/idea-fancy-numbers",
    "https://www.vipnumbershop.com/vip-prepaid-number",
    "https://www.vipnumbershop.com/postpaid-fancy-numbers",
    "https://www.vipnumbershop.com/bsnl-choice-number",
    "https://www.vipnumbershop.com/vip-number",
    "https://www.vipnumbershop.com/vip-mobile-number"
  ];

  const allUrls = [...staticUrls];
  // Generate XML content
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
