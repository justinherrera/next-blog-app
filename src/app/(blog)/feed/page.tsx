import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import SearchInput from '../../_components/blogs/search-input'
import NoPostsFound from "@/app/_components/blogs/no-posts-found"
import Image from 'next/image'

import BlogRow from "@/app/_components/blogs/blog-row"
import { getPosts } from "@/app/lib/actions"
import { Post } from "@/app/lib/definitions"


export default async function Feed() {

  const posts: Post[] = await getPosts()

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <SearchInput />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Looking for a Specific Topic?
          </p>

          {
            (posts.length === 0) ? <NoPostsFound /> : <BlogRow posts={posts}/>
     }
        </div>
        
   
      </div>
    </div>
  );
}