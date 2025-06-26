import FaqPage from "./FaqPage";

export async function generateMetadata() {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  try {
    const res = await fetch(`${apiUrl}/web/meta/tags`);

    if (!res.ok) {
      console.error("Failed to fetch metadata:", res.status);
      return {
        title: "FAQ | VIP Number Shop",
        description:
          "Find answers to common questions about VIP Number Shop and our services.",
      };
    }

    const data = await res.json();

    // Ensure data.data is a valid array before accessing index 5
    const metaData =
      Array.isArray(data?.data) && data.data.length > 5 ? data.data[5] : null;

    return {
      title: metaData?.meta_title || "FAQ | VIP Number Shop",
      description:
        metaData?.meta_description ||
        "Find answers to common questions about VIP Number Shop and our services.",
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "FAQ | VIP Number Shop",
      description:
        "Find answers to common questions about VIP Number Shop and our services.",
    };
  }
}

export default function Faq() {
  return (
    <>
      <FaqPage />
    </>
  );
}
