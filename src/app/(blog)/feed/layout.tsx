import BlogNavigation from '../../_components/blogs/top-navigation'
import { auth } from "../../../../auth"

export default async function FeedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  console.log(session)
  if (!session) return <div>Not authenticated</div>

  return (
    <>
      <BlogNavigation />
      {children}
    </>
  )
}