
"use client"

import { PrismaClient } from "@prisma/client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { TailSpin } from "react-loader-spinner"
const prisma = new PrismaClient()

import { useSearchParams } from 'next/navigation'
import { Post } from "@/app/lib/definitions"
import Image from "next/image"
import { useQuery } from '@tanstack/react-query'
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
    </QueryClientProvider>
    
  )
}