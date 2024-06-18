import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import { PostData } from "@/app/lib/definitions"

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
      user: true
    }
  })
  await prisma.$disconnect()
  return posts
}

export async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  })
  await prisma.$disconnect()
  return post
}