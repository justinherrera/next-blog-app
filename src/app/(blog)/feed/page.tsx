"use client"

import prisma from "@/app/utils/prisma-connect"

import { useState, useEffect } from "react"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import SearchInput from '../../_components/blogs/search-input'
import NoPostsFound from "@/app/_components/blogs/no-posts-found"
import Image from 'next/image'

import BlogRow from "@/app/_components/blogs/blog-row"
import { Post, Category, PostData } from "@/app/lib/definitions"
import CategoriesNavigation from "@/app/_components/blogs/categories-navigation"
import SideNavigation from "@/app/_components/blogs/side-navigation"

const queryClient = new QueryClient()

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
          <QueryClientProvider client={queryClient}>
            <CategoriesNavigation />
            <BlogRow />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
        
        {/* <SideNavigation />  */}
        
      </div>
    </div>
  );
}