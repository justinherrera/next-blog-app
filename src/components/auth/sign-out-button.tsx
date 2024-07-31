
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () =>  {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signout`, {
      method: "POST",
    }).then(res => {
      if (res.ok) {
        localStorage.removeItem("editor");
        setIsSigningOut(true)
      }
    })

    setTimeout(() => {
      router.push('/login')
      router.refresh()
    }, 1500)
  }


  return (
    <button 
      className="py-2 px-2 cursor-pointer hover:bg-gray-300 w-full text-left text-sm flex items-center"
      onClick={handleSignOut}
    >
      <LogOut className="w-4 h-4" color="red" />
      <span className="ml-2 text-red-500">{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
    </button>
  )
}