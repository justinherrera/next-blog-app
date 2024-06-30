
import BlogNavigation from '../_components/blogs/navigations/top-navigation'

export default function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // if (!session) return <NotAuthorized />

  return (
    <div className="max-w-screen">
        <BlogNavigation />
        {children}
      
    </div>
  )
}