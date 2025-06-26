import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params, searchParams }) {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL; // Replace with your API base URL
  const paramsData = await searchParams;
  const productId =  paramsData?.productid; // Fetch product ID from query params
  const number = paramsData?.number; // Fetch number from query params

  // Early return for default metadata if neither `productId` nor `number` exists
  if (!productId && !number) {
    return {
      title: "VIP Number | VIP Mobile Number Shop",
      description:
        "Discover unique VIP and fancy mobile numbers at VIP Number Shop. Choose your perfect number today and stand out!",
    };
  }
  // Fetch product data based on query params
  try {
    const url = productId
      ? `${apiUrl}/web/product?productid=${productId}`
      : `${apiUrl}/web/product?number=${number}`;

      const response = await fetch(url);
      
      const data = await response.json();
      const product = data?.data;
      
    // Return dynamic metadata using fetched product data
    return {
      title: `VIP Number | VIP Mobile Number: ${
        product?.number || "Unknown Product"
      }`,
      description: `${
        product?.number || "Product"
      } - Discover unique VIP and fancy mobile numbers at VIP Number Shop. Choose your perfect number today and stand out!`,
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    // Fallback metadata in case of API failure
    return {
      title: "VIP Number | VIP Mobile Number Shop",
      description:
        "Discover unique VIP and fancy mobile numbers at VIP Number Shop. Choose your perfect number today and stand out!",
    };
  }
}

export default function page() {
  return (
    <>
      <ProductDetails />
    </>
  );
}
