

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import SearchInput from '../../_components/blogs/feed/search-input'
import BlogRow from "@/app/_components/blogs/feed/blog-row"
import Categories from "@/app/_components/blogs/feed/categories"
import { Suspense } from 'react'
import LoadingCategories from '@/app/_components/blogs/skeletons/loading-categories'
import LoadingFeed from '@/app/_components/blogs/skeletons/loading-feed'
import Blogs from '@/app/_components/blogs/feed/blogs'


export default function Feed() {

  return (
    <div className=" py-4 sm:py-12 flex items-center justify-center">
      <div className="w-[70%] lg:px-8">
        <div className=" flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <SearchInput />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore and discover popular blogs from around the world. 🌎
          </p>
          <Suspense fallback={<LoadingCategories />}>
            <Categories />
            <Suspense fallback={<LoadingFeed /> }>
              <Blogs />
            </Suspense>
          </Suspense>
        </div>
      </div>
    </div>
  );
}