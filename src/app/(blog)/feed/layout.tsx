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
  const response = await fetch(`${process.env.BASE_URL}/api/blogs`, { cache: 'no-store' })
  const { posts } = await response.json()

  if (posts.length === 0) return <NoPostsFound message="There are no blog posts at the moment. Stay tuned for upcoming posts and updates!" />

  return (
    <div className="w-screen">

      <div className="w-full flex justify-between">
        <div className="flex flex-col w-full sm:w-[75%] md:w-full xl:w-[75%]">
          {children}
        </div>
        
        <div className="py-12 border-l border-gray-200 hidden lg:block w-[25%]">
          <SideNavigation /> 
        </div>
        
      </div>
      
    </div>
  )
}