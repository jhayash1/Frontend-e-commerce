"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaShoppingBag,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

type User = {
  username: string;
  email: string;
  userId: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const{cart} = useCartStore()
  const cartCount = cart.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "https://backend-kiy4.onrender.com/profile",
          {
            method:"GET",
            credentials : "include",
          }
        );

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        setUser(data.user);
      } catch (error) {
        console.error("Profile Error:", error);
      router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

      {/* Welcome Section */}
      <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="mb-2 text-sm text-blue-100">
              Welcome back 👋
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {user?.email?.split("@")[0] || "User"}
            </h1>

            <p className="mt-2 max-w-lg text-sm text-blue-100">
              Manage your orders, cart, wishlist and account
              from your dashboard.
            </p>
          </div>

          <Link
            href="/product"
            className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Continue Shopping
            <FaArrowRight />
          </Link>

        </div>
      </section>

      {/* Statistics */}
      <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Orders */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {cartCount}
              </h2>

              <p className="mt-2 text-xs text-green-500">
                +12% this month
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <FaShoppingBag size={22} />
            </div>

          </div>
        </div>

        {/* Cart */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Cart Items
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {cart.length}
              </h2>

              <Link
                href="/cart"
                className="mt-2 block text-xs text-blue-600 hover:underline"
              >
                View cart →
              </Link>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <FaShoppingCart size={22} />
            </div>

          </div>
        </div>

        {/* Wishlist */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Wishlist
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                12
              </h2>

              <Link
                href="/wishlist"
                className="mt-2 block text-xs text-blue-600 hover:underline"
              >
                View wishlist →
              </Link>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <FaHeart size={22} />
            </div>

          </div>
        </div>

        {/* Spending */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Spent
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                ₹24,580
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Lifetime spending
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              ₹
            </div>

          </div>
        </div>

      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 lg:grid-cols-3">

        {/* Recent Orders */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between border-b px-5 py-5">
            <div>
              <h2 className="font-bold text-gray-800">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your latest purchases
              </p>
            </div>

            <Link
              href="/orders"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-4">
                    Order
                  </th>

                  <th className="px-5 py-4">
                    Date
                  </th>

                  <th className="px-5 py-4">
                    Amount
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">

                <tr className="transition hover:bg-gray-50">

                  <td className="px-5 py-4 font-semibold text-gray-800">
                    #ORD-1024
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    Aug 15, 2026
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    ₹2,499
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                      Completed
                    </span>
                  </td>

                </tr>

                <tr className="transition hover:bg-gray-50">

                  <td className="px-5 py-4 font-semibold text-gray-800">
                    #ORD-1023
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    Aug 12, 2026
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    ₹1,899
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600">
                      Processing
                    </span>
                  </td>

                </tr>

                <tr className="transition hover:bg-gray-50">

                  <td className="px-5 py-4 font-semibold text-gray-800">
                    #ORD-1022
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    Aug 08, 2026
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    ₹3,250
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                      Completed
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <h2 className="font-bold text-gray-800">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Manage your account
          </p>

          <div className="mt-5 space-y-3">

            <Link
              href="/orders"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <FaShoppingBag className="text-blue-600" />

                <span className="text-sm font-medium">
                  My Orders
                </span>
              </div>

              <FaArrowRight className="text-xs text-gray-400" />
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-orange-50"
            >
              <div className="flex items-center gap-3">
                <FaShoppingCart className="text-orange-600" />

                <span className="text-sm font-medium">
                  My Cart
                </span>
              </div>

              <FaArrowRight className="text-xs text-gray-400" />
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-pink-50"
            >
              <div className="flex items-center gap-3">
                <FaHeart className="text-pink-600" />

                <span className="text-sm font-medium">
                  Wishlist
                </span>
              </div>

              <FaArrowRight className="text-xs text-gray-400" />
            </Link>

            <Link
              href="/profile"
              className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-purple-50"
            >
              <div className="flex items-center gap-3">
                <FaUser className="text-purple-600" />

                <span className="text-sm font-medium">
                  My Profile
                </span>
              </div>

              <FaArrowRight className="text-xs text-gray-400" />
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}