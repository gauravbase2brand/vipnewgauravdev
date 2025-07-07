import CategoryPage from "./CategoryPage";
export async function generateMetadata({ params }) {
  const { subcategory } = await params; // Await the params object directly

  const res = await fetch("https://fancymobilenumber.in/getCategories.php", {
    cache: "no-store",
  });
  const data = await res.json();

  if (subcategory && data?.length) {
    const matchedCategory = data.find(
      (element) => element.slug === subcategory
    );

    if (matchedCategory) {
      return {
        title: matchedCategory.title || "Default Title",
        description: matchedCategory.description || "Default Description",
      };
    }
  }

  return {
    title: "Default Title",
    description: "Default Description",
  };
}
export default function Category() {
  return (
    <div>
      <CategoryPage />
    </div>
  );
}
