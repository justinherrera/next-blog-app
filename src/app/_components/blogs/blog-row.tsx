
import BlogRowImage from "@/app/_components/blogs/blog-row-image"
import BlogRowContent from "@/app/_components/blogs/blog-row-content"
import BlogRowDetails from "@/app/_components/blogs/blog-row-details"
import BlogRowAuthor from "@/app/_components/blogs/blog-row-author"

import { Post } from "@/app/lib/definitions"

export default function BlogRow({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {posts.map((post) => (
        <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">

          <BlogRowImage src={post.imageUrl} />

          <div>
            <BlogRowDetails name={post.category.name} date={post.createdAt} />

            <BlogRowContent title={post.title} content={post.content} slug={post.slug} />
            
            <BlogRowAuthor user={post.user.name} />
          </div>
        </article>
      ))}
    </div>
  )
}