import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import { FaStar } from "react-icons/fa";

export default async function ProductPage() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product: any) => (
          <div
            key={product.id}
            className=" group relative overflow-hidden rounded-lg  bg-white shadow-xl"
          >
            <Link href={`/product/${product.id}`}>
              <div className="flex align-middle justify-center">
                <img src={product.image} alt={product.name} className="h-52 " />
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
                <h6 className="h-12 line-clamp-2 overflow-hidden">
                  {product.title}
                </h6>
              </div>
            </Link>
            <div
              className="
      absolute bottom-0 left-0 right-0
      translate-y-full
      p-4
      transition-transform duration-300
      group-hover:translate-y-0
    "
            >
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
