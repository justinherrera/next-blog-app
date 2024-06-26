import Image from "next/image"
import { useQuery } from '@tanstack/react-query'
import { TailSpin } from "react-loader-spinner"
import { format } from "date-fns"
import LoadingBlogSection from "./loading-blog-section"
import NotFound from "@/app/not-found"

export default async function BlogPost({ slug }: { slug: string }) {

  const response = await fetch(`http://localhost:3000/api/blogs?slug=${slug}`, { next: { revalidate: 3600 } })
  const { post } = await response.json()

  console.log(post)

  // console.log(data)

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ['posts', slug],
  //   queryFn: async () => {
  //     const response = await fetch(`http://localhost:3000/api/blogs?slug=${slug}`)
  //       .then((res) => res.json())
  //       .then(data => data.post)
  //     return response
  //   },
  // })
  

  // if (isPending) return <LoadingBlogSection />

  // if(!data) return <NotFound />

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Introducing ✨</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <div className="flex items-center gap-x-6 my-8 border-b pb-4 border-gray-200">
          <div className="flex min-w-0 gap-x-4">
            <Image 
              className="h-12 w-12 flex-none rounded-full bg-gray-50" 
              height={100}
              width={100}
              src={post.user.image} alt="" />
            <div className="min-w-0 flex-auto">
              <div className="flex space-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">{post.user.name}</p>
                <a
                  href="#"
                  className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Follow
                </a>
              </div>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy")}</p>
            </div>
          </div>
        </div>
        {/* <p className="mt-6 text-xl leading-8" dangerouslySetInnerHTML={{ __html: post.content }}>
        </p> */}
        {/* <p className="mt-6 text-xl leading-8">{post.content}</p> */}
        
        <figure className="mt-16">
          <Image
            height={1000}
            width={1000}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
            src={post.imageUrl}
            alt=""
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            Faucibus commodo massa rhoncus, volutpat.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <p>{post.content}</p>
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In
            amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie.
            Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
            ac. Cras fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p> */}
        </div>
      </div>
    </div>
  )
}