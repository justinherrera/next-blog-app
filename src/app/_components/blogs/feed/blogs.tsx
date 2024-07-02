import BlogRow from "./blog-row"
import CategoriesNavigation from "./categories-navigation"

export default async function Blogs() {
  const response = await fetch(`${process.env.BASE_URL}/api/blogs`, { cache: 'no-store' })
  const { posts } = await response.json()

  return (
    <>
      <BlogRow posts={posts} />
    </>
   )
}