export const dynamic = "force-dynamic";
const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
export async function GET(req) {
  // List of URLs to be included in the sitemap
  const staticUrls = [
    "https://www.vipnumbershop.com/api/vipnumbershop-web-urls",
    "https://www.vipnumbershop.com/api/vipnumbershop-statsNumbers",
    "https://www.vipnumbershop.com/api/vipnumbershop-recommendations",
    "https://www.vipnumbershop.com/api/vipnumbershop-numberStats",
    "https://www.vipnumbershop.com/api/vipnumbershop-Family-Packs",
    "https://www.vipnumbershop.com/api/vipnumbershop-categories",
    "https://www.vipnumbershop.com/api/vipnumbershop-blogs",
    // "https://www.vipnumbershop.com/sell-mobile-number",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-punjab",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-maharashtra",
    // "https://www.vipnumbershop.com/fancy-mobile-numbers-in-karnataka",
    // "https://www.vipnumbershop.com/fancy-mobile-number-in-kerala",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-gujarat",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-mumbai",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-haryana",
    // "https://www.vipnumbershop.com/fancy-mobile-numbers-in-bangalore",
    // "https://www.vipnumbershop.com/fancy-mobile-numbers-in-chennai",
    // "https://www.vipnumbershop.com/fancy-mobile-number-in-tamil-nadu",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-himachal-pradesh",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-lucknow",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-ahmedabad",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-surat",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-delhi",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-rajasthan",
    // "https://www.vipnumbershop.com/fancy-mobile-number-in-hyderabad",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-bihar",
    // "https://www.vipnumbershop.com/fancy-mobile-number-in-odisha",
    // "https://www.vipnumbershop.com/fancy-mobile-number-in-pune",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-uttarakhand",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-uttar-pradesh",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-madhya-pradesh",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-chhattisgarh",
    // "https://www.vipnumbershop.com/vip-mobile-number-in-chandigarh",
    // "https://www.vipnumbershop.com/airtel-fancy-numbers",
    // "https://www.vipnumbershop.com/jio-fancy-numbers",
    // "https://www.vipnumbershop.com/bsnl-fancy-numbers",
    // "https://www.vipnumbershop.com/vi-fancy-number",
    // "https://www.vipnumbershop.com/idea-fancy-numbers",
    // "https://www.vipnumbershop.com/vip-prepaid-number",
    // "https://www.vipnumbershop.com/postpaid-fancy-numbers",
  ];

  // Helper function to escape special characters in URLs
  const escapeXml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  // Function to fetch dynamic URLs
  // const fetchDynamicUrls = async (url, type) => {
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();

  //     if (!result || typeof result !== "object") {
  //       console.warn(`[${type}] Invalid JSON structure from ${url}`);
  //       return [];
  //     }

  //     switch (type) {
  //       case "blogs":
  //         if (Array.isArray(result.blogs)) {
  //           return result.blogs
  //             .filter((item) => item?.img_url)
  //             .map((item) => `https://www.vipnumbershop.com/blogs/${item.img_url}`);
  //         }
  //         break;

  //       case "images":
  //         if (Array.isArray(result?.data?.image)) {
  //           return result.data.image
  //             .filter((item) => item?.link)
  //             .map((item) => item.link);
  //         }
  //         break;

  //       case "categories":
  //         if (Array.isArray(result?.data)) {
  //           return result.data
  //             .filter((item) => item?.detail?.slug)
  //             .map((item) => `https://www.vipnumbershop.com/category/${item.detail.slug}`);
  //         }
  //         break;

  //       case "recommendation":
  //       case "stats":
  //         if (Array.isArray(result?.data)) {
  //           return result.data
  //             .filter((item) => item?.link)
  //             .map((item) => item.link);
  //         }
  //         break;

  //       case "numstats":
  //         if (Array.isArray(result)) {
  //           return result
  //             .filter((item) => item?.cf_2574)
  //             .map((item) => `https://www.vipnumbershop.com/pdp?number=${item.cf_2574}`);
  //         }
  //         break;

  //       case "numStats":
  //         if (Array.isArray(result?.data)) {
  //           return result.data.flatMap((group) =>
  //             Array.isArray(group?.numbers)
  //               ? group.numbers
  //                   .filter((num) => num?.productid && num?.number)
  //                   .map(
  //                     (num) =>
  //                       `https://www.vipnumbershop.com/pdp?productid=${num.productid}&number=${num.number}`
  //                   )
  //               : []
  //           );
  //         }
  //         break;

  //       case "fp_total":
  //         if (result && typeof result === "object") {
  //           const allItems = Object.values(result).flat();
  //           return allItems
  //             .filter((item) => item?.productid && item?.number)
  //             .map(
  //               (item) =>
  //                 `https://www.vipnumbershop.com/pdp?productid=${item.productid}&number=${item.number}`
  //             );
  //         }
  //         break;

  //       default:
  //         console.warn(`[${type}] No handler for this type.`);
  //         return [];
  //     }

  //     console.warn(`[${type}] Data structure mismatch from ${url}`);
  //     return [];
  //   } catch (error) {
  //     console.error(`[${type}] Failed to fetch from ${url}:`, error.message);
  //     return [];
  //   }
  // };

  // Fetch dynamic URLs from APIs
  // const blogUrls = await fetchDynamicUrls(
  //   "https://fancymobilenumber.in/blogs.php?perPageLimit=1000&recordStartFrom=0",
  //   "blogs"
  // );
  // const imageUrls = await fetchDynamicUrls(`${apiUrl}/web/images`, "images");
  // const categoryUrls = await fetchDynamicUrls(
  //   `${apiUrl}/web/categories`,
  //   "categories"
  // );
  // const recommendationUrls = await fetchDynamicUrls(
  //   `${apiUrl}/web/category/recommendation`,
  //   "recommendation"
  // );
  // const statsUrls = await fetchDynamicUrls(
  //   `${apiUrl}/web/category/stats`,
  //   "stats"
  // );
  // const statsUrls2 = await fetchDynamicUrls(
  //   `${apiUrl}/meta/getnumbers`,
  //   "numstats"
  // );
  // const numberStats = await fetchDynamicUrls(
  //   `${apiUrl}/web/numbers/stats`,
  //   "numStats"
  // );
  // const familyPackUrls = await fetchDynamicUrls(
  //   `${apiUrl}/web/familypack?fp_total=4&paginate=4&page=1`,
  //   "fp_total"
  // );

  // Combine all URLs (static and dynamic)

  const urls = [
    ...staticUrls,
    // ...(blogUrls || []),
    // ...(imageUrls || []),
    // ...(categoryUrls || []),
    // ...(recommendationUrls || []),
    // ...(statsUrls || []),
    // ...(statsUrls2 || []),
    // ...(numberStats || []),
    // ...(familyPackUrls || []),
  ];

  // Build the XML for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          return `
        <sitemap>
          <loc>${escapeXml(url)}</loc>
        </sitemap>`;
        })
        .join("")}
    </sitemapindex>`;

  // Return the sitemap as an XML response
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
