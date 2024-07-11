import BlogNavigation from '../../_components/blogs/navigations/top-navigation'
import { auth } from "../../../../auth"
import NotAuthorized from '@/app/_components/auth/not-authorized'
import SideNavigation from '../../_components/blogs/navigations/side-navigation'
import NoPostsFound from '@/app/_components/blogs/no-posts-found'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // if (!session) return <NotAuthorized />

  const trendingPostsResponse = await fetch(`${process.env.BASE_URL}/api/blogs?likes=desc`, { cache: 'no-store' })
  const { posts: trendingPosts } = await trendingPostsResponse.json()

  const latestPostsResponse = await fetch(`${process.env.BASE_URL}/api/blogs?limit=5`, { cache: 'no-store' })
  const { posts: latestPosts } = await latestPostsResponse.json()

  return (
    <div className="w-screen">

      <div className="w-full flex justify-between xl:justify-center">
        <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-[65%] 2xl:w-[50%]">
          {children}
        </div>
        
        <div className="pb-12 border-l border-r border-gray-200 hidden xl:block w-[20%] lg:w-[25%] 2xl:w-[20%]">
          <SideNavigation trendingPosts={trendingPosts} latestPosts={latestPosts} />
        </div>
        
      </div>
      
    </div>
  )
}