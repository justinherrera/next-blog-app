import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCateogriesList from "@/app/_components/blogs/create/blog-categories-list"

import { Suspense } from "react"
import CreateForm from "@/app/_components/blogs/create/create-form"
import { createPost } from "@/app/lib/actions"






export default async function Create() {
  const response = await fetch(`${process.env.BASE_URL}/api/categories`)
  const { categories } = await response.json()

  


  return (
  <div className="mt-24 w-screen  flex items-center justify-center">
    <div className="w-full px-12">
      <Suspense fallback={<p className="font-bold text-2xl">Loading...</p>}>
        <CreateForm categories={categories} createPost={createPost} />
      </Suspense>
    </div>



    


  </div>)
}