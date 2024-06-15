import BlogNavigation from '../../_components/blogs/top-navigation'
import { auth } from "../../../../auth"
import NotAuthorized from '@/app/_components/auth/not-authorized'

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log(session)
  if (!session) return <NotAuthorized />

  return (
    <>
      <BlogNavigation />
      {children}
    </>
  )
}