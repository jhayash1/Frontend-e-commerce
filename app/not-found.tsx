import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>

      <Link
        href="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go to Home
      </Link>
    </div>
  );
}