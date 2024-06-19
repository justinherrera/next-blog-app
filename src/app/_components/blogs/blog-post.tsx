import Image from "next/image"
import { useQuery } from '@tanstack/react-query'
import { TailSpin } from "react-loader-spinner"
import { format } from "date-fns"
import LoadingBlogSection from "./loading-blog-section"

export default function BlogPost({ slug }: { slug: string }) {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['posts', slug],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/blogs?slug=${slug}`)
        .then((res) => res.json())
        .then(data => data.post)
      return response
    },
  })
  

  if (isPending) return <LoadingBlogSection />

  if(!data) return <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">No content</h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Oops! Nothing to see here
      </p>
    </div>
  </div>

  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Introducing ✨</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h1>
        <div className="flex items-center gap-x-6 my-8 border-b pb-4 border-gray-200">
          <div className="flex min-w-0 gap-x-4">
            <Image 
              className="h-12 w-12 flex-none rounded-full bg-gray-50" 
              height={100}
              width={100}
              src={data.user.image} alt="" />
            <div className="min-w-0 flex-auto">
              <div className="flex space-x-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">{data.user.name}</p>
                <a
                  href="#"
                  className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Follow
                </a>
              </div>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{format(new Date(data.createdAt), "MMM d, yyyy")}</p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xl leading-8">
          {data.content}
        </p>
        
        <figure className="mt-16">
          <Image
            height={1000}
            width={1000}
            className="aspect-video rounded-xl bg-gray-50 object-cover"
            src={data.imageUrl}
            alt=""
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            Faucibus commodo massa rhoncus, volutpat.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In
            amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie.
            Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
            ac. Cras fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
        </div>
      </div>
    </div>
  )
}