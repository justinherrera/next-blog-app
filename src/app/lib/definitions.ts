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
  name: string;
  lastModified: number;
}


export type ValidationFields = {
  title: string;
  content: string;
  category: string;
  image: ImageType;
}

type StateFields = {
  title: string
  content: string
  category: string[]
  image: string
}
 
export type FormState = {
  message: string;
  errors: StateFields | undefined;
  fieldValues?: ValidationFields
}