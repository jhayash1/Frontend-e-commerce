"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://backend-kiy4.onrender.com/orders",
          {
            method:"GET",
            credentials: "include"
          }
        );

        const data = await res.json();
        setOrders(data.orders || []);
        console.log("MongoDB Orders:", data);

        if (data.success) {
          setOrders([data.order]);
        }
      } catch (error) {
        console.error("Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h1>Loading orders...</h1>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-6 rounded-lg border p-6"
          >
            <h2 className="font-bold">
              Order ID: {order._id}
            </h2>

            <p>
              Payment: {order.paymentStatus}
            </p>

            <p>
              Status: {order.orderStatus}
            </p>

            <p className="font-bold">
              Total: ₹{order.total}
            </p>

            <div className="mt-4">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="mb-3 flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <button
        onClick={() => {
          localStorage.removeItem("token"); 
          window.location.href = "/login";
        }}
        className="mt-5 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}