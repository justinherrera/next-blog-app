import prisma from "@/app/utils/prisma-connect"
import { redirect } from "next/navigation"
import router from "next/router"
import { auth } from "../../../../auth"

export async function GET(request: Request) {
  const session = await auth()
  const loggedUser = session?.user

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') as string
  const userId = searchParams.get('userId') as string
  const category = searchParams.get('category') as string

  const offset = searchParams.get('offset') as string
  const limit = searchParams.get('limit') as string

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

  if (!slug && !userId && !category && offset && limit) {
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

  if (userId && offset && limit) {
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
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

  if (category && offset && limit) {
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
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
        user: true,
        likes: true
      }
    })
  
    await prisma.$disconnect()
    return Response.json({ post: { ...post, loggedUser: loggedUser } })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('postId') as string
    const session = await auth()
    const loggedUserId = session?.user?.id
    
    if (!id) return Response.json({ message: "No post id provided" })

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id)
       },
      include: {
        user: true,
        likes: true
      }
    })

    console.log(post?.user.id !== loggedUserId)
    if (post?.user.id !== loggedUserId) return Response.json({ 
      status: "error",
      message: "You are not authorized to delete this post" })
  
    if (!post) return Response.json({ status: "error", message: "Post not found" })

    const deletePost = await prisma.post.delete({
      where: { 
        id: parseInt(id),
        user: {
          id: loggedUserId
        }
       },
    })

    if (!deletePost) return Response.json({ status: "error", message: "Failed to delete post" })

    

  
    await prisma.$disconnect()
    return Response.json({ status: "success", post })
  } catch (e) {
    console.log(e)
    await prisma.$disconnect()
    return Response.json({ 
      message: "Failed to delete post"
    })
  }

}