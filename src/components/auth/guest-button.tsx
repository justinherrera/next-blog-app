"use client"

import { User } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function GuestButton() {
  const router = useRouter()
  return (
    <div className="mt-6 grid gap-4">
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-3xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        onClick={ () => {
          localStorage.setItem('user', "guest")
          router.push('/feed')
        }}
      >
        <User />
        <span className="text-sm font-semibold leading-6">Continue as Guest</span>
      </button>
   </div>
  )
}