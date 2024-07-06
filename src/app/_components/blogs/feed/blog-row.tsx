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
import { useEffect, useState } from "react"


export default function BlogRow({ getPosts, initialPosts }: { getPosts: (offset: number, limit: number) => Promise<PostData>, initialPosts: Post[] }) {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [offset, setOffset] = useState(2)
  const [hasMorePosts, setHasMorePosts] = useState(true)

  const loadMorePosts = async () => {
    if (hasMorePosts) {
      const POSTS_PER_PAGE = 2
      const response = await getPosts(offset, POSTS_PER_PAGE)

      if (response.posts && response.posts.length === 0) {
        setHasMorePosts(false)
      }

      setPosts((prevPosts) => [...prevPosts, ...response.posts || []])
      setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE)
    }
  }

  useEffect(() => {
    if (inView && hasMorePosts) {
      loadMorePosts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div className="flex-col space-y-12 sm:space-y-18 lg:space-y-16">
      {posts.map((post: Post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">

          <BlogRowImage src={post.imageUrl} />

          <div className="sm:h-[16rem] flex-col">
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user} />
          </div>
        </article>
      ))}
      {/* <div className="h-screen bg-gray-400">
        A
      </div>
      <div className="h-screen bg-red-400">
        B
      </div>
      <div className="h-screen bg-green-400">
        C
      </div> */}

      <div className="" ref={ref}>
        {
          hasMorePosts ? <p className="font-bold">Loading more posts...</p> : ""
        }
      </div>
    </div>
  )
}