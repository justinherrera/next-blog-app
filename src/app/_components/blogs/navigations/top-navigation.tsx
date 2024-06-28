

import { redirect } from "next/navigation"
import { auth, signOut } from "../../../../../auth"
import Link from "next/link"
import TopNavigationUser from "./top-navigation-user"
import Image from "next/image"
import { User } from "@/app/lib/definitions"



export default async function BlogNavigation() {

  const session = await auth()
  const user = session?.user
 

  return (
    <div className="flex pl-56 py-4 shadow-lg">
      <div className="flex w-[68%] justify-between pl-2">
        <Link href="/feed" className="font-bold py-1 ">
          Home
        </Link>
        {/* <Image src="/posted-logo.png" alt="logo" width={100} height={100} /> */}
        <div className="flex pr-10">
          <Link href="/create" className="text-sm font-medium mr-4 px-4 p-1 border border-gray-300 rounded-2xl hover:bg-black hover:text-white">Create</Link>
          <TopNavigationUser user={user as User} />
        </div>
      </div>

    </div>
    // <div className="w-full flex justify-between">
    //   <div className="flex w-[70%] items-center px-8">
    //     <Link href="/feed">Home</Link>
    //   </div>
      
    //   <div className="flex w-[30%]">
    //     <Link href="/create" className="text-sm font-medium mr-4 px-4 p-1 border rounded-2xl bg-black text-white">Create</Link>
    //     <TopNavigationUser />
    //   </div>
    // </div>
  )
}
