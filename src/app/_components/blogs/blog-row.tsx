
import BlogRowImage from "@/app/_components/blogs/blog-row-image"
import BlogRowContent from "@/app/_components/blogs/blog-row-content"
import BlogRowDetails from "@/app/_components/blogs/blog-row-details"
import BlogRowAuthor from "@/app/_components/blogs/blog-row-author"

import { TailSpin } from "react-loader-spinner"
import { useQuery } from '@tanstack/react-query'

import { Post, PostData } from "@/app/lib/definitions"
import LoadingBlogRow from "./loading-blog-row"

export default function BlogRow() {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/blogs`)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      return response.json()
    },
  })

  if (isPending) return <LoadingBlogRow />

  if(!data) return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">No Posts Yet</h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Oops! Nothing to see here
      </p>
    </div>
  </div>

  return (
    <div className="space-y-18 lg:space-y-16">
      {data.posts.map((post: Post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">

          <BlogRowImage src={post.imageUrl} />

          <div>
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user.name} />
          </div>
        </article>
      ))}
    </div>
  )
}