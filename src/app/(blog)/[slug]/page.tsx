import prisma from "@/app/utils/prisma-connect"
import BlogPost from "@/app/_components/blogs/blog-post"

export default function Page(
  {
    params
  }:
  {
    params: {
      slug: string
    }
  }
) {
  

  return (
    <BlogPost slug={params.slug} />
    
  )
}