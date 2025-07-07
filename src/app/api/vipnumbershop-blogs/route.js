export const dynamic = "force-dynamic";
export async function GET(req) {
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
  const fetchDynamicUrls = async (url, type) => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      if (!result || typeof result !== "object") {
        console.warn(`[${type}] Invalid JSON structure from ${url}`);
        return [];
      }

      switch (type) {
        case "blogs":
          if (Array.isArray(result.blogs)) {
            return result.blogs
              .filter((item) => item?.img_url)
              .map(
                (item) => `https://www.vipnumbershop.com/blogs/${item.img_url}`
              );
          }
          break;
        default:
          console.warn(`[${type}] No handler for this type.`);
          return [];
      }

      console.warn(`[${type}] Data structure mismatch from ${url}`);
      return [];
    } catch (error) {
      console.error(`[${type}] Failed to fetch from ${url}:`, error.message);
      return [];
    }
  };

  // Fetch dynamic URLs from APIs
  const blogUrls = await fetchDynamicUrls(
    "https://fancymobilenumber.in/test3hook.php",
    "blogs"
  );

  const urls = [...(blogUrls || [])];

  // Build the XML for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          return `
        <url>
          <loc>${escapeXml(url)}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>`;
        })
        .join("")}
    </urlset>`;

  // Return the sitemap as an XML response
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
