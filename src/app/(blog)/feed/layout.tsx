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
  const post = posts[0]

  return (
    <div className="w-screen">

      <div className="w-full flex justify-between xl:justify-center">
        <div className="flex flex-col w-full sm:w-full md:w-full xl:w-[65%] 2xl:w-[50%]">
          {children}
        </div>
        
        <div className="pb-12 border-l border-r border-gray-200 hidden xl:block w-[20%] lg:w-[25%] 2xl:w-[20%]">
          <SideNavigation post={post} /> 
        </div>
        
      </div>
      
    </div>
  )
}