import { object, string, number } from "zod"

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})


export const createPostSchema = object({
  title: string({
    required_error: "Title is required",
  }).min(10, { message: "Must be 10 or more characters long" }),
  content: string().min(50),
  category: string(),
  image: object({
    size: number(),
    type: string(),
    lastModified: number(),
  })
  // .refine(file => file.size === 0, { message: "Please upload an image" })
  .refine(file => file.size < 1024 * 1024 * 10, { message: "File size must be less than 10MB" })
  .refine(file => acceptedFileTypes.includes(file.type), { message: "Please upload a valid image" })
})