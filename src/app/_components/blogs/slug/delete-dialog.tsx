"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Toaster, toast } from 'sonner'

export default function DeleteDialog({ postId, setIsDeleting }: { postId: number, setIsDeleting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(false)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?postId=${postId}`, {
      method: "DELETE",
    });
    const data = await response.json()

    if (data.status === "error") {
      return toast.error(data.message)
    }

    if (response.ok) {
      toast.success("You have successfully deleted this post")
      setTimeout(() => {
        router.push('/feed')
        router.refresh()
      }, 1500)

    }
  }

  return (
    <div className="bg-white fixed top-[40%] mx-12 lg:left-[30%] md:left-[20%] sm:left-[10%] 2xl:top-[40%] 2xl:left-[40%] p-8 shadow-lg border rounded-lg">
      
      <span className="font-bold">Are you sure you want to delete this post?</span>
      <div className="flex justify-end space-x-4 mt-4">
        <button className="text-sm font-medium" onClick={() => setIsDeleting(false)}>Cancel</button>
        <button className="rounded border py-2 px-4 bg-black text-white text-sm font-medium" onClick={handleDelete}>Continue</button>
      </div>
    </div>
  )
}