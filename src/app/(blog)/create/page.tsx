'use client'


import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCreateCategorySelect from "@/app/_components/blogs/create/blog-create-category-select"


export default function Create() {


  return (
  <div className="mt-24">

    <BlogCreateTitleInput />
    <Tiptap />

    <BlogCreateCategorySelect />
    
    <BlogCreateImageUpload />
    

    
    <button className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button>
  </div>)
}