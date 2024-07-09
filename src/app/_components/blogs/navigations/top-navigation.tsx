

import { redirect } from "next/navigation"
import { auth, signOut } from "../../../../../auth"
import Link from "next/link"
import TopNavigationUser from "./top-navigation-user"
import Image from "next/image"
import { User } from "@/app/lib/definitions"
import { headers } from "next/headers";



export default async function TopNavigation() {


  const session = await auth()
  const user = session?.user
 

  return (
    <div className="flex px-4 sm:px-8 py-4 shadow-lg">
      <div className="flex w-full justify-between sm:pl-2">
        <Link href="/feed" className="font-bold py-1 ">
          Home
        </Link>
        <TopNavigationUser user={user as User} />
      </div>
 
    </div>
  )
}
