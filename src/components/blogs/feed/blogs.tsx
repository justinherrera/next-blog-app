import NoPostsFound from "@/components/blogs/no-posts-found"
import BlogRow from "@/components/blogs/feed/blog-row"
import { getPosts } from "@/lib/actions"

export default async function Blogs() {

  const { posts } = await getPosts(0, 2)

  if (posts.length === 0) return <NoPostsFound message="There are no blog posts at the moment" />
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