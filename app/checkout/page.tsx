"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import Script from "next/script";
import { ro } from "zod/locales";
import { useRouter } from "next/navigation";
import Image from "next/image";
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  // const [address, setAddress] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  // });
  const address = useCartStore((state: { address: any }) => state.address);

  const setAddress = useCartStore(
    (state: { setAddress: any }) => state.setAddress,
  );
  const readDataMongoDB = async () => {
    try {
      const res = await fetch("http://localhost:4000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCart(data.cart?.items || []);
      console.log("Checkout - Cart from MongoDB:", data);
    } catch (error) {
      console.error("Error reading data from MongoDB:", error);
    }
  };
  console.log("custom:", cart);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 100;

  const total = subtotal + shipping;

  useEffect(() => {
    readDataMongoDB();
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-10">Loading checkout...</div>;
  }

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      const orderData = {
        items: cart,
        total: total,
        shippingAddress: address,
      };

      console.log("Order Data:", orderData);

      // 1. Create Razorpay Order
      const response = await fetch("http://localhost:4000/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      console.log("Order Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Order creation failed");
      }

      // 2. Razorpay options
      const options = {
        key: result.keyId,
        amount: result.amount,
        currency: result.currency,
        name: "Ecommerce",
        description: "Order Payment",
        order_id: result.orderId,

        // 3. Payment successful
        handler: async function (paymentResponse: any) {
          console.log("Payment Success:", paymentResponse);

          try {
            // 4. Verify payment
            const verifyRes = await fetch(
              "http://localhost:4000/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,

                  razorpay_order_id: paymentResponse.razorpay_order_id,

                  razorpay_signature: paymentResponse.razorpay_signature,

                  items: cart,

                  total: total,

                  shippingAddress: address,
                }),
              },
            );

            const verifyResult = await verifyRes.json();

            console.log("Verification Result:", verifyResult);

            if (verifyResult.success) {
              router.push("/payment-success");
            } else {
              alert(verifyResult.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);

            alert("Payment verification failed");
          }
        },

        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
      };

      // 5. Open Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Error placing order:", error);

      alert("Unable to place order");
    }
  };
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="container mx-auto px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: Customer Details */}
          <div className="rounded-lg border p-6">
            <h2 className="mb-6 text-2xl font-semibold">Shipping Address</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-medium">Name</label>

                <input
                  type="text"
                  value={address.name}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="w-full rounded border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">Email</label>

                <input
                  type="email"
                  value={address.email}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter your email"
                  className="w-full rounded border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">Phone</label>

                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Enter phone number"
                  className="w-full rounded border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">Address</label>

                <textarea
                  value={address.address}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter your address"
                  rows={4}
                  className="w-full rounded border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      city: e.target.value,
                    })
                  }
                  className="rounded border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      state: e.target.value,
                    })
                  }
                  placeholder="State"
                  className="rounded border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                  placeholder="Pincode"
                  className="rounded border px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="h-fit rounded-lg border p-6">
            <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>

            <div className="space-y-4">
              <div className=" text-sm justify-between">
                {cart.map((item: any) => (
                  <div key={item.id} className="my-2 flex justify-between">
                    <div className="flex gap-4 ">
                      <div className="">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <h6 className="font-medium w-lg">{item.title}</h6>
                        <div>Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div>
                      <span>₹{Math.floor(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Math.floor(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{Math.floor(shipping)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{Math.floor(total)}</span>
              </div>

              <button
                className="mt-5 w-full rounded bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
