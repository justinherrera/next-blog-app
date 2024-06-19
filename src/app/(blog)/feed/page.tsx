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


const queryClient = new QueryClient()

export default function Feed() {

  return (
    <div className="w-full py-24 sm:py-32 flex flex-col">
      <div className="w-full lg:px-8 flex justify-center">
        <div className="w-[50%]">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <SearchInput />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explore and discover popular blogs from around the world. 🌎
          </p>

          <CategoriesNavigation categories={categories} />

          <QueryClientProvider client={queryClient}>
            <BlogRow />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </div>
        
        <SideNavigation /> 
        
      </div>
    </div>
  );
}