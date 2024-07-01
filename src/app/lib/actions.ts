import prisma from "@/app/utils/prisma-connect"
import { z } from 'zod'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "../../../auth"

import { ValidationFields, FormState, ImageType } from "@/app/lib/definitions"

import { createPostSchema } from "./validator"
import { uploadImage } from "../utils/upload-image"

const isAuth = async () => {
  const session = await auth()
  if (!session) throw new Error('You must be signed in to perform this action')
  return session.user
}


const validateFields = ({ title, content, category, image }: ValidationFields): FormState => {

  const validatedFields = createPostSchema.safeParse({
    title,
    content,
    category,
    image,
  })

  const isValidationFailed = !validatedFields.success

  if (isValidationFailed) return {
    message: "error",
    errors: {
      title: validatedFields.error.flatten().fieldErrors.title?.[0] as string,
      content: validatedFields.error.flatten().fieldErrors.content?.[0] as string,
      category: validatedFields.error.flatten().fieldErrors.category as string[],
      image: validatedFields.error.flatten().fieldErrors.image?.[0] as string,
    },
  }

  return {
    message: "success",
    errors: undefined
  }
}

export async function createPost(currentState: FormState, formData: FormData): Promise<FormState> {
  'use server'

  let slug = null
  try {

    const user = await isAuth()

    console.log("--------->")
    console.log(user)

    const { title, content, category, image } = Object.fromEntries(formData)

    const body = { title, content, category, image } as ValidationFields

    const currentState = validateFields(body)

    if (currentState?.message === "error") return currentState

    const data = await body.image.arrayBuffer()

    const imageUrl = await uploadImage(body.image, data, user?.id as string)

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        categoryId: 1,
        imageUrl: imageUrl as string,
        slug: `${body.title}-1`,
        published: true,
        userId: user?.id as string
      },
    }).then(post => slug = post.slug)

    
    
    
  } catch (e: any) {
    console.log(e)
    return {
      message: e.message,
      errors: undefined
    }
  }

  // revalidateTag('blogs')
  // revalidatePath('/feed')
  redirect(`/${slug}`)
  
}