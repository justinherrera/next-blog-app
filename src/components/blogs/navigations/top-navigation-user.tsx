"use client"

import Image from "next/image"
import { useState } from "react"
import SignOutButton from "@/components/auth/sign-out-button"
import Link from "next/link"
import { User as UserType } from "@/lib/definitions"
import { User } from "lucide-react"
import { usePathname } from "next/navigation"




export default function TopNavigationUser({ user }: { user: UserType }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className="flex sm:pr-10 md:pr-0">
      {
        pathname !== "/create" && user ? <Link href="/create" className="text-sm font-medium mr-4 px-4 p-1 border border-gray-300 rounded-2xl hover:bg-black hover:text-white">Create</Link> : <Link href="/login" className="text-sm font-medium mr-4 px-4 p-1 border border-gray-300 rounded-2xl hover:bg-black hover:text-white">Login</Link> 
      }
      <div className="relative">
        {
          user ? (
            <Image
              className="inline-block h-8 w-8 rounded-full cursor-pointer hover:opacity-75"
              height={100}
              width={100}
              src={user.image}
              alt=""
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : ""
        }

        {
          isOpen ? (
            <div className="border border-gray-300 absolute top-10 right-4 w-44 rounded bg-white ">
              <Link href="/profile" className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-sm flex items-center">
                <User className="w-4 h-4" />
                <span className="ml-2">Profile</span>
              </Link>
              <SignOutButton />
              {/* <SignOutButton /> */}
            </div>
          ) : ""
        }
      </div>
    </div>
    
  )
}