import Link from "next/link"
import Image from "next/image"

import Blogs from "@/app/_components/blogs/category/blogs"
import NoPostsFound from "@/app/_components/blogs/no-posts-found"
import { Suspense } from "react"
import LoadingCategoryBlogs from "@/app/_components/blogs/skeletons/loading-category-blogs"


export default async function Category({ params }: { params: { category: string } }) {
  
  const category = params.category

  const response = await fetch(`${process.env.BASE_URL}/api/blogs?category=${category}`, { cache: 'no-store' })
  const { posts } = await response.json()

  if (posts.length === 0) return <NoPostsFound />

  return (
    <Suspense fallback={<LoadingCategoryBlogs />}>
      <Blogs posts={posts} category={params.category} />
    </Suspense>
    
  )
}