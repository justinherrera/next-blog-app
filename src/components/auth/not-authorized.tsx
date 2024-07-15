import Link from "next/link";

export default function NotAuthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Not Authorized</h1>
        <p className="mt-4 text-gray-600">You are not authorized to view this page. Please log in to continue.</p>
        <Link
          href="/login"
          className="mt-6 inline-block px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}