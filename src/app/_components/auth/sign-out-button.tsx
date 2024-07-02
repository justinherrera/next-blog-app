
import { useEffect, useState } from "react";
import { signOut } from "../../../../auth";

import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () =>  {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signout`, {
      method: "POST",
    }).then(res => {
      if (res.ok) {
        setIsSigningOut(true)
      }
    })

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }


  return (
    <button 
      className="py-2 px-2 cursor-pointer hover:bg-gray-300 block w-full text-left"
      onClick={handleSignOut}
    >
      {isSigningOut ? "Sign Out..." : "Sign Out"}
    </button>
  )
}