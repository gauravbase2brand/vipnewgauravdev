import WhyChooseUsPage from "./WhyChooseUsPage";
export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL
  try {
    const res = await fetch(`${apiUrl}/web/meta/tags`, {
      cache: "no-store", // Optional: adjust cache strategy
    });

    if (!res.ok) {
      console.error("Failed to fetch metadata:", res.status);
      return {
        title: "Why Choose Us | VIP Number Shop",
        description: "Find out why VIP Number Shop is the best choice for fancy mobile numbers.",
      };
    }

    const data = await res.json();

    // Ensure data.data is a valid array before accessing index 4
    const metaData = Array.isArray(data?.data) && data.data.length > 4 ? data.data[4] : null;

    return {
      title: metaData?.meta_title || "Why Choose Us | VIP Number Shop",
      description: metaData?.meta_description || "Find out why VIP Number Shop is the best choice for fancy mobile numbers.",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Why Choose Us | VIP Number Shop",
      description: "Find out why VIP Number Shop is the best choice for fancy mobile numbers.",
    };
  }
}

export default function WhyChooseUs() {
  return (
    <div>
      <WhyChooseUsPage />
    </div>
  );
}
