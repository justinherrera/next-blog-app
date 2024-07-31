
import NotAuthorized from '@/components/auth/not-authorized'
import TopNavigation from '@/components/blogs/navigations/top-navigation'
import { auth } from '../../../../auth'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  // if (!session) return <NotAuthorized />

  return (
    <div className="w-screen">
        <TopNavigation />
        {children}
      
    </div>
  )
}