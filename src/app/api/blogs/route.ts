import prisma from "@/app/utils/prisma-connect"
import { redirect } from "next/navigation"
import router from "next/router"
import { auth } from "../../../../auth"

export async function GET(request: Request) {
  try {
    const session = await auth()
    const loggedUser = session?.user

    const url = new URL(request.url)
    const searchParams = url.searchParams

    const slug = searchParams.get('slug')
    const userId = searchParams.get('userId')
    const category = searchParams.get('category')
    const offset = parseInt(searchParams.get('offset') || '0')
    const limit = parseInt(searchParams.get('limit') || '5')
    const likes = searchParams.get('likes')

    console.log(searchParams.toString())

    const queryOptions: any = {
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        user: true
      }
    }

    let posts

    if (!slug && !userId && !category && !offset && !likes) {
      // Fetch latest posts
      queryOptions.take = limit
    } else if (!slug && !userId && !category && offset) {
      // Fetch initial posts with offset
      queryOptions.skip = offset
      queryOptions.take = 2
    } else if (userId && offset) {
      // Fetch posts for profile page
      queryOptions.skip = offset
      queryOptions.take = 2
      queryOptions.where = { user: { id: userId } }
    } else if (category && offset) {
      // Fetch posts for category page
      queryOptions.skip = offset
      queryOptions.take = 2
      queryOptions.where = { category: { name: category } }
    } else if (slug) {
      // Fetch a single post by slug
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { user: true, likes: true, category: true }
      })
      await prisma.$disconnect()
      return Response.json({ post: { ...post, loggedUser } })
    } else if (likes) {
      // Fetch most liked posts
      posts = await prisma.post.findMany({
        take: 5,
        include: {
          category: true,
          user: true,
          likes: true,
          _count: { select: { likes: true } }
        },
        orderBy: { likes: { _count: 'desc' } }
      })
      await prisma.$disconnect()
      return Response.json({ posts })
    }

    posts = await prisma.post.findMany(queryOptions)
    await prisma.$disconnect()
    return Response.json({ posts })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'An error occurred while fetching posts' }, { status: 500 })
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