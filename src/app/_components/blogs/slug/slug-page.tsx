"use client"

import prisma from "@/app/utils/prisma-connect"
import SlugPost from "@/app/_components/blogs/slug/slug-post"
import { Suspense, useEffect, useState } from "react"
import LoadingSlug from "@/app/_components/blogs/skeletons/loading-slug"
import NotFound from "@/app/not-found"
import DeleteDialog from "@/app/_components/blogs/slug/delete-dialog"
import { Post, User } from "@/app/lib/definitions"
import { useSession } from "next-auth/react"
import { BaseNextResponse } from "next/dist/server/base-http"
import { Toaster } from "sonner"

export default function Page(
  {
    slug,
    user
  }:
  {
    slug: string
    user: User
  }
) {

  const [isDeleting, setIsDeleting] = useState(false)
  const [post, setPost] = useState<Post>()
  const [isLoading, setIsLoading] = useState(true)

  

  useEffect(() => {
    const fetchPost = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?slug=${slug}`, { next: { revalidate: 3600 } })
      const { post } = await response.json()

      console.log(response)
      

      if (post) {
        setIsLoading(false)
      }

      setPost(post)
    }
    fetchPost()
  }, [slug])

  if (isLoading) return <LoadingSlug />
  
  if (!post) return <NotFound />

  return (
    <div className="">
      <Toaster position="top-right" richColors  />
      <div className={`${isDeleting ? "brightness-50" : ""}`}>
        <Suspense fallback={<LoadingSlug />}>
          <SlugPost post={post} setIsDeleting={setIsDeleting} isDeleting={isDeleting} user={user} />
        </Suspense>
      </div>


      {
        isDeleting ? <DeleteDialog postId={post.id} setIsDeleting={setIsDeleting} /> : ""
      }
    </div>

    
  )
}