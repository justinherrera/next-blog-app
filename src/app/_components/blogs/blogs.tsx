import BlogRow from "./blog-row"
import CategoriesNavigation from "./categories-navigation"

export default async function Blogs() {
  const response = await fetch(`http://localhost:3000/api/blogs`)
  const { posts } = await response.json()

  return (
    <>
      <BlogRow posts={posts} />
    </>
   )
}