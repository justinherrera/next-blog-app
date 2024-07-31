import { Post } from "@/lib/definitions"
import Link from "next/link"
import TrendingPostsList from "@/components/blogs/navigations/trending-posts-list"

export default async function SideNavigation({ trendingPosts }: { trendingPosts: Post[] }) {

  return (
    <div className={`${!trendingPosts ? "h-screen" : ""} sticky flex flex-col top-0 pt-12 -z-50`}>
      <TrendingPostsList trendingPosts={trendingPosts} />

      {/* <div className="w-full my-4">
        <div className="flex space-x-2">
          <p className="font-bold text-2xl py-2 px-4">Latest Posts ✨</p>
        </div>
        {
          latestPosts.map((post) => (
            <div key={post.id} className="flex flex-col p-4 border-b border-gray-200 hover:bg-gray-100">
              <Link href={`/${post.slug}`}>{post.title}</Link>
            </div>
          ))
        }

      </div> */}
      
      {/* <FeaturedPost post={post} /> */}
  </div>
  )
}