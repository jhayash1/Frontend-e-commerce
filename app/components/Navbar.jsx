"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaSearch,
  FaHeart,
  FaRandom,
  FaShoppingCart,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [search,setSearch] = useState("")

  const { cart, setCart } = useCartStore();

  const cartLength = cart.length
  useEffect(() => {
  console.log("isLoggedIn:", isLoggedIn);

  const getCart = async () => {
    const token = localStorage.getItem("token");
    if (!isLoggedIn) {
      setCart([]);
      return;
    }

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart?.items || []);
      }
    } catch (error) {
      console.error("Get Cart Error:", error);
      setCart([]);
    }
  };

  getCart();
}, [isLoggedIn, setCart]);

  // const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleMenuChange = (e) => {
    const value = e.target.value;

    if (value === "dashboard") {
      router.push("/dashboard");
    }

    if (value === "wishlist") {
      router.push("/wishlist");
    }

    if (value === "cart") {
      router.push("/cart");
    }

    if (value === "notifications") {
      router.push("/notifications");
    }

    if (value === "settings") {
      router.push("/account-settings");
    }

    if (value === "profile") {
      router.push("/profile");
    }

    if (value === "logout") {
      handleLogout();
    }
  };
  return (
    <>
      {/* Top Header */}
      <div className="border-b lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          {/* Left */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="#" className="hover:text-blue-600">
              Help
            </Link>
            <span>/</span>
            <Link href="#" className="hover:text-blue-600">
              Support
            </Link>
            <span>/</span>
            <Link href="#" className="hover:text-blue-600">
              Contact
            </Link>
          </div>

          {/* Center */}
          <div className="text-sm">
            <span className="font-medium">Call Us: </span>
            <a
              href="tel:+0121234567890"
              className="text-gray-500 hover:text-blue-600"
            >
              (+012) 1234 567890
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6 text-sm">
            {!isLoggedIn && (
            <Link href="/register" className="hover:text-blue-600">
              Register
            </Link>
            )}
          {isLoggedIn && (
            <>
            
            <Link href="/product" className="hover:text-blue-600">
              Products
            </Link>
            <Link href="/cart" className="hover:text-blue-600">
              Cart
            </Link>
            </>
          )}
          </div>
          <div className="flex items-center gap-6 text-sm">
            {!isLoggedIn && (
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
            )}
            {isLoggedIn && (
              <>
                <select
                  className="border-none bg-transparent outline-none"
                  defaultValue=""
                  onChange={handleMenuChange}
                >
                  <option value="dashboard">My Dashboard</option>
                  <option value="wishlist">Wishlist</option>

                  <option value="cart">My Cart</option>

                  <option value="notifications">Notifications</option>

                  <option value="settings">Account Settings</option>

                  <option value="profile">My Account</option>
                  <option value="logout">Logout</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-4xl">🛍️</span>
            <h1 className="text-3xl font-bold text-blue-600">E-Kart</h1>
          </Link>

          {/* Search */}
          <div className="mx-10 flex flex-1 items-center">
            <div className="flex w-full overflow-hidden rounded-full border">
              <input
                type="text"
                value={search}
                placeholder="Search Looking For?"
                className="flex-1 px-5 py-3 outline-none"
                onChange={(e)=>setSearch(e.target.value)}
              />

              <button className="bg-blue-600 px-8 text-white hover:bg-blue-700">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="rounded-full border p-3 hover:bg-gray-100">
              <FaRandom />
            </button>

            <button className="relative rounded-full border p-3 hover:bg-gray-100">
              <FaHeart />
               {/* {cartCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      )} */}
            </button>

            <button className="relative flex items-center gap-2 rounded-full border p-3 hover:bg-gray-100">
              <FaShoppingCart />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartLength}
                </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
