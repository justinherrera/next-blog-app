import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCateogriesList from "@/app/_components/blogs/create/blog-categories-list"

import { Suspense } from "react"
import CreateForm from "@/app/_components/blogs/create/create-form"
import { createPost } from "@/app/lib/actions"






export default async function Create() {
  const response = await fetch(`http://localhost:3000/api/categories`)
  const { categories } = await response.json()

  


  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <CreateForm categories={categories} createPost={createPost} />
      </Suspense>
    </div>



    


  </div>)
}