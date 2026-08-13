"use client";

import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(
    (state: { addToCart: any; }) => state.addToCart
  );
  const router = useRouter();

  const handleAddToCart = async () => {
  try {
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
            quantity: quantity,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("Cart saved:", data);

    if (!response.ok) {
      throw new Error(data.message || "Cart save failed");
    }

    router.push("/cart");
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

        {/* Left Column */}
        <div className="flex items-center justify-center rounded-lg border p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-112.5 w-full object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-center">

          <p className="text-sm text-gray-500">
            Electronics
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-yellow-500">
              ★★★★★
            </span>

            <span className="text-gray-500">
              (120 Reviews)
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold">
            ₹{Math.floor(product.price)}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-6">

            <p className="mb-2 font-semibold">
              Quantity
            </p>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    Math.max(1, prev - 1)
                  )
                }
                className="rounded border px-4 py-2"
              >
                -
              </button>

              <span className="text-lg">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="rounded border px-4 py-2"
              >
                +
              </button>

            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <button
              onClick={handleAddToCart}
              className="rounded bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            >
              Add to Cart
            </button>

            <button className="rounded border border-black px-6 py-3 font-semibold hover:bg-black hover:text-white">
              Buy Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}