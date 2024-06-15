import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import SearchInput from '../../_components/blogs/search-input'
import NoPostsFound from "@/app/_components/blogs/no-posts-found"
import Image from 'next/image'

// const posts = [
//   {
//     id: 1,
//     title: '',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     imageUrl: 'https://images.unsplash.com/photo-1715553175979-617c6018cbe0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     published: true,
//     createdAt: new Date('2024-06-15T11:12:56.057Z'),
//     updatedAt: new Date('2024-06-15T11:12:56.057Z'),
//     categoryId: 1,
//     authorId: 'clxfwstbb0000pbns7lqvwhjn',
//     category: { id: 1, name: 'Technology' },
//     user: {
//       id: 'clxfwstbb0000pbns7lqvwhjn',
//       name: 'Justin Herrera',
//       email: 'justinherrera013@gmail.com',
//       emailVerified: null,
//       password: null,
//       image: 'https://lh3.googleusercontent.com/a/ACg8ocIMoIzHlWgkUOENV4-tWWeZYkSvfu0VeWrupPuYKO3NlSwXBnI7Tg=s96-c',
//       createdAt: '2024-06-15T09:22:27.815Z',
//       updatedAt: '2024-06-15T09:22:27.815Z'
//     }
//   }
// ]

export default async function Feed() {

  const posts = await prisma.post.findMany({
    include: {
      category: true,
      user: true
    }
  })
  console.log(posts)

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <SearchInput />
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>

          {
            (posts.length === 0) ? <NoPostsFound /> :
          
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {posts.map((post) => (
              <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    src={post.imageUrl}
                    alt=""
                    width={500}
                    height={500}
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.createdAt.toISOString()} className="text-gray-500">
                      {post.createdAt.toISOString()}
                    </time>
                    <a
                      href="#"
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category.name}
                    </a>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{post.content}</p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <Image 
                        src="https://lh3.googleusercontent.com/a/ACg8ocIMoIzHlWgkUOENV4-tWWeZYkSvfu0VeWrupPuYKO3NlSwXBnI7Tg=s96-c"
                        alt="" 
                        width={300}
                        height={300}
                        className="h-10 w-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href="#">
                            <span className="absolute inset-0" />
                            {post.user.name}
                          </a>
                        </p>
                        <p className="text-gray-600">post.user.role</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
           }
        </div>
        
   
      </div>
    </div>
  );
}