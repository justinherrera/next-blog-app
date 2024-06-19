
"use client"

import prisma from "@/app/utils/prisma-connect"
import BlogPost from "@/app/_components/blogs/blog-post"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function Page(
  {
    params
  }:
  {
    params: {
      slug: string
    }
  }
) {
  

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPost slug={params.slug} />
      <ReactQueryDevtools />
    </QueryClientProvider>
    
  )
}