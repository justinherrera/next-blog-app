"use client"

import SlugPost from "@/components/blogs/slug/slug-post"
import { Suspense, useEffect, useState } from "react"
import LoadingSlug from "@/components/blogs/skeletons/loading-slug"
import NotFound from "@/app/not-found"
import DeleteDialog from "@/components/blogs/slug/delete-dialog"
import { Post, User } from "@/lib/definitions"
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