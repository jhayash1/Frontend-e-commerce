"use client";

import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Products API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative overflow-hidden rounded-lg bg-white shadow-xl"
          >
            <Link href={`/product/${product.id}`}>
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-52"
                />
              </div>

              <div className="p-4">
                <p className="mt-2 text-xl font-bold">
                  ₹{Math.floor(product.price)}
                </p>

                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < Math.round(product.rating.rate)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      <FaStar />
                    </span>
                  ))}

                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating.rate}
                  </span>
                </div>

                <h6 className="h-12 overflow-hidden line-clamp-2">
                  {product.title}
                </h6>
              </div>
            </Link>

            <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}