import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-xl font-semibold text-blue-500">
              Newsletter
            </h4>

            <p className="mb-5 leading-7 text-gray-400">
              Dolor amet sit justo amet elitr clita ipsum elitr est.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-gray-700 bg-white px-5 py-3 pr-24 text-gray-800 outline-none focus:border-blue-500"
              />

              <button
                type="button"
                className="absolute right-1 top-1 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                SignUp
              </button>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-5 text-xl font-semibold text-blue-500">
              Customer Service
            </h4>

            <Link href="#">Contact Us</Link>
            <Link href="#">Returns</Link>
            <Link href="#">Order History</Link>
            <Link href="#">Site Map</Link>
            <Link href="#">Testimonials</Link>
            <Link href="#">My Account</Link>
            <Link href="#">Unsubscribe Notification</Link>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-5 text-xl font-semibold text-blue-500">
              Information
            </h4>

            <Link href="#">About Us</Link>
            <Link href="#">Delivery Information</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Warranty</Link>
            <Link href="#">FAQ</Link>
            <Link href="#">Seller Login</Link>
          </div>

          {/* Extras */}
          <div>
            <h4 className="mb-5 text-xl font-semibold text-blue-500">
              Extras
            </h4>

            <Link href="#">Brands</Link>
            <Link href="#">Gift Vouchers</Link>
            <Link href="#">Affiliates</Link>
            <Link href="#">Wishlist</Link>
            <Link href="#">Order History</Link>
            <Link href="#">Track Your Order</Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ecommerce. All rights reserved.
        </div>

      </div>
    </footer>
  );
}