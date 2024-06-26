import prisma from "@/app/utils/prisma-connect"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') as string
  const userId = searchParams.get('userId') as string

  console.log(`searchParams ${userId}`)

  if (!slug && !userId) {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        category: true,
        user: true
      }
    })
    await prisma.$disconnect()
    return Response.json({ posts })
  }

  if (userId) {
    console.log("called???")
    const posts = await prisma.post.findMany({
      where: {
        user: {
          id: userId
        }
      },
      include: {
        user: true,
        category: true
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