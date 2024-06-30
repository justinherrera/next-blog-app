
import BlogRowImage from "@/app/_components/blogs/feed/blog-row-image"
import BlogRowContent from "@/app/_components/blogs/feed/blog-row-content"
import BlogRowDetails from "@/app/_components/blogs/feed/blog-row-details"
import BlogRowAuthor from "@/app/_components/blogs/feed/blog-row-author"

import { TailSpin } from "react-loader-spinner"
import { useQuery } from '@tanstack/react-query'

import { Post, PostData } from "@/app/lib/definitions"
import LoadingBlogRow from "../skeletons/loading-feed"

export default async function BlogRow({ posts }: { posts: Post[] }) {

  return (
    <div className="flex-col space-y-12 sm:space-y-18 lg:space-y-16">
      {posts.map((post: Post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">

          <BlogRowImage src={post.imageUrl} />

          <div className="h-[16rem] flex-col">
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user.name} />
          </div>
        </article>
      ))}
    </div>
  )
}