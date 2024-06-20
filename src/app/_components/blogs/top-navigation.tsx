

import { redirect } from "next/navigation"
import { signOut } from "../../../../auth"
import Link from "next/link"
import TopNavigationUser from "./top-navigation-user"



export default async function BlogNavigation() {
 

  return (
    <div className="flex items-center justify-between px-44 py-4 ">
      <Link href="/feed">Home</Link>
      <div className="flex pr-12">
        <Link href="/create" className="text-sm font-medium mr-4 px-4 p-1 border rounded-2xl bg-black text-white">Create</Link>
        {/* <div>
          <Image
            className="inline-block h-8 w-8 rounded-full"
            height={100}
            width={100}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="border border-gray-300">
            <p>Profile</p>
            <p>Sign Out</p>
          </div>
        </div> */}
        <TopNavigationUser />



        {/* <form
          className="flex flex-row-reverse px-4 "
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login", redirect: true })
          }}
        >
          <button className="text-sm font-medium" type="submit">Sign Out</button>
        </form> */}
      </div>
      
{/*       
      <button 
        onClick={async () => {
          "use server"
          await signOut()
        }}
      className="text-sm font-medium text-white">Sign Out</button> */}
    </div>
  )
}
