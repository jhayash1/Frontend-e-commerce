"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const router = useRouter();
  const {
  cart,setCart,
  increaseQuantity,
  decreaseQuantity,
} = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {

        const response = await fetch("https://backend-kiy4.onrender.com/cart", {
          method: "GET",
          credentials:"include",
        });

        const data = await response.json();

        console.log("Cart from MongoDB:", data);

        if (data.success) {
          setCart(data.cart?.items );
        }
      } catch (error) {
        console.error("Get Cart Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCart();
  }, [setCart]);
  const {isLoggedIn} = useAuth()
  const handleCheckout = () => {
    if(!isLoggedIn){
      router.push("/login");
      return
    }
    router.push("/checkout");
  };
  const handleRemove = async (itemId: number) => {
    try {
      const response = await fetch(`https://backend-kiy4.onrender.com/cart/${itemId}`, {
        method: "DELETE",
       credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.cart.items);
      }
    } catch (error) {
      console.error("Remove Item Error:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h3 className="mb-8 text-3xl font-bold">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item:any) => (
            <div
              key={item.id}
              className="mb-4 flex gap-5 rounded-lg shadow-lg border border-gray-200  p-4 justify-between"
            >
              <div className="flex gap-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 object-contain"
                />
                <div className="">
                  <h5 className="text-xl line-clamp-2 font-bold">
                    {item.title}
                  </h5>

                  <p>Price: ₹{item.price}</p>

                  <div className="my-6 flex gap-2 items-center">
                    <p className=" font-semibold">Quantity : </p>

                    <div className="flex items-center gap-4">
                     <button
        onClick={() => decreaseQuantity(item.id)}
        className="rounded border px-3 py-1"
      >
        -
      </button>

      <span>{item.quantity}</span>

      <button
        onClick={() => increaseQuantity(item.id)}
        className="rounded border px-3 py-1"
      >
        +
      </button>

                    </div>
                  </div>

                  <p className="font-bold">
                    Total: ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
              <div
                className="flex justify-contend-end px-4 py-2 font-semibold text-black cursor-pointer"
                onClick={() => handleRemove(item.id)}
              >
                <FaTrash />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 bg-gray-200 p-4 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl  font-bold">Cart Summary</h2>
        <p className="mb-2">
          Total Items: {cart.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0)}
        </p>
        <p className="mb-2">
          Total Price: ₹
          {cart.reduce((acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity, 0)}
        </p>
      </div>

      {cart.length === 0 ? (
        <></>
      ) : (
        <>
          <button
            className="mt-5 w-full rounded bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
