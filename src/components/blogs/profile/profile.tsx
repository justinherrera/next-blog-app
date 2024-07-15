"use client"

import { Post, PostData } from "@/lib/definitions"
import Image from "next/image"
import Link from "next/link"

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react"

export default function Profile({ userId, getProfilePosts, initialPosts }: { userId: string | undefined, getProfilePosts: (offset: number, limit: number) => Promise<PostData>, initialPosts: Post[] }) {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [offset, setOffset] = useState(6)
  const [hasMorePosts, setHasMorePosts] = useState(initialPosts.length < 6 ? false : true)

  const loadMorePosts = async () => {
    if (hasMorePosts) {
      const POSTS_PER_PAGE = 3
      const response = await getProfilePosts(offset, POSTS_PER_PAGE)

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
    <div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post: Post) => (
          <article key={post.id} className="flex flex-col items-start md:text-wrap md:break-words">
            <div className="relative w-full">
              <Image
                src={post.imageUrl}
                height={500}
                width={500}
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </div>
            <div className="w-full">
              <div className="mt-4 text-wrap break-words">
                {/* <span className="">{post.title}</span> */}
                <Link className="text-lg font-semibold" href={`/${post.slug}`}>{post.title}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    <div className="w-full flex items-center justify-center mt-12" ref={ref}>
      {
        hasMorePosts ? <p className="font-bold">Loading more posts...</p> : ""
      }
    </div>
  </div>
    
  )
}