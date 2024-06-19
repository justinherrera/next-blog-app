

import { redirect } from "next/navigation"
import { signOut } from "../../../../auth"
import Link from "next/link"


export default async function BlogNavigation() {
  return (
    <div className="flex items-center justify-between px-44 py-4 ">
      <Link href="/feed">Home</Link>
      <form
        className="mx-auto w-[50%] flex flex-row-reverse px-4 "
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login", redirect: true })
        }}
      >
        <button className="text-sm font-medium" type="submit">Sign Out</button>
      </form>
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
