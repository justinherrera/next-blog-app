import Link from "next/link";
import Image from "next/image"
import { Post } from "@/app/lib/definitions";


export default async function FeaturedPost({ post }: { post: Post }) {

  return (
    <div className="w-full border-t border-gray-200 pt-8 px-4">
      <p className="font-bold mb-4">Featured Post ⭐</p>
      <div className="flex-col mt-6 text-wrap break-words">
        {/* <Image src={post.imageUrl} height={100} width={100} alt="" className="w-[50%] bg-gray-50 object-cover" /> */}
        {!post ? <p>No featured post yet</p> : ""}
        <Link href={`/${post.slug}`}>
          <h3 className=" font-bold text-lg">{post.title}</h3>
        </Link>
        <p className="mt-2 text-sm">{`${post.content.substring(0, 200).replace(/<[^>]+>/g, '')}...`}</p>
        <div className="mt-4 flex space-x-2 border-t border-gray-200 pt-4">
          <Image
            className="inline-block h-6 w-6 rounded-full"
            src={post.user.image}
            height={100}
            width={100}
            alt=""
          />
          <p className="text-sm">{post.user.name}</p>
        </div>
      </div>
    </div>

  )
}