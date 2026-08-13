"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="mt-3 text-gray-500">
          Thank you for your purchase. Your payment has been
          successfully processed.
        </p>

        {/* Order Message */}
        <div className="mt-6 rounded-lg bg-green-50 p-4">
          <p className="font-medium text-green-700">
            Your order has been confirmed 🎉
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">

          <Link
            href="/orders"
            className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            View My Orders
          </Link>

          <Link
            href="/product"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Continue Shopping
          </Link>

        </div>
      </div>
    </div>
  );
}