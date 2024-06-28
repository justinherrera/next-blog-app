import { Post } from "@/app/lib/definitions"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Link from "next/link"


export default async function Blogs({ posts, category }: { posts: Post[], category: string }) {
  
  return <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{category}</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Check out posts related to {category}.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {posts.map((post: Post) => (
          <article key={post.id} className="flex flex-col items-start justify-between">
            <div className="relative w-full">
              <Image
                src={post.imageUrl}
                height={500}
                width={500}
                alt=""
                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
              />
              {/* <Link href={`/${post.slug}`}>
                <Image
                  src={post.imageUrl}
                  height={500}
                  width={500}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                /></Link> */}
              {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" /> */}
            </div>
            <div className="max-w-xl">
              <div className="mt-4 flex items-center text-xs">
                {/* <a
                  href="#"
                  className="relative z-10 rounded-full bg-gray-50 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.name}
                </a> */}
              </div>
              <div className="">
                {/* <span className="">{post.title}</span> */}
                <Link className="text-lg font-semibold" href={`/${post.slug}`}>{post.title}</Link>
                {/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={`/${post.slug}`}>
                    <span className="absolute inset-0">{post.title}</span>
                    
                  </a>
                </h3> */}
                <p className="mt-5 text-sm leading-6 text-gray-600">{post.content.substring(0, 200)}...</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
}