"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getProduct();
    }
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product id Not Found</h1>;
  }

  return <ProductDetailsClient product={product} />;
}