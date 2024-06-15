interface Category {
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
}