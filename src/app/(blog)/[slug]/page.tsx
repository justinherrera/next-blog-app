import prisma from "@/app/utils/prisma-connect"
import BlogPost from "@/app/_components/blogs/blog-post"

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
  
  const response = await fetch(`http://localhost:3000/api/blogs?slug=${params.slug}`, { next: { revalidate: 3600 } })
  const { post } = await response.json()

  return (
    <BlogPost post={post} />
    
  )
}