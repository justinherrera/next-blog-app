"use client"

import Image from "next/image"
import { signOut } from "../../../../../auth"
import { useState } from "react"
import SignOutButton from "../../auth/sign-out-button"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Link from "next/link"
import { User } from "@/app/lib/definitions"

const queryClient = new QueryClient()



export default function TopNavigationUser({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Image
        className="inline-block h-8 w-8 rounded-full cursor-pointer hover:opacity-75"
        height={100}
        width={100}
        src={user.image}
        alt=""
        onClick={() => setIsOpen(!isOpen)}
      />
    {
      isOpen ? (
        <div className="border border-gray-300 absolute top-10 right-4 w-44 rounded bg-white ">
          <Link href="/profile" className="py-2 px-2 cursor-pointer hover:bg-gray-300">Profile</Link>
          <QueryClientProvider client={queryClient}>
            <SignOutButton />
            <ReactQueryDevtools />
          </QueryClientProvider>
          {/* <SignOutButton /> */}
        </div>
      ) : ""
    }

  </div>
  )
}