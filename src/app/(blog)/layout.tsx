
import BlogNavigation from '../_components/blogs/top-navigation'

export default function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await auth()
  // if (!session) return <NotAuthorized />

  return (
    <div className="w-screen">
        <BlogNavigation />
        {children}
      
    </div>
  )
}