

import { auth } from '../../../auth'
import NotAuthorized from '@/components/auth/not-authorized'
import BlogNavigation from '@/components/blogs/navigations/top-navigation'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return <NotAuthorized />

  return (
    <div className="w-screen">
        <BlogNavigation />
        {children}
      
    </div>
  )
}