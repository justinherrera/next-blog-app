import { Post } from "@/app/lib/definitions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"


export default async function Blogs({ posts, category }: { posts: Post[], category: string }) {
  
  return <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl pl-4 pr-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{category}</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Check out posts related to {category}.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post: Post) => (
          <article key={post.id} className="flex flex-col items-start justify-between">
            <div className="w-full">
              <Image
                src={post.imageUrl}
                height={500}
                width={500}
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
            </div>
            <div className="w-[24rem] md:w-[42rem] lg:w-full">
              <div className="w-full mt-4 text-pretty break-words">
                <Link className="text-lg font-semibold" href={`/${post.slug}`}>{post.title}</Link>
                <p className="mt-5 text-sm leading-6 text-gray-600">{post.content.substring(0, 200).replace(/<[^>]+>/g, '')}...</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
}