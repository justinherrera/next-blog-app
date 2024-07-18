import { Post } from "@/lib/definitions";
import Link from "next/link";

export default function TrendingPostsList({ trendingPosts }: { trendingPosts: Post[] }) {
  return (
    <div className="w-full mb-4">
      <div className="flex space-x-2">
        <p className="font-bold text-2xl py-2 px-4">Trending Posts 🔥</p>
      </div>
      {trendingPosts.map((post) => (
        <div key={post.id} className="flex flex-col p-4 border-b border-gray-200 hover:bg-gray-100">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  )
}