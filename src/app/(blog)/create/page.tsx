import BlogCreateImageUpload from "@/app/_components/blogs/create/blog-create-image-upload"
import Tiptap from "../../_components/blogs/create/tiptap"

import BlogCreateTitleInput from "@/app/_components/blogs/create/blog-create-title-input"
import BlogCateogriesList from "@/app/_components/blogs/create/blog-categories-list"

import { Suspense } from "react"
import CreateForm from "@/app/_components/blogs/create/create-form"
import { z } from 'zod'

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const schema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(10, { message: "Must be 10 or more characters long" }),
  content: z.string().min(50),
  category: z.string(),
  image: z.object({
    size: z.number(),
    type: z.string(),
    lastModified: z.number(),
  })
  // .refine(file => file.size === 0, { message: "Please upload an image" })
  .refine(file => file.size < 1024 * 1024 * 10, { message: "File size must be less than 10MB" })
  .refine(file => acceptedFileTypes.includes(file.type), { message: "Please upload a valid image" })
})



type Fields = {
  title: string;
  content: string;
  category: string;
  image: {
    size: number;
    type: string;
    lastModified: number;
  };
}
 
type FormState = {
  message: string;
  errors: Record<keyof Fields, string[]> | undefined;
  fieldValues?: Fields
}

export default async function Create() {
  const response = await fetch(`http://localhost:3000/api/categories`)
  const { categories } = await response.json()

  async function createPost(currentState: FormState, formData: FormData): Promise<FormState> {
    'use server'

    const { title, content, category, image } = Object.fromEntries(formData)
    const validatedFields = schema.safeParse({
      title,
      content,
      category,
      image,
    })
   
    
    if (!validatedFields.success) {
      return {
        message: "error",
        errors: {
          title: validatedFields.error.flatten().fieldErrors.title as string[],
          content: validatedFields.error.flatten().fieldErrors.content as string[],
          category: validatedFields.error.flatten().fieldErrors.category as string[],
          image: validatedFields.error.flatten().fieldErrors.image as string[],
        },

      }
    }

    return {
      fieldValues: {
        title,
        content,
        category,
        image
      }
    }


  }


  return (
  <div className="mt-24 w-full  flex items-center justify-center">
    <div>
      {/* <BlogCreateTitleInput />
      <Tiptap />
      <Suspense fallback={<p>Loading...</p>}>
        <BlogCateogriesList /> 
      </Suspense>
      <BlogCreateImageUpload /> */}
      <Suspense fallback={<p>Loading...</p>}>
        <CreateForm categories={categories} createPost={createPost} />
      </Suspense>
      
          
      {/* <button className="mt-4 bg-black text-white py-1 px-4 rounded-2xl">Publish</button> */}
    </div>



    


  </div>)
}