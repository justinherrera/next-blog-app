
import TopNavigation from '@/app/_components/blogs/navigations/top-navigation'

export default function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // if (!session) return <NotAuthorized />

  return (
    <div className="w-screen">
        <TopNavigation />
        {children}
      
    </div>
  )
}