"use client";

import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const router = useRouter();

  const handleAddToCart = async () => {
    try {
      console.log("Product received:", product);

      if (!product) {
        console.error("Product is undefined");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              title: product.title,
              price: Math.floor(product.price),
              image: product.image,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      console.log("Cart response:", data);

      if (!response.ok) {
        console.error("Error adding to cart:", data.message);
        return;
      }

      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}