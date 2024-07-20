
import { auth } from "../../../auth"
import NotAuthorized from "@/components/auth/not-authorized"
import NoPostsFound from "@/components/blogs/no-posts-found"
import Profile from "@/components/blogs/profile/profile"

import { getProfilePosts } from "@/lib/actions"


export default async function Page() {

  const session = await auth()

  if (!session) return <NotAuthorized />
  const { user } = session

  const { posts } = await getProfilePosts(user?.id, 0, 6)

  if (posts.length === 0) return <NoPostsFound message="It looks like you haven't made any posts yet." />

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Blogs</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Check out your recent posts.
          </p>
        </div>
        <Profile getProfilePosts={async (offset) => {
        "use server"
        return await getProfilePosts(user?.id, offset, 3)
      }} initialPosts={posts} userId={user?.id} />
      </div>
    </div>
  )
}