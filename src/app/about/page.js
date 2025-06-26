import AboutPage from "./AboutPage";
export const dynamic = 'force-dynamic';
export async function generateMetadata() {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  try {
    const res = await fetch(`${apiUrl}/web/meta/tags`, {
      cache: "no-store", // Optional: adjust cache strategy
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch metadata:", res.status);
      return {
        title: "About Us | VIP Number Shop",
        description: "Learn more about VIP Number Shop and our services.",
      };
    }

    const data = await res.json();

    // Ensure data.data is a valid array before accessing index 3
    const metaData =
      Array.isArray(data?.data) && data.data.length > 3 ? data.data[3] : null;

    return {
      title: metaData?.meta_title || "About Us | VIP Number Shop",
      description:
        metaData?.meta_description ||
        "Learn more about VIP Number Shop and our services.",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "About Us | VIP Number Shop",
      description: "Learn more about VIP Number Shop and our services.",
    };
  }
}

export default function About() {
  return (
    <div>
      <AboutPage />
    </div>
  );
}
