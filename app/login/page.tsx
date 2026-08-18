"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    const response = await fetch("https://backend-kiy4.onrender.com/login", {
      method: "POST",
      credentials : "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result)

    if (response.ok) { 
      login(result.user)// if login menu change
      router.push("/dashboard");

      const profileResponse = await fetch("https://backend-kiy4.onrender.com/profile", {
        credentials: "include"
      });

      const profile = await profileResponse.json();

      console.log(profile);
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          <Link
            href="/register"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
