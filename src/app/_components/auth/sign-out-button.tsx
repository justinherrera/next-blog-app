
import { useEffect } from "react";
import { signOut } from "../../../../auth";

import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () =>  {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signout`, {
      method: "POST",
    });

    router.push('/login')
  }


  return (
    <button 
      className="py-2 px-2 cursor-pointer hover:bg-gray-300 block w-full text-left"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  )
}