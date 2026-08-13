import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (!res.ok) {
    return <h1>Product Not Found</h1>;
  }

  const text = await res.text();

  if (!text) {
    return <h1>Product Not Found</h1>;
  }

  const product = JSON.parse(text);

  return ( <ProductDetailsClient product={product}/> );
}