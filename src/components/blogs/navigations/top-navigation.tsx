
import { auth } from "../../../../auth"
import Link from "next/link"
import TopNavigationUser from "@/components/blogs/navigations/top-navigation-user"
import { User } from "@/lib/definitions"



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
