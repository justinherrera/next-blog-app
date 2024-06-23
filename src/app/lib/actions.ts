import prisma from "@/app/utils/prisma-connect"
import { z } from 'zod'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "../../../auth"

import { PostData, FormState, ImageType } from "@/app/lib/definitions"

import { createPostSchema } from "./validator"

export async function createPost(currentState: FormState, formData: FormData): Promise<FormState> {
  'use server'
  try {

    const session = await auth()
    if (!session) {
      throw new Error('You must be signed in to perform this action')
    }

    const { title, content, category, image } = Object.fromEntries(formData)
    const validatedFields = createPostSchema.safeParse({
      title,
      content,
      category,
      image,
    })

    const isValidationFailed = !validatedFields.success
   
    
    if (isValidationFailed) {
      currentState = {
        message: "error",
        errors: {
          title: validatedFields.error.flatten().fieldErrors.title as string[],
          content: validatedFields.error.flatten().fieldErrors.content as string[],
          category: validatedFields.error.flatten().fieldErrors.category as string[],
          image: validatedFields.error.flatten().fieldErrors.image as string[],
        },

      }

      return currentState
    } else {
      currentState = {
        message: "success",
        errors: undefined,
        fieldValues: {
          title: title as string,
          content: content as string,
          category: category as string,
          image: image as ImageType
        }
      }
    }
  } catch (e) {
    throw new Error("Failed to create post")
  }

  revalidatePath('/feed')
  redirect('/feed')
}