import { ReactNode } from "react";

export interface Category {
  id: number;
  name: string;
  posts?: Post[];
}

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  published: boolean;
  categoryId: number;
  userId: string;
  category: Category;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostData {
  posts?: Post[]
  map: (post: unknown) => JSX.Element
}

export type ImageType = {
  size: number;
  type: string;
  lastModified: number;
}


type Fields = {
  title: string;
  content: string;
  category: string;
  image: ImageType;
}
 
export type FormState = {
  message: string;
  errors: Record<keyof Fields, string[]> | undefined;
  fieldValues?: Fields
}