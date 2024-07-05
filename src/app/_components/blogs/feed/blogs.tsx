import BlogRow from "./blog-row"
import CategoriesNavigation from "./categories-navigation"
import { getPosts } from "@/app/lib/actions"

export default async function Blogs() {
  // const response = await fetch(`${process.env.BASE_URL}/api/blogs?offset=0&limit=2`, { cache: 'no-store' })
  // const { posts } = await response.json()

  const { posts } = await getPosts(0, 2)
  return (
    <>
      {/* <BlogRow posts={posts} /> */}
      <BlogRow getPosts={async (offset) => {
        "use server"
        return await getPosts(offset, 2)
      }} initialPosts={posts} />
    </>
   )
}