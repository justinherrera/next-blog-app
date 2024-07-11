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
  
  
  const likes = searchParams.get('likes') as string

  console.log(searchParams)

  if (!slug && !userId && !category && !offset && !likes) {
   

    const posts = await prisma.post.findMany({
      take: limit ? parseInt(limit) : 5,
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

  if (!slug && !userId && !category && offset) {
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
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

  if (userId && offset) { // for profile page
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
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

  if (category && offset) { // for category page
    const posts = await prisma.post.findMany({
      skip: parseInt(offset),
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
        likes: true,
        category: true
      }
    })
  
    await prisma.$disconnect()
    return Response.json({ post: { ...post, loggedUser: loggedUser } })
  }

  if (likes) {
    const posts = await prisma.post.findMany({
      take: 5,
      include: {
        category: true,
        user: true,
        likes: true,
        _count: {
          select: {
            likes: true
          }
        }
      },
      orderBy: {
        likes: {
          _count: "desc"
        }
      },

    })
    await prisma.$disconnect()
    return Response.json({ posts })
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