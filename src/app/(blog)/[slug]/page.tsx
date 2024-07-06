import prisma from "@/app/utils/prisma-connect"
import SlugPost from "@/app/_components/blogs/slug/slug-post"
import { Suspense } from "react"
import LoadingSlug from "@/app/_components/blogs/skeletons/loading-slug"
import NotFound from "@/app/not-found"

export default async function Page(
  {
    params
  }:
  {
    params: {
      slug: string
    }
  }
) {
  
  const response = await fetch(`${process.env.BASE_URL}/api/blogs?slug=${params.slug}`, { next: { revalidate: 3600 } })
  const { post } = await response.json()
  
  if (!post) return <NotFound />

  return (
    <Suspense fallback={<LoadingSlug />}>
      <SlugPost post={post} />
    </Suspense>
    
  )
}