import prisma from "@/utils/prisma-connect"
import { auth } from "../../../../auth"


export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const session = await auth()
    const loggedUser = session?.user
    
    const userId = loggedUser?.id as string
    const postId = searchParams.get('postId') as string

    console.log(searchParams)

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: parseInt(postId),
        },
      },
    });

    if (existingLike) {
      const like = await prisma.like.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: parseInt(postId),
          },
        },
      });
      await prisma.$disconnect()
      return Response.json({ like })
    } else {
      const like = await prisma.like.create({
        data: {
          userId: userId,
          postId: parseInt(postId)
        },
      });
      await prisma.$disconnect()
      return Response.json({ like })
    }
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
  }
}