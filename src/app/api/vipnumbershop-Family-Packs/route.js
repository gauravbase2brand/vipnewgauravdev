export const dynamic = "force-dynamic";
const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;

const escapeXml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const fetchDynamicUrls = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result && typeof result === "object") {
      return Object.values(result)
        .flat()
        .filter((item) => item?.productid && item?.number)
        .map(
          (item) =>
            `https://www.vipnumbershop.com/pdp?productid=${item.productid}&number=${item.number}`
        );
    }

    console.warn(`Invalid structure from ${url}`);
    return [];
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error.message);
    return [];
  }
};

export async function GET() {
  const familyPackUrls = await Promise.all(
    [2, 3, 4, 5, 6, 7].map((total) =>
      fetchDynamicUrls(`${apiUrl}/web/familypack?fp_total=${total}&page=1`)
    )
  );

  // Flatten the array of arrays
  const urls = familyPackUrls.flat();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${escapeXml(url)}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
