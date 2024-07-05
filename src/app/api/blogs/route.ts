import prisma from "@/app/utils/prisma-connect"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') as string
  const userId = searchParams.get('userId') as string
  const category = searchParams.get('category') as string

  const offset = searchParams.get('offset') as string
  const limit = searchParams.get('limit') as string

  console.log("---->")
  console.log(searchParams)

  if (!slug && !userId && !category && !offset && !limit) {
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

  if (offset && limit) {
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
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
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
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

  if (category) {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        category: {
          name: category
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
  
  if (slug) {
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
}