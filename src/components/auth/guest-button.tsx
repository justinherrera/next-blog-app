import { User } from "lucide-react";

export default function GuestButton() {
  return (
    <div className="mt-6 grid gap-4">
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
      >
        <User />
        <span className="text-sm font-semibold leading-6">Sign in as Guest</span>
      </button>
   </div>
  )
}