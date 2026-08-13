"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  email: string;
};

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:4000/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("token");
          router.replace("/login");
          return;
        }

        const data = await response.json();

        console.log("Profile:", data);

        setUser(data.user);
      } catch (error) {
        console.error("Profile Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-8 shadow">

          {/* Profile Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-2xl font-bold">
              {user.username}
            </h1>

            <p className="text-gray-500">
              {user.email}
            </p>

          </div>

          {/* User Information */}
          <div className="space-y-5">

            <div>
              <label className="text-sm text-gray-500">
                Username
              </label>

              <div className="mt-1 rounded-lg border bg-gray-50 p-3">
                {user.username}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Email
              </label>

              <div className="mt-1 rounded-lg border bg-gray-50 p-3">
                {user.email}
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            <button
              onClick={() => router.push("/account-settings")}
              className="flex-1 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Account Settings
            </button>

            <button
              onClick={() => router.back()}
              className="flex-1 rounded-lg border px-5 py-3 hover:bg-gray-100"
            >
              Back
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}