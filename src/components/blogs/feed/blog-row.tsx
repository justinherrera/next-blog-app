"use client"


import BlogRowImage from "@/components/blogs/feed/blog-row-image"
import BlogRowContent from "@/components/blogs/feed/blog-row-content"
import BlogRowDetails from "@/components/blogs/feed/blog-row-details"
import BlogRowAuthor from "@/components/blogs/feed/blog-row-author"

import { Post, PostData } from "@/lib/definitions"
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


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

  const router = useRouter()

  return (
    <div className="flex-col space-y-12 sm:space-y-18 lg:space-y-16 lg:w-full">
      {posts.map((post: Post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row lg:w-full cursor-pointer">

          <BlogRowImage post={post} />

          <div className="sm:h-[16rem] flex-col lg:w-full lg:pr-4">
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user} />
          </div>
        </article>
      ))}
      <div className="" ref={ref}>
        {
          hasMorePosts ? <p className="">Loading more posts...</p> : "There are no more posts to show right now."
        }
      </div>
    </div>
  )
}