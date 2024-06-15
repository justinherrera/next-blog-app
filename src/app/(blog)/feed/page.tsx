import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import SearchInput from '../../_components/blogs/search-input'
import NoPostsFound from "@/app/_components/blogs/no-posts-found"
import Image from 'next/image'

import BlogRow from "@/app/_components/blogs/blog-row"
import { getPosts } from "@/app/lib/actions"
import { Post, Category } from "@/app/lib/definitions"
import CategoriesNavigation from "@/app/_components/blogs/categories-navigation"

const categories: Category[] = [
  { id: 1, name: 'Travel' },
  { id: 2, name: 'Technology' },
  { id: 3, name: 'Food' },
  { id: 4, name: 'Health' },
  { id: 5, name: 'Fitness' },
  { id: 6, name: 'Fashion' },
  { id: 7, name: 'Music' },
  { id: 8, name: 'Art' },
  { id: 9, name: 'Literature' },
  { id: 10, name: 'Sports' },
  { id: 11, name: 'Cooking' },
  { id: 12, name: 'Photography' },
  { id: 13, name: 'Politics' },
  { id: 14, name: 'Business' },
  { id: 15, name: 'Science' },
  { id: 16, name: 'Education' },
  { id: 17, name: 'Entertainment' },
];

export default async function Feed() {

  const posts: Post[] = await getPosts()

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <SearchInput />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore and discover popular blogs from around the world. 🌎
          </p>

          <CategoriesNavigation categories={categories} />

          {
            (posts.length === 0) ? <NoPostsFound /> : <BlogRow posts={posts}/>
          }
        </div>
        
   
      </div>
    </div>
  );
}