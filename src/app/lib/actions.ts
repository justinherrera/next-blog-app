import prisma from "@/app/utils/prisma-connect"
import { z } from 'zod'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "../../../auth"

import { PostData, FormState, ImageType } from "@/app/lib/definitions"

import { createPostSchema } from "./validator"

const isAuth = async () => {
  const session = await auth()
  if (!session) throw new Error('You must be signed in to perform this action')
}

type Issues = {
  code: string
  message: string
  path: string[]
}

type FlattenErrors = {
  formErrors: any[]
  fieldErrors: {
    title: ['string']
    content: ['string']
    category: ['string']
    image: ['string']
  }
}
type ErrorFields = {
  success: boolean
  error: {
    flatten: () => FlattenErrors
    issues: Issues
  }
}

const validateFields = (isValidationFailed: boolean, validatedFields: ErrorFields): FormState => {
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
  try {

    await isAuth()

    const { title, content, category, image } = Object.fromEntries(formData)
    const validatedFields = createPostSchema.safeParse({
      title,
      content,
      category,
      image,
    })

    const isValidationFailed = !validatedFields.success
    
    const currentState = validateFields(isValidationFailed, validatedFields)

    if (currentState?.message === "error") return currentState
    
  } catch (e) {
    throw new Error("Failed to create post")
  }

  revalidatePath('/feed')
  redirect('/feed')
}