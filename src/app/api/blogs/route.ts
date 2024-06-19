import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') as string

  if (!slug) {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
        user: true
      }
    })
    await prisma.$disconnect()
    return Response.json({ posts })
  }
  

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      user: true
    }
  })

  await prisma.$disconnect()
  return Response.json({ post })
}