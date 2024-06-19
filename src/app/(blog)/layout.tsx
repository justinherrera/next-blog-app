import BlogNavigation from '../_components/blogs/top-navigation'
import { auth } from "../../../auth"
import NotAuthorized from '@/app/_components/auth/not-authorized'

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
      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
      
    </div>
  )
}