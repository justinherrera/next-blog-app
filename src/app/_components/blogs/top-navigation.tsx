

import { redirect } from "next/navigation"
import { signOut } from "../../../../auth"
import Link from "next/link"


export default async function BlogNavigation() {
  return (
    <div className="flex items-center justify-between px-44 py-4 ">
      <Link href="/feed">Home</Link>
      <div className="flex pr-12">
        <Link href="/create" className="text-sm font-medium mr-4 px-4 p-1 border rounded-2xl bg-black text-white">Create</Link>
        <form
          className="flex flex-row-reverse px-4 "
          action={async () => {
            "use server"
            await signOut({ redirectTo: "/login", redirect: true })
          }}
        >
          <button className="text-sm font-medium" type="submit">Sign Out</button>
        </form>
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
