'use client'


import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCreateCategorySelect from "@/app/_components/blogs/create/blog-create-category-select"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function Create() {


  return (
  <div className="mt-24">

    <BlogCreateTitleInput />
    <Tiptap />

    <QueryClientProvider client={queryClient}>
      <BlogCreateCategorySelect />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
    <BlogCreateImageUpload />
    

    
    <button className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button>
  </div>)
}