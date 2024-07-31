import Blogs from "@/components/blogs/category/blogs"
import NoPostsFound from "@/components/blogs/no-posts-found"
import { Suspense } from "react"
import LoadingCategoryBlogs from "@/components/blogs/skeletons/loading-category-blogs"
import NotAuthorized from "@/components/auth/not-authorized"
import { auth } from "../../../../auth"
import { getCategoryPosts } from "@/lib/actions"


export default async function Category({ params }: { params: { category: string } }) {

  const category = params.category
  

  const { posts } = await getCategoryPosts(category, 0, 6)
  console.log(`posts length: ${posts.length}`)

  if (posts.length === 0) return <NoPostsFound message="There are no posts available in this category right now." />


  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{category}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Check out posts related to {category}.
          </p>
        </div>
        <Suspense fallback={<LoadingCategoryBlogs />}>
          <Blogs getCategoryPosts={async (offset) => {
          "use server"
          return await getCategoryPosts(category, offset, 3)
        }} initialPosts={posts} category={category} />
        </Suspense>
      </div>
    </div>
    
  )
}