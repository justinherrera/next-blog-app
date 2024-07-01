
import { auth } from '../../../auth'
import NotAuthorized from '../_components/auth/not-authorized'
import TopNavigation from '../_components/blogs/navigations/top-navigation'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return <NotAuthorized />

  return (
    <div className="max-w-screen">
        <TopNavigation />
        {children}
      
    </div>
  )
}