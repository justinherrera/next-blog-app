import prisma from "@/app/utils/prisma-connect"
import { z } from 'zod'
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "../../../auth"

import { ValidationFields, FormState, ImageType, Post } from "@/app/lib/definitions"

import { createPostSchema, editPostSchema } from "./validator"
import { uploadImage } from "../utils/upload-image"

import { slugify } from "../utils/slugify"

const isAuth = async () => {
  const session = await auth()
  if (!session) throw new Error('You must be signed in to perform this action')
  return session.user
}

const validateEditFields = ({ title, content, category, image }: ValidationFields): FormState => {
  const validatedFields = editPostSchema.safeParse({ title, content, category, image });
  const isValidationFailed = !validatedFields.success;

  if (isValidationFailed) {
    const { fieldErrors } = validatedFields.error.flatten();
    return {
      message: "validation-error",
      errors: {
        title: fieldErrors.title?.[0] as string,
        content: fieldErrors.content?.[0] as string,
        category: fieldErrors.category as string[],
        image: fieldErrors.image?.[0] as string,
      },
    };
  }

  return { message: "success", errors: undefined };
};

const validateCreateFields = ({ title, content, category, image }: ValidationFields): FormState => {

  const validatedFields = createPostSchema.safeParse({
    title,
    content,
    category,
    image,
  })

  const isValidationFailed = !validatedFields.success

  if (isValidationFailed) {
    const { fieldErrors } = validatedFields.error.flatten();

    return {
      message: "validation-error",
      errors: {
        title: fieldErrors.title?.[0] as string,
        content: fieldErrors.content?.[0] as string,
        category: fieldErrors.category as string[],
        image: fieldErrors.image?.[0] as string,
      },
    };
  }

  return {
    message: "success",
    errors: undefined
  }
}

export async function createPost(currentState: FormState, formData: FormData): Promise<FormState> {
  'use server';

  let slug = null;
  try {
    const user = await isAuth();
    if (!user) throw new Error('User not authenticated');

    const { title, content, category, image } = Object.fromEntries(formData) as ValidationFields;

    const validationState = validateCreateFields({ title, content, category, image });
    if (validationState.message === "validation-error") return validationState;

    const imageData = await image.arrayBuffer();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: parseInt(category),
        imageUrl: '',
        slug: slugify(`${title} ${user.id} ${new Date().getTime()}`),
        published: true,
        userId: user.id as string,
      },
    });

    const imageUrl = await uploadImage(image, imageData, user.id as string);
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        imageUrl,
        slug: slugify(`${title} ${user.id} ${post.id}`),
      },
    });

    slug = updatedPost.slug;
  } catch (e: any) {
    console.error(e);
    return {
      message: "Server Error",
      errors: e.message,
    };
  }

  return redirect(`/${slug}`);
}

export async function editPost(currentState: FormState, formData: FormData): Promise<FormState> {
  'use server';

  let slug = null;
  try {
    const user = await isAuth();
    if (!user) throw new Error('User not authenticated');

    const formEntries = Object.fromEntries(formData);
    const postId = formEntries.id as string;
    const currentImage = formEntries.currentImage as string;

    const { title, content, category, image } = formEntries;
    const body = { title, content, category, image } as ValidationFields;

    const validationState = validateEditFields(body);
    if (validationState.message === "validation-error") return validationState;

    const imageData = await body.image.arrayBuffer();
    const isImageUpdated = body.image.size > 0;

    const updatedData = {
      title: body.title,
      content: body.content,
      slug: slugify(`${body.title} ${user.id} ${postId}`),
      categoryId: parseInt(body.category),
      imageUrl: isImageUpdated ? await uploadImage(body.image, imageData, user.id as string) : currentImage,
    };

    const post = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: updatedData,
    });

    slug = post.slug;
  } catch (error: any) {
    console.error(error);
    return {
      message: "Server Error",
      errors: error.message,
    };
  }

  return redirect(`/${slug}`);
}

export async function getPosts(offset: number, limit: number) {
  const response = await fetch(`${process.env.BASE_URL}/api/blogs?offset=${offset}&limit=${limit}`, { cache: 'no-store' })
  return response.json()
}

export async function getProfilePosts(userId: string | undefined, offset: number, limit: number) {
  const response = await fetch(`${process.env.BASE_URL}/api/blogs?userId=${userId}&offset=${offset}&limit=${limit}`, { cache: 'no-store' })
  return response.json()
}

export async function getCategoryPosts(category: string | undefined, offset: number, limit: number) {
  const response = await fetch(`${process.env.BASE_URL}/api/blogs?category=${category}&offset=${offset}&limit=${limit}`, { cache: 'no-store' })
  return response.json()
  
}