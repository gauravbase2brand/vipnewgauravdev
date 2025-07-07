import BlogsPage from "./BlogsPage";

export async function generateMetadata({ params }) {
  const { blogid } = await params;
  let cachedBlogs = null;
  try {
    const res = await fetch(
      `https://fancymobilenumber.in/blogDetails.php?img_url=${blogid}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blog data");
    }
    cachedBlogs = await res?.json();
  } catch (error) {
    console.error("Error preloading blog data:", error);
  }
  const blog = cachedBlogs || {};
  return {
    title: blog?.seo_title || "blog Title", // Provide a fallback title if data is not found
    description: blog?.seo_description || "blog Description", // Provide a fallback description
  };
}

export default function Blogs() {
  return (
    <div>
      <BlogsPage />
    </div>
  );
}
