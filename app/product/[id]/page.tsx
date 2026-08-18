import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    console.log("PRODUCT API STATUS:", res.status);
    console.log("PRODUCT API URL:", res.url);

    if (!res.ok) {
      return <h1>Product are Not Found</h1>;
    }

    const product = await res.json();

    return <ProductDetailsClient product={product} />;
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    return <h1>Unable to load product</h1>;
  }
}