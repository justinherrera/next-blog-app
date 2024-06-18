import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') as string

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