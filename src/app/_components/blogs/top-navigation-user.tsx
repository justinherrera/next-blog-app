"use client"

import Image from "next/image"
import { signOut } from "../../../../auth"
import { useState } from "react"
import SignOutButton from "../auth/sign-out-button"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function TopNavigationUser() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Image
        className="inline-block h-8 w-8 rounded-full cursor-pointer"
        height={100}
        width={100}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
        onClick={() => setIsOpen(!isOpen)}
      />
    {
      isOpen ? (
        <div className="border border-gray-300 absolute top-10 right-4 w-44 rounded ">
          <p className="p-1 px-2 cursor-pointer hover:bg-gray-300">Profile</p>
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