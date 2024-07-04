"use client"


import BlogRowImage from "@/app/_components/blogs/feed/blog-row-image"
import BlogRowContent from "@/app/_components/blogs/feed/blog-row-content"
import BlogRowDetails from "@/app/_components/blogs/feed/blog-row-details"
import BlogRowAuthor from "@/app/_components/blogs/feed/blog-row-author"

import { TailSpin } from "react-loader-spinner"
import { useQuery } from '@tanstack/react-query'

import { Post, PostData } from "@/app/lib/definitions"
import LoadingBlogRow from "../skeletons/loading-feed"
import { useInView } from "react-intersection-observer";

export default function BlogRow({ posts }: { posts: Post[] }) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div className="flex-col space-y-12 sm:space-y-18 lg:space-y-16">
      {posts.map((post: Post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">

          <BlogRowImage src={post.imageUrl} />

          <div className="sm:h-[16rem] flex-col">
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user.name} />
          </div>
        </article>
      ))}
      <div className=" bg-blue-400" ref={ref}>
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </div>
    </div>
  )
}