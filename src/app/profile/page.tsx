import Link from "next/link"
import { auth } from "../../../auth"
import NotAuthorized from "../_components/auth/not-authorized"
import Image from "next/image"
import { Post } from "../lib/definitions"
import NoPostsFound from "../_components/blogs/no-posts-found"


export default async function Profile() {

  const session = await auth()

  if (!session) return <NotAuthorized />
  const { user } = session
  

  const response = await fetch(`${process.env.BASE_URL}/api/blogs?userId=${user?.id}`, { cache: 'no-store' })
  const { posts } = await response.json()

  if (posts.length === 0) return <NoPostsFound />

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Blogs</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Check out your recent posts.
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
              </div>
              <div className="max-w-xl">
                <div className="mt-4 flex items-center text-xs">
                </div>
                <div className="">
                  {/* <span className="">{post.title}</span> */}
                  <Link className="text-lg font-semibold" href={`/${post.slug}`}>{post.title}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}