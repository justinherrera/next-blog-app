import SideNavigation from '@/components/blogs/navigations/side-navigation'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {

  const trendingPostsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?likes=desc`, { cache: 'no-store' })
  const { posts: trendingPosts } = await trendingPostsResponse.json()

  return (
    <div className="w-screen">

      <div className="w-full flex justify-between xl:justify-center">
        <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-[65%] 2xl:w-[50%]">
          {children}
        </div>
        
        <div className="pb-12 hidden xl:block w-[20%] lg:w-[25%] 2xl:w-[20%]">
          <SideNavigation trendingPosts={trendingPosts} />
        </div>
        
      </div>
      
    </div>
  )
}