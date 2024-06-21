import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCateogriesList from "@/app/_components/blogs/create/blog-categories-list"

import { Suspense } from "react"


export default function Create() {


  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      <BlogCreateTitleInput />
      <Tiptap />
      <Suspense fallback={<p>Loading...</p>}>
        <BlogCateogriesList /> 
      </Suspense>
      <BlogCreateImageUpload />
          
      <button className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button>
    </div>



    


  </div>)
}