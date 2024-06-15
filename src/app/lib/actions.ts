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
  console.log("--------")
  console.log(posts)
  await prisma.$disconnect()
  return posts
}